// imports
// imports
import {get} from 'svelte/store';
import {
  deployment,
  maxValues,
  populationCountForStrategy,
  respondentsCountForStrategy,
  respondentsNotReached
} from '../stores/reach';
import {INPUTTYPE} from '../../both/constants/constants';
import {DeployedTouchPoint, MaxValue, TouchPointName} from '/imports/both/typings/types';

export default function createMaxValues() {
  async function forData() {
    const maxValuesForData: {touchPoint: TouchPointName; max: number}[] = [];
    // for each deployed touchpoint only select respondents with a contact probability > 0
    get(deployment).forEach((touchPoint) => {
      const touchPointName = touchPoint.name;
      console.log('get(respondentsNotReached) in maxValuesForData: ', get(respondentsNotReached));

      const respondentsNotReachedForThisTouchPoint =
        get(respondentsNotReached).filter((item) => item.touchPoint === touchPointName)[0].respondents || 0;
      const maxForTouchPoint = {touchPoint: touchPoint.name, max: 1};
      if (touchPoint.inputTypeIndex == INPUTTYPE.Contacts || touchPoint.inputTypeIndex == INPUTTYPE.Impressions) {
        maxForTouchPoint.max =
          ((get(respondentsCountForStrategy) - respondentsNotReachedForThisTouchPoint) /
            get(respondentsCountForStrategy)) *
          get(populationCountForStrategy) *
          5;
        //TODO: respondentsNotReached Forthistouchpoint is always 0
        console.log(
          get(respondentsCountForStrategy),
          respondentsNotReachedForThisTouchPoint,
          get(respondentsCountForStrategy),
          get(populationCountForStrategy)
        );

        console.log('maxForTouchPoint if contacts / impressions for: ', touchPointName, ' == ', maxForTouchPoint.max);
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Grps) {
        maxForTouchPoint.max =
          (((get(respondentsCountForStrategy) - respondentsNotReachedForThisTouchPoint) /
            get(respondentsCountForStrategy)) *
            get(populationCountForStrategy) *
            5) /
          10000;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Reach) {
        const maxReach =
          (get(respondentsCountForStrategy) - respondentsNotReachedForThisTouchPoint) /
          get(respondentsCountForStrategy);
        maxForTouchPoint.max = Math.max(maxReach, 1);
      }
      maxValuesForData.push(maxForTouchPoint);
    });
    maxValues.set(maxValuesForData);
  }

  function fallBack() {
    const fallBackMaxValues: MaxValue[] = [];
    get(deployment).forEach((touchPoint) => {
      const fallBackMaxValue: MaxValue = {};
      switch (touchPoint.inputTypeIndex) {
        case INPUTTYPE.Impressions:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 4_000_000;
          break;
        case INPUTTYPE.Contacts:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 4_000_000;
          break;
        case INPUTTYPE.Grps:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 3_000;
          break;
        case INPUTTYPE.Reach:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 1;
          break;
        default:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 1;
      }
    });
    maxValues.set(fallBackMaxValues);
  }

  function forFormula() {
    const maxValuesForFormula: MaxValue[] = [];
    const touchPointsDeployed: DeployedTouchPoint[] = get(deployment);
    touchPointsDeployed.forEach((touchPoint) => maxValuesForFormula.push({touchPoint: touchPoint.name, max: 1}));
    maxValues.set(maxValuesForFormula);
  }

  return {forData, fallBack, forFormula};
}
