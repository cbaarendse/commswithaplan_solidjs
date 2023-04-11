// imports
import {deployment, marketData, useMarketData} from '../stores/reach';
import {get} from 'svelte/store';
import {INPUTTYPE, touchPointsDefinitions} from '../../both/constants/constants';

// variables
//TODO: put in closure and split into .forFormula and.forData so method will be renew.forFormula() or..
export default function renew() {
  console.log('renew runs');
  deployment.set(touchPointsForDeployment(touchPointsDefinitions()));
  if (get(marketData) && get(useMarketData)) {
    deployment.update((data) => {
      return data.map((touchPoint) => {
        return {...touchPoint, inputTypeIndex: touchPoint.defaultInputTypeIndex};
      });
    });
  } else {
    deployment.update((data) => {
      return data.map((touchPoint) => Object.assign(touchPoint, {value: 0.0, inputTypeIndex: INPUTTYPE.Reach}));
    });
  }
}

function touchPointsForDeployment(touchPointsDefinitions: TouchPointDefinition[]): DeployedTouchPoint[] {
  console.log('touchPointsForFormula called');
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
  console.log('deployedTouchPoints constructed for formula: ', touchPointsForDeployment);
  return touchPointsForDeployment;
}
