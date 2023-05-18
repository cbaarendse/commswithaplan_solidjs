// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createReachDataTool from './reachdata';
import Probabilities from '../../probabilities/server/probabilities';
import Populations from '../../populations/populations';
import type {
  AgeGroup,
  DeployedTouchPoint,
  Genders,
  RespondentOutcome,
  Results,
  Strategy,
  TouchPointName
} from '/imports/both/typings/types';
import {INPUTTYPE} from '/imports/both/constants/constants';

// variables
const reachDataTool = createReachDataTool();
const preparedRespondents: RespondentOutcome[] = [];

// functions

Meteor.methods({
  'strategies.prepareRespondents': function (args: {
    userId: Strategy['userId'];
    marketName: Strategy['marketName'];
    genders: Strategy['genders'];
    ageGroupIndexStart: Strategy['ageGroupIndexStart'];
    ageGroupIndexEnd: Strategy['ageGroupIndexEnd'];
    deployment: Strategy['deployment'];
    ageGroups: AgeGroup[];
  }): number {
    if (preparedRespondents.length > 0) {
      preparedRespondents.length = 0;
    }

    // Filter probabilities for this briefing / strategy
    const {marketName, ageGroupIndexStart, ageGroupIndexEnd, genders} = args;
    const touchPoints: DeployedTouchPoint[] = args.deployment;
    const probabilities = Probabilities.find({
      marketName: marketName,
      gender: {$in: genders},
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    }).fetch();

    const flattenedRespondents = reachDataTool.flattenRespondentsForTouchPoints(touchPoints, probabilities);
    preparedRespondents.push(...flattenedRespondents);
    return preparedRespondents.length;
  },

  'strategies.calculateAverageProbabilities': function (args: {
    userId: Strategy['userId'];
    deployment: Strategy['deployment'];
  }): {touchPoint: TouchPointName; averageProbability: number}[] {
    if (!Match.test(args, Object) || !Match.test(args.deployment, Array)) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    console.log('calculateAverageProbabilities runs on server');
    const result = [];
    const touchPoints = args.deployment;
    //const userId = args.userId;
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
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const thisTouchPoint = touchPoints[touchPointIndex];
      const respondentsThisTouchPoint: RespondentOutcome[] = preparedRespondents.filter(
        (respondent) => thisTouchPoint.name === respondent.touchPoint
      );
      const thisProbabilitiesSum: number = respondentsThisTouchPoint.reduce(
        (sum, respondent) => sum + respondent.probability,
        0
      );
      const thisAverageProbability = thisProbabilitiesSum / respondentsThisTouchPoint.length;
      const averageForThisTouchPoint = {touchPoint: thisTouchPoint.name, averageProbability: thisAverageProbability};
      result.push(averageForThisTouchPoint);
    }
    return result;
  },

  'strategies.getRespondentsNotReached': function (args: {
    userId: Strategy['userId'];
    deployment: Strategy['deployment'];
  }): {
    touchPoint: TouchPointName;
    respondentsNotReached: number;
  }[] {
    if (!Match.test(args, Object) || !Match.test(args.deployment, Array)) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    console.log('filterRespondentsNotReached runs on server');
    const notReached = [];
    const touchPoints = args.deployment;
    //const userId = args.userId;
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

    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const thisTouchPoint = touchPoints[touchPointIndex];
      const thisRespondentsNotReached: RespondentOutcome[] = preparedRespondents.filter(
        (respondent) => thisTouchPoint.name === respondent.touchPoint && respondent.probability === 0
      );

      const respondentsNotReachedForThisTouchPoint = {
        touchPoint: thisTouchPoint.name,
        respondentsNotReached: thisRespondentsNotReached.length
      };
      notReached.push(respondentsNotReachedForThisTouchPoint);
    }
    return notReached;
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
  }): {touchPoint: TouchPointName; max: number}[] {
    // Filter probabilities for this briefing / strategy
    const {marketName, ageGroupIndexStart, ageGroupIndexEnd, genders, ageGroups} = args;
    const touchPoints: DeployedTouchPoint[] = args.deployment;

    // population for selected age / gender combination
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
    const projection: {count: number} = {count: 1};
    // Filter right counts for selected age range / gender
    const population = Populations.find(query, {
      fields: projection
    }).fetch();

    // Summarize all filtered counts per age range / gender to one number
    const populationCount = population.reduce((subTotal, current) => subTotal + current.count, 0);
    console.log('populationCount in maxValues; ', populationCount);

    const maxValues: {touchPoint: TouchPointName; max: number}[] = [];
    // for each deployed touchpoint only select respondents with a contact probability > 0
    touchPoints.forEach((touchPoint) => {
      const respondentsThisTouchPoint = preparedRespondents.filter(
        (respondent) => touchPoint.name === respondent.touchPoint
      );
      const maxForTouchPoint = {touchPoint: touchPoint.name, max: 1};
      if (
        (touchPoint.inputTypeIndex == INPUTTYPE.Contacts || touchPoint.inputTypeIndex == INPUTTYPE.Impressions) &&
        respondentsThisTouchPoint
      ) {
        maxForTouchPoint.max = (respondentsThisTouchPoint.length / preparedRespondents.length) * populationCount * 5;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Grps && respondentsThisTouchPoint) {
        maxForTouchPoint.max =
          ((respondentsThisTouchPoint.length / preparedRespondents.length) * populationCount * 5) / 10000;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Reach && respondentsThisTouchPoint) {
        const maxReach = respondentsThisTouchPoint.length / preparedRespondents.length;
        maxForTouchPoint.max = Math.max(maxReach, 0.01);
      }
      maxValues.push(maxForTouchPoint);
    });
    return maxValues;
  },
  // results
  'strategies.calculateResultsWithData': function (args: {
    userId: Strategy['userId'];
    deployment: Strategy['deployment'];
    averageProbabilities: Pick<RespondentOutcome, 'touchPoint' | 'probability'>[];
  }): Results {
    if (!Match.test(args, Object) || !Match.test(args.deployment, Array)) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    console.log('calculateResultsWithData runs on server');

    const {userId} = args;

    // filter touchPoints for this strategy
    const touchPoints: DeployedTouchPoint[] = args.deployment;

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

    // Build non-unique respondents
    // Collect respondents
    const reachedRespondents = reachDataTool.determineReachedRespondents(touchPoints, preparedRespondents);
    console.log('reachedRespondents in calculateResultsWithData:', reachedRespondents);

    // Unique respondents
    const reachedRespondentsIds = reachedRespondents.map((respondent) => respondent.respondentId);
    const reachedUniqueRespondentsIds: Set<RespondentOutcome['respondentId']> = new Set(reachedRespondentsIds);
    const totalReachForResult = Number.isNaN(reachedUniqueRespondentsIds.size / preparedRespondents.length)
      ? 0
      : reachedUniqueRespondentsIds.size / preparedRespondents.length;

    // Count respondents for overlap
    // TODO: overlap check
    const uniqueTouchPointNames = [...new Set(reachedRespondents.map((respondent) => respondent.touchPoint))];
    const respondentsForOverlap = reachedRespondents.filter((respondent) =>
      uniqueTouchPointNames.every((touchPoint) =>
        reachedRespondents.some(
          (innerRespondent) =>
            innerRespondent.respondentId === respondent.respondentId && innerRespondent.touchPoint === touchPoint
        )
      )
    );

    // strategy.overlap
    const overlapForResult = Number.isNaN(respondentsForOverlap.length / preparedRespondents.length)
      ? 0
      : respondentsForOverlap.length / preparedRespondents.length;
    console.log(
      'respondentsCountedForOverlap.length: ',
      respondentsForOverlap.length,
      'preparedRespondents.length: ',
      preparedRespondents.length
    );
    console.log('totalReachForResult: ', totalReachForResult, 'overlapForResult: ', overlapForResult);

    return [totalReachForResult, overlapForResult];
  }
});
