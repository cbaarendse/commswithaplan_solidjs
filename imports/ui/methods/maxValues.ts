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
  maxValues,
  userId
} from '../stores/reach';
import {INPUTTYPE} from '../../both/constants/constants';

export default function createMaxValues() {
  function forData() {
    console.log('setMaxValues runs with: ');
    console.log({
      userId: get(userId),
      marketName: get(marketName),
      ageGroupIndexStart: get(ageGroupIndexStart),
      ageGroupIndexEnd: get(ageGroupIndexEnd),
      genders: get(genders),
      deployment: get(deployment),
      ageGroups: get(ageGroups)
    });

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
          maxValues.set(fallBack());
        }
      });
  }

  function fallBack() {
    const maxValues: {[key: string]: number} = {};
    get(deployment).forEach((touchPoint) => {
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

  function forFormula() {
    const maxValues: {[key: string]: number} = {};
    get(deployment).forEach((touchPoint) => (maxValues[touchPoint.name] = 100));
    return maxValues;
  }

  return {forData, fallBack, forFormula};
}
