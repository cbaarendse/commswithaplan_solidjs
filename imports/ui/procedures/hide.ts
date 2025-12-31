// imports
import {DeployedTouchPoint} from '/imports/both/typings/types';
import {deployment} from '../stores/reach';
import createReachTool from '../functions/reach';

// variables
const reachTool = createReachTool();

// hide - show
export default function hide(): void {
  const touchPoints = deployment();
  let alteredTouchPoints: DeployedTouchPoint[] = touchPoints;
  if (reachTool.isShowAll(touchPoints) && !reachTool.areAllTouchPointsValueZero(touchPoints)) {
    alteredTouchPoints = touchPoints.map((touchPoint: DeployedTouchPoint) => {
      touchPoint.value === 0 ? (touchPoint.show = false) : (touchPoint.show = true);
      return touchPoint;
    });
  } else if (!reachTool.isShowAll(touchPoints) || reachTool.areAllTouchPointsValueZero(touchPoints)) {
    alteredTouchPoints = touchPoints.map((touchPoint: DeployedTouchPoint) => {
      touchPoint.show = true;
      return touchPoint;
    });
  }
  deployment.set(alteredTouchPoints);
}
