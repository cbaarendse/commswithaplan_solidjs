<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import {derived, get, writable} from 'svelte/store';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import {onDestroy, onMount} from 'svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {strategy, strategyWithData, strategyWithFormula, sortedByName, respondentsCount} from '../../../stores/reach';
  import {DeployedTouchPoint, Strategy} from '/imports/both/typings/types';

  // variables
  const reachTool = createReachTool();
  let marketData: Strategy['marketData'];
  let marketName: Strategy['marketName'];
  let deployment: Strategy['deployment'];

  // subscriptions
  let unsubscribe = strategy.subscribe((value) => {
    marketData = value.marketData;
    marketName = value.marketName;
    deployment = value.deployment; // is a writable store
  });

  // base new strategy on availability of marketData
  $: marketData ? strategy.set(strategyWithData) : strategy.set(strategyWithFormula);

  // first sort, based on selected language
  const [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort($deployment, $sortedByName, $language);
  strategy.update((value) => {
    value.deployment = writable(sortedDeployedTouchPoints);
    return value;
  });
  sortedByName.set(updatedSortedByName);

  // if market changes, strategy changes, based on availability marketData
  $: Meteor.callAsync('probabilities.checkForMarket', {marketName: marketName})
    .then((result) => {
      marketData = result;
    })
    .catch((error) => console.log('error in check for market', error));

  $: console.log('marketName: in $: ', marketName);
  $: console.log('strategy in $: ', strategy);
  $: console.log('strategy.marketData: in $: ', $strategy.marketData);

  // functions

  onDestroy(() => unsubscribe());
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
