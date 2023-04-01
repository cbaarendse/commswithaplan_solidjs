import {
  Probability,
  DeployedTouchPoint,
  ComplementedTouchPoint,
  TouchPointName,
  InputType,
  PopulationCountForStrategy,
  RespondentsCount
} from '/imports/both/typings/types';

export default function createReachDataTool() {
  function lineUpProbabilitiesForTouchPoints(
    touchPoints: DeployedTouchPoint[],
    probabilities: Probability[]
  ): {respondentId: string; touchPointName: TouchPointName; probability: number}[] {
    const respondentsProbabilitiesForTouchPoints: {
      respondentId: string;
      touchPointName: TouchPointName;
      probability: number;
    }[] = [];
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const respondentsProbabilitiesForThisTouchPoint: {
        respondentId: string;
        touchPointName: TouchPointName;
        probability: number;
      }[] = [];
      const thisTouchPointName = touchPoints[touchPointIndex].name;
      for (let probabilityIndex = 0; probabilityIndex < probabilities.length; probabilityIndex++) {
        const thisProbability = probabilities[probabilityIndex];
        if (thisProbability[thisTouchPointName] > 0) {
          respondentsProbabilitiesForThisTouchPoint.push({
            respondentId: thisProbability.respondentId,
            touchPointName: thisTouchPointName,
            probability: thisProbability[thisTouchPointName]
          });
        }
        respondentsProbabilitiesForThisTouchPoint.sort(
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
      respondentsProbabilitiesForTouchPoints.push(...respondentsProbabilitiesForThisTouchPoint);
    }
    return respondentsProbabilitiesForTouchPoints;
  }

  function complementCountedTouchPoints(
    touchPoints: DeployedTouchPoint[],
    respondentsProbabilitiesForTouchPoints: ReturnType<typeof lineUpProbabilitiesForTouchPoints>
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

  function filterReachedRespondentsProbabilitiesForCountedTouchPoints(
    touchPoints: ComplementedTouchPoint[],
    respondents: ReturnType<typeof lineUpProbabilitiesForTouchPoints>,
    populationCount: PopulationCountForStrategy,
    respondentsCount: RespondentsCount
  ): ReturnType<typeof lineUpProbabilitiesForTouchPoints>[number] & {reach: number}[] {
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const thisTouchPoint = touchPoints[touchPointIndex];
      const respondentsForThisTouchPoint: ReturnType<typeof lineUpProbabilitiesForTouchPoints> = respondents.filter(
        (respondent) => thisTouchPoint.name === respondent.touchPointName
      );
      const sumOfProbalitiesForThisTouchPoint = respondentsForThisTouchPoint.reduce((sum, respondent) => {
        return sum + respondent.probability;
      }, 0);
      const bareReach =
        sumOfProbalitiesForThisTouchPoint && respondentsForThisTouchPoint
          ? sumOfProbalitiesForThisTouchPoint / respondentsForThisTouchPoint.length
          : 0;

      // For InputType.Reach:
      if (respondentsForThisTouchPoint && thisTouchPoint.inputTypeIndex == InputType.Reach) {
        // convert reach input to reached respondents
        const reachedRespondentsForTouchPointCount = (thisTouchPoint.value / 100) * respondentsCount;

        let contacts = 0;
        for (let index = 0; index < reachedRespondentsForTouchPointCount; index++) {
          const thisProbability = respondentsForThisTouchPoint[index];
          contacts += thisProbability.probability * (populationCount / respondentsCount);
          // Add respondent to array with reached respondents for this touchpoint
          reachedRespondentsForThisTouchPoint.push(thisProbability.respondentId);
        }
        thisTouchPoint.grps = (contacts / populationCount) * 100;
      }

      // For InputType.Contacts, InputType.Grps, InputType.Impressions:
      if (
        respondentsForThisTouchPoint &&
        (thisTouchPoint.inputTypeIndex == InputType.Grps ||
          thisTouchPoint.inputTypeIndex == InputType.Contacts ||
          thisTouchPoint.inputTypeIndex == InputType.Impressions)
      ) {
        thisTouchPoint.grps =
          thisTouchPoint.inputTypeIndex == InputType.Grps
            ? thisTouchPoint.value
            : (thisTouchPoint.value / populationCount) * 100;

        // continue
        respondentsForThisTouchPoint.map(
          (
            respondent,
            index,
            respondentsForThisTouchPoint
          ): ReturnType<typeof lineUpProbabilitiesForTouchPoints>[number] & {reach: number}[] => {
            const exponent = thisTouchPoint.grps
              ? (-respondent.probability * thisTouchPoint.grps) / respondentsForThisTouchPoint.length
              : 0;
            // Math.pow(Math.E, 0) = 1, so if exponent == 0, reach = 0
            const reach = 1 * (1 - Math.pow(Math.E, exponent)) * 100;
            //TODO: further
            return Object.assign(respondent, {reach: reach});
          }
        );
        const reachedRespondents = respondentsForThisTouchPoint.filter((respondent) => respondent.reach >= 1);
      }
      /////////////
      reachedRespondentsForTouchPoints.push(...reachedRespondents);
    }
    return reachedRespondentsForTouchPoints;
  }

  return {
    lineUpProbabilitiesForTouchPoints,
    complementCountedTouchPoints,
    filterReachedRespondentsProbabilitiesForCountedTouchPoints
  };
}
