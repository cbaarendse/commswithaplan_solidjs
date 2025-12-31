import {For, createEffect, onMount} from 'solid-js';
import {Meteor} from 'meteor/meteor';
import BreadCrumbs from '../../reusable/BreadCrumbs';
import Controls from './Controls';
import Output from './Output';
import TouchPoint from './TouchPoint';
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

export default function Reach() {
  const renew = createRenew();
  const setMaxValue = createMaxValue();
  const calculateResult = createResult();

  onMount(() => {
    if (!createdAt()) {
      createdAt.set(new Date());
    }
    if (!deployment()) {
      renew.forFormula();
    }
    processMarketContextForFormula();
  });

  createEffect(() => {
    sort(language());
  });

  // Functions
  async function processMarketContextForData() {
    renew.forData();
    const promises = deployment().map(async (touchPoint) =>
      await Meteor.callAsync('strategies.averageProbabilitiesAndNotReachedForTouchPoint', {
        userId: userId(),
        touchPoint: touchPoint
      })
    );
    await Promise.all(promises)
      .then((result) => deployment.set(result))
      .catch((error) => console.log('error in averageProbabilities... in processmarketcontextfordata: ', error));
    
    deployment.set(
      deployment().map((touchPoint) => {
        return setMaxValue.forData(touchPoint, respondentsCountForStrategy(), populationCountForStrategy());
      })
    );
  }

  function processMarketContextForFormula() {
    renew.forFormula();
    deployment.set(
      deployment().map((touchPoint) => {
        return Object.assign(touchPoint, {maxValue: 1});
      })
    );
  }

  async function processBriefingForData() {
    await processMarketContextForData();
    
    deployment.set(
      deployment().map((touchPoint) => {
        return Object.assign(touchPoint, {
          value:
            typeof touchPoint.maxValue === 'number'
              ? touchPoint.value > touchPoint.maxValue
                ? touchPoint.maxValue
                : touchPoint.value
              : 0
        });
      })
    );
    
    deployment.set(
      deployment().map((touchPoint) => {
        return Object.assign(touchPoint, {
          reach: calculateResult.forTouchPoint(
            touchPoint,
            respondentsCountForStrategy(),
            populationCountForStrategy()
          )
        });
      })
    );
    
    calculateReachAndOverlapForData();
  }

  async function processInputTypeForData(touchPoint: DeployedTouchPoint) {
    const data = [...deployment()];
    const index = data.findIndex((tP) => touchPoint.name === tP.name);
    
    try {
      const result = await Meteor.callAsync('strategies.averageProbabilitiesAndNotReachedForTouchPoint', {
        userId: userId(),
        touchPoint: data[index]
      });
      data[index] = result;
    } catch (error) {
      console.log('error in averageProbabilitiesAndRespondentsNotReached: ', error);
    }

    data[index] =
      setMaxValue.forData(data[index], respondentsCountForStrategy(), populationCountForStrategy()) || 1;
    const reach = calculateResult.forTouchPoint(
      data[index],
      respondentsCountForStrategy(),
      populationCountForStrategy()
    );
    data[index].reach = reach;
    
    deployment.set(data);
    calculateReachAndOverlapForData();
  }

  function processValueForData(touchPoint: DeployedTouchPoint) {
    const reach = calculateResult.forTouchPoint(
      touchPoint,
      respondentsCountForStrategy(),
      populationCountForStrategy()
    );
    const data = [...deployment()];
    const index = data.findIndex((tP) => tP.name === touchPoint.name);
    data[index].reach = reach;
    deployment.set(data);
    calculateReachAndOverlapForData();
  }

  function processValueForFormula() {
    calculateReachAndOverlapForFormula();
  }

  function calculateReachAndOverlapForData() {
    Meteor.callAsync('strategies.calculateReachAndOverlapWithData', {
      userId: userId(),
      deployment: deployment()
    })
      .then((result) => results.set(result))
      .catch((error) => console.log('error in strategies.calculateReachAndOverlapWithData in onSubmit: ', error));
  }

  function calculateReachAndOverlapForFormula() {
    results.set(calculateResult.totalForFormula(deployment()));
  }

  const handleReset = () => {
    renew.forFormula();
    processMarketContextForFormula();
  };

  return (
    <>
      <BreadCrumbs />
      <section>
        <div class="container">
          <Controls
            onChangeDataSource={
              marketData() && useForResults() === 'data' ? processMarketContextForData : processMarketContextForFormula
            }
            onChangeMarket={
              marketData() && useForResults() === 'data' ? processMarketContextForData : processMarketContextForFormula
            }
            onChangeGender={processBriefingForData}
            onChangeAgeGroup={processBriefingForData}
            onReset={handleReset}
          />
          <Output />
          <For each={deployment()}>
            {(touchPoint) => (
              <TouchPoint
                touchPoint={touchPoint}
                onChangeInputType={processInputTypeForData}
                onChangeValue={
                  marketData() && useForResults() === 'data' ? processValueForData : processValueForFormula
                }
                onSubmitValue={
                  marketData() && useForResults() === 'data' ? processValueForData : processValueForFormula
                }
              />
            )}
          </For>
        </div>
        <style>{`
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
        `}</style>
      </section>
    </>
  );
}
