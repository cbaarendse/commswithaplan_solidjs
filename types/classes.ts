// packages
import deburr from 'lodash/deburr';
import dayjs from 'dayjs';

// interfaces
import {ContentItem, TouchPointBasics, TouchPointInPlan, Translation} from './interfaces';

// ReachProvider
export class ReachProvider {
  public language: string;
  private _touchPointsBasics: TouchPointBasics[];
  private _touchPointsInPlan: TouchPointInPlan[];
  private _totalReach: number;
  private _locus: number;
  public allTouchPointValuesAreZero: boolean = this.areAllTouchPointsValuesZero();
  public sortingByName: boolean;
  public showAll: boolean;

  constructor(t: TouchPointBasics[], l: string) {
    this._touchPointsBasics = t;
    this.language = l;
    this._touchPointsInPlan = this._touchPointsBasics
      .filter((touchPointBasics: TouchPointBasics) => touchPointBasics.language === this.language)
      .map((touchPointBasics): TouchPointInPlan => ({...touchPointBasics, value: 0.0}));
    this._totalReach = 0.0;
    this._locus = 0.0;
    this.allTouchPointValuesAreZero = this.areAllTouchPointsValuesZero();
    this.sortingByName = false; // false means the sorting is done by reach
    this.showAll = true;
  }

  // ui
  findTouchPoint(input: string) {
    return this._touchPointsBasics.find((touchPointBasics: TouchPointBasics) => touchPointBasics.name === input);
  }

  displayTouchPoint(input: string) {
    const thisTouchPoint = this.findTouchPoint(input);
    if (thisTouchPoint === undefined) {
      throw new TypeError(
        'Het plan is onvolledig. Refresh deze pagina om het te herstellen. The plan is insufficient. Refresh the page to repair it.'
      );
    }
    return thisTouchPoint.displayName;
  }
  describeTouchPoint(input: string) {
    const thisTouchPoint = this.findTouchPoint(input);
    if (thisTouchPoint === undefined) {
      throw new TypeError(
        'Het plan is onvolledig. Refresh deze pagina om het te herstellen. The plan is insufficient. Refresh the page to repair it.'
      );
    }
    return thisTouchPoint.description;
  }

  //TODO: make this method
  changeLanguage(language: string) {
    // 1. copy _touchPointsInPlan to _touchPointsInPlanCopy
    // 2. map _touchPointsBasics to new language into _touchPointsInPlan
    // 3. take values from _touchPointsInPlanCopy and put in _touchPointsInPlan
  }

  // reset
  areAllTouchPointsValuesZero() {
    return this._touchPointsInPlan.every((touchPoint) => touchPoint.value === 0);
  }
  resetVisibleTouchPoints() {
    this._touchPointsInPlan.forEach((touchPoint) => (touchPoint.value = 0.0));
  }
  resetAllTouchPoints() {
    this._touchPointsInPlan = this._touchPointsBasics.map(
      (touchPointBasics): TouchPointInPlan => ({...touchPointBasics, value: 0.0})
    );
  }

  // sort
  toggleSortingByName(): void {
    this.sortingByName = !this.sortingByName;
  }
  sortByName() {
    let sortedTouchPoints: TouchPointInPlan[] = [];
    const touchPointsBasicsSorted = this._touchPointsInPlan;
    // TODO: array structure changed
    touchPointsBasicsSorted.sort((a: TouchPointBasics, b: TouchPointBasics) => {
      if (a.displayName > b.displayName) {
        return 1;
      }
      if (a.displayName < b.displayName) {
        return -1;
      }
      return 0;
    });
    this._touchPointsInPlan = sortedTouchPoints;
  }
  sortByReach() {
    this._touchPointsInPlan.sort((a: TouchPointInPlan, b: TouchPointInPlan) => b.value - a.value);
  }

  // hide
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
  removeZeros() {
    this._touchPointsInPlan = this._touchPointsInPlan.filter((touchPoint: TouchPointInPlan) => touchPoint.value > 0);
  }
  replenishTouchPoints() {
    for (const touchPointBasics of this._touchPointsBasics) {
      if (
        !this._touchPointsInPlan.some((touchPoint) => {
          touchPoint.name === touchPointBasics.name;
        })
      ) {
        this._touchPointsInPlan.push({...touchPointBasics, value: 0.0});
      }
    }
  }

  // results
  changeReachForTouchPoint(touchPointName: string, input: number): void {
    let index: number = this._touchPointsInPlan.findIndex((touchPoint: TouchPointInPlan): boolean => {
      return touchPoint.name === touchPointName;
    });
    let touchPointToChange: TouchPointInPlan = this._touchPointsInPlan[index];
    touchPointToChange.value = input;
    this._touchPointsInPlan.splice(index, 1, touchPointToChange);
  }
  calculateResults() {
    console.log('results being calculated');
    this._calculateTotalNetReach();
    this._calculateLocus();
  }
  private _calculateTotalNetReach() {
    let totalReachPortion = 0.0;
    for (const touchPoint of this._touchPointsInPlan) {
      let r = touchPoint.value / 100;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    console.log('total reach in provider function', 100 * totalReachPortion);
    this._totalReach = 100 * totalReachPortion;
  }
  private _calculateLocus() {
    let duplicateReachPortion = 0.0;
    for (const touchPoint of this._touchPointsInPlan) {
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
    return this._touchPointsInPlan;
  }

  get totalReach() {
    return this._totalReach;
  }

  get locus() {
    return this._locus;
  }
}

// UiProvider
export class UiProvider {
  static translate(input: string, items: Translation[] | any, language: string): string {
    return items.find((element: Translation) => element.name === input && element.language === language).displayName;
  }

  static describe(input: string, items: Translation[] | any, language: string): string {
    return items.find((element: Translation) => element.name === input && element.language === language).description;
  }

  static displayContent(page: string, items: ContentItem[] | any, language: string): string {
    return items.find((element: ContentItem) => {
      element.name === page && element.language === language;
    }).displayName;
  }

  static describeContent(page: string, items: ContentItem[] | any, language: string): string {
    return items.find((element: ContentItem) => {
      element.name === page && element.language === language;
    }).description;
  }

  static capitalizeAndSplit(str: string): string {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }

  static latinizeAndJoin(str: string): string {
    str = deburr(str);
    str = str.split(' ').join('');
    str = str.toLowerCase();
    console.log('Latinized and Joined:', str);
    return str;
  }

  static toStringFormat(value: number): string {
    return value.toLocaleString();
  }

  static percentFixed(input: number, digits: number): string {
    return (input / 100).toFixed(digits);
  }
  static toDateFormat(date: Date): string {
    return dayjs(date).format('DD-MMM-YYYY');
  }
  static toNumberFormat(value: number, digits: number): string {
    return `${value.toLocaleString(undefined, {maximumFractionDigits: digits})}`;
  }

  static toCurrencySymbol(currency: string): string {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '?';
    return `${symbol}`;
  }
}
