// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';

import Populations from '../populations/populations';
import Strategies from '../strategies/strategies';

import {MARKETNAMES} from '../../both/constants/constants';
import {AgeGroup, PeopleInRange, Strategy} from '../../both/typings/types';
import {Match} from 'meteor/check';
import {Mongo} from 'meteor/mongo';

Meteor.methods({
  'populations.countPeopleForMarket': function (args: {marketName: Strategy['marketName']}): number {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }

    if (
      !Match.test(args.marketName, String) ||
      !Match.test(
        args,
        Match.Where((args) => MARKETNAMES.includes(args.marketName))
      )
    ) {
      throw new Meteor.Error(
        'general.invalid.input',
        `Invalid input: ${args.marketName}`,
        '[{ "name": "invalidInput" }]'
      );
    }

    const projection = {count: 1};

    // Filter right counts for selected age range / gender
    const countsForAgeRange = Populations.find({market: args.marketName}, {fields: projection}).fetch();

    // Summarize all filtered counts per age range / gender to one number
    const sum = countsForAgeRange.reduce((subTotal, current) => subTotal + current.count, 0);
    return sum;
  },

  'populations.countPeopleForStrategy': function (args: {
    briefing: Omit<Required<Strategy>, 'deployment'>;
    ageGroups: AgeGroup[];
  }): PeopleInRange {
    const {marketName, genders, ageGroupIndexStart, ageGroupIndexEnd, userId} = args.briefing;
    console.log('populations.countPeopleForStrategy runs with: ', args.briefing, this.userId, args.ageGroups);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }

    if (!Match.test(args.briefing, Object)) {
      throw new Meteor.Error(
        'general.invalid.input',
        `Invalid input: ${args.briefing}`,
        '[{ "name": "invalidInput" }]'
      );
    }
    if (!Match.test(args.ageGroups, Object)) {
      throw new Meteor.Error(
        'general.invalid.input',
        `Invalid input: ${args.ageGroups}`,
        '[{ "name": "invalidInput" }]'
      );
    }

    // check if strategy is from user
    if (userId !== this.userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to calculate for this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }

    const startAge = args.ageGroups[ageGroupIndexStart][0];
    const endAge = args.ageGroups[ageGroupIndexEnd][1];
    const query: {[key: string]: any} = {
      market: marketName,
      gender: {
        $in: Array.of(genders.values())
      },
      age: {
        $gte: startAge,
        $lte: endAge
      }
    };

    // Make sure only the counts per age group / gender are being reported in query
    const projection: {count: number} = {count: 0};
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
