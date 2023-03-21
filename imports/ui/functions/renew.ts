// imports
import {deployment, marketData, useMarketData} from '../stores/reach';
import {get} from 'svelte/store';
import {InputType, TouchPointDefinition} from '/imports/both/typings/types';
import createReachTool from './reach';

// variables
const reachTool = createReachTool();

export default function renew() {
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
        return data.map((touchPoint) => Object.assign(touchPoint, {value: 0.0, inputTypeIndex: InputType.Reach}));
      });
}
