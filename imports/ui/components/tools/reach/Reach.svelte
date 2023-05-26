<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import TouchPoint from './TouchPoint.svelte';
  import sort from '../../../procedures/sort';
  import {language} from '../../../stores/utils';
  import {
    ageGroupIndexEnd,
    ageGroupIndexStart,
    ageGroups,
    createdAt,
    deployment,
    genders,
    marketData,
    marketName,
    respondentsCountForStrategy,
    populationCountForStrategy,
    useForResults,
    userId
  } from '../../../stores/reach';
  import createResult from '../../../procedures/results';
  import createRenew from '../../../procedures/renew';
  import createMaxValues from '../../../functions/maxValues';

  // variables
  const renew = createRenew();
  const setMaxValues = createMaxValues();
  const calculateResult = createResult();
  if (!$createdAt) {
    $createdAt = new Date();
  }
  if (!$deployment) {
    renew.forFormula();
  }

  setMaxValues.forFormula($deployment);

  $: {
    sort($language);
  }

  $: if ($marketData && $useForResults == 'data') {
    renew.forData();
    Meteor.callAsync('strategies.prepareDeploymentForResults', {
      userId: $userId,
      marketName: $marketName,
      genders: $genders,
      ageGroupIndexStart: $ageGroupIndexStart,
      ageGroupIndexEnd: $ageGroupIndexEnd,
      deployment: $deployment,
      ageGroups: $ageGroups
    })
      .then((result) => deployment.update((data) => (data = result)))
      .then((result) =>
        deployment.update(
          (data) => (data = setMaxValues.forData(result, $populationCountForStrategy, $respondentsCountForStrategy))
        )
      )
      .catch((error) => console.log('error in strategies.prepareDeploymentForResults; ', error));
  } else {
    renew.forFormula();
    setMaxValues.forFormula($deployment);
  }

  // functions
  function onChange() {
    if ($marketData && $useForResults == 'data') {
      calculateResult.totalForData();
    } else if ($useForResults == 'formula') {
      calculateResult.totalForFormula();
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
        on:change={onChange}
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
