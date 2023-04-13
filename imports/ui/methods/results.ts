// imports
import {Meteor} from 'meteor/meteor';
import {get} from 'svelte/store';
import {
  ageGroups,
  ageGroupIndexEnd,
  ageGroupIndexStart,
  deployment,
  genders,
  marketName,
  results,
  userId
} from '../stores/reach';
import {DeployedTouchPoint} from '/imports/both/typings/types';

// variables
export default function createResults() {
  function forData() {
    Meteor.callAsync('strategies.calculateResultsWithData', {
      userId: get(userId),
      marketName: get(marketName),
      ageGroupIndexStart: get(ageGroupIndexStart),
      ageGroupIndexEnd: get(ageGroupIndexEnd),
      genders: get(genders),
      deployment: get(deployment),
      ageGroups: get(ageGroups)
    })
      .then((result) => {
        results.set(result);
      })
      .catch((error) => console.log('error in calculate results with data', error));
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

  return {forData, forFormula};
}
