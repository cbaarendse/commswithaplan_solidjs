<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
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
    briefingWithMarketData,
    createdBriefing,
    marketData,
    derivedStrategy,
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
  // let marketData: Strategy['marketData'];
  let useMarketData: Strategy['useMarketData'];
  let deployedTouchPoints: DeployedTouchPoint[];
  let briefingWithMarketDataStore;
  let createdBriefingStore;

  // subscriptions
  let unsubscribeBriefing = briefing.subscribe((data) => {
    marketName = data.marketName;
    //marketData = data.marketData;
    useMarketData = data.useMarketData;
  });

  let unsubscribe_1 = briefingWithMarketData.subscribe((data) => (briefingWithMarketDataStore = data));

  let unsubscribe_2 = createdBriefing.subscribe((data) => (createdBriefingStore = data));

  let unsubscribeDeployment = deployment.subscribe((data) => {
    deployedTouchPoints = data;
  });

  // base new strategy on availability of marketData
  $: marketData ? briefing.set(briefingForData()) : briefing.set(briefingForFormula());
  $: marketData && useMarketData ? deployment.set(touchPointsForData()) : deployment.set(touchPointsForFormula());

  // first sort, based on selected language
  const [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort(
    deployedTouchPoints,
    $sortedByName,
    $language
  );
  deployment.set(sortedDeployedTouchPoints);
  sortedByName.set(updatedSortedByName);

  // if market changes, strategy changes, based on availability marketData
  $: Meteor.callAsync('probabilities.checkForMarket', {marketName: marketName})
    .then((result) => {
      briefing.update((data) => {
        data.marketData = result;
        return data;
      });
    })
    .catch((error) => console.log('error in check for market - in Reach', error));

  $: console.log('derivedStrategy ', $derivedStrategy);
  $: console.log('marketName: in $: ', marketName);
  $: console.log('deployment: in $: ', $deployment);
  $: console.log('briefing.marketData: in $: ', $briefing.marketData);
  $: console.log('briefingWithMarketDataStore in $: ', $briefingWithMarketData);
  $: console.log('createdBriefingStore in $: ', $createdBriefing);

  // functions

  onDestroy(() => {
    unsubscribeBriefing();
    unsubscribeDeployment();
    unsubscribe_1();
    unsubscribe_2();
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
