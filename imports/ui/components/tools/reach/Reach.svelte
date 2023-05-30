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
    populationCountForStrategy,
    respondentsCountForStrategy,
    results,
    useForResults,
    userId
  } from '../../../stores/reach';
  import createResult from '../../../procedures/results';
  import createRenew from '../../../procedures/renew';
  import createMaxValues from '../../../functions/maxValues';
  import {DeployedTouchPoint} from '/imports/both/typings/types';

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

  // Set maxValues for deployment for formula
  deployment.update((data) => {
    return data.map((touchPoint) => {
      return Object.assign(touchPoint, {maxValue: 1});
    });
  });

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
      .then((result) => deployment.update((data) => result))
      .then(() => {
        const maxValuesForTouchPoints = setMaxValues.calculationForData(
          $deployment,
          $respondentsCountForStrategy,
          $populationCountForStrategy
        );
        deployment.update((data) => setMaxValues.forData(data, maxValuesForTouchPoints));
      })
      .catch((error) => console.log('error in strategies.prepareDeploymentForResults; ', error));
  } else {
    renew.forFormula();
    deployment.update((data) => setMaxValues.forFormula(data));
  }

  // functions
  function onChange(event: any) {
    const touchPoint: DeployedTouchPoint = event.detail;
    // TODO: if event.target == select if event.target == input
    if ($marketData && $useForResults == 'data') {
      Meteor.callAsync('strategies.calculateResultsWithData', {
        userId: $userId,
        deployment: $deployment
      })
        .then((result) => results.update((data) => (data = result)))
        .catch((error) => console.log('error in strategies.calculateResultsWithData in onChange: ', error));
    } else if ($useForResults == 'formula') {
      calculateResult.totalForFormula();
    }
  }
  function onSubmit(event: any) {
    const touchPoint: DeployedTouchPoint = event.detail;
    if ($marketData && $useForResults == 'data') {
      calculateResult.forTouchPoint(touchPoint);
      Meteor.callAsync('strategies.calculateResultsWithData', {
        userId: $userId,
        deployment: $deployment
      })
        .then((result) => results.update((data) => (data = result)))
        .catch((error) => console.log('error in strategies.calculateResultsWithData in onSubmit: ', error));
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
    {#each $deployment as touchPoint, index}
      <TouchPoint {touchPoint} {index} on:change={() => onChange(touchPoint)} on:submit={() => onSubmit(touchPoint)} />
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
