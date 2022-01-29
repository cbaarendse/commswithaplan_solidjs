// packages
import deburr from 'lodash/deburr';
import dayjs from 'dayjs';
import {Readable, readable} from 'svelte/store';

// interfaces
import { Content, TouchPointBasics, TouchPointInPlan, Translation} from './interfaces';

export class ReachProvider {

    touchPointsBasics: TouchPointBasics[] = [];
        language: string;

    constructor(tpb: TouchPointBasics[], lang: string) {
            this.touchPointsBasics = tpb;
            this.language = lang;
        }
        // private properties
    private _touchPoints = this.touchPointsBasics.map((touchPointBasics:TouchPointBasics):TouchPointInPlan => { return { name: touchPointBasics.name, value: 0.0 } });
    private _totalReach = 0.0;
    private _locus = 0.0;

    // ui
   displayTouchPoint (input: string, language: string) {
        return this.touchPointsBasics.find((touchPointBasics:TouchPointBasics) => touchPointBasics.name === input && touchPointBasics.language === language).displayName;
    }
  describeTouchPoint (input: string, language: string) {
        return this.touchPointsBasics.find((touchPointBasics: TouchPointBasics) => {touchPointBasics.name === input && touchPointBasics.language === language}).description;
    }

    // reset
    areAllTouchPointsValuesZero() { return !this._touchPoints.some((touchPoint) => touchPoint.value > 0.0) };
    resetVisibleTouchPoints () {
        this._touchPoints.forEach(touchPoint => touchPoint.value = 0.0)
    }
    resetAllTouchPoints () {
        this._touchPoints = this.touchPointsBasics.map(touchPoint => { return { name: touchPoint.name, value: 0.0 } });
    }

    // sort
    sortingByName: boolean = false; // false means the sorting is done by reach
    toggleSortingByName (): void {
        this.sortingByName = !this.sortingByName;
    }
   sortByName (language: string) {
        let sortedTouchPoints:TouchPointInPlan[] = [];
        const touchPointsBasicsSorted = this.touchPointsBasics;
        // TODO: array structure changed
        touchPointsBasicsSorted.sort((a: TouchPointBasics, b: TouchPointBasics) => a[language].displayName - b[language].displayName);
        touchPointsBasicsSorted.forEach((touchPointBasics) => {
            let touchPointToBeSorted = this._touchPoints.find((touchPoint: TouchPointInPlan) => touchPointBasics.name === touchPoint.name);
            if (touchPointToBeSorted) { sortedTouchPoints.push(touchPointToBeSorted) }
        });
        this._touchPoints = sortedTouchPoints;
    }
    sortByReach () {
        this._touchPoints.sort((a: TouchPointInPlan, b: TouchPointInPlan) => b.value - a.value);
    }

    // hide
    showAll = true;
    toggleShowAll () {
        this.showAll = !this.showAll;
    }
    removeZeros () {
        this._touchPoints = this._touchPoints.filter((touchPoint: TouchPointInPlan) => touchPoint.value > 0);
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
        let index: number = this._touchPoints.findIndex((touchPoint: TouchPointInPlan):boolean => {return touchPoint.name === touchPointName});
        let touchPointToChange: TouchPointInPlan = this._touchPoints[index];
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

export class UiProvider {

    static translate (input:string, items: Translation[] | any, language:string):string {
        return items.find((element: Translation) => element.name === input && element.language === language).displayName;
    }

    static describe (input:string, items: Translation[] | any, language:string):string {
        return items.find((element:Translation) => element.name === input && element.language === language).description;
    }

    static displayContent (page: string, items: Content[] | any, language: string): string{
        return items.find((element: Content) => {element.name === page && element.language === language} ).displayName;
    }

    static describeContent (page: string, items: Content[] | any, language: string): string{
        return items.find((element: Content) => {element.name === page && element.language === language} ).description;
    }

    static capitalizeAndSplit (str: string):string {
        str = str[0].toUpperCase() + str.slice(1);
        str = str.split(/(?=[A-Z])/).join(' ');
        return str;
    }

    static latinizeAndJoin (str:string):string {
        str = deburr(str);
        str = str.split(' ').join('');
        str = str.toLowerCase();
        console.log("Latinized and Joined:", str)
        return str;
    }

    static toStringFormat (value: number):string { return value.toLocaleString() };

    static percentFixed (input: number, digits: number):string {
        return (input / 100).toFixed(digits);
    }
    static toDateFormat (date:Date):string {
        return dayjs(date).format('DD-MMM-YYYY');
    }
    static toNumberFormat (value:number, digits:number):string {
        return `${value.toLocaleString(undefined, {maximumFractionDigits: digits})}`;
    }

    static toCurrencySymbol (currency:string):string {
        const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '?';
        return `${symbol}`;
    }


}