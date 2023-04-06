import {INPUTTYPE} from '/imports/both/constants/constants';
import type {
  Probability,
  DeployedTouchPoint,
  ComplementedTouchPoint,
  TouchPointName,
  PopulationCountForStrategy,
  RespondentOutcome
} from '/imports/both/typings/types';

export default function createReachDataTool() {
  function flattenRespondentsForTouchPoints(
    touchPoints: DeployedTouchPoint[],
    probabilities: Probability[]
  ): RespondentOutcome[] {
    const filteredRespondents: RespondentOutcome[] = [];
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const respondentsForThisTouchPoint: RespondentOutcome[] = [];
      const thisTouchPointName = touchPoints[touchPointIndex].name;
      for (let probabilityIndex = 0; probabilityIndex < probabilities.length; probabilityIndex++) {
        const thisProbability = probabilities[probabilityIndex];
        if (thisProbability[thisTouchPointName] > 0) {
          respondentsForThisTouchPoint.push({
            respondentId: thisProbability.respondentId,
            touchPointName: thisTouchPointName,
            probability: thisProbability[thisTouchPointName]
          });
        }
        respondentsForThisTouchPoint.sort(
          (
            a: {
              respondentId: string;
              touchPointName: TouchPointName;
              probability: number;
            },
            b: {
              respondentId: string;
              touchPointName: TouchPointName;
              probability: number;
            }
          ) => b.probability - a.probability
        );
      }
      filteredRespondents.push(...respondentsForThisTouchPoint);
    }
    return filteredRespondents;
  }

  function complementCountedTouchPoints(
    touchPoints: DeployedTouchPoint[],
    respondentsProbabilitiesForTouchPoints: RespondentOutcome[]
  ): ComplementedTouchPoint[] {
    const complementedTouchPoints = touchPoints.map((touchPoint) => {
      const {name, value} = touchPoint;
      const respondentsProbabilitiesForTouchPoint = respondentsProbabilitiesForTouchPoints.filter(
        (probability) => name === probability.touchPointName
      );
      // complement touchPoint object
      Object.assign(touchPoint, {
        selected: value === 0 ? false : true,
        maxReachedRespondents: respondentsProbabilitiesForTouchPoint ? respondentsProbabilitiesForTouchPoint.length : 0
      });
      return touchPoint;
    });
    return complementedTouchPoints;
  }

  function determineReachedRespondents(
    touchPoints: ComplementedTouchPoint[],
    respondents: RespondentOutcome[],
    populationCount: PopulationCountForStrategy
  ): RespondentOutcome[] {
    const reachedRespondents: RespondentOutcome[] = [];
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const thisTouchPoint = touchPoints[touchPointIndex];
      const respondentsThisTouchPoint: RespondentOutcome[] = respondents.filter(
        (respondent) => thisTouchPoint.name === respondent.touchPointName
      );
      const sumOfProbalitiesForThisTouchPoint = respondentsThisTouchPoint.reduce((sum, respondent) => {
        return sum + respondent.probability;
      }, 0);
      const bareReach =
        sumOfProbalitiesForThisTouchPoint && respondentsThisTouchPoint
          ? sumOfProbalitiesForThisTouchPoint / respondentsThisTouchPoint.length
          : 0;

      // For INPUTTYPE.Reach:
      if (respondentsThisTouchPoint && thisTouchPoint.inputTypeIndex == INPUTTYPE.Reach) {
        // convert reach input to reached respondents
        const reachThisTouchPoint = thisTouchPoint.value;
        // Math.log(x) = inv. Math.pow(e, y)
        const exponent = Math.log(reachThisTouchPoint) - 1;
        thisTouchPoint.grps = exponent;
      }

      // For INPUTTYPE.Contacts, INPUTTYPE.Grps, INPUTTYPE.Impressions:
      if (
        respondentsThisTouchPoint &&
        (thisTouchPoint.inputTypeIndex == INPUTTYPE.Grps ||
          thisTouchPoint.inputTypeIndex == INPUTTYPE.Contacts ||
          thisTouchPoint.inputTypeIndex == INPUTTYPE.Impressions)
      ) {
        thisTouchPoint.grps =
          thisTouchPoint.inputTypeIndex == INPUTTYPE.Grps
            ? thisTouchPoint.value
            : (thisTouchPoint.value / populationCount) * 100;
      }

      // continue
      const reachedRespondentsThisTouchPoint = respondentsThisTouchPoint
        .map((respondent, index, respondentsThisTouchPoint): Required<RespondentOutcome> => {
          const exponent = thisTouchPoint.grps
            ? (-respondent.probability * thisTouchPoint.grps) / respondentsThisTouchPoint.length
            : 0;
          // Math.pow(Math.E, 0) = 1, so if exponent == 0, reach = 0
          const reachThisTouchPoint = 1 * (1 - Math.pow(Math.E, exponent));
          return Object.assign(respondent, {reach: reachThisTouchPoint});
        })
        .filter((respondent) => respondent.reach >= 1);
      reachedRespondents.push(...reachedRespondentsThisTouchPoint);
    }
    return reachedRespondents;
  }

  return {
    flattenRespondentsForTouchPoints,
    complementCountedTouchPoints,
    determineReachedRespondents
  };
}
