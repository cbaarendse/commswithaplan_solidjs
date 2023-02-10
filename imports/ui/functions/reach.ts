// Reach
// imports
import type {
  TouchPointBasics,
  DeployedTouchPoint,
  Strategy,
  StrategyExtension,
  Market,
  Genders,
  Language
} from '../../both/typings/types';

// main function (IIFE closure)
const reachTool = (function createReachTool() {
  let strategy: Strategy & StrategyExtension;

  const defaultStrategyWithFormula: Strategy = {
    userId: '',
    title: 'New Strategy',
    marketName: 'nl',
    marketData: false,
    createdAt: new Date(),
    lastChanged: new Date(),
    deployment: deployTouchPointsForFormula(),
    sortedByName: true,
    overlap: 0,
    totalReach: 0
  };
  const defaultStrategyWithData: Strategy & StrategyExtension = {
    userId: '',
    title: 'New Strategy',
    marketName: 'nl',
    marketData: true,
    useMarketData: false,
    createdAt: new Date(),
    lastChanged: new Date(),
    deployment: deployTouchPointsForData(),
    sortedByName: true,
    overlap: 0,
    totalReach: 0,
    genders: setGenders(),
    ageStart: undefined,
    ageEnd: undefined,
    ageGroupStart: setAgeGroupsForMarket('nl')[0],
    ageGroupEnd: setAgeGroupsForMarket('nl')[0],
    peopleInRange: undefined,
    respondentsCount: undefined,
    reachedNonUnique: undefined,
    reachedUnique: undefined,
    companyId: undefined,
    brandName: undefined,
    productName: undefined
  };

  function setNewStrategyWithFormula(marketName: Market['name'], defaultStrategy: Strategy): void {
    defaultStrategy.marketName = marketName;
    defaultStrategy.marketData = false;
    defaultStrategy.deployment = deployTouchPointsForFormula();
    [defaultStrategy.totalReach, defaultStrategyWithFormula.overlap] = [0, 0];
    strategy = defaultStrategyWithFormula;
  }

  function setNewStrategyWithData(marketName: Market['name']): void {
    const ageGroupsForMarket = setAgeGroupsForMarket(marketName);
    defaultStrategyWithData.marketName = marketName;
    defaultStrategyWithData.marketData = true;
    defaultStrategyWithData.useMarketData = false;
    defaultStrategyWithData.deployment = deployTouchPointsForData();
    [defaultStrategyWithData.totalReach, defaultStrategyWithData.overlap] = [0, 0];
    defaultStrategyWithData.genders = genders;
    defaultStrategyWithData.ageGroupStart = ageGroupsForMarket[0];
    defaultStrategyWithData.ageGroupStart = ageGroupsForMarket[0];
    strategy = defaultStrategyWithData;
  }

  function deployTouchPointsForFormula(): void {
    strategy.deployment.map((touchPoint) => ({
      name: touchPoint.name,
      basics: touchPoint.basics,
      value: 0.0,
      show: true,
      inputType: 'reach'
    }));
  }

  function setDefaultInputType(touchPoint: DeployedTouchPoint, touchPointsInputTypes: {[key: string]: string[]}) {
    if (touchPointsInputTypes['contacts'].includes(touchPoint.name)) {
      return 'contacts';
    }
    if (touchPointsInputTypes['grps'].includes(touchPoint.name)) {
      return 'grps';
    }
    if (touchPointsInputTypes['impressions'].includes(touchPoint.name)) {
      return 'impressions';
    }
    if (touchPointsInputTypes['reach'].includes(touchPoint.name)) {
      return 'reach';
    }
  }

  function deployTouchPointsForData(touchPointsWithInputTypes: {[key: string]: string[]}): void {
    strategy.deployment.map((touchPoint) => ({
      name: touchPoint.name,
      basics: touchPoint.basics,
      value: 0.0,
      show: true,
      inputType: setDefaultInputType(touchPoint, touchPointsWithInputTypes)
    }));
  }

  function setRespondentsCount<T extends number | undefined>(input: T) {
    strategy.respondentsCount = input;
  }

  function setStrategy<S extends Strategy & StrategyExtension>(input: S): void {
    if (input) {
      strategy = input;
    }
  }

  function areAllTouchPointsValueZero(): boolean {
    return strategy.deployment.every((touchPoint) => touchPoint.value === 0);
  }

  function isShowAll(): boolean {
    return strategy.deployment.every((touchPoint) => touchPoint.show === true);
  }
  function isSortedByName(): boolean {
    return strategy.sortedByName;
  }
  // input

  // reset
  function setAllTouchPointsToZero(touchPoints: DeployedTouchPoint[]): DeployedTouchPoint[] {
    touchPoints.forEach((touchPoint) => (touchPoint.value = 0.0));
    return touchPoints;
  }

  function reset(language: Language) {
    if (!areAllTouchPointsValueZero()) {
      strategy.deployment = setAllTouchPointsToZero(strategy.deployment);
    } else {
      strategy.marketData
        ? setNewStrategyWithData(strategy.marketName || 'nl')
        : setNewStrategyWithFormula(strategy.marketName || 'nl');
      strategy.deployment = sortByName(strategy.deployment, language);
      strategy.sortedByName = true;
    }
    const results = [0, 0];
    [strategy.totalReach, strategy.overlap] = results;
  }

  // sort
  function sortByName(touchPoints: DeployedTouchPoint[], language: Language) {
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

  function sortByValue(touchPoints: DeployedTouchPoint[]) {
    return touchPoints.sort((a: DeployedTouchPoint, b: DeployedTouchPoint) => b.value - a.value);
  }

  function sort(language: Language): void {
    strategy.deployment = strategy.sortedByName
      ? sortByValue(strategy.deployment)
      : sortByName(strategy.deployment, language);
    strategy.sortedByName = isShowAll() && areAllTouchPointsValueZero() ? true : !strategy.sortedByName;
  }

  // hide - show
  function hide() {
    if (isShowAll() && !areAllTouchPointsValueZero()) {
      strategy.deployment.forEach((touchPoint: DeployedTouchPoint) => {
        if (touchPoint.value === 0) {
          touchPoint.show = false;
        }
      });
    } else if (!isShowAll() || areAllTouchPointsValueZero()) {
      strategy.deployment.forEach((touchPoint: DeployedTouchPoint) => (touchPoint.show = true));
    }
  }

  // results
  function updateDeployedTouchPoint(touchPointName: string, value: number): DeployedTouchPoint[] {
    const index: number = strategy.deployment.findIndex((touchPoint: DeployedTouchPoint): boolean => {
      return touchPoint.name === touchPointName;
    });
    const touchPointToUpdate: DeployedTouchPoint = strategy.deployment[index];
    touchPointToUpdate.value = value;
    strategy.deployment.splice(index, 1, touchPointToUpdate);
    return strategy.deployment;
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
  function calculateResults(): [number, number] {
    const totalReach = calculateTotalReach(strategy.deployment);
    const overlap = calculateOverlap(strategy.deployment);
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
  function getStrategy(): Strategy & StrategyExtension {
    return strategy;
  }

  function setAgeGroupsForMarket(marketName: Market['name'], markets: Market[]) {
    return markets.find((item: Market) => item.name == marketName)?.ageGroups;
  }

  return {
    getStrategy,
    setAgeGroupsForMarket,
    setNewStrategyWithFormula,
    setNewStrategyWithData,
    setRespondentsCount,
    setStrategy,
    calculateResults,
    areAllTouchPointsValueZero,
    reset,
    sort,
    hide,
    isShowAll,
    isSortedByName,
    updateDeployedTouchPoint
  };
})();

export default reachTool;
