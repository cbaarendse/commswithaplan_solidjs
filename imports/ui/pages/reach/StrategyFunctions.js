// ====== IMPORTS ===============================
import {Session} from 'meteor/session';

import {populationsCountPeopleForMarket, populationsCountPeopleForStrategy} from '../../../api/populations/methods';
import {
  probabilitiesCountRespondentsForMarket,
  probabilitiesCountRespondentsForStrategy
} from '../../../api/probabilities/methods';
import {
  touchPointsInsert,
  touchPointsUpdate,
  touchPointsResetAndSaveForStrategy,
  touchPointsRemoveAllForStrategy,
  touchPointsProcessInput
} from '../../../api/touchpoints/methods';
import {
  strategiesInsert,
  strategiesUpdate,
  strategiesRemove,
  strategiesProcessResultsWithProbabilities,
  strategiesProcessResultsWithAlgorithm
} from '../../../api/strategies/methods';
import {notify} from '../../notifications/NotificationsFunctions';

// ====== FUNCTIONS =============================
export function sortIcon() {
  if (Session.equals('sortOrder', 1)) {
    return 'fa fa-caret-up';
  } else if (Session.equals('sortOrder', -1)) {
    return 'fa fa-caret-down';
  }
}

export function makeNewTitleForStrategy(strategies) {
  return strategies.reduce((result, thisStrategy, index, list) => {
    const titleInParts = thisStrategy.title.split(' ');
    if (
      titleInParts.length === 2 &&
      titleInParts[0] === 'new_strategy' &&
      typeof parseInt(titleInParts[1]) === 'number' &&
      !isNaN(parseInt(titleInParts[1]))
    ) {
      result = 'new_strategy' + ' ' + (parseInt(titleInParts[1]) + 1).toString();
    }
    return result;
  }, 'new_strategy 1');
}

export function insertNewStrategyAndGetId(s) {
  try {
    return strategiesInsert.callPromise(s);
  } catch (errors) {
    console.log('errors in insert Strategy: ', errors);
    const errorsDetails = JSON.parse(errors.details);
    errorsDetails.forEach((error) => {
      notify(`strategies.insert.${error.name}`);
    });
  }
}

export function updateStrategy(sId, mod) {
  try {
    strategiesUpdate.callPromise({_id: sId, modifier: mod});
  } catch (errors) {
    if (errors) {
      console.log('errors in strategiesUpdate.callPromise:', errors);
      const errorsDetails = JSON.parse(JSON.stringify(errors.details));
      errorsDetails.forEach((error) => {
        notify(`strategies.update.${error.name}`);
      });
    }
  }
  return;
}

export function removeStrategy(sId) {
  try {
    strategiesRemove.callPromise({_id: sId});
  } catch (errors) {
    console.log('errors remove strategy :', errors);
    const fieldErrors = JSON.parse(errors.details);
    fieldErrors.forEach((fieldError) => {
      notify(`strategies.removeStrategy.${fieldError.name}`);
    });
  }
  return;
}

export function insertNewTouchPointAndGetId(tP) {
  try {
    return touchPointsInsert.callPromise(tP);
  } catch (errors) {
    console.log('errors in insert new touchPoint: ', errors);
    const errorsDetails = JSON.parse(errors.details);
    errorsDetails.forEach((error) => {
      notify(`touchpoints.insert.${error.name}`);
    });
  }
}

export function updateTouchPoint(tPId, mod) {
  try {
    touchPointsUpdate.callPromise({_id: tPId, modifier: mod});
  } catch (errors) {
    if (errors) {
      console.log('errors in touchpointsupdate.callpromise :', errors);
      const errorsDetails = JSON.parse(JSON.stringify(errors.details));
      errorsDetails.forEach((error) => {
        notify(`touchPoints.update.${error.name}`);
      });
    }
  }
  return;
}

export function countPeopleForMarket(mt) {
  try {
    return populationsCountPeopleForMarket.callPromise({market: mt});
  } catch (errors) {
    if (errors) {
      console.log('errors in populations countForMarket.callpromise :', errors);
      const errorsDetails = JSON.parse(JSON.stringify(errors.details));
      errorsDetails.forEach((error) => {
        notify(`populations.count.${error.name}`);
      });
    }
  }
}

export function countPeopleForStrategy(sId) {
  try {
    return populationsCountPeopleForStrategy.callPromise({strategyId: sId});
  } catch (errors) {
    if (errors) {
      console.log('errors in populations countPeopleForStrategy.callpromise :', errors);
      const errorsDetails = JSON.parse(JSON.stringify(errors.details));
      errorsDetails.forEach((error) => {
        notify(`populations.count.${error.name}`);
      });
    }
  }
}

export function countRespondentsForMarket(mt) {
  try {
    return probabilitiesCountRespondentsForMarket.callPromise({market: mt});
  } catch (errors) {
    if (errors) {
      console.log('errors in probabilities countForMarket.callPromise :', errors);
      const errorsDetails = JSON.parse(JSON.stringify(errors.details));
      errorsDetails.forEach((error) => {
        notify(`probabilities.count.${error.name}`);
      });
    }
  }
}

export function countRespondentsForStrategy(sId) {
  try {
    return probabilitiesCountRespondentsForStrategy.callPromise({strategyId: sId});
  } catch (errors) {
    if (errors) {
      console.log('errors in probabilities countRespondentsForStrategy.callPromise :', errors);
      const errorsDetails = JSON.parse(JSON.stringify(errors.details));
      errorsDetails.forEach((error) => {
        notify(`probabilities.count.${error.name}`);
      });
    }
  }
}

export function processInputForTouchPoint(tPId, sId, i) {
  try {
    return touchPointsProcessInput.callPromise({_id: tPId, strategyId: sId, input: i});
  } catch (errors) {
    if (errors) {
      console.log('errors in touchPointsProcessInput:', errors);
      const errorsDetails = JSON.parse(errors.details);
      errorsDetails.forEach((error) => {
        notify(`touchPoints.input.${error.name}`);
      });
    }
  }
}

export function resetTouchPointForStrategy(tPId, sId) {
  try {
    touchPointsResetAndSaveForStrategy.callPromise({_id: tPId, strategyId: sId});
  } catch (errors) {
    if (errors) {
      console.log('errors in touchPointsResetAndSaveForStrategy :', errors);
      const errorsDetails = JSON.parse(errors.details);
      errorsDetails.forEach((error) => {
        notify(`touchPoints.reset.${error.name}`);
      });
    }
  }
  return;
}

export function removeTouchPointsForStrategy(sId) {
  try {
    touchPointsRemoveAllForStrategy.callPromise({strategyId: sId});
  } catch (errors) {
    console.log('errors remove all touch points :', errors);
    const fieldErrors = JSON.parse(errors.details);
    fieldErrors.forEach((fieldError) => {
      notify(`touchpoints.remove.${fieldError.name}`);
    });
  }
  return;
}

//TODO: make these methods on server, using serverfunctions, like processInputForTouchPoint
export function processResultsForStrategyWithProbabilities(sId) {
  try {
    strategiesProcessResultsWithProbabilities.callPromise({
      strategyId: sId
    });
  } catch (errors) {
    console.log('errors in processResultsForStrategyWithProbabilities :', errors);
    const errorsDetails = JSON.parse(JSON.stringify(errors.details));
    errorsDetails.forEach((error) => {
      notify(`strategies.results.${error.name}`);
    });
  }
}

export function processResultsForStrategyWithAlgorithm(sId) {
  try {
    strategiesProcessResultsWithAlgorithm.callPromise({
      strategyId: sId
    });
  } catch (errors) {
    console.log('errors in processResultsForStrategyWithAlgorithm:', errors);
    const errorsDetails = JSON.parse(JSON.stringify(errors.details));
    errorsDetails.forEach((error) => {
      notify(`strategies.results.${error.name}`);
    });
  }
}
