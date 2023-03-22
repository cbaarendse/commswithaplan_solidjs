// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createReachDataTool from './reachdata';
import Probabilities from '../../probabilities/server/probabilities';
import {
  Probability,
  Strategy,
  DeployedTouchPoint,
  ComplementedTouchPoint,
  Population,
  Results,
  TouchPointName,
  InputType
} from '/imports/both/typings/types';

// variables
const reachDataTool = createReachDataTool();

// functions

Meteor.methods({
  'strategies.calculateResultsWithData': function (args: {
    userId: Strategy['userId'];
    marketName: Strategy['marketName'];
    genders: Strategy['genders'];
    ageGroupIndexStart: Strategy['ageGroupIndexStart'];
    ageGroupIndexEnd: Strategy['ageGroupIndexEnd'];
    deployment: Strategy['deployment'];
    populationForStrategy: Population;
  }): Results {
    console.log(
      'calculateResultsWithData runs with args: ',
      {...args},
      args.deployment.length,
      args.populationForStrategy
    );

    if (
      !Match.test(args, Object) ||
      !Match.test(args.deployment, Array) ||
      !Match.test(args.populationForStrategy, Number)
    ) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    const {userId, marketName, ageGroupIndexStart, ageGroupIndexEnd, genders} = args;

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
    const probabilitiesForStrategy = Probabilities.find({
      marketName: marketName,
      gender: {$in: genders},
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    });
    const respondentsCountForStrategy = probabilitiesForStrategy.count();
    const respondentsProbabilitiesForStrategy = probabilitiesForStrategy.fetch();

    // for each deployed touchpoint only select respondents with a contact probability > 0
    const respondentsProbabilitiesForTouchPoints: Map<
      TouchPointName,
      Map<Probability['respondentId'], number>
    > = reachDataTool.getProbabilitiesForTouchPoints(touchPointsDeployed, respondentsProbabilitiesForStrategy);
    // add properties to touchpoints
    const complementedTouchPoints: ComplementedTouchPoint[] = reachDataTool.complementTouchPoints(
      touchPointsDeployed,
      respondentsProbabilitiesForTouchPoints
    );

    const deployedComplementedTouchPoints: ComplementedTouchPoint[] = complementedTouchPoints.filter(
      (touchPoint) => touchPoint.value > 0
    );

    // Build non-unique respondents
    // Collect respondents
    const reachedRespondentsForTouchPoints: Map<TouchPointName, Probability['respondentId'][]> =
      reachDataTool.collectReachedRespondentsForTouchPoints(
        deployedComplementedTouchPoints,
        args.populationForStrategy,
        respondentsProbabilitiesForTouchPoints,
        respondentsCountForStrategy
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
    //TODO respondentsForStrategy
    // total reach
    const totalReachForResult = reachedUniqueRespondentsForStrategy.size / respondentsCountForStrategy;
    // Count respondents for overlap
    reachedUniqueRespondentsForStrategy.forEach((respondentId) => {
      for (const touchPoint of touchPointsDeployed) {
        if (!reachedRespondentsForTouchPoints.get(touchPoint.name)?.includes(respondentId)) {
          break;
        }
        respondentsCountedForOverlap.push(respondentId);
      }
    });
    console.log('respondentsCountedForOverlap in calculate result: ', respondentsCountedForOverlap);

    // strategy.overlap
    const overlapForResult = respondentsCountedForOverlap.length / respondentsCountForStrategy;
    console.log('totalReachForResult: ', totalReachForResult, 'overlapForResult: ', overlapForResult);

    return [totalReachForResult, overlapForResult];
  },
  // maxValues
  'strategies.maxValuesForTouchPoints': function (args: {
    userId: Strategy['userId'];
    marketName: Strategy['marketName'];
    genders: Strategy['genders'];
    ageGroupIndexStart: Strategy['ageGroupIndexStart'];
    ageGroupIndexEnd: Strategy['ageGroupIndexEnd'];
    deployment: Strategy['deployment'];
    populationForStrategy: Population;
  }): {[key: string]: number} {
    // Filter probabilities for this briefing / strategy
    const {marketName, ageGroupIndexStart, ageGroupIndexEnd, genders} = args;
    const touchPointsDeployed: DeployedTouchPoint[] = args.deployment;
    const respondentsProbabilities = Probabilities.find({
      marketName: marketName,
      gender: {$in: genders},
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    });
    const respondentsCountForStrategy = respondentsProbabilities.count();
    const respondentsProbabilitiesForStrategy = respondentsProbabilities.fetch();

    const maxValues: Map<TouchPointName, number> = new Map();
    // for each deployed touchpoint only select respondents with a contact probability > 0
    const respondentsProbabilitiesForTouchPoints: Map<
      TouchPointName,
      Map<Probability['respondentId'], number>
    > = reachDataTool.getProbabilitiesForTouchPoints(touchPointsDeployed, respondentsProbabilitiesForStrategy); //OK

    touchPointsDeployed.forEach((touchPoint) => {
      const respondentsProbabilitiesForTouchPoint = respondentsProbabilitiesForTouchPoints.get(touchPoint.name);
      maxValues.set(touchPoint.name, 100);
      if (
        (touchPoint.inputTypeIndex == InputType.Contacts || touchPoint.inputTypeIndex == InputType.Impressions) &&
        respondentsProbabilitiesForTouchPoint
      ) {
        maxValues.set(
          touchPoint.name,
          (respondentsProbabilitiesForTouchPoint.size / respondentsCountForStrategy) * args.populationForStrategy * 5
        );
      } else if (touchPoint.inputTypeIndex == InputType.Grps && respondentsProbabilitiesForTouchPoint) {
        maxValues.set(
          touchPoint.name,
          ((respondentsProbabilitiesForTouchPoint.size / respondentsCountForStrategy) *
            args.populationForStrategy *
            5) /
            10000
        );
      } else if (touchPoint.inputTypeIndex == InputType.Reach && respondentsProbabilitiesForTouchPoint) {
        console.log(
          'respondentsProbabilitiesForTouchPoint.size and respondentsCountForStrategy: ',
          respondentsProbabilitiesForTouchPoint.size,
          respondentsCountForStrategy,
          'for: ',
          touchPoint.name
        );

        const maxReach = respondentsProbabilitiesForTouchPoint.size / respondentsCountForStrategy;
        maxValues.set(touchPoint.name, Math.max(maxReach, 1));
      }
    });
    return Object.fromEntries(maxValues);
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
//       if (touchPoint.inputTypeIndex == InputType.Reach && touchPoint.value > 0) {
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
