import {Mongo} from 'meteor/mongo';
import type {
  Probability,
  DeployedTouchPoint,
  PopulationInRange,
  ComplementedTouchPoint,
  RespondentsCount,
  TouchPointName
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
      const thisTouchPointProbabilities: Map<Probability['respondentId'], number> = new Map();
      for (let probabilityIndex = 0; probabilityIndex < probabilities.length; probabilityIndex++) {
        const touchPointName = deployedTouchPoints[touchPointIndex].name;
        const probability = probabilities[probabilityIndex];
        if (probability[touchPointName] > 0) {
          thisTouchPointProbabilities.set(probability.respondentId, probability[touchPointName]);
        }
        respondentsProbabilitiesForTouchPoints.set(touchPointName, thisTouchPointProbabilities);
      }
    }
    return respondentsProbabilitiesForTouchPoints;
  }

  function complementTouchPoints(
    touchPoints: DeployedTouchPoint[],
    populationInRange: PopulationInRange,
    respondentsProbabilitiesForTouchPoints: Map<TouchPointName, Map<Probability['respondentId'], number>>
  ): ComplementedTouchPoint[] {
    const complementedTouchPoints = touchPoints.map((touchPoint) => {
      const {name, value, inputType} = touchPoint;
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
        inputType: inputType,
        selected: value === 0 ? false : true,
        maxReachedRespondents: respondentsProbabilitiesForTouchPoint ? respondentsProbabilitiesForTouchPoint.size : 0,
        sumOfProbabilities: probabilitiesForTouchPoint.reduce((sum, probability) => {
          return sum + probability;
        }, 0)
      };
      // calculate remaining properties using entries from basis
      complementedTouchPoint.grps =
        complementedTouchPoint.inputType == 'contacts' || complementedTouchPoint.inputType == 'impressions'
          ? (value / populationInRange) * 100
          : value;
      complementedTouchPoint.averageProbability =
        complementedTouchPoint.sumOfProbabilities && respondentsProbabilitiesForTouchPoint
          ? complementedTouchPoint.sumOfProbabilities / respondentsProbabilitiesForTouchPoint.size
          : 0;

      return complementedTouchPoint;
    });
    return complementedTouchPoints;
  }

  function collectReachedRespondentsForTouchPoints(
    complementedTouchPoints: ComplementedTouchPoint[],
    respondentsProbabilitiesForTouchPoints: Map<TouchPointName, Map<Probability['respondentId'], number>>
  ): Map<TouchPointName, Probability['respondentId'][]> {
    const reachedRespondentsForTouchPoints: Map<TouchPointName, Probability['respondentId'][]> = new Map();

    for (let touchPointIndex = 0; touchPointIndex < complementedTouchPoints.length; touchPointIndex++) {
      const reachForRespondentsForTouchPoint: Map<Probability['respondentId'], number> = new Map();
      const reachedRespondentsForTouchPoint: Probability['respondentId'][] = [];
      const touchPoint: ComplementedTouchPoint = complementedTouchPoints[touchPointIndex];
      const respondentsProbabilitiesForTouchPoint = respondentsProbabilitiesForTouchPoints.get(touchPoint.name);

      if (respondentsProbabilitiesForTouchPoint) {
        respondentsProbabilitiesForTouchPoint.forEach(
          (
            probability: number,
            respondentId: number,
            respondentsProbabilitiesForTouchPoint: Map<Probability['respondentId'], number>
          ) => {
            // check which probabilities
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
        reachedRespondentsForTouchPoints.set(touchPoint.name, reachedRespondentsForTouchPoint);
      }
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
