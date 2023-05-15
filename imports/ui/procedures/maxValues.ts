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
import {DeployedTouchPoint, MaxValue, RespondentOutcome, TouchPointName} from '/imports/both/typings/types';

export default function createMaxValues() {
  function setMaxValues(
    touchPoints: DeployedTouchPoint[],
    respondentsNotReached: {touchPoint: TouchPointName; respondents: number}[],
    populationCount: number,
    respondentsCountedForStrategy: number
  ) {
    // population for selected age / gender combination

    const maxValues: {touchPoint: TouchPointName; max: number}[] = [];
    // for each deployed touchpoint only select respondents with a contact probability > 0
    touchPoints.forEach((touchPoint) => {
      const touchPointName = touchPoint.name;
      const respondentsNotReachedForThisTouchPoint = respondentsNotReached.filter(
        (item) => item.touchPoint === touchPointName
      )[0].respondents;
      const maxForTouchPoint = {touchPoint: touchPoint.name, max: 1};
      if (touchPoint.inputTypeIndex == INPUTTYPE.Contacts || touchPoint.inputTypeIndex == INPUTTYPE.Impressions) {
        maxForTouchPoint.max =
          ((respondentsCountedForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountedForStrategy) *
          populationCount *
          5;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Grps) {
        maxForTouchPoint.max =
          (((respondentsCountedForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountedForStrategy) *
            populationCount *
            5) /
          10000;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Reach) {
        const maxReach =
          (respondentsCountedForStrategy - respondentsNotReachedForThisTouchPoint) / respondentsCountedForStrategy;
        maxForTouchPoint.max = Math.max(maxReach, 1);
      }
      maxValues.push(maxForTouchPoint);
    });
    return maxValues;
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

  return {setMaxValues, fallBack, forFormula};
}

async function forData() {
  try {
    maxValues.set(
      await Meteor.callAsync('strategies.maxValuesForTouchPoints', {
        userId: get(userId),
        marketName: get(marketName),
        ageGroupIndexStart: get(ageGroupIndexStart),
        ageGroupIndexEnd: get(ageGroupIndexEnd),
        genders: get(genders),
        deployment: get(deployment),
        ageGroups: get(ageGroups)
      })
    );
  } catch (error) {
    if (error) {
      console.log('error in max values: ', error);
      fallBack();
    }
  }
}
