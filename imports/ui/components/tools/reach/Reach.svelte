<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import {writable} from 'svelte/store';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import {onDestroy, onMount} from 'svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {
    deployment,
    briefing,
    derivedStrategy,
    sortedByName,
    briefingForData,
    briefingForFormula,
    deployedTouchPointsForData,
    deployedTouchPointsForFormula
  } from '../../../stores/reach';
  import {Strategy} from '/imports/both/typings/types';

  // variables
  const reachTool = createReachTool();
  let marketName: Strategy['marketName'];
  let marketData: Strategy['marketData'];
  let useMarketData: Strategy['useMarketData'];

  // subscriptions
  let unsubscribeBriefing = briefing.subscribe((value) => {
    marketName = value.marketName;
    marketData = value.marketData;
    useMarketData = value.useMarketData;
  });

  let unsubscribeDeployment = deployment.subscribe((value) => {});

  // base new strategy on availability of marketData
  $: marketData ? briefing.set(briefingForData) : briefing.set(briefingForFormula);
  $: marketData && useMarketData
    ? deployment.set(deployedTouchPointsForData)
    : deployment.set(deployedTouchPointsForFormula);

  // first sort, based on selected language
  const [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort($deployment, $sortedByName, $language);
  deployment.set(sortedDeployedTouchPoints);
  sortedByName.set(updatedSortedByName);

  // if market changes, strategy changes, based on availability marketData
  $: Meteor.callAsync('probabilities.checkForMarket', {marketName: marketName})
    .then((result) => {
      briefing.update((value) => {
        value.marketData = result;
        return value;
      });
    })
    .catch((error) => console.log('error in check for market', error));

  $: console.log('derivedStrategy ', $derivedStrategy);
  $: console.log('marketName: in $: ', marketName);
  $: console.log('briefing.marketData: in $: ', $briefing.marketData);

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
    {#each $deployment as touchPoint, index}
      <TouchPoint {touchPoint} {index} />
    {/each}
  </div>
</section>

<style>
  .container {
    /* TODO: no flex column */
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0em auto;
  }
  @media screen and (min-width: 768px) {
    .container {
      width: 80%;
    }
  }
</style>
