// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createReachDataTool from './reachdata';
import Probabilities from '../../probabilities/server/probabilities';
import Populations from '../../populations/populations';
import {
  Probability,
  Strategy,
  DeployedTouchPoint,
  ComplementedTouchPoint,
  Results,
  TouchPointName,
  InputType,
  AgeGroup,
  Genders
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
    ageGroups: AgeGroup[];
  }): Results {
    if (!Match.test(args, Object) || !Match.test(args.deployment, Array)) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    const {userId, marketName, ageGroupIndexStart, ageGroupIndexEnd, genders, ageGroups} = args;

    // filter probabilities for market
    const touchPointsDeployed: DeployedTouchPoint[] = args.deployment;
    const touchPointsCounted: DeployedTouchPoint[] = touchPointsDeployed.filter((touchPoint) => touchPoint.value > 0);
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

    // Filter probabilities and population
    const probabilityQuery: {[key: string]: string | {[key: string]: Genders | number}} = {
      marketName: marketName,
      gender: {
        $in: genders
      },
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    };
    const probabilityProjection: {count: number} = {count: 0};
    probabilityProjection.count = 1;
    const probabilitiesForStrategy = Probabilities.find(probabilityQuery, {
      fields: probabilityProjection
    });
    // TODO: from here
    const respondentsCountForStrategy = probabilitiesForStrategy.count();
    const respondentsProbabilitiesForStrategy = probabilitiesForStrategy.fetch();
    const startAge = ageGroupIndexStart ? ageGroups[ageGroupIndexStart][0] : ageGroups[0][0];
    const endAge = ageGroupIndexEnd ? ageGroups[ageGroupIndexEnd][1] : ageGroups[1][1];
    const populationQuery: {[key: string]: string | {[key: string]: Genders | number}} = {
      market: marketName,
      gender: {
        $in: genders || ['f', 'm', 'x']
      },
      age: {
        $gte: startAge,
        $lte: endAge
      }
    };
    // Make sure only the counts per age group / gender are being reported in query
    const populationProjection: {count: number} = {count: 0};
    populationProjection.count = 1;
    // Filter right counts for selected age range / gender
    const populationForStrategy = Populations.find(populationQuery, {
      fields: populationProjection
    }).fetch();

    // Summarize all filtered counts per age range / gender to one number
    const populationCountForStrategy = populationForStrategy.reduce((subTotal, current) => subTotal + current.count, 0);

    // for each deployed touchpoint only select respondents with a contact probability > 0
    const respondentsProbabilitiesForTouchPoints = reachDataTool.getProbabilitiesForTouchPoints(
      touchPointsCounted,
      respondentsProbabilitiesForStrategy
    );
    // add properties to touchpoints
    const complementedTouchPoints: ComplementedTouchPoint[] = reachDataTool.complementTouchPoints(
      touchPointsCounted,
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
        populationCountForStrategy,
        respondentsProbabilitiesForTouchPoints,
        respondentsCountForStrategy
      );
    // For reach calculation: Gather all reached respondents for strategy per touch point, so non-unique
    // TODO: rename everything; check, because sometimes reach == 100%...
    reachedRespondentsForTouchPoints.forEach((reachedRespondentsForTouchPoint) => {
      reachedNonUniqueRespondentsForStrategy = reachedNonUniqueRespondentsForStrategy.concat(
        reachedRespondentsForTouchPoint
      );
    });
    // OK (concat is quicker than unshift)

    // Unique respondents
    const reachedUniqueRespondentsForStrategy: Set<number> = new Set(reachedNonUniqueRespondentsForStrategy); // OK
    //TODO respondentsForStrategy
    // total reach TODO: check, because sometimes reach == 100%...
    const totalReachForResult = Number.isNaN(reachedUniqueRespondentsForStrategy.size / respondentsCountForStrategy)
      ? 0
      : reachedUniqueRespondentsForStrategy.size / respondentsCountForStrategy;
    // Count respondents for overlap
    console.log('reachedUniqueRespondentsForStrategy.size :', reachedUniqueRespondentsForStrategy.size);
    // TODO: check
    reachedUniqueRespondentsForStrategy.forEach((respondentId) => {
      let countThisRespondent = true;
      for (let i = 0; i < deployedComplementedTouchPoints.length; i++) {
        if (
          reachedRespondentsForTouchPoints.get(deployedComplementedTouchPoints[i].name)?.includes(respondentId) &&
          countThisRespondent
        ) {
          countThisRespondent = true;
        } else {
          countThisRespondent = false;
        }
      }
      if (countThisRespondent) {
        respondentsCountedForOverlap.push(respondentId);
      }
    });
    console.log('respondentsCountedForOverlap in calculate result: ', respondentsCountedForOverlap);

    // strategy.overlap
    const overlapForResult = Number.isNaN(respondentsCountedForOverlap.length / respondentsCountForStrategy)
      ? 0
      : respondentsCountedForOverlap.length / respondentsCountForStrategy;
    console.log(
      'respondentsCountedForOverlap.length: ',
      respondentsCountedForOverlap.length,
      'respondentsCountForStrategy: ',
      respondentsCountForStrategy
    );
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
    ageGroups: AgeGroup[];
  }): {[key: string]: number} {
    // Filter probabilities for this briefing / strategy
    const {marketName, ageGroupIndexStart, ageGroupIndexEnd, genders, ageGroups} = args;
    const touchPointsDeployed: DeployedTouchPoint[] = args.deployment;
    const respondentsProbabilities = Probabilities.find({
      marketName: marketName,
      gender: {$in: genders},
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    });

    const respondentsCountForStrategy = respondentsProbabilities.count();
    const respondentsProbabilitiesForStrategy = respondentsProbabilities.fetch();

    // population for this strategy
    const startAge = ageGroupIndexStart ? ageGroups[ageGroupIndexStart][0] : ageGroups[0][0];
    const endAge = ageGroupIndexEnd ? ageGroups[ageGroupIndexEnd][1] : ageGroups[1][1];
    const query: {[key: string]: string | {[key: string]: Genders | number}} = {
      market: marketName,
      gender: {
        $in: genders || ['f', 'm', 'x']
      },
      age: {
        $gte: startAge,
        $lte: endAge
      }
    };
    // Make sure only the counts per age group / gender are being reported in query
    const projection: {count: number} = {count: 0};
    projection.count = 1;
    // Filter right counts for selected age range / gender
    const populationForStrategy = Populations.find(query, {
      fields: projection
    }).fetch();

    // Summarize all filtered counts per age range / gender to one number
    const populationCountForStrategy = populationForStrategy.reduce((subTotal, current) => subTotal + current.count, 0);

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
          (respondentsProbabilitiesForTouchPoint.size / respondentsCountForStrategy) * populationCountForStrategy * 5
        );
      } else if (touchPoint.inputTypeIndex == InputType.Grps && respondentsProbabilitiesForTouchPoint) {
        maxValues.set(
          touchPoint.name,
          ((respondentsProbabilitiesForTouchPoint.size / respondentsCountForStrategy) *
            populationCountForStrategy *
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
