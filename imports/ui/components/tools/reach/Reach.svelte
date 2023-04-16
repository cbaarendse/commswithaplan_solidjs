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
    results,
    respondentsReady,
    strategy,
    useMarketData
  } from '../../../stores/reach';
  import createResults from '../../../methods/results';
  import createRenew from '../../../methods/renew';
  import createMaxValues from '../../../methods/maxValues';
  import prepareRespondents from '/imports/ui/methods/prepareRespondents';

  // variables
  const renew = createRenew();
  const setMaxValues = createMaxValues();
  const calculateResults = createResults();
  if (!$createdAt) {
    $createdAt = new Date();
  }
  if (!$deployment) {
    renew.forFormula();
  }

  setMaxValues.forFormula();

  $: {
    sort($language);
  }

  $: if (!$marketData || !$useMarketData) {
    $respondentsReady = false;
  }

  $: if ($marketData && $useMarketData) {
    renew.forData();
    prepareRespondents();
    setMaxValues.forData();
  } else {
    renew.forFormula();
    setMaxValues.forFormula();
  }

  $: console.log('$strategy in $: ', $strategy);
  $: console.log('$marketData: in $: ', $marketData);
  $: console.log('useMarketData: in $: ', $useMarketData);
  $: console.log('$results: in $: ', $results);
  $: console.log('$respondentsReady: in $: ', $respondentsReady);
  $: console.log('$maxValues: in $: ', $maxValues);

  // functions
  function getResults() {
    if ($marketData && $useMarketData) {
      prepareRespondents();
      calculateResults.forData();
    } else {
      calculateResults.forFormula();
    }
  }
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls />
    <Output />
    {#each $deployment as { name, show, definitions }, index}
      <TouchPoint
        {name}
        {show}
        {definitions}
        {index}
        bind:value={$deployment[index].value}
        bind:inputTypeIndex={$deployment[index].inputTypeIndex}
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
