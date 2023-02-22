import {Mongo} from 'meteor/mongo';
import type {
  TouchPointDefinition,
  Probability,
  Genders,
  Strategy,
  Market,
  AgeGroup,
  DeployedTouchPoint,
  peopleInRange,
  ProbabilityTouchPoint,
  RespondentsCount,
  TouchPointName
} from '/imports/both/typings/types';

export default function createReachDataTool() {
  function filterProbabilitiesForMarket(probabilities: Probability[], marketName: string): Probability[] {
    console.log('filterProbabilitiesForMarket server function runs with  :', probabilities, marketName);

    const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
    console.log('fields in filterProbabilitiesForMarket:', fields);

    if (!Array.isArray(probabilities) || !probabilities.length) {
      throw new Error('Empty argument(s) for filterProbabilitiesForMarket');
    } else {
      return probabilities.filter((probability) => {
        probability.marketName == marketName;
      });
    }
  }

  function filterProbabilitiesForStrategy(probabilities: Probability[], strategy: Strategy, groups: AgeGroup[]) {
    console.log('filterProbabilitiesForStrategy server function runs with  :', strategy.title);

    const groupsEnd = groups.slice(strategy.ageGroupIndexStart ? strategy.ageGroupIndexStart : 0 + 1);
    const marketName = strategy.marketName;
    const ageGroupStart = strategy.ageGroupIndexStart ? groups[strategy.ageGroupIndexStart] : groups[0];
    const ageGroupEnd = strategy.ageGroupIndexEnd ? groupsEnd[strategy.ageGroupIndexEnd] : groupsEnd[0];
    const genders = strategy.genders;

    const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
    console.log('fields in filterProbabilitiesForStrategy:', fields);

    return probabilities.filter((probability) => {
      probability.marketName == marketName,
        genders?.has(probability.gender),
        probability.age >= ageGroupStart[0] && probability.age <= ageGroupEnd[1];
    });
  }

  function arrangeRespondentsForTouchPoints(
    touchPoints: TouchPointDefinition[],
    probabilities: Probability[]
  ): {[key: string]: Map<Probability['respondentId'], number>} {
    const deployedTouchPoints = touchPoints;
    const arrangedRespondents: {[key: string]: Map<Probability['respondentId'], number>} = {};
    deployedTouchPoints.forEach((touchPoint) => {
      arrangedRespondents[touchPoint.name] = new Map();
      for (const p of probabilities) {
        if (arrangedRespondents[touchPoint.name] && p[touchPoint.name] > 0) {
          arrangedRespondents[touchPoint.name].set(p.respondentId, p[touchPoint.name]);
        }
      }
    });
    return arrangedRespondents;
  }

  function touchPointAdaptToNewProbabilities(
    touchPoint: DeployedTouchPoint,
    peopleInRange: peopleInRange,
    respondentsCount: RespondentsCount,
    respondentsForTouchPoints: {[key: string]: Map<Probability['respondentId'], number>}
  ): ProbabilityTouchPoint {
    const {name, value, inputType} = touchPoint;
    const probabilitiesForTouchPoint = [];
    if (respondentsForTouchPoints[name]) {
      for (const [key, value] of respondentsForTouchPoints[name]) {
        probabilitiesForTouchPoint.push(value);
      }
    }
    const adaptedTouchPoint = new Map()
      .set('name', name)
      .set('value', value)
      .set('inputType', inputType)
      .set('selected', value === 0 ? false : true)
      .set('maxReachedRespondents', respondentsForTouchPoints[name].size)
      .set(
        'sumOfProbabilities',
        probabilitiesForTouchPoint.reduce((sum, probability) => {
          return sum + probability;
        }, 0)
      )
      .set('minValue', 0);
    adaptedTouchPoint
      .set(
        'grps',
        adaptedTouchPoint.get('inputType') == 'contacts' || adaptedTouchPoint.get('inputType') == 'impressions'
          ? (value / peopleInRange) * 100
          : value
      )
      .set('maxValue', (adaptedTouchPoint.get('maxReachedRespondents') / respondentsCount) * peopleInRange * 5)
      .set('averageProbability', adaptedTouchPoint.get('sumOfProbabilities') / respondentsForTouchPoints[name].size);
    return adaptedTouchPoint;
  }

  function collectReachedRespondentsForTouchPoint(touchPoint, probabilities) {
    const reachForRespondentsForTouchPoint = new Map();
    const reachedRespondentsForTouchPoint: ProbabilityTouchPoint[] = [];

    probabilities[touchPoint.name].forEach(
      (probability, respondentId: number | Mongo.ObjectIDStatic, probabilities) => {
        const exponent = -probability * (touchPoint.grps / probabilities.size);
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

  function calculateReachForTouchPoint(reachedRespondents: number[], respondentsCount: RespondentsCount) {
    return Number.isNaN((reachedRespondents.length / respondentsCount) * 100)
      ? 0
      : (reachedRespondents.length / respondentsCount) * 100;
  }

  function calculateOtsForTouchPoint(touchPoint: ProbabilityTouchPoint) {
    return Number.isNaN(touchPoint.grps / touchPoint.reach) ? 0 : touchPoint.grps / touchPoint.reach;
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
    filterProbabilitiesForMarket,
    filterProbabilitiesForStrategy,
    arrangeProbabilitiesForTouchPoints,
    touchPointAdaptToNewProbabilities,
    calculateReachForTouchPoint,
    calculateOtsForTouchPoint
  };
}
