// imports
import type {Probability, DeployedTouchPoint, RespondentOutcome} from '/imports/both/typings/types';

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

  //TODO: check this function, because gives back empty aray, while arguments are all valid
  function determineReachedRespondents(
    touchPoints: DeployedTouchPoint[],
    respondents: RespondentOutcome[]
  ): RespondentOutcome[] {
    const reachedRespondents: RespondentOutcome[] = [];
    // loop over deployed touchPoints
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const thisTouchPoint = touchPoints[touchPointIndex];
      let reachedRespondentsThisTouchPoint: RespondentOutcome[] = [];
      const respondentsThisTouchPoint: RespondentOutcome[] = respondents.filter(
        (respondent) => thisTouchPoint.name === respondent.touchPoint
      );
      if (thisTouchPoint.reach) {
        const reached: number = Math.floor(thisTouchPoint.reach * respondents.length);
        reachedRespondentsThisTouchPoint = respondentsThisTouchPoint.slice(0, reached - 1);
      }
      reachedRespondents.push(...reachedRespondentsThisTouchPoint);
    }
    console.log('in determine reached respondents - reachedRespondents: ', reachedRespondents);
    return reachedRespondents;
  }
  return {
    flattenRespondentsForTouchPoints,
    determineReachedRespondents
  };
}
