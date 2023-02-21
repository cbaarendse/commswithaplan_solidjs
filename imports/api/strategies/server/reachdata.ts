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
  RespondentsCount
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

  function filterProbabilitiesForStrategy(
    probabilities: Probability[],
    strategy: Strategy,
    strategyId: string | Mongo.ObjectIDStatic,
    groups: AgeGroup[]
  ) {
    console.log('filterProbabilitiesForStrategy server function runs with  :', strategyId);

  let groupsEnd = groups.slice(strategy.ageGroupIndexStart ? strategy.ageGroupIndexStart : 0 + 1);
    const marketName = strategy.marketName;
    const ageGroupStart = strategy.ageGroupIndexStart ? groups[strategy.ageGroupIndexStart]: groups[0];
    const ageGroupEnd =strategy.ageGroupIndexEnd? groupsEnd[strategy.ageGroupIndexEnd]: groupsEnd[0];
    const genders = strategy.genders;

    const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
    console.log('fields in filterProbabilitiesForStrategy:', fields);

    return probabilities.filter((probability) => {
      probability.marketName == marketName,
        genders?.has(probability.gender),
        probability.age >= ageGroupStart[0] && probability.age <= ageGroupEnd[1];
    });
  }

  function arrangeProbabilitiesForTouchPoints(
    strategyId: string | Mongo.ObjectIDStatic,
    probabilities: Probability[],
    touchPoints: TouchPointDefinition[]
  ) {
    const touchPointsEmployed = touchPoints;
    const arrangedProbabilities: {[key: string]: Map<any, any>} = {};
    touchPointsEmployed.forEach((touchPoint) => {
      arrangedProbabilities[touchPoint.name] = new Map();
      for (const p of probabilities) {
        if (p[touchPoint.name] > 0) {
          arrangedProbabilities[touchPoint.name].set(p.respondentId, p[touchPoint.name]);
        }
      }
    });
    return arrangedProbabilities;
  }
  function touchPointAdaptToNewProbabilities(
    touchPoint: ProbabilityTouchPoint,
    peopleInRange: peopleInRange,
    respondentsCount: RespondentsCount,
    probabilities: number[]
  ) {
    const {name, value} = touchPoint;
    const probabilitiesForTouchPoint = Array.from(probabilities[name].values());
    // Selected
    touchPoint.selected = value === 0 ? false : true;
    // GRPs for this touchpoint
    touchPoint.grps = (value / peopleInRange) * 100;
    // Maximum reached respondents for this touchpoint
    touchPoint.maxReachedRespondents = probabilities[name].size;
    // Sum of probabilities for this touchpoint
    touchPoint.sumOfProbabilities = probabilitiesForTouchPoint.reduce((sum, probability) => {
      return sum + probability;
    }, 0);
    // Minimum input value for this touchpoint
    touchPoint.minValue = 0;
    //Maximum input value for this touchpoint
    touchPoint.maxValue = (touchPoint.maxReachedRespondents / respondentsCount) * peopleInRange * 5;
    //Average probability for this touchpoint
    touchPoint.averageProbability = touchPoint.sumOfProbabilities / probabilities[name].size;
    return touchPoint;
  }

  function collectReachedRespondentsForTouchPoint(touchPoint: ProbabilityTouchPoint, probabilities: {[key: string]:number}) {
    const reachForRespondentsForTouchPoint = new Map();
    const reachedRespondentsForTouchPoint: number[] = [];

    probabilities[touchPoint.name].forEach((probability, respondentId, probabilities) => {
      const exponent = -probability * (touchPoint.grps / probability: {[key: string]:number}probabilities.size);
      const reach = 1 * (1 - Math.pow(Math.E, exponent)) * 100;
      reachForRespondentsForTouchPoint.set(respondentId, reach);
    });

    reachForRespondentsForTouchPoint.forEach((reach, respondentId) => {
      if (reach >= 1) {
        // Add respondent to array with reached respondents for this touchpoint
        reachedRespondentsForTouchPoint.push(respondentId);
      }
    });
    return reachedRespondentsForTouchPoint;
  }

  function calculateReachForTouchPoint(reachedRespondents: number[], respondentsCount: RespondentsCount) {
    return Number.isNaN((reachedRespondents.length / respondentsCount) * 100) ? 0 : (reachedRespondents.length / respondentsCount) * 100;
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
    arrangeProbabilitiesForTouchPoints, touchPointAdaptToNewProbabilities, calculateReachForTouchPoint, calculateOtsForTouchPoint};
   
}
