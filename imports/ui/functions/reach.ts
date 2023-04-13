// Reach
// imports
import {DeployedTouchPoint, Market} from '../../both/typings/types';

// main function (IIFE closure)
export default function createReachTool() {
  function areAllTouchPointsValueZero(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.value === 0);
  }

  function isShowAll(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.show === true);
  }

  function getAgeGroupsForMarket(marketName: Market['name'], markets: Market[]) {
    return markets.filter((item: Market) => item.name == marketName)[0].ageGroups;
  }

  return {
    areAllTouchPointsValueZero,
    getAgeGroupsForMarket,

    isShowAll
  };
}
