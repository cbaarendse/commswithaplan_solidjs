<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import {setContext, onDestroy} from 'svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {
    deployment,
    briefing,
    marketData,
    strategy,
    sortedByName,
    briefingForData,
    briefingForFormula,
    touchPointsForData,
    touchPointsForFormula
  } from '../../../stores/reach';
  import {DeployedTouchPoint, Strategy} from '/imports/both/typings/types';

  // variables
  const reachTool = createReachTool();
  let marketName: Strategy['marketName'];
  let useMarketData: Strategy['useMarketData'];
  let deployedTouchPoints: DeployedTouchPoint[];
  setContext('deployedTouchPoints', $deployment);

  // subscriptions
  let unsubscribeBriefing = briefing.subscribe((data) => {
    marketName = data.marketName;
    useMarketData = data.useMarketData;
  });

  let unsubscribeDeployment = deployment.subscribe((data) => {
    deployedTouchPoints = data;
  });

  // base new strategy on availability of marketData
  $: marketData ? briefing.set(briefingForData()) : briefing.set(briefingForFormula());
  $: $marketData && useMarketData ? deployment.set(touchPointsForData()) : deployment.set(touchPointsForFormula());

  // first sort, based on selected language
  const [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort(
    deployedTouchPoints,
    $sortedByName,
    $language
  );
  deployment.set(sortedDeployedTouchPoints);
  sortedByName.set(updatedSortedByName);

  $: console.log('$strategy in $: ', $strategy);
  $: console.log('marketName: in $: ', marketName);
  $: console.log('$deployment: in $: ', $deployment);
  $: console.log('$marketData: in $: ', $marketData);

  // functions

  onDestroy(() => {
    unsubscribeBriefing();
    unsubscribeDeployment();
  });
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls />
    <Output />
    {#each $deployment as _, index}
      <TouchPoint {index} />
    {/each}
  </div>
</section>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-rows: auto;
    gap: 1em;
    margin: 0em auto;
  }
  @media screen and (min-width: 768px) {
    .container {
      width: 80%;
    }
  }
</style>
