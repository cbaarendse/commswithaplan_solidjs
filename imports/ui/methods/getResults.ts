// imports
import {Meteor} from 'meteor/meteor';
import createReachTool from '../functions/reach';
import {get} from 'svelte/store';
import {
  ageGroups,
  ageGroupIndexEnd,
  ageGroupIndexStart,
  deployment,
  genders,
  marketData,
  marketName,
  results,
  useMarketData,
  userId
} from '../stores/reach';
import {DeployedTouchPoint, Results} from '/imports/both/typings/types';

// variables

export default function getResults() {
  if (get(marketData) && get(useMarketData)) {
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
  } else {
    results.set(calculateResults(get(deployment)));
  }
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
