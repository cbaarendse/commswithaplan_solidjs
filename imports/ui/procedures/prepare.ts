// imports
import {Meteor} from 'meteor/meteor';
import {get} from 'svelte/store';
import {
  ageGroups,
  ageGroupIndexEnd,
  ageGroupIndexStart,
  averageProbabilities,
  deployment,
  genders,
  marketName,
  respondentsCountForStrategy,
  respondentsNotReached,
  respondentsReady,
  userId
} from '../stores/reach';

// variables
export default function createPrepare() {
  async function averageProbabilitiesForData() {
    try {
      averageProbabilities.set(
        await Meteor.callAsync('strategies.calculateAverageProbabilities', {
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
      console.log('error in calculateAverageProbabilities', error);
    }
  }
  async function respondentsNotReachedForData() {
    try {
      respondentsNotReached.set(
        await Meteor.callAsync('strategies.filterRespondentsNotReached', {
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
      console.log('error in getRespondentsNotReached', error);
    }
  }
  async function respondentsForData() {
    try {
      respondentsCountForStrategy.set(
        await Meteor.callAsync('strategies.prepareRespondents', {
          userId: get(userId),
          marketName: get(marketName),
          genders: get(genders),
          ageGroupIndexStart: get(ageGroupIndexStart),
          ageGroupIndexEnd: get(ageGroupIndexEnd),
          deployment: get(deployment),
          ageGroups: get(ageGroups)
        })
      );
      console.log('respondentsCountForStrategy in async prepare respondents: ', respondentsCountForStrategy);
      respondentsReady.set(get(respondentsCountForStrategy) > 0);
    } catch (error) {
      console.log('error in async prepare respondents: ', error);
    }
  }
  return {averageProbabilitiesForData, respondentsNotReachedForData, respondentsForData};
}
