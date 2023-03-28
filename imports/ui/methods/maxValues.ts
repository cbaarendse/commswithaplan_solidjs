// imports
import {Meteor} from 'meteor/meteor';
import {get} from 'svelte/store';
import {
  ageGroups,
  ageGroupIndexEnd,
  ageGroupIndexStart,
  deployment,
  genders,
  marketData,
  marketName,
  maxValues,
  useMarketData,
  userId
} from '../stores/reach';
import {DeployedTouchPoint, InputType} from '/imports/both/typings/types';

export default function adaptMaxValues() {
  console.log('adaptMaxValues runs with: ');
  console.log({
    userId: get(userId),
    marketName: get(marketName),
    ageGroupIndexStart: get(ageGroupIndexStart),
    ageGroupIndexEnd: get(ageGroupIndexEnd),
    genders: get(genders),
    deployment: get(deployment),
    ageGroups: get(ageGroups)
  });

  if (get(marketData) && get(useMarketData)) {
    Meteor.callAsync('strategies.maxValuesForTouchPoints', {
      userId: get(userId),
      marketName: get(marketName),
      ageGroupIndexStart: get(ageGroupIndexStart),
      ageGroupIndexEnd: get(ageGroupIndexEnd),
      genders: get(genders),
      deployment: get(deployment),
      ageGroups: get(ageGroups)
    })
      .then((result) => {
        if (result) {
          maxValues.set(result);
        }
      })
      .catch((error) => {
        if (error) {
          console.log('error in max values: ', error);
          maxValues.set(setMaxValuesFallBack(get(deployment)));
        }
      });
  } else {
    maxValues.set(setMaxValues(get(deployment)));
  }
}

function setMaxValuesFallBack(touchPoints: DeployedTouchPoint[]) {
  const maxValues: {[key: string]: number} = {};
  touchPoints.forEach((touchPoint) => {
    switch (touchPoint.inputTypeIndex) {
      case InputType.Impressions:
        maxValues[touchPoint.name] = 4_000_000;
        break;
      case InputType.Contacts:
        maxValues[touchPoint.name] = 4_000_000;
        break;
      case InputType.Grps:
        maxValues[touchPoint.name] = 3_000;
        break;
      case InputType.Reach:
        maxValues[touchPoint.name] = 100;
        break;
      default:
        maxValues[touchPoint.name] = 100;
    }
  });
  return maxValues;
}

function setMaxValues(touchPoints: DeployedTouchPoint[]) {
  const maxValues: {[key: string]: number} = {};
  touchPoints.forEach((touchPoint) => (maxValues[touchPoint.name] = 100));
  return maxValues;
}
