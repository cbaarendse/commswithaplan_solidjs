// ====== IMPORTS ===============================

// ====== EXPORTS ===============================
export function totalReachWithAlgorithmForStrategy(rV: number[]) {
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

export function overlapWithAlgorithmForStrategy(rV: number[]) {
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
