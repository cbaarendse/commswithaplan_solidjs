// Reach
// imports
import {TouchPointDefinition, DeployedTouchPoint, Market} from '../../both/typings/types';
import {INPUTTYPE} from '../../both/constants/constants';

// main function (IIFE closure)
export default function createReachTool() {
  function areAllTouchPointsValueZero(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.value === 0);
  }

  function isShowAll(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.show === true);
  }

  // hide - show
  function hide(touchPoints: DeployedTouchPoint[]): DeployedTouchPoint[] {
    if (isShowAll(touchPoints) && !areAllTouchPointsValueZero(touchPoints)) {
      return touchPoints.map((touchPoint: DeployedTouchPoint) => {
        touchPoint.value === 0 ? (touchPoint.show = false) : (touchPoint.show = true);
        return touchPoint;
      });
    } else if (!isShowAll(touchPoints) || areAllTouchPointsValueZero(touchPoints)) {
      return touchPoints.map((touchPoint: DeployedTouchPoint) => {
        touchPoint.show = true;
        return touchPoint;
      });
    }
    return touchPoints;
  }

  function getAgeGroupsForMarket(marketName: Market['name'], markets: Market[]) {
    return markets.filter((item: Market) => item.name == marketName)[0].ageGroups;
  }

  function touchPointsForDeployment(touchPointsDefinitions: TouchPointDefinition[]): DeployedTouchPoint[] {
    console.log('touchPointsForFormula called');
    const touchPointsForDeployment: DeployedTouchPoint[] = [];
    for (let index = 0; index < touchPointsDefinitions.length; index++) {
      const touchPointDefinition = touchPointsDefinitions[index];
      const touchPointForDeployment: DeployedTouchPoint = {
        name: touchPointDefinition.name,
        definitions: touchPointDefinition.definitions,
        defaultInputTypeIndex: touchPointDefinition.defaultInputTypeIndex,
        value: 0.0,
        show: true,
        inputTypeIndex: INPUTTYPE.Reach
      };
      touchPointsForDeployment.push(touchPointForDeployment);
    }
    console.log('deployedTouchPoints constructed for formula: ', touchPointsForDeployment);
    return touchPointsForDeployment;
  }

  return {
    areAllTouchPointsValueZero,
    getAgeGroupsForMarket,
    hide,
    isShowAll,
    touchPointsForDeployment
  };
}
