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

  'strategies.averageProbabilitiesAndNotReachedPerTouchPoint': function (args: {
    userId: Strategy['userId'];
    deployment: Strategy['deployment'];
  }): DeployedTouchPoint[] {
    if (!Match.test(args, Object) || !Match.test(args.deployment, Array)) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    console.log('calculateAverageProbabilities runs on server');
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
      const respondentsNotReachedThisTouchPoint: RespondentOutcome[] = preparedRespondents.filter(
        (respondent) => thisTouchPoint.name === respondent.touchPoint && respondent.probability === 0
      );
      touchPoints[touchPointIndex].averageProbability = thisAverageProbability;
      touchPoints[touchPointIndex].respondentsNotReached = respondentsNotReachedThisTouchPoint.length;
    }
    return touchPoints;
  },

  // results
  'strategies.calculateReachAndOverlapWithData': function (args: {
    userId: Strategy['userId'];
    deployment: Strategy['deployment'];
  }): Results {
    if (!Match.test(args, Object) || !Match.test(args.deployment, Array)) {
      throw new Meteor.Error('general.invalid.input', `Invalid input: ${args}`, '[{ "name": "invalidInput" }]');
    }
    console.log('calculateReachAndOverlapWithData runs on server');

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
    console.log('reachedRespondents in calculateReachAndOverlapWithData:', reachedRespondents);

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
