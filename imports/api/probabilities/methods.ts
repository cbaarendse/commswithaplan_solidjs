// imports
import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Match} from 'meteor/check';
import createDataTool from './datatool';
import {MARKETS} from '../../both/constants/constants';
import {Probability} from '../../both/typings/types';
import Probabilities from './server/probabilities';

// variables
const dataTool = createDataTool();

// methods
export const probabilitiesCheckForMarket = new ValidatedMethod({
  name: 'probabilities.checkForMarket',
  validate(args: {[key: string]: string}): void {
    if (!Match.test(args.market, String) || !Match.test(args.market, MARKETS.includes(args.market))) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {[key: string]: string}): boolean {
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
  }
});

export const probabilitiesCountRespondentsForMarket = new ValidatedMethod({
  name: 'probabilities.countRespondentsForMarket',
  validate(args: {[key: string]: string}): void {
    if (!Match.test(args.market, String) || !Match.test(args.market, MARKETS.includes(args.market))) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {[key: string]: string}) {
    console.log('probabilities.countRespondentsForMarket runs with: ', args.market);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    let probabilitiesForMarket: Probability[] = [];
    if (this.isSimulation) {
      // TODO:
      console.log('this is simulation');
    } else {
      probabilitiesForMarket = dataTool.filterProbabilitiesForMarket(args.market);
      console.log(
        'probabilitiesForRespondents in server count for strategy:',
        typeof probabilitiesForMarket,
        probabilitiesForMarket
      );

      return probabilitiesForMarket.length;
    }
  }
});

export const probabilitiesCountRespondentsForStrategy = new ValidatedMethod({
  name: 'probabilities.countForStrategy',
  validate(args: {[key: string]: string}): void {
    if (!Match.test(args.strategyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {[key: string]: string}) {
    console.log('probabilities.countForStrategy runs with: ', args.strategyId);

    const strategy = Strategies.findOne({_id: strategyId});
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

    let probabilitiesForStrategy;
    if (this.isSimulation) {
      // TODO:
      console.log('this is simulation');
    } else {
      probabilitiesForStrategy = filterProbabilitiesForStrategy(_id);
      console.log(
        'probabilitiesForRespondents in server count for strategy:',
        typeof probabilitiesForStrategy,
        probabilitiesForStrategy
      );

      return probabilitiesForStrategy.length;
    }
  }
});
