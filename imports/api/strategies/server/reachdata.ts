import {
  Probability,
  DeployedTouchPoint,
  ComplementedTouchPoint,
  TouchPointName,
  InputType,
  PopulationCountForStrategy
} from '/imports/both/typings/types';

export default function createReachDataTool() {
  function lineUpProbabilitiesForTouchPoints(
    touchPoints: DeployedTouchPoint[],
    probabilities: Probability[]
  ): {touchPointName: TouchPointName; respondentId: string; probability: number}[] {
    const respondentsProbabilitiesForTouchPoints: {
      touchPointName: TouchPointName;
      respondentId: string;
      probability: number;
    }[] = [];
    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const respondentsProbabilitiesForThisTouchPoint: {
        touchPointName: TouchPointName;
        respondentId: string;
        probability: number;
      }[] = [];
      const thisTouchPointName = touchPoints[touchPointIndex].name;
      for (let probabilityIndex = 0; probabilityIndex < probabilities.length; probabilityIndex++) {
        const thisProbability = probabilities[probabilityIndex];
        if (thisProbability[thisTouchPointName] > 0) {
          respondentsProbabilitiesForThisTouchPoint.push({
            touchPointName: thisTouchPointName,
            respondentId: thisProbability.respondentId,
            probability: thisProbability[thisTouchPointName]
          });
        }
        respondentsProbabilitiesForThisTouchPoint.sort(
          (
            a: {
              touchPointName: TouchPointName;
              respondentId: string;
              probability: number;
            },
            b: {
              touchPointName: TouchPointName;
              respondentId: string;
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
        maxReachedRespondents: respondentsProbabilitiesForTouchPoint ? respondentsProbabilitiesForTouchPoint.length : 0,
        sumOfProbabilities: respondentsProbabilitiesForTouchPoint.reduce((sum, thisProbability) => {
          return sum + thisProbability.probability;
        }, 0)
      });
      return touchPoint;
    });
    return complementedTouchPoints;
  }

  function filterReachedRespondentsProbabilitiesForCountedTouchPoints(
    touchPoints: ComplementedTouchPoint[],
    populationCountForStrategy: PopulationCountForStrategy,
    respondentsProbabilitiesForTouchPoints: ReturnType<typeof lineUpProbabilitiesForTouchPoints>,
    respondentsCountForStrategy: number
  ): ReturnType<typeof lineUpProbabilitiesForTouchPoints> {
    const reachedRespondentsForTouchPoints: ReturnType<typeof lineUpProbabilitiesForTouchPoints> = [];

    for (let touchPointIndex = 0; touchPointIndex < touchPoints.length; touchPointIndex++) {
      const reachForRespondentsForTouchPoint: Map<Probability['respondentId'], number> = new Map();
      const reachedRespondentsForTouchPoint: Probability['respondentId'][] = [];
      const touchPoint: ComplementedTouchPoint = complementedTouchPoints[touchPointIndex];
      const respondentsProbabilitiesForTouchPoint = respondentsProbabilitiesForTouchPoints.get(touchPoint.name);

      touchPoint.averageProbability =
        touchPoint.sumOfProbabilities && respondentsProbabilitiesForTouchPoint
          ? touchPoint.sumOfProbabilities / respondentsProbabilitiesForTouchPoint.size
          : 0;

      // For InputType.Reach:
      if (respondentsProbabilitiesForTouchPoint && touchPoint.inputTypeIndex == InputType.Reach) {
        // convert reach input to reached respondents
        const reachedRespondentsForTouchPointCount = (touchPoint.value / 100) * respondentsCountForStrategy;

        let contacts = 0;
        for (let index = 0; index < reachedRespondentsForTouchPointCount; index++) {
          const respondentProbability = Array.from(respondentsProbabilitiesForTouchPoint.entries())[index]; //TODO: undefined
          const respondentId = respondentProbability[0];
          const probability = respondentProbability[1];
          contacts += probability * (populationCountForStrategy / respondentsCountForStrategy);
          // Add respondent to array with reached respondents for this touchpoint
          reachedRespondentsForTouchPoint.push(respondentId);
        }
        touchPoint.grps = (contacts / populationCountForStrategy) * 100;
      }

      // For InputType.Contacts, InputType.Grps, InputType.Impressions:
      if (
        respondentsProbabilitiesForTouchPoint &&
        (touchPoint.inputTypeIndex == InputType.Grps ||
          touchPoint.inputTypeIndex == InputType.Contacts ||
          touchPoint.inputTypeIndex == InputType.Impressions)
      ) {
        touchPoint.grps =
          touchPoint.inputTypeIndex == InputType.Grps
            ? touchPoint.value
            : (touchPoint.value / populationCountForStrategy) * 100;
        respondentsProbabilitiesForTouchPoint.forEach(
          (
            probability: number,
            respondentId: number,
            respondentsProbabilitiesForTouchPoint: Map<Probability['respondentId'], number>
          ) => {
            const exponent = touchPoint.grps
              ? (-probability * touchPoint.grps) / respondentsProbabilitiesForTouchPoint.size
              : 0;
            // Math.pow(Math.E, 0) = 1, so if exponent == 0, reach = 0
            const reach = 1 * (1 - Math.pow(Math.E, exponent)) * 100;
            reachForRespondentsForTouchPoint.set(respondentId, reach);
          }
        );
        reachForRespondentsForTouchPoint.forEach((reach, respondentId) => {
          if (reach >= 1) {
            // Add respondent to array with reached respondents for this touchpoint
            reachedRespondentsForTouchPoint.push(respondentId);
          }
        });
      }
      /////////////
      reachedRespondentsForTouchPoints.set(touchPoint.name, reachedRespondentsForTouchPoint);
    }
    return reachedRespondentsForTouchPoints;
  }

  return {
    lineUpProbabilitiesForTouchPoints,
    complementCountedTouchPoints,
    filterReachedRespondentsProbabilitiesForCountedTouchPoints
  };
}
