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
    const probabilitiesForTouchPoints: Map<TouchPointName, Map<Probability['respondentId'], number>> = new Map();
    for (let touchPointIndex = 0; touchPointIndex < deployedTouchPoints.length; touchPointIndex++) {
      const thisTouchPointProbabilities: Map<Probability['respondentId'], number> = new Map();
      for (let probabilityIndex = 0; probabilityIndex < probabilities.length; probabilityIndex++) {
        const touchPointName = deployedTouchPoints[touchPointIndex].name;
        const probability = probabilities[probabilityIndex];
        if (probability[touchPointName] > 0) {
          thisTouchPointProbabilities.set(probability.respondentId, probability[touchPointName]);
        }
        probabilitiesForTouchPoints.set(touchPointName, thisTouchPointProbabilities);
      }
    }
    return probabilitiesForTouchPoints;
  }

  function complementTouchPoints(
    touchPoints: DeployedTouchPoint[],
    populationInRange: PopulationInRange,
    probabilitiesForTouchPoints: Map<TouchPointName, Map<Probability['respondentId'], number>>
  ): ComplementedTouchPoint[] {
    const complementedTouchPoints = touchPoints.map((touchPoint) => {
      const {name, value, inputType} = touchPoint;
      const respondentsProbabilitiesForTouchPoint = probabilitiesForTouchPoints.get(name);
      const allProbabilitiesForTouchPoint = [];
      if (respondentsProbabilitiesForTouchPoint) {
        for (const [key, value] of respondentsProbabilitiesForTouchPoint) {
          allProbabilitiesForTouchPoint.push(value);
        }
      }
      // set basis of object
      const complementedTouchPoint: ComplementedTouchPoint = {
        name: name,
        value: value,
        inputType: inputType,
        selected: value === 0 ? false : true,
        maxReachedRespondents: respondentsProbabilitiesForTouchPoint ? respondentsProbabilitiesForTouchPoint.size : 0,
        sumOfProbabilities: allProbabilitiesForTouchPoint.reduce((sum, probability) => {
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
    probabilitiesForTouchPoints: {[key in TouchPointName]: Map<Probability['respondentId'], number>}
  ): Partial<{[key in TouchPointName]: Probability['respondentId'][]}> {
    const reachedRespondentsForTouchPoints = complementedTouchPoints.reduce(
      (
        result: Partial<{[key in TouchPointName]: Probability['respondentId'][]}>,
        touchPoint: ComplementedTouchPoint
      ) => {
        const reachForRespondentsForTouchPoint: Map<Probability['respondentId'], number> = new Map();
        const reachedRespondentsForTouchPoint: Probability['respondentId'][] = [];
        const touchPointName: TouchPointName = touchPoint['name'];
        const probabilitiesForTouchPoint =
          probabilitiesForTouchPoints[
            touchPointName as keyof {[key in TouchPointName]: Map<Probability['respondentId'], number>}
          ];
        if (probabilitiesForTouchPoint) {
          probabilitiesForTouchPoint.forEach(
            (
              probability: number,
              respondentId: number,
              probabilitiesForTouchPoint: Map<Probability['respondentId'], number>
            ) => {
              // check which probabilities
              const exponent = touchPoint.grps ? (-probability * touchPoint.grps) / probabilitiesForTouchPoint.size : 0;
              // Math.pow(Math.E, 0) = 1, so if exponent == 0, reach = 0
              const reach = 1 * (1 - Math.pow(Math.E, exponent)) * 100;
              reachForRespondentsForTouchPoint.set(respondentId, reach);
            }
          );
        }

        reachForRespondentsForTouchPoint.forEach((reach, respondentId) => {
          if (reach >= 1) {
            // Add respondent to array with reached respondents for this touchpoint
            reachedRespondentsForTouchPoint.push(respondentId);
          }
        });
        result[touchPointName] = reachedRespondentsForTouchPoint || [];
        return result;
      },
      {}
    );
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
