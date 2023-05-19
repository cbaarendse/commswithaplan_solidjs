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
  userId
} from '../stores/reach';

// variables
export default function createPrepare() {
  async function respondentsForData() {
    try {
      respondentsCountForStrategy.set(
        await Meteor.callAsync('strategies.collectRespondentsForStrategy', {
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
    } catch (error) {
      console.log('error in async prepare respondents: ', error);
    }
  }

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
        await Meteor.callAsync('strategies.getRespondentsNotReached', {
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

  return {respondentsForData, averageProbabilitiesForData, respondentsNotReachedForData};
}
