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

  // functions
  function processMarketContext() {
    // market and data availability
    // 1. renew
    // 2. for data: average probabilities & not reached
    // 3. maxValues
    if ($marketData && $useForResults == 'data') {
      renew.forData();
      Meteor.callAsync('strategies.averageProbabilitiesAndNotReachedPerTouchPoint', {
        userId: $userId,
        deployment: $deployment
      })
        .then((result) => ($deployment = result))
        .then(() => {
          const maxValuesForTouchPoints = setMaxValues.calculateForData(
            $deployment,
            $respondentsCountForStrategy,
            $populationCountForStrategy
          );
          $deployment = setMaxValues.forData($deployment, maxValuesForTouchPoints);
        })
        .catch((error) => console.log('error in strategies.averageProbabilitiesAndNotReachedPerTouchPoint; ', error));
    } else {
      renew.forFormula();
      $deployment = setMaxValues.forFormula($deployment);
    }
  }

  function processBriefing() {
    // gender / age
    // 1. for data: average probabilities & not reached
    // 2. maxValues
    // 3. adjust values that are above maxValue
    // 4. calculate reach per touchpoint for all touchpoints
    // 5. calculate reach and overlap

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
    calculateReachAndOverlap();
  }

  function processInputType(event: any) {
    // inputType
    // 1. average probabilities and not reached for this touchpoint
    // 2. max value for this touchpoint
    // 3. adjust this value if maxValue
    // 4. calculate reach per touchpoint for this touchpoint
    // 5. calculate reach and overlap

    const touchPoint: DeployedTouchPoint = event.detail;
    console.log('touchpoint & deployment before onChangeInputType: ', touchPoint, $deployment);
    const maxValuesForTouchPoints = setMaxValues.calculateForData(
      $deployment,
      $respondentsCountForStrategy,
      $populationCountForStrategy
    );
    deployment.update((data) => setMaxValues.forData(data, maxValuesForTouchPoints));
    console.log('deployment after onChangeInputType: ', $deployment);
  }

  function processValue(event: any) {
    // value
    // 1. calculate reach per touchpoint for this touchpoint
    // 2. calculate reach and overlap
    const touchPoint: DeployedTouchPoint = event.detail;
    console.log('touchPoint in processValue: ', touchPoint);
    if ($marketData && $useForResults == 'data') {
      const reach = calculateResult.forTouchPoint(
        touchPoint,
        $respondentsCountForStrategy,
        $populationCountForStrategy
      );
      deployment.update((data) => {
        //TODO: check
        const index = data.findIndex((tP) => tP.name == touchPoint.name);
        data[index].reach = reach;
        return data;
      });
      console.log('touchPoint with reach?: ', touchPoint);
    }
    calculateReachAndOverlap();
  }

  function calculateReachAndOverlap() {
    if ($marketData && $useForResults == 'data') {
      Meteor.callAsync('strategies.calculateReachAndOverlapWithData', {
        userId: $userId,
        deployment: $deployment
      })
        .then((result) =>
          results.update((data) => {
            data = result;
            return data;
          })
        )
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
