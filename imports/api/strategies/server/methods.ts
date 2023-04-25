// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import createReachDataTool from './reachdata';
import Probabilities from '../../probabilities/server/probabilities';
import Populations from '../../populations/populations';
import type {
  AgeGroup,
  ComplementedTouchPoint,
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
const respondentsCount: {count: number} = {count: 0};

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
  }): boolean {
    if (preparedRespondents.length > 0) {
      preparedRespondents.length = 0;
    }

    // Filter probabilities for this briefing / strategy
    const {marketName, ageGroupIndexStart, ageGroupIndexEnd, genders} = args;
    const touchPoints: DeployedTouchPoint[] = args.deployment;
    const probabilitiesCursor = Probabilities.find({
      marketName: marketName,
      gender: {$in: genders},
      age_group: {$gte: ageGroupIndexStart, $lte: ageGroupIndexEnd}
    });

    const probabilities = probabilitiesCursor.fetch();
    respondentsCount.count = probabilitiesCursor.count();
    const flattenedRespondents = reachDataTool.flattenRespondentsForTouchPoints(touchPoints, probabilities);
    preparedRespondents.push(...flattenedRespondents);
    return preparedRespondents.length > 0;
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
        (respondent) => touchPoint.name === respondent.touchPointName
      );
      const maxForTouchPoint = {touchPoint: touchPoint.name, max: 1};
      if (
        (touchPoint.inputTypeIndex == INPUTTYPE.Contacts || touchPoint.inputTypeIndex == INPUTTYPE.Impressions) &&
        respondentsThisTouchPoint
      ) {
        maxForTouchPoint.max = (respondentsThisTouchPoint.length / respondentsCount.count) * populationCount * 5;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Grps && respondentsThisTouchPoint) {
        maxForTouchPoint.max =
          ((respondentsThisTouchPoint.length / respondentsCount.count) * populationCount * 5) / 10000;
      } else if (touchPoint.inputTypeIndex == INPUTTYPE.Reach && respondentsThisTouchPoint) {
        const maxReach = respondentsThisTouchPoint.length / respondentsCount.count;
        maxForTouchPoint.max = Math.max(maxReach, 0.01);
      }
      console.log('maxValues => maxForTouchPoint ', maxForTouchPoint, 'inputTypeIndex: ', touchPoint.inputTypeIndex);
      maxValues.push(maxForTouchPoint);
    });
    return maxValues;
  },
  // results
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
    console.log('calculateResultsWithData runs on server');

    const {userId, marketName, ageGroupIndexStart, ageGroupIndexEnd, genders, ageGroups} = args;

    // filter touchPoints for this strategy
    const touchPointsDeployed: DeployedTouchPoint[] = args.deployment;
    const touchPoints: DeployedTouchPoint[] = touchPointsDeployed.filter((touchPoint) => touchPoint.value > 0);

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

    // Filter population

    const startAge = ageGroupIndexStart ? ageGroups[ageGroupIndexStart][0] : ageGroups[0][0];
    const endAge = ageGroupIndexEnd ? ageGroups[ageGroupIndexEnd][1] : ageGroups[1][1];
    const populationQuery = {
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

    // add properties to touchpoints
    const complementedTouchPoints: ComplementedTouchPoint[] = reachDataTool.complementCountedTouchPoints(
      touchPoints,
      preparedRespondents
    );

    // Build non-unique respondents
    // Collect respondents
    const reachedRespondents = reachDataTool.determineReachedRespondents(
      complementedTouchPoints,
      preparedRespondents,
      populationCountForStrategy
    );
    console.log('populationCountForStrategy :', populationCountForStrategy);
    console.log('reachedRespondents :', reachedRespondents);

    // Unique respondents
    const reachedRespondentsIds = reachedRespondents.map((respondent) => respondent.respondentId);
    const reachedUniqueRespondentsIds: Set<RespondentOutcome['respondentId']> = new Set(reachedRespondentsIds);
    const totalReachForResult = Number.isNaN(reachedUniqueRespondentsIds.size / respondentsCount.count)
      ? 0
      : reachedUniqueRespondentsIds.size / respondentsCount.count;

    // Count respondents for overlap
    // TODO: overlap check
    const uniqueTouchPointNames = [...new Set(reachedRespondents.map((respondent) => respondent.touchPointName))];
    const respondentsForOverlap = reachedRespondents.filter((respondent) =>
      uniqueTouchPointNames.every((touchPointName) =>
        reachedRespondents.some(
          (respon) => respon.respondentId === respondent.respondentId && respon.touchPointName === touchPointName
        )
      )
    );

    // strategy.overlap
    const overlapForResult = Number.isNaN(respondentsForOverlap.length / respondentsCount.count)
      ? 0
      : respondentsForOverlap.length / respondentsCount.count;
    console.log(
      'respondentsCountedForOverlap.length: ',
      respondentsForOverlap.length,
      'respondentsCount.count: ',
      respondentsCount.count
    );
    console.log('totalReachForResult: ', totalReachForResult, 'overlapForResult: ', overlapForResult);

    return [totalReachForResult, overlapForResult];
  }
});
