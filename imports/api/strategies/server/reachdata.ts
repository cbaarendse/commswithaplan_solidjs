import {Mongo} from 'meteor/mongo';
import type {
  Probability,
  DeployedTouchPoint,
  PopulationInRange,
  ComplementedTouchPoint,
  RespondentsCount,
  TouchPointName,
  InputType
} from '/imports/both/typings/types';

export default function createReachDataTool() {
  // arrange respondents for touchpoint
  function arrangeProbabilitiesForTouchPoints(
    deployedTouchPoints: DeployedTouchPoint[],
    probabilities: Probability[]
  ): {[key in TouchPointName]: Map<Probability['respondentId'], number>} {
    const arrangedProbabilities: {[key in TouchPointName]: Map<Probability['respondentId'], number>} =
      deployedTouchPoints.reduce((result: any, touchPoint) => {
        const thisTouchPointProbabilities: Map<Probability['respondentId'], number> = new Map();
        for (const probability of probabilities) {
          if (probability[touchPoint.name] > 0) {
            thisTouchPointProbabilities.set(probability.respondentId, probability[touchPoint.name]);
          }
          result[touchPoint.name] = thisTouchPointProbabilities;
        }

        return result;
      }, {});
    return arrangedProbabilities;
  }

  function complementTouchPoints(
    touchPoints: DeployedTouchPoint[],
    populationInRange: PopulationInRange,
    respondentsCountForMarket: RespondentsCount,
    probabilitiesForTouchPoints: {[key in TouchPointName]: Map<Probability['respondentId'], number>}
  ): Partial<ComplementedTouchPoint>[] {
    const complementedTouchPoints = touchPoints.map((touchPoint) => {
      const {name, value, inputType} = touchPoint;
      const allProbabilitiesForTouchPoint = [];
      if (probabilitiesForTouchPoints[name]) {
        for (const [key, value] of probabilitiesForTouchPoints[name]) {
          allProbabilitiesForTouchPoint.push(value);
        }
      }
      // set basis of object
      const complementedTouchPoint: Partial<ComplementedTouchPoint> = {
        name: name,
        value: value,
        inputType: inputType,
        selected: value === 0 ? false : true,
        maxReachedRespondents: probabilitiesForTouchPoints[name].size ? probabilitiesForTouchPoints[name].size : 0,
        sumOfProbabilities: allProbabilitiesForTouchPoint.reduce((sum, probability) => {
          return sum + probability;
        }, 0),
        minValue: 0
      };
      // calculate remaining properties using entries from basis
      complementedTouchPoint.grps =
        complementedTouchPoint.inputType == 'contacts' || complementedTouchPoint.inputType == 'impressions'
          ? (value / populationInRange) * 100
          : value;
      complementedTouchPoint.maxValue = complementedTouchPoint.maxReachedRespondents
        ? (complementedTouchPoint.maxReachedRespondents / respondentsCountForMarket) * populationInRange * 5
        : 0;
      complementedTouchPoint.averageProbability = complementedTouchPoint.sumOfProbabilities
        ? complementedTouchPoint.sumOfProbabilities / probabilitiesForTouchPoints[name].size
        : 0;
      console.log('all adapted touchpoints in add properties to touchpoints: ', complementedTouchPoints);
      return complementedTouchPoint;
    });
    return complementedTouchPoints;
  }

  function collectReachedRespondentsForTouchPoints(
    complementedTouchPoints: ComplementedTouchPoint[],
    arrangedProbabilitiesForTouchPoints: {[key in TouchPointName]: Map<Probability['respondentId'], number>}
  ) {
    complementedTouchPoints.reduce((result: any, touchPoint: ComplementedTouchPoint) => {
      const reachForRespondentsForTouchPoint = new Map();
      const reachedRespondentsForTouchPoint: Probability['respondentId'][] = [];
      const touchPointName: TouchPointName = touchPoint['name'];

      arrangedProbabilitiesForTouchPoints[
        touchPointName as keyof {[key in TouchPointName]: Map<Probability['respondentId'], number>}
      ].forEach(
        (
          probability: Map<number, number>,
          respondentId: number | Mongo.ObjectIDStatic,
          arrangedProbabilitiesForTouchPoints: Map<Probability['respondentId'], number>
        ) => {
          const exponent =
            -probability * (touchPoint.grps) / Object.keys(arrangedProbabilitiesForTouchPoints).length);
          const reach = 1 * (1 - Math.pow(Math.E, exponent)) * 100;
          reachForRespondentsForTouchPoint.set(respondentId, reach);
        }
      );
      return result;
    }, {});

    reachForRespondentsForTouchPoint.forEach((reach, respondentId) => {
      if (reach >= 1) {
        // Add respondent to array with reached respondents for this touchpoint
        reachedRespondentsForTouchPoint.push(respondentId);
      }
    });
    return reachedRespondentsForTouchPoints;
  }

  function calculateReachForTouchPoint(reachedRespondents: number[], respondentsCountForMarket: RespondentsCount) {
    return Number.isNaN((reachedRespondents.length / respondentsCountForMarket) * 100)
      ? 0
      : (reachedRespondents.length / respondentsCountForMarket) * 100;
  }

  function calculateOtsForTouchPoint(touchPoint: ComplementedTouchPoint) {
    return Number.isNaN(touchPoint.get('grps') / touchPoint.get('reach'))
      ? 0
      : touchPoint.get('grps') / touchPoint.get('reach');
  }

  function totalReachWithAlgorithmForStrategy(rV: number[]) {
    if (rV.length === 0) {
      return 0;
    } else if (rV.length > 0) {
      let reach1 = 100;
      let reach2 = 1;
      for (let i = 0; i < rV.length; i++) {
        if (i === 0) {
          reach1 = 100 - rV[i];
        } else {
          reach2 *= 1 - rV[i] / 100;
        }
      }
      return 100 - reach1 * reach2;
    } else {
      return 0;
    }
  }

  function overlapWithAlgorithmForStrategy(rV: number[]) {
    if (rV.length === 0) {
      return 0;
    } else if (rV.length > 0) {
      let duplicateReach = 1;
      for (let i = 0; i < rV.length; i++) {
        const reach = rV[i] / 100;
        duplicateReach *= reach;
      }
      return 100 * duplicateReach;
    } else {
      return 0;
    }
  }

  return {
    arrangeProbabilitiesForTouchPoints,
    complementTouchPoints,
    collectReachedRespondentsForTouchPoints,
    calculateReachForTouchPoint,
    calculateOtsForTouchPoint
  };
}
