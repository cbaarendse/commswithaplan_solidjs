// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import Strategies from '../strategies';
import createReachDataTool from './reachdata';
import Probabilities from '../../probabilities/server/probabilities';
import {
  Probability,
  Strategy,
  DeployedTouchPoint,
  RespondentsCount,
  ProbabilityTouchPoint,
  PeopleInRange,
  Results,
  AgeGroup
} from '/imports/both/typings/types';
import {Mongo} from 'meteor/mongo';

// variables
const reachDataTool = createReachDataTool();

// functions

Meteor.methods({
  'strategies.calculateResultsWithData': function (args: {
    briefing: Omit<Strategy, 'deployment'>;
    deployment: Strategy['deployment'];
    ageGroups: AgeGroup[];
    respondentsCountForMarket: RespondentsCount;
    peopleInRange: PeopleInRange;
  }): Results {
    if (
      !Match.test(args.briefing, Object) ||
      !Match.test(args.deployment, Array) ||
      !Match.test(args.respondentsCountForMarket, Number) ||
      !Match.test(args.peopleInRange, Number)
    ) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    const {userId, marketName} = args.briefing;
    let totalReachForResult: Results[0];
    let overlapForResult: Results[1];
    // filter probabilities for market
    const probabilities = Probabilities.find({market: marketName}).fetch();
    const touchPointsDeployed: DeployedTouchPoint[] = args.deployment;
    let reachedNonUniqueRespondentsForStrategy: number[] = [];
    const reachedRespondentsPerTouchPointDeployed: {[key: string]: number[]} = {};
    const reachedRespondentsByAllTouchPointsForStrategy: number[] = [];

    // Checks for login and strategy ownership
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // if (this.userId !== userId) {
    //   throw new Meteor.Error(
    //     'Not authorized',
    //     'You are not authorized to calculate this strategy',
    //     '[{ "name": "notAuthorized" }]'
    //   );
    // }

    if (this.isSimulation) {
      console.log('simulation');
      totalReachForResult = 0;
      overlapForResult = 0;
    } else {
      // Set up probabilities
      const probabilitiesForStrategy: Probability[] | undefined = reachDataTool.filterProbabilitiesForStrategy(
        probabilities,
        args.briefing,
        args.ageGroups
      ); // OK
      // for each deployed touchpoint only select
      const arrangedRespondentsForTouchPoints: {[key: string]: Map<Probability['respondentId'], number>} =
        reachDataTool.arrangeRespondentsForTouchPoints(touchPointsDeployed, probabilitiesForStrategy); //OK
      touchPointsDeployed.forEach((touchPoint) => {
        // Adjust touchPoint
        const adaptedTouchPoint: ProbabilityTouchPoint = reachDataTool.touchPointAdaptToNewProbabilities(
          touchPoint,
          args.respondentsCountForMarket,
          args.peopleInRange,
          arrangedRespondentsForTouchPoints
        );
        console.log('touchPoint in adapt to new probabilities :', touchPoint);
        // Build non-unique respondents

        // Collect respondents
        const reachedRespondentsForTouchPoint = reachDataTool.collectReachedRespondentsForTouchPoint(
          adaptedTouchPoint,
          arrangedRespondentsForTouchPoints
        );
        // For reach calculation
        reachedNonUniqueRespondentsForStrategy = reachedNonUniqueRespondentsForStrategy.concat(
          reachedRespondentsForTouchPoint
        ); // OK (concat is quicker than unshift)
        // For locus calculation
        reachedRespondentsPerTouchPointDeployed[touchPoint.name] = reachedRespondentsForTouchPoint;
      });
      // Unique respondents
      const reachedUniqueRespondentsForStrategy: Set<number> = new Set(reachedNonUniqueRespondentsForStrategy); // OK
      console.log('reachedRespondentsPerTouchPointDeployed :', reachedRespondentsPerTouchPointDeployed);
      // strategy.reach
      totalReachForResult = (reachedUniqueRespondentsForStrategy.size / args.respondentsCountForMarket) * 100;
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
      overlapForResult = (reachedRespondentsByAllTouchPointsForStrategy.length / args.respondentsCountForMarket) * 100;
      // update strategy
    }
    return [totalReachForResult, overlapForResult];
  },

  'strategies.processResultsWithAlgorithm': function (args: {strategyId: string | Mongo.ObjectIDStatic}) {
    if (!Match.test(args.strategyId, Match.OneOf(String, Object))) {
      throw new Meteor.Error('users.signup.email', 'Invalid email address', '[{ "name": "invalidEmail" }]');
    }

    const strategy: Strategy = Strategies.findOne({_id: args.strategyId});
    const {userId} = strategy;
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
      totalReachForResult = reachDataTool.totalReachWithAlgorithmForStrategy(reachValues);
      overlapForResult = overlapWithAlgorithmForStrategy(reachValues);
    }

    strategy.lastChanged = new Date();

    const modifier = {$set: {...strategy}};
    Strategies.update({_id}, modifier);
    return;
  }
});
