import {Mongo} from 'meteor/mongo';
import type {TouchPointBasics, Probability, Genders, StrategyExtended, Market} from '../../both/typings/types';

export default function createDataTool() {
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
    strategies: StrategyExtended[],
    strategyId: string | Mongo.ObjectIDStatic
  ) {
    console.log('filterProbabilitiesForStrategy server function runs with  :', strategyId);
    const strategy = strategies.find((item) => item._id == strategyId);

    const {
      marketName,
      ageStart,
      ageEnd,
      genders
    }: {
      marketName: Market['name'];
      ageStart: number;
      ageEnd: number;
      genders: Genders;
    } = strategy;

    const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
    console.log('fields in filterProbabilitiesForStrategy:', fields);

    return probabilities.filter((probability) => {
      probability.marketName == marketName,
        genders.includes(probability.gender),
        probability.age >= ageStart && probability.age <= ageEnd;
    });
  }

  function arrangeProbabilitiesForTouchPoints(
    strategyId: string | Mongo.ObjectIDStatic,
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
  return {
    filterProbabilitiesForMarket,
    filterProbabilitiesForStrategy,
    arrangeProbabilitiesForTouchPoints
  };
}
