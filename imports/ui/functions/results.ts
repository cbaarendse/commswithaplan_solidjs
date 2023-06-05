// imports
import {DeployedTouchPoint, Results} from '/imports/both/typings/types';
import {INPUTTYPE} from '/imports/both/constants/constants';

// variables
export default function createResult() {
  function forTouchPoint(
    touchPoint: DeployedTouchPoint,
    respondentsCountForStrategy: number,
    populationCountForStrategy: number
  ) {
    const averageProbability = touchPoint.averageProbability;
    const notReached = touchPoint.respondentsNotReached;
    const inputTypeIndex = touchPoint.inputTypeIndex;
    const value = touchPoint.value;
    // formula (1-notReached) * (1-EXP (-averageProbability * contacts/impressions/GRPs))
    console.log('input result.forTouchPoint: ', touchPoint, respondentsCountForStrategy, populationCountForStrategy);

    if (averageProbability && notReached) {
      if (inputTypeIndex == INPUTTYPE.Contacts || inputTypeIndex == INPUTTYPE.Impressions) {
        const reachedPopulation =
          (1 - notReached / respondentsCountForStrategy) * (1 - Math.pow(Math.E, averageProbability * value));
        const reach = reachedPopulation / populationCountForStrategy;
        console.log('output result.forTouchPoint for impressions and contacts: ', reachedPopulation, reach);
        return reach;
      }

      if (inputTypeIndex == INPUTTYPE.Grps) {
        const reach =
          (1 - notReached / respondentsCountForStrategy) * (1 - Math.pow(Math.E, averageProbability * value));
        console.log('output result.forTouchPoint for GRPs: ', reach);
        return reach;
      }

      if (inputTypeIndex == INPUTTYPE.Reach) {
        const reach = value;
        console.log('output result.forTouchPoint reach: ', reach);
        return reach;
      }
    } else {
      console.log('output result.forTouchPoint all failed: ', 0);
      return 0;
    }
  }

  function totalForFormula(touchPoints: DeployedTouchPoint[]): Results {
    const totalReach = calculateTotalReach(touchPoints);
    const overlap = calculateOverlap(touchPoints);
    return [totalReach, overlap];
  }

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

  return {forTouchPoint, totalForFormula};
}
