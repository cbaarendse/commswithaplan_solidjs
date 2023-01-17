// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

import SimpleSchema from 'simpl-schema';

import Populations from './populations.js';
import Strategies from '../strategies/strategies';

import {PROBABILITIES_CODING, MARKETS} from '../../startup/both/constants';

export const populationsCountPeopleForMarket = new ValidatedMethod({
  name: 'populations.countPeopleForMarket',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    market: {type: String, allowedValues: MARKETS}
  }).validator(),
  run({market}) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }

    const projection = {count: 1};

    // Filter right counts for selected age range / gender
    const countsForAgeRange = Populations.find({market}, {fields: projection}).fetch();

    // Summarize all filtered counts per age range / gender to one number
    const sum = countsForAgeRange.reduce((subTotal, current) => subTotal + current.count, 0);
    return sum;
  }
});

export const populationsCountPeopleForStrategy = new ValidatedMethod({
  name: 'populations.countPeopleForStrategy',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    strategyId: {type: String}
  }).validator(),
  run({strategyId}) {
    const strategy = Strategies.findOne({_id: strategyId});
    const {market, marketData, male, female, ageStart, ageEnd, user} = strategy;
    console.log('populations.countPeopleForStrategy runs with: ', strategyId, this.userId, strategy);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // CHECK IF STRATEGY IS FROM USER
    if (user !== this.userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to calculate for this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }

    console.log('PROBABILITIES_CODING[market] :', PROBABILITIES_CODING[market]);

    const startAge = PROBABILITIES_CODING[market].ages[ageStart].start;
    const endAge = PROBABILITIES_CODING[market].ages[ageEnd].end;
    const query = {};
    const genders = [];

    // (fe)male === true / false
    if (male) genders.push(0);
    if (female) genders.push(1);

    // Further build query for gender and age group in a certain market
    query.market = market;
    query.gender = {$in: genders};
    query.age = {$gte: startAge, $lte: endAge};

    // Make sure only the counts per age group / gender are being reported in query
    const projection = {};
    projection.count = 1;

    // Filter right counts for selected age range / gender
    const countsForAgeRange = Populations.find(query, {
      fields: projection
    }).fetch();

    // Summarize all filtered counts per age range / gender to one number
    const sum = countsForAgeRange.reduce((subTotal, current) => subTotal + current.count, 0);
    return sum;
  }
});
