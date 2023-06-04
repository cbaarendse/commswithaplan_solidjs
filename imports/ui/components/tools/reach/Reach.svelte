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
    createdAt,
    deployment,
    marketData,
    populationCountForStrategy,
    respondentsCountForStrategy,
    results,
    useForResults,
    userId
  } from '../../../stores/reach';
  import createResult from '../../../functions/results';
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
  // TODO: only use dispatch, onChangeBriefing (gender, age), onChangeValue, onSubmitValue, onChangeInputtype, onChangeMarket, onChangeMarketData

  // functions
  function processMarketContext() {
    if ($marketData && $useForResults == 'data') {
      renew.forData();
      Meteor.callAsync('strategies.averageProbabilitiesAndNotReachedPerTouchPoint', {
        userId: $userId,
        deployment: $deployment
      })
        .then((result) =>
          deployment.update((data) => {
            data = result;
            return data;
          })
        )
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
  }

  function processBriefing() {
    processMarketContext();
    $deployment.map((touchPoint) => {
      touchPoint.reach = calculateResult.forTouchPoint(
        touchPoint,
        $respondentsCountForStrategy,
        $populationCountForStrategy
      );
      return touchPoint;
    });
    $deployment = $deployment;
    Meteor.callAsync('strategies.calculateReachAndOverlapWithData', {
      userId: $userId,
      deployment: $deployment
    })
      .then((result) => results.update((data) => (data = result)))
      .catch((error) =>
        console.log('error in strategies.calculateReachAndOverlapWithData in processBriefing: ', error)
      );
  }

  function processInputType(event: any) {
    const touchPoint: DeployedTouchPoint = event.detail;
    console.log('touchpoint & deployment before onChangeInputType: ', touchPoint, $deployment);
    const maxValuesForTouchPoints = setMaxValues.calculationForData(
      $deployment,
      $respondentsCountForStrategy,
      $populationCountForStrategy
    );
    deployment.update((data) => setMaxValues.forData(data, maxValuesForTouchPoints));
    console.log('deployment after onChangeInputType: ', $deployment);
  }

  function processValue(event: any) {
    const touchPoint: DeployedTouchPoint = event.detail;
    console.log('touchPoint in processValue: ', touchPoint);
    if ($marketData && $useForResults == 'data') {
      touchPoint.reach = calculateResult.forTouchPoint(
        touchPoint,
        $respondentsCountForStrategy,
        $populationCountForStrategy
      );
      console.log('touchPoint with reach?: ', touchPoint);
      Meteor.callAsync('strategies.calculateReachAndOverlapWithData', {
        userId: $userId,
        deployment: $deployment
      })
        .then((result) => results.update((data) => (data = result)))
        .catch((error) => console.log('error in strategies.calculateReachAndOverlapWithData in onSubmit: ', error));
    } else if ($useForResults == 'formula') {
      results.set(calculateResult.totalForFormula($deployment));
    }
  }
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls
      on:changeDataSource={processMarketContext}
      on:changeMarket={processMarketContext}
      on:changeGender={processBriefing}
      on:changeAgeGroup={processBriefing}
    />
    <Output />
    {#each $deployment as touchPoint}
      <TouchPoint
        {touchPoint}
        on:changeInputType={processInputType}
        on:changeValue={processValue}
        on:submitValue={processValue}
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
