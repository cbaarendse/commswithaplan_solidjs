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
    ageGroups: AgeGroup[];
    respondentsCountForMarket: RespondentsCount;
    populationInRange: PopulationInRange;
  }): Results {
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
    const reachedNonUniqueRespondentsForStrategy: number[] = [];
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
    const ageGroupStart = ageGroupIndexStart ? args.ageGroups[ageGroupIndexStart] : args.ageGroups[0];
    const ageGroupEnd = ageGroupIndexEnd ? args.ageGroups[ageGroupIndexEnd] : args.ageGroups[1];
    const probabilities: Probability[] = Probabilities.find(
      {marketName: marketName, age: {$gte: ageGroupStart[0], $lte: ageGroupEnd[1]}, gender: {$in: genders}},
      {fields: {respondentId: 1, market: 1, age: 1, gender: 1}}
    ).fetch();

    // for each deployed touchpoint only select respondents with a contact probability > 0
    const arrangedProbabilitiesForTouchPoints: {
      [key in TouchPointName]: Map<Probability['respondentId'], number>;
    } = reachDataTool.arrangeProbabilitiesForTouchPoints(touchPointsDeployed, probabilities); //OK

    // add properties to touchpoints
    const complementedTouchPoints: ComplementedTouchPoint[] = reachDataTool.complementTouchPoints(
      touchPointsDeployed,
      args.respondentsCountForMarket,
      args.populationInRange,
      arrangedProbabilitiesForTouchPoints
    );

    // Build non-unique respondents
    // Collect respondents
    const reachedRespondentsForTouchPoints: Partial<{[key in TouchPointName]: Probability['respondentId'][]}> =
      reachDataTool.collectReachedRespondentsForTouchPoints(
        complementedTouchPoints,
        arrangedProbabilitiesForTouchPoints
      );
    // For reach calculation: Gather all reached respondents for strategy per touch point, so non-unique
    for (const reachedRespondentsForTouchPoint of Object.values(reachedRespondentsForTouchPoints)) {
      reachedNonUniqueRespondentsForStrategy.concat(reachedRespondentsForTouchPoint);
    } // OK (concat is quicker than unshift)

    // Unique respondents
    const reachedUniqueRespondentsForStrategy: Set<number> = new Set(reachedNonUniqueRespondentsForStrategy); // OK

    // total reach
    const totalReachForResult = (reachedUniqueRespondentsForStrategy.size / args.respondentsCountForMarket) * 100;

    // Count respondents for overlap
    reachedUniqueRespondentsForStrategy.forEach((respondentId) => {
      for (const touchPoint of touchPointsDeployed) {
        if (!reachedRespondentsForTouchPoints[touchPoint.name]?.includes(respondentId)) {
          break;
        }
        respondentsCountedForOverlap.push(respondentId);
      }
    });
    // strategy.overlap
    const overlapForResult = (respondentsCountedForOverlap.length / args.respondentsCountForMarket) * 100;
    // update strategy

    return [totalReachForResult, overlapForResult];
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
