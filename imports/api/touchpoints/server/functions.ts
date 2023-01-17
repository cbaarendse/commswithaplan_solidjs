// ====== IMPORTS ===============================

// ====== EXPORTS ===============================
export function touchPointAdaptToNewProbabilities(tp, s, probabilities) {
  const {input, name} = tp;
  const {peopleInAgeRange, respondentsCount} = s;
  const probabilitiesForTouchPoint = Array.from(probabilities[name].values());
  // Selected
  tp.selected = input === 0 ? false : true;
  // GRPs for this touchpoint
  tp.grps = parseFloat((input / peopleInAgeRange) * 100);
  // Maximum reached respondents for this touchpoint
  tp.maxReachedRespondents = probabilities[name].size;
  // Sum of probabilities for this touchpoint
  tp.sumOfProbabilities = probabilitiesForTouchPoint.reduce((sum, probability) => {
    return sum + probability;
  }, 0);
  // Minimum input value for this touchpoint
  tp.minValue = 0;
  //Maximum input value for this touchpoint
  tp.maxValue = (tp.maxReachedRespondents / respondentsCount) * peopleInAgeRange * 5;
  //Average probability for this touchpoint
  tp.averageProbability = tp.sumOfProbabilities / probabilities[name].size;
  return tp;
}

export function collectReachedRespondentsForTouchPoint(tp, probabilities) {
  const reachForRespondentsForTouchPoint = new Map();
  const reachedRespondentsForTouchPoint = [];

  probabilities[tp.name].forEach((probability, respondentId, probabilities) => {
    const exponent = -probability * (tp.grps / probabilities.size);
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

export function calculateReachForTouchPoint(rR, s) {
  return (rR.length / s.respondentsCount) * 100 === NaN ? 0 : (rR.length / s.respondentsCount) * 100;
}

export function calculateOtsForTouchPoint(tP) {
  return tP.grps / tP.reach === NaN ? 0 : tP.grps / tP.reach;
}
