// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createReachDataTool from '../../strategies/server/reachdata';
import {MARKETNAMES} from '../../../both/constants/constants';
import {Market, Probability, Strategy} from '../../../both/typings/types';
import Probabilities from './probabilities';
import Strategies from '../../strategies/strategies';
import {markets} from '/imports/ui/stores/reach';

// variables
const reachDataTool = createReachDataTool();
const probabilities = Probabilities.find({}).fetch();
const strategies = Strategies.find({}).fetch();

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
      probabilityForMarket = Probabilities.findOne({market: args.marketName});
      console.log(
        'type of probabilityForMarket in server check for probability:',
        typeof probabilityForMarket,
        probabilityForMarket
      );
    }
    return probabilityForMarket ? true : false;
  },

  'probabilities.countRespondentsForMarket': function (args: {[key: string]: string}): number | undefined {
    if (
      !Match.test(args.marketName, String) ||
      !Match.test(
        args,
        Match.Where((args) => MARKETNAMES.includes(args.marketName))
      )
    ) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
    console.log('probabilities.countRespondentsForMarket runs with: ', args.marketName);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    let count: number | undefined;
    if (this.isSimulation) {
      // TODO:
      console.log('this is simulation');
    } else {
      count = Probabilities.find({market: args.marketName}).count();

      return count;
    }
  },

  'probabilities.countForStrategy': function (args: {[key: string]: string}): number | undefined {
    if (!Match.test(args.strategyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
    console.log('probabilities.countForStrategy runs with: ', args.strategyId);

    const strategy = Strategies.findOne({_id: args.strategyId});
    const {_id, userId} = strategy;

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

    let probabilitiesForStrategy: Probability[] | undefined;
    if (this.isSimulation) {
      // TODO:
      console.log('this is simulation');
    } else {
      probabilitiesForStrategy = reachDataTool.filterProbabilitiesForStrategy(probabilities, strategy, _id);
      console.log(
        'probabilitiesForRespondents in server count for strategy:',
        typeof probabilitiesForStrategy,
        probabilitiesForStrategy
      );

      return probabilitiesForStrategy.length;
    }
  }
});
