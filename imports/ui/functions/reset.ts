// imports
import {deployment, marketData, useMarketData, results} from '../stores/reach';
import {get} from 'svelte/store';
import {InputType, TouchPointDefinition} from '/imports/both/typings/types';
import createReachTool from './reach';

// variables
const reachTool = createReachTool();

export default function reset() {
  deployment.set(reachTool.touchPointsForDeployment(reachTool.touchPointsDefinitions()));
  get(marketData) && get(useMarketData)
    ? deployment.update((data) => {
        return data.map((touchPoint) => {
          const defaultInputTypeIndexForThisTouchPoint = reachTool
            .touchPointsDefinitions()
            .filter((definition: TouchPointDefinition) => definition.name == touchPoint.name)[0].defaultInputTypeIndex;
          return {...touchPoint, inputTypeIndex: defaultInputTypeIndexForThisTouchPoint};
        });
      })
    : deployment.update((data) => {
        return data.map((touchPoint) => Object.assign(touchPoint, {inputTypeIndex: InputType.Reach}));
      });
}
