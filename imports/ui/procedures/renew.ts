// imports
import {deployment} from '../stores/reach';
import {INPUTTYPE, touchPointsDefinitions} from '../../both/constants/constants';
import {DeployedTouchPoint, TouchPointDefinition} from '/imports/both/typings/types';

// variables

export default function createRenew() {
  function forData() {
    deployment.set(touchPointsForDeployment(touchPointsDefinitions()));
    deployment.update((data) => {
      return data.map((touchPoint) => {
        return {
          ...touchPoint,
          inputTypeIndex: touchPoint.defaultInputTypeIndex,
          averageProbability: 0.0,
          respondentsNotReached: 0,
          maxValue: 0.0
        };
      });
    });
  }

  function forFormula() {
    deployment.set(touchPointsForDeployment(touchPointsDefinitions()));
    deployment.update((data) => {
      return data.map((touchPoint) => Object.assign(touchPoint, {value: 0.0, inputTypeIndex: INPUTTYPE.Reach}));
    });
  }

  return {forData, forFormula};
}

function touchPointsForDeployment(touchPointsDefinitions: TouchPointDefinition[]): DeployedTouchPoint[] {
  const touchPointsForDeployment: DeployedTouchPoint[] = [];
  for (let index = 0; index < touchPointsDefinitions.length; index++) {
    const touchPointDefinition = touchPointsDefinitions[index];
    const touchPointForDeployment: DeployedTouchPoint = {
      name: touchPointDefinition.name,
      definitions: touchPointDefinition.definitions,
      defaultInputTypeIndex: touchPointDefinition.defaultInputTypeIndex,
      value: 0.0,
      show: true,
      inputTypeIndex: INPUTTYPE.Reach
    };
    touchPointsForDeployment.push(touchPointForDeployment);
  }
  return touchPointsForDeployment;
}
