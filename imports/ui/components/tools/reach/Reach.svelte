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
  import createMaxValue from '../../../functions/maxValues';
  import {DeployedTouchPoint} from '/imports/both/typings/types';

  // variables
  const renew = createRenew();
  const setMaxValue = createMaxValue();
  const calculateResult = createResult();
  if (!$createdAt) {
    $createdAt = new Date();
  }
  if (!$deployment) {
    renew.forFormula();
  }

  $: console.log('deployment = :', $deployment);

  // Set maxValues for deployment for formula
  processMarketContextForFormula();

  $: {
    sort($language);
  }

  // functions
  async function processMarketContextForData() {
    renew.forData();
    const promises = $deployment.map(
      async (touchPoint) =>
        await Meteor.callAsync('strategies.averageProbabilitiesAndNotReachedForTouchPoint', {
          userId: $userId,
          touchPoint: touchPoint
        })
    );
    await Promise.all(promises)
      .then((result) => ($deployment = result))
      .catch((error) => console.log('error in averageProbabilities... in processmarketcontextfordata: ', error));
    deployment.update((data) => {
      return data.map((touchPoint) => {
        return setMaxValue.forData(touchPoint, $respondentsCountForStrategy, $populationCountForStrategy);
      });
    });
  }

  function processMarketContextForFormula() {
    renew.forFormula();
    deployment.update((data) => {
      return data.map((touchPoint) => {
        return Object.assign(touchPoint, {maxValue: 1});
      });
    });
  }

  async function processBriefingForData() {
    // gender / age
    // 1. for data: average probabilities & not reached
    // 2. maxValues
    // 3. adjust values that are above maxValue
    // 4. calculate reach per touchpoint for all touchpoints
    // 5. calculate reach and overlap
    await processMarketContextForData();
    // correct values for maxValue
    deployment.update((data) => {
      return data.map((touchPoint) => {
        return Object.assign(touchPoint, {
          value:
            typeof touchPoint.maxValue == 'number'
              ? touchPoint.value > touchPoint.maxValue
                ? touchPoint.maxValue
                : touchPoint.value
              : 0
        });
      });
    });
    deployment.update((data) => {
      return data.map((touchPoint) => {
        return Object.assign(touchPoint, {
          reach: calculateResult.forTouchPoint(touchPoint, $respondentsCountForStrategy, $populationCountForStrategy)
        });
      });
    });
    calculateReachAndOverlapForData();
  }

  async function processInputTypeForData(event: any) {
    // inputType
    // 1. average probabilities and not reached for this touchpoint
    // 2. max value for this touchpoint
    // 3. adjust this value if maxValue
    // 4. calculate reach per touchpoint for this touchpoint
    // 5. calculate reach and overlap

    const touchPoint: DeployedTouchPoint = event.detail;
    deployment.update((data) => {
      const index = data.findIndex((tP) => touchPoint.name == tP.name);
      Meteor.callAsync('strategies.averageProbabilitiesAndNotReachedForTouchPoint', {
        userId: $userId,
        touchPoint: data[index]
      })
        .then((result) => (data[index] = result))
        .catch((error) => console.log('error in averageProbabilitiesAndRespondentsNotReached: ', error));
      return data;
    });

    deployment.update((data) => {
      const index = data.findIndex((tP) => tP.name == touchPoint.name);
      data[index] = setMaxValue.forData(data[index], $respondentsCountForStrategy, $populationCountForStrategy) || 1;
      return data;
    });

    deployment.update((data) => {
      const index = data.findIndex((tP) => tP.name == touchPoint.name);
      const reach = calculateResult.forTouchPoint(
        data[index],
        $respondentsCountForStrategy,
        $populationCountForStrategy
      );
      data[index].reach = reach;
      return data;
    });

    calculateReachAndOverlapForData();
  }

  function processValueForData(event: any) {
    // value already updated in component
    // 1. calculate reach per touchpoint for this touchpoint
    // 2. calculate reach and overlap
    const touchPoint: DeployedTouchPoint = event.detail;
    const reach = calculateResult.forTouchPoint(touchPoint, $respondentsCountForStrategy, $populationCountForStrategy);
    deployment.update((data) => {
      const index = data.findIndex((tP) => tP.name == touchPoint.name);
      data[index].reach = reach;
      return data;
    });
    calculateReachAndOverlapForData();
  }

  function processValueForFormula() {
    // value already updated in component
    // 1. calculate reach and overlap
    calculateReachAndOverlapForFormula();
  }

  function calculateReachAndOverlapForData() {
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
  }
  function calculateReachAndOverlapForFormula() {
    results.set(calculateResult.totalForFormula($deployment));
  }
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls
      on:changeDataSource={$marketData && $useForResults == 'data'
        ? processMarketContextForData
        : processMarketContextForFormula}
      on:changeMarket={$marketData && $useForResults == 'data'
        ? processMarketContextForData
        : processMarketContextForFormula}
      on:changeGender={processBriefingForData}
      on:changeAgeGroup={processBriefingForData}
    />
    <Output />
    {#each $deployment as touchPoint}
      <TouchPoint
        {touchPoint}
        on:changeInputType={processInputTypeForData}
        on:changeValue={marketData && $useForResults == 'data' ? processValueForData : processValueForFormula}
        on:submitValue={marketData && $useForResults == 'data' ? processValueForData : processValueForFormula}
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
