// imports
import {Meteor} from 'meteor/meteor';
import {get} from 'svelte/store';
import {
  averageProbabilities,
  deployment,
  populationCountForStrategy,
  respondentsCountForStrategy,
  respondentsNotReached,
  results,
  userId
} from '../stores/reach';
import {DeployedTouchPoint, TouchPointName} from '/imports/both/typings/types';
import {INPUTTYPE} from '/imports/both/constants/constants';

// variables
export default function createResult() {
  function forTouchPoint(touchPoint: TouchPointName, value: number, inputType: number) {
    const averageProbability = get(averageProbabilities).find((item) => item.touchPoint === touchPoint)?.probability;
    const notReached = get(respondentsNotReached).find((item) => item.touchPoint === touchPoint)?.respondents;
    // formula (1-notReached) * (1-EXP (-averageProbability * contacts/impressions/GRPs))
    if (averageProbability && notReached) {
      if (inputType == INPUTTYPE.Contacts && inputType == INPUTTYPE.Impressions) {
        const reachedPopulation =
          (1 - notReached / get(respondentsCountForStrategy)) * (1 - Math.pow(Math.E, averageProbability * value));
        const reach = reachedPopulation / get(populationCountForStrategy);
        return reach;
      }
      if (inputType == INPUTTYPE.Grps) {
        const reach =
          (1 - notReached / get(respondentsCountForStrategy)) * (1 - Math.pow(Math.E, averageProbability * value));
        return reach;
      }
      if (inputType == INPUTTYPE.Reach) {
        const reach = value;
        return reach;
      }
    } else {
      return 0;
    }
  }

  async function forData() {
    try {
      results.set(
        await Meteor.callAsync('strategies.calculateResultsWithData', {
          userId: get(userId),
          deployment: get(deployment),
          averageProbabilities: get(averageProbabilities)
        })
      );
    } catch (error) {
      console.log('error in calculate results with data', error);
    }
  }

  function forFormula(): void {
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

  return {forTouchPoint, forData, forFormula};
}
