// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createReachDataTool from '../../strategies/server/reachdata';
import {MARKETNAMES} from '../../../both/constants/constants';
import {Strategy} from '../../../both/typings/types';
import Probabilities from './probabilities';
// variables
const reachDataTool = createReachDataTool();

// methods
Meteor.methods({
  'probabilities.checkForMarketData': function (args: {marketName: Strategy['marketName']}) {
    console.log('probabilities.checkProbabilitiesForMarket runs with: ', args.marketName);

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

    const probabilityForMarket = Probabilities.findOne({marketName: args.marketName});

    return probabilityForMarket ? true : false;
  },

  'probabilities.countRespondentsForMarket': function (args: {marketName: Strategy['marketName']}): number {
    console.log('probabilities.countRespondentsForMarket runs with: ', args.marketName);
    if (
      !Match.test(args.marketName, String) ||
      !Match.test(
        args,
        Match.Where((args) => MARKETNAMES.includes(args.marketName))
      )
    ) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }

    const respondentsCount = Probabilities.find({marketName: args.marketName}).count();
    console.log('respondentsCount in server count for market:', typeof respondentsCount, respondentsCount);
    return respondentsCount;
  },

  'probabilities.countRespondentsForStrategy': function (args: {
    userId: Strategy['userId'];
    marketName: Strategy['marketName'];
    genders: Strategy['genders'];
    ageGroupIndexStart: Strategy['ageGroupIndexStart'];
    ageGroupIndexEnd: Strategy['ageGroupIndexEnd'];
  }): number {
    if (!Match.test(args, Object)) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${[...args]}`, '[{ "name": "invalidInput" }]');
    }
    console.log('probabilities.countRespondentsForStrategy runs with: ', args);

    const {userId, marketName, genders, ageGroupIndexStart, ageGroupIndexEnd} = args;

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // Check if strategy is from user
    // if (userId !== this.userId) {
    //   throw new Meteor.Error(
    //     'Not authorized',
    //     'You are not authorized to calculate for this strategy',
    //     '[{ "name": "notAuthorized" }]'
    //   );
    // }
    const respondentsCount = Probabilities.find(
      {marketName: marketName, age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}, gender: {$in: genders}},
      {fields: {respondentId: 1, market: 1, age: 1, gender: 1}}
    ).count();
    console.log('respondentsCount in server count for strategy:', typeof respondentsCount, respondentsCount);
    return respondentsCount;
  }
});
