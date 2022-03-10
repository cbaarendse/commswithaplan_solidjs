// packages
import dayjs from 'dayjs';

// interfaces
import type {Content, TouchPointBasics, TouchPointInPlan, Translation} from './interfaces';

// Reach
export class Reach {

  static makePlan(touchPointsBasics: TouchPointBasics[], language: string):TouchPointInPlan[]{
     return touchPointsBasics
      .filter((touchPointBasics: TouchPointBasics) => touchPointBasics.language === language)
      .map((touchPointBasics): TouchPointInPlan => ({...touchPointBasics, value: 0.0}));
  }

 static areAllTouchPointsValueZero(touchPointsInPlan: TouchPointInPlan[]):boolean{ return touchPointsInPlan.every((touchPoint) => touchPoint.value === 0);}

  // ui
  static displayTouchPoint(name: string, touchPointsBasics:TouchPointBasics[]): string {
    return touchPointsBasics.filter((touchPointBasics: TouchPointBasics) => touchPointBasics.name === name)[0].displayName;
  }

  static describeTouchPoint(name: string, touchPointsBasics:TouchPointBasics[]) {
    return touchPointsBasics.filter((touchPointBasics: TouchPointBasics) => touchPointBasics.name === name)[0].description;
  }

  static changeLanguage(language: string, touchPointsInPlan: TouchPointInPlan[], touchPointsBasics: TouchPointBasics[]): TouchPointInPlan[] {
    touchPointsInPlan.forEach((touchPointInPlan) => {
      const thisTouchPointBasics: TouchPointBasics = touchPointsBasics.filter(
        (touchPointBasics) => touchPointBasics.name === touchPointInPlan.name && touchPointBasics.language === language
      )[0];
          touchPointInPlan.displayName = thisTouchPointBasics.displayName;
      touchPointInPlan.description = thisTouchPointBasics.description;
    });
    return touchPointsInPlan;
  }

  // reset
  static resetVisibleTouchPoints(touchPointsInPlan: TouchPointInPlan[]):TouchPointInPlan[] {
    touchPointsInPlan.forEach((touchPoint) => (touchPoint.value = 0.0));
    return touchPointsInPlan;
  }

  // sort
  static toggleSortingByName(sortingByName: boolean): boolean {
    return !sortingByName;
  }
  static sortByName(touchPointsInPlan:TouchPointInPlan[]) {
   return touchPointsInPlan.sort((a: TouchPointBasics, b: TouchPointBasics) => {
      if (a.displayName > b.displayName) {
        return 1;
      }
      if (a.displayName < b.displayName) {
        return -1;
      }
      return 0;
    });
  }
  static sortByReach(touchPointsInPlan:TouchPointInPlan[]) {
    return touchPointsInPlan.sort((a: TouchPointInPlan, b: TouchPointInPlan) => b.value - a.value);
  }

  // hide
  static toggleShowAll(showAll:boolean):boolean {
    return !showAll;
  }

  // results
  static updateTouchPointsInPlan(touchPointName: string, value: number, touchPointsInPlan:TouchPointInPlan[]): TouchPointInPlan[] {
    const index: number = touchPointsInPlan.findIndex((touchPoint: TouchPointInPlan): boolean => {
      return touchPoint.name === touchPointName;
    });
    const touchPointToUpdate: TouchPointInPlan = touchPointsInPlan[index];
    touchPointToUpdate.value = value;
    touchPointsInPlan.splice(index, 1, touchPointToUpdate);
    return touchPointsInPlan;
  } 
  private static calculateTotalReach(touchPointsInPlan: TouchPointInPlan[]):number {
    let totalReachPortion = 0.0;
    for (const touchPoint of touchPointsInPlan) {
      const r = touchPoint.value / 100;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    return  100 * totalReachPortion;
  }
  private static calculateLocus(touchPointsInPlan: TouchPointInPlan[]): number {
    let duplicateReachPortion = 0.0;
    for (const touchPoint of touchPointsInPlan) {
      if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
        const r = touchPoint.value / 100;
        duplicateReachPortion *= r;
      }
      if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
        duplicateReachPortion = touchPoint.value / 100;
      }
    }
   return 100 * duplicateReachPortion;
  }
  static calculateResults(touchPointsInPlan:TouchPointInPlan[]):[number, number] {
    const totalReach = Reach.calculateTotalReach(touchPointsInPlan);
    const locus = Reach.calculateLocus(touchPointsInPlan);
    return [totalReach, locus];
  }
}

// Ui
export class Ui {
  static translate(input: string, items: Translation[], language: string): string {
    return items.filter((element: Translation) => element.name === input && element.language === language)[0].displayName;
  }

  static displayContent(page: string, items: Content[], language: string): string {
    return items.filter((element: Content) => {
      element.name === page && element.language === language;
    })[0].displayName;
  }

  static describeContent(page: string, items: Content[], language: string): string {
    return items.filter((element: Content) => {
      element.name === page && element.language === language;
    })[0].description;
  }

  static capitalizeAndSplit(str: string): string {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }

  static latinizeAndJoin(str: string): string {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
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

// Reach leftovers
// static removeZeroValueTouchPoints(touchPointsInPlan:TouchPointInPlan[]):TouchPointInPlan[] {
  //   return touchPointsInPlan.filter((touchPoint: TouchPointInPlan) => touchPoint.value > 0);
  // }
  // static replenishTouchPoints(language:string, touchPointsInPlan:TouchPointInPlan[], touchPointsBasics:TouchPointBasics[]):TouchPointInPlan[] {
  //   const translatedTouchPointsBasics: TouchPointBasics[] = touchPointsBasics.filter((touchPointBasics)=>touchPointBasics.language === language);
  //   console.log(`language ${typeof language} ${language}, #touchPointsInPlan ${touchPointsInPlan.length}, #touchPointsBasics ${touchPointsBasics.length}, #translatedTouchPointsBasics ${translatedTouchPointsBasics.length} before loop within replenish function`);     
  //   for (const touchPointBasics of translatedTouchPointsBasics) {            
  //     if (!touchPointsInPlan.some((touchPointInPlan): boolean =>   touchPointInPlan.name === touchPointBasics.name)) {
  //       touchPointsInPlan =  [...touchPointsInPlan, {...touchPointBasics, value: 0.0}];
  //     }
  //   }
  //   console.log('#touchPointsInPlan after loop within replenish function', touchPointsInPlan.length);    
  //   return touchPointsInPlan;
  // }
