// imports
// imports
import {INPUTTYPE} from '../../both/constants/constants';
import {DeployedTouchPoint, MaxValue} from '/imports/both/typings/types';

export default function createMaxValue() {
  function forData(
    touchPoint: DeployedTouchPoint,
    respondentsCountForStrategy: number,
    populationCountForStrategy: number
  ) {
    // for each deployed touchpoint only select respondents with a contact probability > 0
    const respondentsNotReachedForThisTouchPoint = touchPoint.respondentsNotReached || 0;
    let max = 1;
    if (touchPoint.inputTypeIndex == INPUTTYPE.Contacts || touchPoint.inputTypeIndex == INPUTTYPE.Impressions) {
      max =
        ((respondentsCountForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountForStrategy) *
        populationCountForStrategy *
        5;
    } else if (touchPoint.inputTypeIndex == INPUTTYPE.Grps) {
      max =
        (((respondentsCountForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountForStrategy) *
          populationCountForStrategy *
          5) /
        10000;
    } else if (touchPoint.inputTypeIndex == INPUTTYPE.Reach) {
      const maxReach =
        (respondentsCountForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountForStrategy;
      max = Math.max(maxReach, 1);
    }
    return Object.assign(touchPoint, {maxValue: max});
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
    return fallBackMaxValues;
  }

  return {forData, fallBack};
}
