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
import {DeployedTouchPoint, MaxValue} from '/imports/both/typings/types';

export default function createMaxValues() {
  function forData() {
    console.log('setMaxValues.forData runs with: ');
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
          fallBack();
        }
      });
  }

  function fallBack() {
    const fallBackMaxValues: MaxValue[] = [];
    get(deployment).forEach((touchPoint) => {
      const fallBackMaxValue: MaxValue = {};
      switch (touchPoint.inputTypeIndex) {
        case INPUTTYPE.Impressions:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 4_000_000;
          break;
        case INPUTTYPE.Contacts:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 4_000_000;
          break;
        case INPUTTYPE.Grps:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 3_000;
          break;
        case INPUTTYPE.Reach:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 1;
          break;
        default:
          fallBackMaxValue.touchPoint = touchPoint.name;
          fallBackMaxValue.max = 1;
      }
    });
    maxValues.set(fallBackMaxValues);
  }

  function forFormula() {
    const maxValuesForFormula: MaxValue[] = [];
    const touchPointsDeployed: DeployedTouchPoint[] = get(deployment);
    touchPointsDeployed.forEach((touchPoint) => maxValuesForFormula.push({touchPoint: touchPoint.name, max: 1}));
    maxValues.set(maxValuesForFormula);
  }

  return {forData, fallBack, forFormula};
}
