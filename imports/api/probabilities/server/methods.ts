// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createReachDataTool from '../../strategies/server/reachdata';
import {MARKETNAMES} from '../../../both/constants/constants';
import {AgeGroup, Probability, Strategy} from '../../../both/typings/types';
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

    let probabilityForMarket: Probability | undefined;
    if (this.isSimulation) {
      console.log('this is simulation');
    } else {
      probabilityForMarket = Probabilities.findOne({marketName: args.marketName});
    }
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
    let count: number | undefined;
    if (this.isSimulation) {
      console.log('this is simulation');
      count = Probabilities.find({market: args.marketName}).count();
      return count;
    } else {
      count = Probabilities.find({market: args.marketName}).count();
      return count;
    }
  },

  'probabilities.countRespondentsForStrategy': function (args: {
    briefing: Omit<Strategy, 'deployment'>;
    ageGroups: AgeGroup[];
  }): number {
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
    const ageGroupStart = ageGroupIndexStart ? args.ageGroups[ageGroupIndexStart] : args.ageGroups[0];
    const ageGroupEnd = ageGroupIndexEnd ? args.ageGroups[ageGroupIndexEnd] : args.ageGroups[1];
    const probabilitiesForStrategy = Probabilities.find(
      {marketName: marketName, age: {$gte: ageGroupStart[0], $lte: ageGroupEnd[1]}, gender: {$in: genders}},
      {fields: {respondentId: 1, market: 1, age: 1, gender: 1}}
    ).fetch();
    console.log(
      'probabilitiesForRespondents in server count for strategy:',
      typeof probabilitiesForStrategy,
      probabilitiesForStrategy
    );
    return probabilitiesForStrategy.length;
  }
});
