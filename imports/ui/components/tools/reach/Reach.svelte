<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import sort from '../../../methods/sort';
  import {onMount} from 'svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {
    briefing,
    createdAt,
    deployment,
    marketData,
    marketName,
    maxValues,
    ageGroupIndexStart,
    ageGroupIndexEnd,
    genders,
    overlap,
    populationForStrategy,
    results,
    sortedByName,
    strategy,
    totalReach,
    useMarketData,
    userId
  } from '../../../stores/reach';
  import {Meteor} from 'meteor/meteor';
  import renew from '../../../methods/renew';

  // variables
  const reachTool = createReachTool();
  if (!$createdAt) {
    $createdAt = new Date();
  }
  if (!$deployment) {
    renew();
  }
  //sort, based on selected language
  $: {
    const [sortedDeployedTouchPoints, updatedSortedByName] = sort($language);
    deployment.set(sortedDeployedTouchPoints);
    sortedByName.set(updatedSortedByName);
  }

  $: console.log('$strategy in $: ', $strategy);
  $: console.log('$marketData: in $: ', $marketData);
  $: console.log('useMarketData: in $: ', $useMarketData);
  $: console.log('$results: in $: ', $results);
  $: console.log('$totalReach: in $: ', $totalReach);
  $: console.log('$overlap: in $: ', $overlap);

  // functions

  function calculateResults() {
    if ($marketData && $useMarketData) {
      Meteor.callAsync('strategies.calculateResultsWithData', {
        userId: $userId,
        marketName: $marketName,
        ageGroupIndexStart: $ageGroupIndexStart,
        ageGroupIndexEnd: $ageGroupIndexEnd,
        genders: $genders,
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
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls />
    <Output />
    {#each $deployment as { name, show, inputTypeIndex, definitions }, index}
      <TouchPoint
        {name}
        {show}
        {inputTypeIndex}
        {definitions}
        {index}
        bind:value={$deployment[index].value}
        on:change={calculateResults}
        on:submit={calculateResults}
      />
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
