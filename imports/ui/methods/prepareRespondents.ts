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
  respondentsReady,
  useMarketData,
  userId
} from '../stores/reach';

// variables

export default function prepareRespondents() {
  respondentsReady.set(false);
  if (get(marketData) && get(useMarketData)) {
    Meteor.callAsync('strategies.prepareRespondents', {
      userId: get(userId),
      marketName: get(marketName),
      genders: get(genders),
      ageGroupIndexStart: get(ageGroupIndexStart),
      ageGroupIndexEnd: get(ageGroupIndexEnd),
      deployment: get(deployment),
      ageGroups: get(ageGroups)
    })
      .then((result) => {
        respondentsReady.set(result);
      })
      .catch((error) => console.log('error in prepare respondents', error));
  }
  console.log('respondentsReady after function: ', get(respondentsReady));
}
