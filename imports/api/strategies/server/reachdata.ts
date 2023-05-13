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
    const flattenedRespondents: RespondentOutcome[] = [];
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const respondentsForThisTouchPoint: RespondentOutcome[] = [];
      const thisTouchPoint = touchPoints[touchPointIndex].name;
      for (let probabilityIndex = 0; probabilityIndex < probabilities.length; probabilityIndex++) {
        const thisProbability = probabilities[probabilityIndex];
        respondentsForThisTouchPoint.push({
          respondentId: thisProbability.respondentId,
          touchPoint: thisTouchPoint,
          probability: thisProbability[thisTouchPoint]
        });
      }
      respondentsForThisTouchPoint.sort((a: RespondentOutcome, b: RespondentOutcome) => b.probability - a.probability);
      flattenedRespondents.push(...respondentsForThisTouchPoint);
    }
    return flattenedRespondents;
  }

  function complementCountedTouchPoints(
    touchPoints: DeployedTouchPoint[],
    respondentsProbabilitiesForTouchPoints: RespondentOutcome[]
  ): ComplementedTouchPoint[] {
    const complementedTouchPoints = touchPoints.map((touchPoint) => {
      const {name, value} = touchPoint;
      const respondentsProbabilitiesForTouchPoint = respondentsProbabilitiesForTouchPoints.filter(
        (probability) => name === probability.touchPoint
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
  //TODO: check this function, because gives back empty aray, while arguments are all valid
  function determineReachedRespondents(
    touchPoints: ComplementedTouchPoint[],
    respondents: RespondentOutcome[],
    averageProbabilities: Pick<RespondentOutcome, 'touchPoint' | 'probability'>
  ): RespondentOutcome[] {
    const reachedRespondents: RespondentOutcome[] = [];
    // loop over deployed touchPoints
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const thisTouchPoint = touchPoints[touchPointIndex];

      const respondentsThisTouchPoint: RespondentOutcome[] = respondents.filter(
        (respondent) => thisTouchPoint.name === respondent.touchPoint
      );

      // For INPUTTYPE.Reach:
      if (respondentsThisTouchPoint && thisTouchPoint.inputTypeIndex == INPUTTYPE.Reach) {
        //TODO:
      }

      // For INPUTTYPE.Contacts, INPUTTYPE.Grps, INPUTTYPE.Impressions:
      if (
        respondentsThisTouchPoint &&
        (thisTouchPoint.inputTypeIndex == INPUTTYPE.Grps ||
          thisTouchPoint.inputTypeIndex == INPUTTYPE.Contacts ||
          thisTouchPoint.inputTypeIndex == INPUTTYPE.Impressions)
      ) {
        // continue
        const respondentsWithReachThisTouchPoint = respondentsThisTouchPoint.map(
          (respondent, index, respondentsThisTouchPoint): Required<RespondentOutcome> => {
            const exponent = thisTouchPoint.grps
              ? (-respondent.probability * thisTouchPoint.grps) / respondentsThisTouchPoint.length
              : 0;
            // Math.pow(Math.E, 0) = 1, so if exponent == 0, reach = 0
            const reachThisTouchPoint = 1 * (1 - Math.pow(Math.E, exponent));
            return Object.assign(respondent, {reach: reachThisTouchPoint});
          }
        );
        const reachedRespondentsThisTouchPoint = respondentsWithReachThisTouchPoint.filter(
          (respondent) => respondent.reach >= 0.01
        );
        reachedRespondents.push(...reachedRespondentsThisTouchPoint);
      }
      console.log('in determine reached respondents - reachedRespondents: ', reachedRespondents);
      return reachedRespondents;
    }
  }
  return {
    flattenRespondentsForTouchPoints,
    complementCountedTouchPoints,
    determineReachedRespondents
  };
}
