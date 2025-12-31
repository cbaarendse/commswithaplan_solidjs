// imports
import {DeployedTouchPoint, Language, TouchPointDefinition} from '/imports/both/typings/types';
import {deployment, sortedByName} from '../stores/reach';
import createReachTool from '../functions/reach';

// variables
const reachTool = createReachTool();

// sort
export default function sort(language: Language): void {
  const currentDeployment = deployment();
  const currentSortedByName = sortedByName();

  deployment.set(currentSortedByName ? sortByValue(currentDeployment) : sortByName(currentDeployment, language));
  sortedByName.set(
    reachTool.isShowAll(currentDeployment) && reachTool.areAllTouchPointsValueZero(currentDeployment)
      ? true
      : !currentSortedByName
  );
}

function sortByValue(touchPoints: DeployedTouchPoint[]) {
  return touchPoints.sort((a: DeployedTouchPoint, b: DeployedTouchPoint) => b.value - a.value);
}

function sortByName(touchPoints: DeployedTouchPoint[], language: Language) {
  return touchPoints.sort((a: TouchPointDefinition, b: TouchPointDefinition) => {
    const definitionOfTouchPointA = a.definitions.find((definition) => definition.language == language);
    const definitionOfTouchPointB = b.definitions.find((definition) => definition.language == language);
    if (definitionOfTouchPointA && definitionOfTouchPointB) {
      if (definitionOfTouchPointA.displayName > definitionOfTouchPointB.displayName) {
        return 1;
      }
      if (definitionOfTouchPointA.displayName < definitionOfTouchPointB.displayName) {
        return -1;
      }
    }
    return 0;
  });
}
