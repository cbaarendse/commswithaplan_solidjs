// imports
import {deployment, marketData, useMarketData} from '../stores/reach';
import {get} from 'svelte/store';
import {TouchPointDefinition} from '/imports/both/typings/types';
import {INPUTTYPE, touchPointsDefinitions} from '../../both/constants/constants';
import createReachTool from '../functions/reach';

// variables
const reachTool = createReachTool();

export default function renew() {
  console.log('renew runs');
  deployment.set(reachTool.touchPointsForDeployment(touchPointsDefinitions()));
  if (get(marketData) && get(useMarketData)) {
    deployment.update((data) => {
      return data.map((touchPoint) => {
        const defaultInputTypeIndexForThisTouchPoint = touchPointsDefinitions().filter(
          (definition: TouchPointDefinition) => definition.name == touchPoint.name
        )[0].defaultInputTypeIndex;
        return {...touchPoint, inputTypeIndex: defaultInputTypeIndexForThisTouchPoint};
      });
    });
  } else {
    deployment.update((data) => {
      return data.map((touchPoint) => Object.assign(touchPoint, {value: 0.0, inputTypeIndex: INPUTTYPE.Reach}));
    });
  }
}
