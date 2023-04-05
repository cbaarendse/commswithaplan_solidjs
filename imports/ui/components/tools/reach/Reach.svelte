<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import sort from '../../../methods/sort';
  import {language} from '../../../stores/utils';
  import {
    createdAt,
    deployment,
    marketData,
    maxValues,
    overlap,
    results,
    respondentsReady,
    sortedByName,
    strategy,
    totalReach,
    useMarketData
  } from '../../../stores/reach';
  import renew from '../../../methods/renew';
  import getResults from '../../../methods/getResults';
  import createMaxValues from '/imports/ui/methods/maxValues';
  import prepareRespondents from '/imports/ui/methods/prepareRespondents';

  // variables
  const setMaxValues = createMaxValues();
  if (!$createdAt) {
    $createdAt = new Date();
  }
  if (!$deployment) {
    renew();
  }
  if ($deployment) {
    setMaxValues.forFormula();
  }
  //sort, based on selected language
  $: {
    const [sortedDeployedTouchPoints, updatedSortedByName] = sort($language);
    deployment.set(sortedDeployedTouchPoints);
    sortedByName.set(updatedSortedByName);
  }
  $: if ($marketData && $useMarketData) {
    prepareRespondents();
    setMaxValues.forData();
  } else {
    setMaxValues.forFormula();
  }

  $: console.log('$strategy in $: ', $strategy);
  $: console.log('$marketData: in $: ', $marketData);
  $: console.log('useMarketData: in $: ', $useMarketData);
  $: console.log('$results: in $: ', $results);
  $: console.log('$totalReach: in $: ', $totalReach);
  $: console.log('$overlap: in $: ', $overlap);
  $: console.log('$respondentsReady: in $: ', $respondentsReady);
  $: console.log('$maxValues: in $: ', $maxValues);

  // functions
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
        on:change={getResults}
        on:submit={getResults}
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
