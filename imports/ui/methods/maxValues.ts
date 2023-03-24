// imports
import {Meteor} from 'meteor/meteor';
import {get} from 'svelte/store';
import {
  ageGroupIndexEnd,
  ageGroupIndexStart,
  deployment,
  genders,
  marketName,
  maxValues,
  populationForStrategy,
  userId
} from '../stores/reach';

export default function adaptMaxValues() {
  Meteor.callAsync('strategies.maxValuesForTouchPoints', {
    userId: get(userId),
    marketName: get(marketName),
    ageGroupIndexStart: get(ageGroupIndexStart),
    ageGroupIndexEnd: get(ageGroupIndexEnd),
    genders: get(genders),
    deployment: get(deployment),
    populationForStrategy: get(populationForStrategy)
  })
    .then((result) => {
      if (result) {
        maxValues.set(result);
      }
    })
    .catch((error) => {
      if (error) {
        console.log('error in max values: ', error);
      }
    });
}
