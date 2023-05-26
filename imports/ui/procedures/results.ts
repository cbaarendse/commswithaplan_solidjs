// imports
import {Meteor} from 'meteor/meteor';
import {get} from 'svelte/store';
import {deployment, populationCountForStrategy, respondentsCountForStrategy, results, userId} from '../stores/reach';
import {DeployedTouchPoint} from '/imports/both/typings/types';
import {INPUTTYPE} from '/imports/both/constants/constants';

// variables
export default function createResult() {
  function forTouchPoint(touchPoint: DeployedTouchPoint) {
    const averageProbability = touchPoint.avarageProbability;
    const notReached = touchPoint.respondentsNotReached;
    const inputTypeIndex = touchPoint.inputTypeIndex;
    const value = touchPoint.value;
    // formula (1-notReached) * (1-EXP (-averageProbability * contacts/impressions/GRPs))
    if (averageProbability && notReached) {
      if (inputTypeIndex == INPUTTYPE.Contacts && inputTypeIndex == INPUTTYPE.Impressions) {
        const reachedPopulation =
          (1 - notReached / get(respondentsCountForStrategy)) * (1 - Math.pow(Math.E, averageProbability * value));
        const reach = reachedPopulation / get(populationCountForStrategy);
        return reach;
      }
      if (inputTypeIndex == INPUTTYPE.Grps) {
        const reach =
          (1 - notReached / get(respondentsCountForStrategy)) * (1 - Math.pow(Math.E, averageProbability * value));
        return reach;
      }
      if (inputTypeIndex == INPUTTYPE.Reach) {
        const reach = value;
        return reach;
      }
    } else {
      return 0;
    }
  }

  async function totalForData() {
    try {
      results.set(
        await Meteor.callAsync('strategies.calculateResultsWithData', {
          userId: get(userId),
          deployment: get(deployment)
        })
      );
    } catch (error) {
      console.log('error in calculate results with data', error);
    }
  }

  function totalForFormula(): void {
    const totalReach = calculateTotalReach(get(deployment));
    const overlap = calculateOverlap(get(deployment));
    results.set([totalReach, overlap]);
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

  return {forTouchPoint, totalForData, totalForFormula};
}
