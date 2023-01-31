// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createDataTool from '../datatool';
import {MARKETS} from '../../../both/constants/constants';
import {Probability} from '../../../both/typings/types';
import Probabilities from './probabilities';
import Strategies from '../../strategies/strategies';

// variables
const dataTool = createDataTool();
const probabilities = Probabilities.find({}).fetch();
const strategies = Strategies.find({}).fetch();

// methods
Meteor.methods({
  'probabilities.checkForMarket'(args: {[key: string]: string}) {
    if (!Match.test(args.market, String) || !Match.test(args.market, MARKETS.includes(args.market))) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }

    console.log('probabilities.checkProbabilitiesForMarket runs with: ', args.market);

    let probabilityForMarket: Probability | undefined;
    if (this.isSimulation) {
      console.log('this is simulation');
    } else {
      probabilityForMarket = Probabilities.findOne({market: args.market});
      console.log(
        'type of probabilityForMarket in server check for probability:',
        typeof probabilityForMarket,
        probabilityForMarket
      );
    }
    return probabilityForMarket ? true : false;
  },

  'probabilities.countRespondentsForMarket'(args: {[key: string]: string}): number | undefined {
    if (!Match.test(args.market, String) || !Match.test(args.market, MARKETS.includes(args.market))) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
    console.log('probabilities.countRespondentsForMarket runs with: ', args.market);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    let probabilitiesForMarket: Probability[];
    if (this.isSimulation) {
      // TODO:
      console.log('this is simulation');
    } else {
      probabilitiesForMarket = dataTool.filterProbabilitiesForMarket(probabilities, args.market);
      console.log(
        'probabilitiesForRespondents in server count for strategy:',
        typeof probabilitiesForMarket,
        probabilitiesForMarket
      );

      return probabilitiesForMarket.length;
    }
  },

  'probabilities.countForStrategy'(args: {[key: string]: string}): number | undefined {
    if (!Match.test(args.strategyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
    console.log('probabilities.countForStrategy runs with: ', args.strategyId);

    const strategy = Strategies.findOne({_id: args.strategyId});
    const {_id, user} = strategy;

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // Check if strategy is from user
    if (user !== this.userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to calculate for this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }

    let probabilitiesForStrategy: Probability[];
    if (this.isSimulation) {
      // TODO:
      console.log('this is simulation');
    } else {
      probabilitiesForStrategy = dataTool.filterProbabilitiesForStrategy(probabilities, strategies, _id);
      console.log(
        'probabilitiesForRespondents in server count for strategy:',
        typeof probabilitiesForStrategy,
        probabilitiesForStrategy
      );

      return probabilitiesForStrategy.length;
    }
  }
});
