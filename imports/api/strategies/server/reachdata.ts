import {Mongo} from 'meteor/mongo';
import type {
  Probability,
  DeployedTouchPoint,
  PopulationInRange,
  ProbabilityTouchPoint,
  RespondentsCount,
  TouchPointName
} from '/imports/both/typings/types';

export default function createReachDataTool() {
  // arrange respondents for touchpoint
  function arrangeProbabilitiesForTouchPoints(
    touchPoints: DeployedTouchPoint[],
    probabilities: Probability[]
  ): {[key in TouchPointName]: Map<Probability['respondentId'], number>} {
    const deployedTouchPoints = touchPoints;
    let arrangedProbabilities: {[key in TouchPointName]: Map<Probability['respondentId'], number>};
    deployedTouchPoints.forEach((touchPoint) => {
      arrangedProbabilities[touchPoint.name] = new Map();
      for (const probability of probabilities) {
        if (arrangedProbabilities[touchPoint.name] && probability[touchPoint.name] > 0) {
          arrangedProbabilities[touchPoint.name]?.set(probability.respondentId, probability[touchPoint.name]);
        }
      }
    });
    return arrangedProbabilities;
  }

  function addPropertiesToTouchPoints(
    touchPoints: DeployedTouchPoint[],
    populationInRange: PopulationInRange,
    respondentsCountForMarket: RespondentsCount,
    probabilitiesForTouchPoints: {[key in TouchPointName]: Map<Probability['respondentId'], number>}
  ): ProbabilityTouchPoint[] {
    const adaptedTouchPoints = touchPoints.map((touchPoint) => {
      const {name, value, inputType} = touchPoint;
      const allProbabilitiesForTouchPoint = [];
      if (probabilitiesForTouchPoints[name]) {
        for (const [key, value] of probabilitiesForTouchPoints[name]) {
          allProbabilitiesForTouchPoint.push(value);
        }
      }
      const adaptedTouchPoint = new Map()
        .set('name', name)
        .set('value', value)
        .set('inputType', inputType)
        .set('selected', value === 0 ? false : true)
        .set(
          'maxReachedRespondents',
          probabilitiesForTouchPoints[name].size ? probabilitiesForTouchPoints[name].size : 0
        )
        .set(
          'sumOfProbabilities',
          allProbabilitiesForTouchPoint.reduce((sum, probability) => {
            return sum + probability;
          }, 0)
        )
        .set('minValue', 0);
      adaptedTouchPoint
        .set(
          'grps',
          adaptedTouchPoint.get('inputType') == 'contacts' || adaptedTouchPoint.get('inputType') == 'impressions'
            ? (value / populationInRange) * 100
            : value
        )
        .set(
          'maxValue',
          (adaptedTouchPoint.get('maxReachedRespondents') / respondentsCountForMarket) * populationInRange * 5
        )
        .set(
          'averageProbability',
          adaptedTouchPoint.get('sumOfProbabilities') / probabilitiesForTouchPoints[name].size
        );
      return adaptedTouchPoint;
    });
    console.log('all adapted touchpoints in add properties to touchpoints: ', adaptedTouchPoints);

    return adaptedTouchPoints;
  }

  function collectReachedRespondentsForTouchPoint(
    touchPoint: ProbabilityTouchPoint,
    arrangedRespondents: {[key: string]: Map<Probability['respondentId'], number>}
  ) {
    const reachForRespondentsForTouchPoint = new Map();
    const reachedRespondentsForTouchPoint: Probability['respondentId'][] = [];

    arrangedRespondents[touchPoint.get('name')].forEach(
      (probability, respondentId: number | Mongo.ObjectIDStatic, probabilities) => {
        const exponent = -probability * (touchPoint.get('grps') / probabilities.size);
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
    return reachedRespondentsForTouchPoint;
  }

  function calculateReachForTouchPoint(reachedRespondents: number[], respondentsCountForMarket: RespondentsCount) {
    return Number.isNaN((reachedRespondents.length / respondentsCountForMarket) * 100)
      ? 0
      : (reachedRespondents.length / respondentsCountForMarket) * 100;
  }

  function calculateOtsForTouchPoint(touchPoint: ProbabilityTouchPoint) {
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
    addPropertiesToTouchPoints,
    collectReachedRespondentsForTouchPoint,
    calculateReachForTouchPoint,
    calculateOtsForTouchPoint
  };
}
