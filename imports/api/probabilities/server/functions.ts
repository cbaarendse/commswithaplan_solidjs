import TouchPoints from '../../touchpoints/touchpoints';
import type {Probability} from './probabilities';
import {TouchPointBasics} from '/imports/ui/types/types';

export function filterProbabilitiesForMarket(probabilities: Probability[], market: string) {
  console.log('filterProbabilitiesForMarket server function runs with  :', market);

  const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
  console.log('fields in filterProbabilitiesForMarket:', fields);

  if (!Array.isArray(probabilities) || !probabilities.length) {
    throw new Error('Empty argument(s) for filterProbabilitiesForMarket');
  } else {
    return probabilities.find((probability) => {
      probability.market == market;
    });
  }
}

export function filterProbabilitiesForStrategy(probabilities: Probability[], strategies: any, strategyId: string) {
  console.log('filterProbabilitiesForStrategy server function runs with  :', strategyId);
  const strategy = strategies.findOne({_id: strategyId});
  const {market, male, female, ageStart, ageEnd} = strategy;
  const genders: number[] = [];
  if (male) {
    genders.push(0);
  }
  if (female) {
    genders.push(1);
  }

  const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
  console.log('fields in filterProbabilitiesForStrategy:', fields);

  return probabilities.find((probability) => {
    {
      probability.market == market,
        genders.includes(probability.gender),
        probability.age >= ageStart && probability.age <= ageEnd;
    }
  });
}

export function arrangeProbabilitiesForTouchPoints(
  strategyId: string,
  probabilities: Probability[],
  touchPoints: TouchPointBasics[]
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
