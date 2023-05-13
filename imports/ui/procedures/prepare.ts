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
      console.log('error in getAverageProbabilities', error);
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
      const result = await Meteor.callAsync('strategies.prepareRespondents', {
        userId: get(userId),
        marketName: get(marketName),
        genders: get(genders),
        ageGroupIndexStart: get(ageGroupIndexStart),
        ageGroupIndexEnd: get(ageGroupIndexEnd),
        deployment: get(deployment),
        ageGroups: get(ageGroups)
      });
      console.log('result in async prepare respondents: ', result);
      respondentsReady.set(result);
    } catch (error) {
      console.log('error in async prepare respondents: ', error);
    }
  }
  return {averageProbabilitiesForData, respondentsNotReachedForData, respondentsForData};
}
