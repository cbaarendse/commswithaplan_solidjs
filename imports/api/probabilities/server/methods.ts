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
  test: function (param: string): string {
    return 'Test hallo ' + param;
  },
  'probabilities.checkForMarket': function (args: {marketName: Strategy['marketName']}) {
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

  'probabilities.countRespondentsForStrategy': function (args: {briefing: Omit<Strategy, 'deployment'>}): number {
    if (!Match.test(args.briefing, Object)) {
      throw new Meteor.Error(
        'general.invalid.input',
        `Invalid input: ${args.briefing}`,
        '[{ "name": "invalidInput" }]'
      );
    }
    console.log('probabilities.countRespondentsForStrategy runs with: ', args.briefing);

    const {userId, marketName, genders, ageGroupIndexStart, ageGroupIndexEnd} = args.briefing;

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
