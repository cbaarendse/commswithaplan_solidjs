// Reach
// imports
import type {TouchPointDefinition, DeployedTouchPoint, Market, Language} from '../../both/typings/types';

// main function (IIFE closure)
export default function createReachTool() {
  function setDefaultInputType(
    touchPointName: DeployedTouchPoint['name'],
    touchPointsInputTypes: {[key: string]: string[]}
  ) {
    if (touchPointsInputTypes['contacts'].includes(touchPointName)) {
      return 'contacts';
    }
    if (touchPointsInputTypes['grps'].includes(touchPointName)) {
      return 'grps';
    }
    if (touchPointsInputTypes['impressions'].includes(touchPointName)) {
      return 'impressions';
    }
    if (touchPointsInputTypes['reach'].includes(touchPointName)) {
      return 'reach';
    }
    return 'contacts';
  }

  function deployTouchPointsForData(
    touchPoints: TouchPointDefinition[],
    touchPointsForInputTypes: {[key: string]: string[]}
  ): DeployedTouchPoint[] {
    return touchPoints.map((touchPoint) => ({
      ...touchPoint,
      value: 0.0,
      show: true,
      inputType: setDefaultInputType(touchPoint.name, touchPointsForInputTypes)
    }));
  }

  function areAllTouchPointsValueZero(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.value === 0);
  }

  function isShowAll(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.show === true);
  }

  // reset
  function setAllTouchPointsToZero(touchPoints: DeployedTouchPoint[]): DeployedTouchPoint[] {
    touchPoints.forEach((touchPoint) => (touchPoint.value = 0.0));
    return touchPoints;
  }

  // sort
  function sortByName(touchPoints: DeployedTouchPoint[], language: Language) {
    return touchPoints.sort((a: TouchPointDefinition, b: TouchPointDefinition) => {
      const definitionOfTouchPointA = a.definitions.find((definition) => definition.language == language);
      const definitionOfTouchPointB = b.definitions.find((definition) => definition.language == language);
      if (definitionOfTouchPointA && definitionOfTouchPointB) {
        if (definitionOfTouchPointA.displayName > definitionOfTouchPointB.displayName) {
          return 1;
        }
        if (definitionOfTouchPointA.displayName < definitionOfTouchPointB.displayName) {
          return -1;
        }
      }
      return 0;
    });
  }

  function sortByValue(touchPoints: DeployedTouchPoint[]) {
    return touchPoints.sort((a: DeployedTouchPoint, b: DeployedTouchPoint) => b.value - a.value);
  }

  function sort(
    touchPoints: DeployedTouchPoint[],
    sortedByName: boolean,
    language: Language
  ): [DeployedTouchPoint[], boolean] {
    sortedByName ? sortByValue(touchPoints) : sortByName(touchPoints, language);
    sortedByName = isShowAll(touchPoints) && areAllTouchPointsValueZero(touchPoints) ? true : !sortedByName;
    return [touchPoints, sortedByName];
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
  function updateDeployedTouchPoint(
    touchPoints: DeployedTouchPoint[],
    touchPointName: string,
    value: number
  ): DeployedTouchPoint[] {
    const index: number = touchPoints.findIndex((touchPoint: DeployedTouchPoint): boolean => {
      return touchPoint.name === touchPointName;
    });
    const touchPointToUpdate: DeployedTouchPoint = touchPoints[index];
    touchPointToUpdate.value = value;
    touchPoints.splice(index, 1, touchPointToUpdate);
    return touchPoints;
  }

  function calculateTotalReach(touchPoints: DeployedTouchPoint[]): number {
    let totalReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
      const r = touchPoint.value / 100;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    return 100 * totalReachPortion;
  }

  function calculateOverlap(touchPoints: DeployedTouchPoint[]): number {
    let duplicateReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
      if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
        const r = touchPoint.value / 100;
        duplicateReachPortion *= r;
      }
      if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
        duplicateReachPortion = touchPoint.value / 100;
      }
    }
    return 100 * duplicateReachPortion;
  }
  function calculateResults(touchPoints: DeployedTouchPoint[]): [number, number] {
    const totalReach = calculateTotalReach(touchPoints);
    const overlap = calculateOverlap(touchPoints);
    return [totalReach, overlap];
  }

  // Reach with data
  function findObjectAndProject(
    input: number | string,
    searchKey: string,
    collection: [],
    projectKey1: string,
    projectKey2: string
  ): number | string {
    const thisObject = collection.find((element) => element[searchKey] === input);
    if (thisObject === undefined) {
      throw new TypeError('No outcome for thisObject with 1 key.');
    }
    if (typeof projectKey2 === 'undefined') {
      return thisObject[projectKey1];
    } else {
      return thisObject[projectKey1][projectKey2];
    }
  }

  function getAgeGroupsForMarket(marketName: Market['name'], markets: Market[]) {
    return markets.filter((item: Market) => item.name == marketName)[0].ageGroups;
  }

  return {
    getAgeGroupsForMarket,
    calculateResults,
    areAllTouchPointsValueZero,
    setAllTouchPointsToZero,
    sort,
    hide,
    isShowAll,
    deployTouchPointsForData,
    deployTouchPointsForFormula,
    setDefaultInputType,
    updateDeployedTouchPoint
  };
}
