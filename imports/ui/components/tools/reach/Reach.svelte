<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import {onDestroy} from 'svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {
    briefing,
    briefingForData,
    briefingForFormula,
    deployment,
    marketData,
    maxValues,
    overlap,
    results,
    sortedByName,
    strategy,
    totalReach,
    touchPointsForData,
    touchPointsForFormula
  } from '../../../stores/reach';
  import {DeployedTouchPoint, Strategy} from '/imports/both/typings/types';

  // variables
  const reachTool = createReachTool();
  let marketName: Strategy['marketName'];
  let useMarketData: Strategy['useMarketData'];
  let deployedTouchPoints: DeployedTouchPoint[] = [];

  // subscriptions
  let unsubscribeBriefing = briefing.subscribe((data) => {
    marketName = data.marketName;
    useMarketData = data.useMarketData;
  });

  let unsubscribeDeployment = deployment.subscribe((data) => {
    deployedTouchPoints = data;
  });

  // base new briefing on availability of marketData
  $: $marketData ? briefing.set(briefingForData()) : briefing.set(briefingForFormula());
  // base new deployment on availability and usage of marketData
  $: $marketData && useMarketData ? deployment.set(touchPointsForData()) : deployment.set(touchPointsForFormula());

  // first sort, based on selected language
  // let [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort(deployedTouchPoints, $sortedByName, $language);
  // $: deployment.set(sortedDeployedTouchPoints);
  // $: sortedByName.set(updatedSortedByName);

  $: console.log('$briefing in $: ', $briefing);
  $: console.log('$deployment: in $: ', $deployment);
  $: console.log('$strategy in $: ', $strategy);
  $: console.log('marketName: in $: ', marketName);
  $: console.log('$marketData: in $: ', $marketData);
  $: console.log('$results: in $: ', $results);
  $: console.log('$totalReach: in $: ', $totalReach);
  $: console.log('$overlap: in $: ', $overlap);
  $: console.log('$maxValues: in $: ', $maxValues);

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
