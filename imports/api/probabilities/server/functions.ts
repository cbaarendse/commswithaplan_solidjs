import Probabilities from './probabilities';
import Strategies from '../../strategies/strategies';
import TouchPoints from '../../touchpoints/touchpoints';

export function filterProbabilitiesForMarket(market) {
  console.log('filterProbabilitiesForMarket server function runs with  :', market);

  const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
  console.log('fields in filterProbabilitiesForMarket:', fields);

  return Probabilities.find({market}, {fields}).fetch();
}

export function filterProbabilitiesForStrategy(sId) {
  console.log('filterProbabilitiesForStrategy server function runs with  :', sId);
  const strategy = Strategies.findOne({_id: sId});
  const {_id, market, marketData, male, female, ageStart, ageEnd} = strategy;
  const touchPointsEmployed = TouchPoints.find({strategyId: _id, input: {$gt: 0}}).fetch();
  const genders = [];
  if (male) genders.push(0);
  if (female) genders.push(1);

  const fields = {respondentId: 1, market: 1, age: 1, gender: 1};
  touchPointsEmployed.forEach((touchPoint) => (fields[touchPoint.name] = 1));
  console.log('fields in filterProbabilitiesForStrategy:', fields);

  return Probabilities.find(
    {
      market,
      gender: {$in: genders},
      age: {$gte: ageStart, $lte: ageEnd}
    },
    {fields}
  ).fetch();
}

export function arrangeProbabilitiesForTouchPoints(sId, probabilities) {
  const touchPointsEmployed = TouchPoints.find({strategyId: sId, input: {$gt: 0}}).fetch();
  const arrangedProbabilities = {};
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
