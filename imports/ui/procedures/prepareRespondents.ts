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
  respondentsReady,
  userId
} from '../stores/reach';

// variables
export default async function prepareRespondents() {
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
