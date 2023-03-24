// Reach
// imports
import {TouchPointDefinition, DeployedTouchPoint, Market, Results, InputType, Strategy} from '../../both/typings/types';

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

  // results
  function calculateTotalReach(touchPoints: DeployedTouchPoint[]): number {
    let totalReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
      const r = touchPoint.value;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    return totalReachPortion;
  }

  function calculateOverlap(touchPoints: DeployedTouchPoint[]): number {
    let duplicateReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
      if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
        const r = touchPoint.value;
        duplicateReachPortion *= r;
      }
      if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
        duplicateReachPortion = touchPoint.value;
      }
    }
    return duplicateReachPortion;
  }
  function calculateResults(touchPoints: DeployedTouchPoint[]): Results {
    const totalReach = calculateTotalReach(touchPoints);
    const overlap = calculateOverlap(touchPoints);
    return [totalReach, overlap];
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
        inputTypeIndex: InputType.Reach
      };
      touchPointsForDeployment.push(touchPointForDeployment);
    }
    console.log('deployedTouchPoints constructed for formula: ', touchPointsForDeployment);
    return touchPointsForDeployment;
  }

  function makeNewBriefing(marketName: Strategy['marketName']): Omit<Strategy, 'deployment'> {
    return {
      marketName: marketName,
      useMarketData: undefined,
      userId: '',
      title: 'New Strategy',
      createdAt: new Date(),
      lastChanged: new Date(),
      genders: undefined,
      ageGroupIndexStart: undefined,
      ageGroupIndexEnd: undefined,
      companyId: undefined,
      brandName: undefined,
      productName: undefined
    };
  }

  return {
    areAllTouchPointsValueZero,
    calculateResults,
    getAgeGroupsForMarket,
    hide,
    isShowAll,
    makeNewBriefing,
    touchPointsForDeployment
  };
}
