// imports
// imports
import {maxValues} from '../stores/reach';
import {INPUTTYPE} from '../../both/constants/constants';
import {DeployedTouchPoint, MaxValue, TouchPointName} from '/imports/both/typings/types';

export default function createMaxValues() {
  function forData(
    touchPointsDeployed: DeployedTouchPoint[],
    populationCountForStrategy: number,
    respondentsCountForStrategy: number
  ) {
    const maxValuesForData: {touchPoint: TouchPointName; max: number}[] = [];
    // for each deployed touchpoint only select respondents with a contact probability > 0
    touchPointsDeployed.forEach((touchPoint) => {
      const touchPointName = touchPoint.name;
      const respondentsNotReachedForThisTouchPoint =
        touchPointsDeployed.filter((item) => item.name === touchPointName)[0].respondents || 0;
      console.log('respondentsNotReachedForThisTouchPoint: ', respondentsNotReachedForThisTouchPoint);

      const maxForTouchPoint = {touchPoint: touchPoint.name, max: 1};
      if (touchPoint.inputTypeIndex == INPUTTYPE.Contacts || touchPoint.inputTypeIndex == INPUTTYPE.Impressions) {
        maxForTouchPoint.max =
          ((respondentsCountForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountForStrategy) *
          populationCountForStrategy *
          5;
        console.log(
          respondentsCountForStrategy,
          respondentsNotReachedForThisTouchPoint,
          respondentsCountForStrategy,
          populationCountForStrategy
        );

        console.log('maxForTouchPoint if contacts / impressions for: ', touchPointName, ' == ', maxForTouchPoint.max);
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Grps) {
        maxForTouchPoint.max =
          (((respondentsCountForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountForStrategy) *
            populationCountForStrategy *
            5) /
          10000;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Reach) {
        const maxReach =
          (respondentsCountForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountForStrategy;
        maxForTouchPoint.max = Math.max(maxReach, 1);
      }
      maxValuesForData.push(maxForTouchPoint);
    });
    maxValues.set(maxValuesForData);
  }

  function fallBack(touchPointsDeployed: DeployedTouchPoint[]) {
    const fallBackMaxValues: MaxValue[] = [];
    touchPointsDeployed.forEach((touchPoint) => {
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

  function forFormula(touchPointsDeployed: DeployedTouchPoint[]) {
    const maxValuesForFormula: MaxValue[] = [];
    touchPointsDeployed.forEach((touchPoint: DeployedTouchPoint) =>
      maxValuesForFormula.push({touchPoint: touchPoint.name, max: 1})
    );
    maxValues.set(maxValuesForFormula);
  }

  return {forData, fallBack, forFormula};
}
