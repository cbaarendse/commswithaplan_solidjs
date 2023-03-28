import {
  Probability,
  DeployedTouchPoint,
  PopulationForStrategy,
  ComplementedTouchPoint,
  RespondentsCount,
  TouchPointName,
  InputType
} from '/imports/both/typings/types';

export default function createReachDataTool() {
  // arrange respondents for touchpoint
  // results in an object with strings as keys and Maps as values;
  function getProbabilitiesForTouchPoints(
    deployedTouchPoints: DeployedTouchPoint[],
    probabilities: Probability[]
  ): Map<TouchPointName, Map<Probability['respondentId'], number>> {
    const respondentsProbabilitiesForTouchPoints: Map<
      TouchPointName,
      Map<Probability['respondentId'], number>
    > = new Map();
    for (let touchPointIndex = 0; touchPointIndex < deployedTouchPoints.length; touchPointIndex++) {
      const touchPointProbabilities: Map<Probability['respondentId'], number> = new Map();
      for (let probabilityIndex = 0; probabilityIndex < probabilities.length; probabilityIndex++) {
        const touchPointName = deployedTouchPoints[touchPointIndex].name;
        const probability = probabilities[probabilityIndex];
        if (probability[touchPointName] > 0) {
          touchPointProbabilities.set(probability.respondentId, probability[touchPointName]);
        }
        const sortedTouchPointProbabilities = new Map(
          [...touchPointProbabilities.entries()].sort((a, b) => b[1] - a[1])
        );
        respondentsProbabilitiesForTouchPoints.set(touchPointName, sortedTouchPointProbabilities);
      }
    }
    return respondentsProbabilitiesForTouchPoints;
  }

  function complementTouchPoints(
    touchPoints: DeployedTouchPoint[],
    respondentsProbabilitiesForTouchPoints: Map<TouchPointName, Map<Probability['respondentId'], number>>
  ): ComplementedTouchPoint[] {
    const complementedTouchPoints = touchPoints.map((touchPoint) => {
      const {name, value, inputTypeIndex} = touchPoint;
      const respondentsProbabilitiesForTouchPoint = respondentsProbabilitiesForTouchPoints.get(name);
      const probabilitiesForTouchPoint = [];
      if (respondentsProbabilitiesForTouchPoint) {
        for (const [key, value] of respondentsProbabilitiesForTouchPoint) {
          probabilitiesForTouchPoint.push(value);
        }
      }
      // set basis of object
      const complementedTouchPoint: ComplementedTouchPoint = {
        name: name,
        value: value,
        inputTypeIndex: inputTypeIndex,
        selected: value === 0 ? false : true,
        maxReachedRespondents: respondentsProbabilitiesForTouchPoint ? respondentsProbabilitiesForTouchPoint.size : 0,
        sumOfProbabilities: probabilitiesForTouchPoint.reduce((sum, probability) => {
          return sum + probability;
        }, 0)
      };

      return complementedTouchPoint;
    });
    return complementedTouchPoints;
  }

  function collectReachedRespondentsForTouchPoints(
    complementedTouchPoints: ComplementedTouchPoint[],
    populationCountForStrategy: PopulationForStrategy,
    respondentsProbabilitiesForTouchPoints: Map<TouchPointName, Map<Probability['respondentId'], number>>,
    respondentsCountForStrategy: number
  ): Map<TouchPointName, Probability['respondentId'][]> {
    const reachedRespondentsForTouchPoints: Map<TouchPointName, Probability['respondentId'][]> = new Map();

    for (let touchPointIndex = 0; touchPointIndex < complementedTouchPoints.length; touchPointIndex++) {
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
        console.log(
          'reachedRespondentsForTouchPointCount in collect reachedRespondents: ',
          reachedRespondentsForTouchPointCount
        );
        console.log(
          'Array.from(respondentsProbabilitiesForTouchPoint.entries()) in collect reachedRespondents: ',
          Array.from(respondentsProbabilitiesForTouchPoint.entries())
        );

        let contacts = 0;
        for (let index = 0; index < reachedRespondentsForTouchPointCount; index++) {
          console.log(
            'Array.from(respondentsProbabilitiesForTouchPoint.entries())[index];  in collect reachedRespondents: ',
            Array.from(respondentsProbabilitiesForTouchPoint.entries())[index]
          );
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

  function calculateReachForTouchPoint(reachedRespondents: number[], respondentsCountForMarket: RespondentsCount) {
    return Number.isNaN((reachedRespondents.length / respondentsCountForMarket) * 100)
      ? 0
      : (reachedRespondents.length / respondentsCountForMarket) * 100;
  }

  function calculateOtsForTouchPoint(touchPoint: ComplementedTouchPoint) {
    if (!touchPoint.grps || !touchPoint.reach) {
      return 0;
    } else {
      return Number.isNaN(touchPoint.grps / touchPoint.reach) ? 0 : touchPoint.grps / touchPoint.reach;
    }
  }

  // function totalReachWithAlgorithmForStrategy(rV: number[]) {
  //   if (rV.length === 0) {
  //     return 0;
  //   } else if (rV.length > 0) {
  //     let reach1 = 100;
  //     let reach2 = 1;
  //     for (let i = 0; i < rV.length; i++) {
  //       if (i === 0) {
  //         reach1 = 100 - rV[i];
  //       } else {
  //         reach2 *= 1 - rV[i] / 100;
  //       }
  //     }
  //     return 100 - reach1 * reach2;
  //   } else {
  //     return 0;
  //   }
  // }

  // function overlapWithAlgorithmForStrategy(rV: number[]) {
  //   if (rV.length === 0) {
  //     return 0;
  //   } else if (rV.length > 0) {
  //     let duplicateReach = 1;
  //     for (let i = 0; i < rV.length; i++) {
  //       const reach = rV[i] / 100;
  //       duplicateReach *= reach;
  //     }
  //     return 100 * duplicateReach;
  //   } else {
  //     return 0;
  //   }
  // }

  return {
    getProbabilitiesForTouchPoints,
    complementTouchPoints,
    collectReachedRespondentsForTouchPoints,
    calculateReachForTouchPoint,
    calculateOtsForTouchPoint
  };
}
