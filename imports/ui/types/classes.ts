// packages
import deburr from 'lodash/deburr';
import dayjs from 'dayjs';

// interfaces
import type {Content, TouchPointBasics, TouchPointInPlan, Translation} from './interfaces';


// ReachProvider
export class ReachProvider {
  touchPointsBasics: TouchPointBasics[];
 touchPointsInPlan: TouchPointInPlan[];
 totalReach: number;
 locus: number;
  allTouchPointValuesAreZero: boolean = this.areAllTouchPointsValuesZero();
  sortingByName: boolean;
  showAll: boolean;

  constructor(public language: string, t: TouchPointBasics[]) {
    this.touchPointsBasics = t;
    this.touchPointsInPlan = this.touchPointsBasics
      .filter((touchPointBasics: TouchPointBasics) => touchPointBasics.language === this.language)
      .map((touchPointBasics): TouchPointInPlan => ({...touchPointBasics, value: 0.0}));
    this.totalReach = 0.0;
    this.locus = 0.0;
    this.allTouchPointValuesAreZero = this.areAllTouchPointsValuesZero();
    this.sortingByName = false; // false means the sorting is done by reach
    this.showAll = true;
  }

  // ui
  findTouchPoint(input: string) {
    return this.touchPointsBasics.find((touchPointBasics: TouchPointBasics) => touchPointBasics.name === input);
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

  changeLanguage(language: string): void {
    this.touchPointsInPlan.forEach((touchPointInPlan) => {
      const thisTouchPointBasics: TouchPointBasics | undefined = this.touchPointsBasics.find(
        (touchPointBasics) => touchPointBasics.name === touchPointInPlan.name && touchPointBasics.language === language
      );
      if (thisTouchPointBasics === undefined) {
        throw TypeError(
          'Het plan is onvolledig. Refresh deze pagina om het te herstellen. The plan is insufficient. Refresh the page to repair it.'
        );
      }
      touchPointInPlan.displayName = thisTouchPointBasics.displayName;
      touchPointInPlan.description = thisTouchPointBasics.description;
    });
  }

  // reset
  areAllTouchPointsValuesZero(): boolean {
    return this.touchPointsInPlan.every((touchPoint) => touchPoint.value === 0);
  }
  resetVisibleTouchPoints() {
    this.touchPointsInPlan.forEach((touchPoint) => (touchPoint.value = 0.0));
  }
  resetAllTouchPoints() {
    this.touchPointsInPlan = this.touchPointsBasics.map(
      (touchPointBasics): TouchPointInPlan => ({...touchPointBasics, value: 0.0})
    );
  }

  // sort
  toggleSortingByName(): void {
    this.sortingByName = !this.sortingByName;
  }
  sortByName() {
    const sortedTouchPoints: TouchPointInPlan[] = [];
    const touchPointsBasicsSorted = this.touchPointsInPlan;
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
    this.touchPointsInPlan = sortedTouchPoints;
  }
  sortByReach() {
    this.touchPointsInPlan.sort((a: TouchPointInPlan, b: TouchPointInPlan) => b.value - a.value);
  }

  // hide
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
  removeZeros() {
    this.touchPointsInPlan = this.touchPointsInPlan.filter((touchPoint: TouchPointInPlan) => touchPoint.value > 0);
  }
  replenishTouchPoints() {
    for (const touchPointBasics of this.touchPointsBasics) {
      if (
        !this.touchPointsInPlan.some((touchPoint) => {
          touchPoint.name === touchPointBasics.name;
        })
      ) {
        this.touchPointsInPlan.push({...touchPointBasics, value: 0.0});
      }
    }
  }

  // results
  changeReachForTouchPoint(touchPointName: string, input: number): void {
    const index: number = this.touchPointsInPlan.findIndex((touchPoint: TouchPointInPlan): boolean => {
      return touchPoint.name === touchPointName;
    });
    const touchPointToChange: TouchPointInPlan = this.touchPointsInPlan[index];
    touchPointToChange.value = input;
    this.touchPointsInPlan.splice(index, 1, touchPointToChange);
  }
  calculateResults() {
    console.log('results being calculated');
    this.calculateTotalNetReach();
    this.calculateLocus();
  }
  calculateTotalNetReach() {
    let totalReachPortion = 0.0;
    for (const touchPoint of this.touchPointsInPlan) {
      const r = touchPoint.value / 100;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    console.log('total reach in provider function', 100 * totalReachPortion);
    this.totalReach = 100 * totalReachPortion;
  }
  calculateLocus() {
    let duplicateReachPortion = 0.0;
    for (const touchPoint of this.touchPointsInPlan) {
      if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
        const r = touchPoint.value / 100;
        duplicateReachPortion *= r;
      }
      if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
        duplicateReachPortion = touchPoint.value / 100;
      }
    }
    console.log('locus in provider function', 100 * duplicateReachPortion);
    this.locus = 100 * duplicateReachPortion;
  }

  // getters
  get touchPointsInPlanForClient() {
    return this.touchPointsInPlan;
  }

  get totalReachForClient() {
    return this.totalReach;
  }

  get locusForClient() {
    return this.locus;
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

  static displayContent(page: string, items: Content[] | any, language: string): string {
    return items.find((element: Content) => {
      element.name === page && element.language === language;
    }).displayName;
  }

  static describeContent(page: string, items: Content[] | any, language: string): string {
    return items.find((element: Content) => {
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
