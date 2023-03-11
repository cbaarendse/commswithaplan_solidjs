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
    populationForStrategy,
    results,
    sortedByName,
    strategy,
    totalReach,
    touchPointsDefinitions
  } from '../../../stores/reach';
  import {DeployedTouchPoint, InputType, Strategy} from '/imports/both/typings/types';
  import {Meteor} from 'meteor/meteor';

  // variables
  const reachTool = createReachTool();
  let marketName: Strategy['marketName'];
  let useMarketData: Strategy['useMarketData'];

  // subscriptions
  let unsubscribe = briefing.subscribe((data) => {
    marketName = data.marketName;
    useMarketData = data.useMarketData;
  });

  // base new briefing on availability of marketData
  $: $marketData ? briefing.set(briefingForData()) : briefing.set(briefingForFormula());
  // base new deployment on availability and usage of marketData
  $: Meteor.callAsync('strategies.maxValuesForTouchPoints', {
    briefing: $briefing,
    deployment: $deployment,
    populationForStrategy: $populationForStrategy
  })
    .then((result) => {
      if (result) {
        $maxValues = result;
      }
    })
    .catch((error) => {
      if (error) {
        console.log('error in max values: ', error);
      }
    });

  $: $marketData && useMarketData
    ? deployment.update((data) => {
        return data.map((touchPoint) => {
          const defaultInputTypeIndexForThisTouchPoint = touchPointsDefinitions().filter(
            (definition) => definition.name == touchPoint.name
          )[0].defaultInputTypeIndex;
          return {...touchPoint, inputTypeIndex: defaultInputTypeIndexForThisTouchPoint};
        });
      })
    : deployment.update((data) => {
        return data.map((touchPoint) => Object.assign(touchPoint, {inputTypeIndex: InputType.Reach}));
      });

  // first sort, based on selected language
  // let [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort(deployedTouchPoints, $sortedByName, $language);
  // $: deployment.set(sortedDeployedTouchPoints);
  // $: sortedByName.set(updatedSortedByName);

  $: console.log('$briefing in $: ', $briefing);
  $: console.log('$deployment: in $: ', $deployment);
  $: console.log('$marketData: in $: ', $marketData);
  $: console.log('useMarketData: in $: ', useMarketData);
  $: console.log('$results: in $: ', $results);
  $: console.log('$totalReach: in $: ', $totalReach);
  $: console.log('$overlap: in $: ', $overlap);

  // functions
  function calculateResults() {
    if ($marketData && $briefing.useMarketData) {
      Meteor.callAsync('strategies.calculateResultsWithData', {
        briefing: $briefing,
        deployment: $deployment,
        populationForStrategy: $populationForStrategy
      })
        .then((result) => {
          $results = result;
        })
        .catch((error) => console.log('error in calculate results with data', error));
    } else {
      $results = reachTool.calculateResults($deployment);
    }
  }
  onDestroy(() => {
    unsubscribe();
  });
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls />
    <Output />
    {#each $deployment as _, index}
      <TouchPoint {index} on:change={calculateResults} on:submit={calculateResults} />
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
