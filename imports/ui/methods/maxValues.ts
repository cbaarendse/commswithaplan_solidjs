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
  respondentsReady,
  useMarketData,
  userId
} from '../stores/reach';
import {DeployedTouchPoint} from '/imports/both/typings/types';
import {INPUTTYPE} from '../../both/constants/constants';

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

  if (get(marketData) && get(useMarketData) && get(respondentsReady)) {
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
      case INPUTTYPE.Impressions:
        maxValues[touchPoint.name] = 4_000_000;
        break;
      case INPUTTYPE.Contacts:
        maxValues[touchPoint.name] = 4_000_000;
        break;
      case INPUTTYPE.Grps:
        maxValues[touchPoint.name] = 3_000;
        break;
      case INPUTTYPE.Reach:
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
