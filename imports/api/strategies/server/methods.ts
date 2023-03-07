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
  ComplementedTouchPoint,
  PopulationInRange,
  Results,
  AgeGroup,
  TouchPointName
} from '/imports/both/typings/types';
import {Mongo} from 'meteor/mongo';

// variables
const reachDataTool = createReachDataTool();

// functions

Meteor.methods({
  'strategies.calculateResultsWithData': function (args: {
    briefing: Omit<Strategy, 'deployment'>;
    deployment: Strategy['deployment'];
    respondentsCountForMarket: RespondentsCount;
    populationInRange: PopulationInRange;
  }): Results {
    console.log(
      'calculateResultsWithData runs with args: ',
      args.briefing,
      args.deployment.length,
      args.respondentsCountForMarket,
      args.populationInRange
    );

    if (
      !Match.test(args.briefing, Object) ||
      !Match.test(args.deployment, Array) ||
      !Match.test(args.respondentsCountForMarket, Number) ||
      !Match.test(args.populationInRange, Number)
    ) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    const {userId, marketName, ageGroupIndexStart, ageGroupIndexEnd, genders} = args.briefing;

    // filter probabilities for market
    const touchPointsDeployed: DeployedTouchPoint[] = args.deployment;
    let reachedNonUniqueRespondentsForStrategy: number[] = [];
    const respondentsCountedForOverlap: number[] = [];

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

    // Filter probabilities for this briefing / strategy
    const respondentsProbabilities: Probability[] = Probabilities.find({
      marketName: marketName,
      gender: {$in: genders},
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    }).fetch();

    // for each deployed touchpoint only select respondents with a contact probability > 0
    const respondentsProbabilitiesForTouchPoints: Map<
      TouchPointName,
      Map<Probability['respondentId'], number>
    > = reachDataTool.getProbabilitiesForTouchPoints(touchPointsDeployed, respondentsProbabilities);
    //TODO: adapt, like maxValues (below)
    // add properties to touchpoints
    const complementedTouchPoints: ComplementedTouchPoint[] = reachDataTool.complementTouchPoints(
      touchPointsDeployed,
      args.populationInRange,
      respondentsProbabilitiesForTouchPoints
    );

    const moreThanZeroComplementedTouchPoints: ComplementedTouchPoint[] = complementedTouchPoints.filter(
      (touchPoint) => touchPoint.value > 0
    );

    // Build non-unique respondents
    // Collect respondents
    const reachedRespondentsForTouchPoints: Map<TouchPointName, Probability['respondentId'][]> =
      reachDataTool.collectReachedRespondentsForTouchPoints(
        moreThanZeroComplementedTouchPoints,
        respondentsProbabilitiesForTouchPoints
      );
    // For reach calculation: Gather all reached respondents for strategy per touch point, so non-unique
    reachedRespondentsForTouchPoints.forEach((reachedRespondentsForTouchPoint) => {
      reachedNonUniqueRespondentsForStrategy = reachedNonUniqueRespondentsForStrategy.concat(
        reachedRespondentsForTouchPoint
      );
    });
    // OK (concat is quicker than unshift)

    // Unique respondents
    const reachedUniqueRespondentsForStrategy: Set<number> = new Set(reachedNonUniqueRespondentsForStrategy); // OK

    // total reach
    const totalReachForResult = (reachedUniqueRespondentsForStrategy.size / args.respondentsCountForMarket) * 100;
    // Count respondents for overlap
    reachedUniqueRespondentsForStrategy.forEach((respondentId) => {
      for (const touchPoint of touchPointsDeployed) {
        if (!reachedRespondentsForTouchPoints.get(touchPoint.name)?.includes(respondentId)) {
          break;
        }
        respondentsCountedForOverlap.push(respondentId);
      }
    });
    // strategy.overlap
    const overlapForResult = (respondentsCountedForOverlap.length / args.respondentsCountForMarket) * 100;
    console.log('totalReachForResult: ', totalReachForResult, 'overlapForResult: ', overlapForResult);

    return [totalReachForResult, overlapForResult];
  },
  // maxValues
  'strategies.maxValuesForTouchPoints': function (args: {
    briefing: Omit<Strategy, 'deployment'>;
    deployment: Strategy['deployment'];
    respondentsCountForMarket: RespondentsCount;
    populationInRange: PopulationInRange;
  }): Map<TouchPointName, number> {
    // Filter probabilities for this briefing / strategy
    const {marketName, ageGroupIndexStart, ageGroupIndexEnd, genders} = args.briefing;
    const touchPointsDeployed: DeployedTouchPoint[] = args.deployment;
    const respondentsProbabilities: Probability[] = Probabilities.find({
      marketName: marketName,
      gender: {$in: genders},
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    }).fetch();

    const maxValues: Map<TouchPointName, number> = new Map();
    // for each deployed touchpoint only select respondents with a contact probability > 0
    const respondentsProbabilitiesForTouchPoints: Map<
      TouchPointName,
      Map<Probability['respondentId'], number>
    > = reachDataTool.getProbabilitiesForTouchPoints(touchPointsDeployed, respondentsProbabilities); //OK
    // TODO: check all the 'if's log args.respondentsCountForMarket & populationInRange, maube not get thisin arguments, but get from db
    touchPointsDeployed.forEach((touchPoint) => {
      const respondentsProbabilitiesForTouchPoint = respondentsProbabilitiesForTouchPoints.get(touchPoint.name);
      maxValues.set(touchPoint.name, 100);
      if (
        (touchPoint.inputType == 'contacts' || touchPoint.inputType == 'impressions') &&
        respondentsProbabilitiesForTouchPoint
      ) {
        maxValues.set(
          touchPoint.name,
          (respondentsProbabilitiesForTouchPoint.size / args.respondentsCountForMarket) * args.populationInRange * 5
        );
      } else if (touchPoint.inputType == 'grps' && respondentsProbabilitiesForTouchPoint) {
        maxValues.set(
          touchPoint.name,
          ((respondentsProbabilitiesForTouchPoint.size / args.respondentsCountForMarket) * 5) / 100
        );
      } else if (touchPoint.inputType == 'reach') {
        maxValues.set(touchPoint.name, 100);
      }
      console.log('maxValue for: ', touchPoint.name, ': ', maxValues.get(touchPoint.name));
    });
    return maxValues;
  }
});

// Results with formula - done on the client, formula is hidden in closure
//   'strategies.processResultsWithFormula': function (args: {strategyId: string | Mongo.ObjectIDStatic}) {
//     if (!Match.test(args.strategyId, Match.OneOf(String, Object))) {
//       throw new Meteor.Error('users.signup.email', 'Invalid email address', '[{ "name": "invalidEmail" }]');
//     }

//     const strategy: Strategy = Strategies.findOne({_id: args.strategyId});
//     const {userId} = strategy;
//     const reachValues = strategy.deployment.reduce((values: number[], touchPoint: DeployedTouchPoint): number[] => {
//       if (touchPoint.inputType == 'reach' && touchPoint.value > 0) {
//         values.push(touchPoint.value);
//       }
//       return values;
//     }, []);

//     // Checks for login and strategy ownership
//     if (!this.userId) {
//       throw new Meteor.Error(
//         'users.general.notLoggedIn',
//         'User is not properly logged in',
//         '[{ "name": "notLoggedIn" }]'
//       );
//     }
//     if (this.userId !== userId) {
//       throw new Meteor.Error(
//         'Not authorized',
//         'You are not authorized to calculate this strategy',
//         '[{ "name": "notAuthorized" }]'
//       );
//     }

//     if (this.isSimulation) {
//       console.log('simulation');
//     } else {
//       totalReachForResult = reachDataTool.totalReachWithAlgorithmForStrategy(reachValues);
//       overlapForResult = overlapWithAlgorithmForStrategy(reachValues);
//     }

//     strategy.lastChanged = new Date();

//     const modifier = {$set: {...strategy}};
//     Strategies.update({_id}, modifier);
//     return;
//   }
// });
