// imports
import {Meteor} from 'meteor/meteor';
import {emailRegExp} from '../../users/users.js';
import {Match} from 'meteor/check';
import Strategies from '../strategies';
import createReachDataTool from './reachdata';
import Probabilities from '../../probabilities/server/probabilities';
import {
  DeployedTouchPoint,
  Probability,
  Strategy,
  Briefing,
  DeployedTouchPoint,
  RespondentsCount
} from '/imports/both/typings/types';
import {Mongo} from 'meteor/mongo';

// variables
const reachDataTool = createReachDataTool();

// functions

Meteor.methods({
  'strategies.calculateResultsWithData': function (args: {
    strategyId: Strategy['_id'];
    respondentsCount: RespondentsCount;
  }) {
    if (!Match.test(args.strategyId, Number) || !Match.test(args.respondentsCount, Number)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
    const strategy = Strategies.findOne({_id: args.strategyId});
    const {_id, userId, marketName} = strategy;
    // filter probabilities for market
    const probabilities = Probabilities.find({market: marketName}).fetch();
    const touchPointsDeployed: DeployedTouchPoint[] = strategy.deployment;
    let reachedNonUniqueRespondentsForStrategy: any = [];
    const reachedRespondentsPerTouchPointDeployed: {[key: string]: number} = {};
    const reachedRespondentsByAllTouchPointsForStrategy = [];

    // Checks for login and strategy ownership
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (this.userId !== userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to calculate this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }

    if (this.isSimulation) {
      console.log('simulation');
    } else {
      // Set up probabilities
      // TODO: propose to first convert objects in collection to Map = new Map(Object.entries(probability)), for each array element
      const probabilitiesForStrategy: Probability[] | undefined = reachDataTool.filterProbabilitiesForStrategy(
        probabilities,
        strategy,
        groups
      ); // OK
      const arrangedProbabilitiesForTouchPoints = reachDataTool.arrangeProbabilitiesForTouchPoints(
        _id,
        probabilitiesForStrategy,
        touchPointsDeployed
      ); //OK
      touchPointsDeployed.forEach((touchPoint) => {
        // Adjust touchPoint
        touchPoint = reachDataTool.touchPointAdaptToNewProbabilities(
          touchPoint,
          peopleInRange,
          respondentsCount,
          arrangedProbabilitiesForTouchPoints
        );
        console.log('touchPoint in adapt to new probabilities :', touchPoint);
        // Build non-unique respondents

        // Collect respondents
        const reachedRespondentsForTouchPoint = collectReachedRespondentsForTouchPoint(
          touchPoint,
          arrangedProbabilitiesForTouchPoints
        );
        // For reach calculation
        reachedNonUniqueRespondentsForStrategy = reachedNonUniqueRespondentsForStrategy.concat(
          reachedRespondentsForTouchPoint
        ); // OK (concat is quicker than unshift)
        // For locus calculation
        reachedRespondentsPerTouchPointDeployed[touchPoint.name] = reachedRespondentsForTouchPoint;
      });
      // Unique respondents
      const reachedUniqueRespondentsForStrategy: Set<string> = new Set(reachedNonUniqueRespondentsForStrategy); // OK
      console.log('reachedRespondentsPerTouchPointEmployed :', reachedRespondentsPerTouchPointDeployed);
      // strategy.reach
      strategy.totalReach = (reachedUniqueRespondentsForStrategy.size / respondentsCount) * 100;
      // Unique respondents for all touchpoints
      reachedUniqueRespondentsForStrategy.forEach((respondentId) => {
        const thisRespondentReachedByAllTouchPoints = touchPointsDeployed.reduce((result, touchPoint, index, list) => {
          if (!reachedRespondentsPerTouchPointDeployed[touchPoint.name].includes(respondentId)) {
            result = false;
          }
          return result;
        }, true);
        if (thisRespondentReachedByAllTouchPoints) {
          reachedRespondentsByAllTouchPointsForStrategy.push(respondentId);
        }
      });
      // strategy.overlap
      strategy.overlap = parseFloat((reachedRespondentsByAllTouchPointsForStrategy.length / respondentsCount) * 100);
      // update strategy
      console.log('strategy in process with probabilities :', strategy);
      const modifier = {$set: {...strategy}};
      Strategies.update({_id}, modifier);
    }
  },

  'strategies.processResultsWithAlgorithm': function (args: {strategyId: string | Mongo.ObjectIDStatic}) {
    if (!Match.test(args.strategyId, Match.OneOf(String, Object))) {
      throw new Meteor.Error('users.signup.email', 'Invalid email address', '[{ "name": "invalidEmail" }]');
    }

    const strategy: Strategy = Strategies.findOne({_id: args.strategyId});
    const {_id, userId} = strategy;
    const reachValues = strategy.deployment.reduce((values: number[], touchPoint: DeployedTouchPoint): number[] => {
      if (touchPoint.inputType == 'reach' && touchPoint.value > 0) {
        values.push(touchPoint.value);
      }
      return values;
    }, []);

    // Checks for login and strategy ownership
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (this.userId !== userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to calculate this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }

    if (this.isSimulation) {
      console.log('simulation');
    } else {
      strategy.totalReach = totalReachWithAlgorithmForStrategy(reachValues);
      strategy.overlap = overlapWithAlgorithmForStrategy(reachValues);
    }

    strategy.lastChanged = new Date();

    const modifier = {$set: {...strategy}};
    Strategies.update({_id}, modifier);
    return;
  }
});
