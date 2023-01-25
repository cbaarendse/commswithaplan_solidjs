// Reach
// imports
import type {TouchPointBasics, DeployedTouchPoint, Strategy, Market} from '../typings/types';
import {Mongo} from 'meteor/mongo';

// class
export function createStrategy(
  title: string,
  market: Market,
  touchPointsBasics: TouchPointBasics[],
  user?: string | Mongo.ObjectID
) {
  const defaultStrategy: Strategy = {
    title: title,
    market: market,
    marketData: undefined,
    createdAt: new Date(),
    lastChanged: new Date(),
    deployment: setTouchPointsForPlan(touchPointsBasics),
    overlap: 0,
    totalReach: 0,
    // Only required when marketData (population & probabilities) true
    userId: user,
    ageStart: undefined,
    ageEnd: undefined,
    ageGroupStart: undefined,
    ageGroupEnd: undefined,
    genders: undefined,
    peopleInAgeRange: undefined,
    respondentsCount: undefined,
    reachedNonUnique: undefined,
    reachedUnique: undefined,
    companyId: undefined,
    brand: undefined,
    product: undefined
  };

  function setStrategy() {
    return defaultStrategy;
  }

  function setTouchPointsForPlan(touchPointsBasics: TouchPointBasics[]): DeployedTouchPoint[] {
    return touchPointsBasics.map(
      (touchPointBasics): DeployedTouchPoint => ({...touchPointBasics, value: 0.0, show: true})
    );
  }

  function areAllTouchPointsValueZero(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.value === 0);
  }

  // input

  // reset
  function setAllTouchPointsToZero(touchPoints: DeployedTouchPoint[]): DeployedTouchPoint[] {
    touchPoints.forEach((touchPoint) => (touchPoint.value = 0.0));
    return touchPoints;
  }

  // sort
  function sortByName(touchPoints: DeployedTouchPoint[], language: string) {
    return touchPoints.sort((a: TouchPointBasics, b: TouchPointBasics) => {
      const basicsOfTouchPointA = a.basics.find((item) => item.language == language);
      const basicsOfTouchPointB = b.basics.find((item) => item.language == language);
      if (basicsOfTouchPointA && basicsOfTouchPointB) {
        if (basicsOfTouchPointA.displayName > basicsOfTouchPointB.displayName) {
          return 1;
        }
        if (basicsOfTouchPointA.displayName < basicsOfTouchPointB.displayName) {
          return -1;
        }
      }
      return 0;
    });
  }

  function sortByReach(touchPoints: DeployedTouchPoint[]) {
    return touchPoints.sort((a: DeployedTouchPoint, b: DeployedTouchPoint) => b.value - a.value);
  }

  // hide
  function hide(touchPoints: DeployedTouchPoint[]) {
    touchPoints.forEach((touchPoint) => {
      if (touchPoint.value === 0) {
        touchPoint.show = false;
      }
    });
    return touchPoints;
  }

  function show(touchPoints: DeployedTouchPoint[]) {
    touchPoints.forEach((touchPoint) => (touchPoint.show = true));
    return touchPoints;
  }

  function isShowAll(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.show === true);
  }

  // results
  function updateDeployedTouchPoint(
    touchPointName: string,
    value: number,
    touchPoints: DeployedTouchPoint[]
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
  function setDefaultInputType(touchPointName: string): string {
    if (
      ['asset', 'cinema', 'outdoor', 'pr', 'promotion', 'television', 'radio', 'sponsorship'].indexOf(
        touchPointName
      ) !== -1
    ) {
      return 'contacts'; // This defaultinputtype could be "grps" as well
    }
    if (
      [
        'advocacy',
        'app',
        'console_game',
        'display',
        'e_mail',
        'mobile',
        'social',
        'video_on_demand',
        'viral',
        'website',
        'sem',
        'seo'
      ].indexOf(touchPointName) !== -1
    ) {
      return 'impressions';
    }
    if (
      [
        'ambassador',
        'direct_mail',
        'door_drop',
        'event',
        'experiential',
        'internal_employee',
        'loyalty_crm',
        'magazines',
        'newspapers',
        'trade_fair',
        'packaging',
        'shopper',
        'word_of_mouth'
      ].indexOf(touchPointName) !== -1
    ) {
      return 'contacts';
    }
    return 'contacts';
  }
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

  return {
    setStrategy,
    calculateResults,
    areAllTouchPointsValueZero,
    setAllTouchPointsToZero,
    sortByName,
    sortByReach,
    hide,
    show,
    isShowAll,
    updateDeployedTouchPoint
  };
}
