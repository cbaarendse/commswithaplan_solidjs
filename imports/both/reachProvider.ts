// this function / object contains all the logic to make ReachApp work
import {TouchPointBasics} from '../../client/stores';
interface TouchPoint {name: TouchPointBasics['name'], value: number}


class ReachProvider {

    touchPointsBasics: TouchPointBasics[] = [];
        language: string;

    constructor(tpb: TouchPointBasics[], lang: string) {
            this.touchPointsBasics = tpb;
            this.language = lang;
        }
        // private properties
    private _touchPoints = this.touchPointsBasics.map((touchPointBasics:TouchPointBasics):TouchPoint => { return { name: touchPointBasics.name, value: 0.0 } });
    private _totalReach = 0.0;
    private _locus = 0.0;

    // ui
   displayTouchPoint (input: string, language: string) {
        return this.touchPointsBasics.find((touchPointBasics:TouchPointBasics) => touchPointBasics.name === input)[language].displayName;
    }
  describeTouchPoint (input: string, language: string) {
        return this.touchPointsBasics.find((touchPointBasics: TouchPointBasics) => {touchPointBasics.name === input && touchPointBasics.language == language}).description;
    }

    // reset
    areAllTouchPointsValuesZero() { return !this._touchPoints.some((touchPoint) => touchPoint.value > 0.0) };
    resetVisibleTouchPoints () {
        _touchPoints.forEach(touchPoint => touchPoint.value = 0.0)
    }
    resetAllTouchPoints () {
        _touchPoints = this.touchPointsBasics.map(touchPoint => { return { name: touchPoint.name, value: 0.0 } });
    }

    // sort
    sortingByName: boolean = false; // false means the sorting is done by reach
    toggleSortingByName (): void {
        this.sortingByName = !this.sortingByName;
    }
   sortByName (language: string) {
        let sortedTouchPoints:TouchPoint[] = [];
        const touchPointsBasicsSorted = this.touchPointsBasics;
        // TODO: array structure changed
        touchPointsBasicsSorted.sort((a: TouchPointBasics, b: TouchPointBasics) => a[language].displayName - b[language].displayName);
        touchPointsBasicsSorted.forEach((touchPointBasics) => {
            let touchPointToBeSorted = this._touchPoints.find((touchPoint: TouchPoint) => touchPointBasics.name === touchPoint.name);
            if (touchPointToBeSorted) { sortedTouchPoints.push(touchPointToBeSorted) }
        });
        this._touchPoints = sortedTouchPoints;
    }
    sortByReach () {
        this._touchPoints.sort((a: TouchPoint, b: TouchPoint) => b.value - a.value);
    }

    // hide
    showAll = true;
    toggleShowAll () {
        this.showAll = !this.showAll;
    }
    removeZeros () {
        this._touchPoints = this._touchPoints.filter((touchPoint: TouchPoint) => touchPoint.value > 0);
    }
    replenishTouchPoints () {
        for (const touchPointBasics of this.touchPointsBasics) {
            if (!this._touchPoints.some((touchPoint) => { touchPoint.name === touchPointBasics.name })) {
                this._touchPoints.push({ name: touchPointBasics.name, value: 0.0 });
            }
        }
    }

    // results
    changeReachForTouchPoint(touchPointName: string, input: number):void {
        let index: number = this._touchPoints.findIndex((touchPoint: TouchPoint):boolean => {return touchPoint.name === touchPointName});
        let touchPointToChange: TouchPoint = this._touchPoints[index];
        touchPointToChange.value = input;
        this._touchPoints.splice(index, 1, touchPointToChange);
        
    }
    calculateResults() {
        console.log('results being calculated');
        this._calculateTotalNetReach();
        this._calculateLocus();
    }
    private _calculateTotalNetReach() {
        let totalReachPortion = 0.0;
        for (const touchPoint of this._touchPoints) {
            let r = touchPoint.value / 100;
            totalReachPortion = totalReachPortion + ((1 - totalReachPortion) * r);
        }
        console.log('total reach in provider function', 100 * totalReachPortion);
        this._totalReach = 100 * totalReachPortion;
    }
  private _calculateLocus() {
        let duplicateReachPortion = 0.0;
        for (const touchPoint of this._touchPoints) {
            if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
                let r = touchPoint.value / 100;
                duplicateReachPortion *= r;
            }
            if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
                duplicateReachPortion = touchPoint.value / 100;
            }
        }
        console.log('locus in provider function', 100 * duplicateReachPortion);
        this._locus = 100 * duplicateReachPortion;
    }

    // getters
  
        get touchPoints() {
            return this._touchPoints;
        } 

        get totalReach() {
            return this._totalReach;
        }

   get locus() {
            return this._locus;
        }
}

export default ReachProvider;