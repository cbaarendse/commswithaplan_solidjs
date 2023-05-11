<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import sort from '../../../procedures/sort';
  import {language} from '../../../stores/utils';
  import {
    createdAt,
    deployment,
    marketData,
    maxValues,
    results,
    respondentsReady,
    strategy,
    useForResults,
    averageProbabilities,
    respondentsNotReached
  } from '../../../stores/reach';
  import createResults from '../../../procedures/results';
  import createRenew from '../../../procedures/renew';
  import createMaxValues from '../../../procedures/maxValues';
  import createPrepare from '/imports/ui/procedures/prepare';

  // variables
  const renew = createRenew();
  const prepare = createPrepare();
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

  $: if (!$marketData || $useForResults == 'formula') {
    $respondentsReady = false;
  }

  $: if ($marketData && $useForResults == 'data') {
    renew.forData();
    prepare.respondents();
    prepare.getAverageProbabilities();
    prepare.getRespondentsNotReached();
    setMaxValues.forData();
  } else {
    renew.forFormula();
    setMaxValues.forFormula();
  }

  $: console.log('$strategy in $: ', $strategy);
  $: console.log('$marketData: in $: ', $marketData);
  $: console.log('useForResults: in $: ', $useForResults);
  $: console.log('$results: in $: ', $results);
  $: console.log('$respondentsReady: in $: ', $respondentsReady);
  $: console.log('$averageProbabilities: in $: ', $averageProbabilities);
  $: console.log('$respondentsNotReached: in $: ', $respondentsNotReached);
  $: console.log('$maxValues: in $: ', $maxValues);

  // functions
  function getResults() {
    if ($marketData && $useForResults == 'data') {
      prepare.respondents();
      prepare.getAverageProbabilities();
      prepare.getRespondentsNotReached();
      calculateResults.forData();
    } else if ($useForResults == 'formula') {
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
        max={$maxValues.filter((m) => m.touchPoint == name)[0].max || 1}
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
