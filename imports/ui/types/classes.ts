// imports
import type {Content, TouchPointBasics, Translation, Year, Month, Week, DeployedTouchPoint} from './types';
import {Roles} from 'meteor/alanning:roles';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import type {Strategy} from '/imports/api/strategies/strategies';
import {Mongo} from 'meteor/mongo';
import {touchPointsBasics} from '../stores/tools';
//import {Mongo} from 'meteor/mongo';
dayjs.extend(isoWeek, advancedFormat);

// Authorization
export class Authorization {
  static mayChange(touchPointName: string, userId: string, companyId: string): boolean {
    // This check happens just for the ui, real authorisation check happens in validated methods.
    if (
      Roles.userIsInRole(userId, ['owner', 'companyAdmin', touchPointName], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      return true;
    }
    return false;
  }

  static maySeeDatesForCompany(userId: string, companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, 'dates', companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }

  static maySeeInputForCompany(userId: string, companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, 'input', companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }

  static maySeeCostsForCompany(userId: string, companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, 'costs', companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }

  static mayChangeTouchPointForCompany(userId: string, touchPoint: string | string[], companyId?: string): boolean {
    // Client based check for more relevant presentation
    return (
      Roles.userIsInRole(userId, touchPoint, companyId) ||
      Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
      Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
    );
  }
}

// Convert
export class Convert {
  static translate(input: string | undefined | null, items: Translation[], language: string): string {
    return items.filter((element: Translation) => element.name === input && element.language === language)[0]
      .displayName;
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
}

// Cookies
export class Cookies {
  static setCookie(name: string, value: string, exdays: number, doc: Document) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires: string = 'expires=' + d.toUTCString();
    doc.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  static getCookie(name: string, doc: Document): string {
    const cname = name + '=';
    const decodedCookie = decodeURIComponent(doc.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return '';
  }
  static checkCookie(name: string, doc: Document) {
    const value: string | null = this.getCookie(name, doc);
    if (name.startsWith('_commswithaplan') && (value === 'granted' || 'denied')) {
      return true;
    } else {
      return false;
    }
  }

  static deleteCookie(name: string, value: string, doc: Document): void {
    const d = new Date(0);
    const expires: string = 'expires=' + d.toUTCString();
    doc.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  static checkedToConsent(arg: boolean): 'granted' | 'denied' {
    return arg === false ? 'denied' : arg === true ? 'granted' : 'granted';
  }
  static consentToChecked(arg: string): boolean {
    return arg === 'denied' ? false : arg === 'granted' ? true : true;
  }
}

// Format
export class Format {
  static capitalizeAndSplit(str: string): string {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }

  static latinizeAndJoin(str: string): string {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.split(' ').join('');
    str = str.toLowerCase();
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

// Reach
export class Reach {
  static setTouchPointsForPlan(touchPointsBasics: TouchPointBasics[]): DeployedTouchPoint[] {
    return touchPointsBasics.map(
      (touchPointBasics): DeployedTouchPoint => ({...touchPointBasics, value: 0.0, show: true})
    );
  }

  static setStrategy(title: string, touchPointsBasics: TouchPointBasics[], user?: string | Mongo.ObjectID) {
    return {
      title: title,
      marketData: undefined,
      market: undefined,
      createdAt: new Date(),
      lastChanged: new Date(),
      deployment: this.setTouchPointsForPlan(touchPointsBasics),
      overlap: 0,
      totalReach: 0,
      // Only required when marketData (population & probabilities) true
      userId: user,
      ageStart: undefined,
      ageEnd: undefined,
      ageGroupStart: undefined,
      ageGroupEnd: undefined,
      genders: undefined,
      peopleInAgeRange: undefined,
      respondentsCount: undefined,
      reachedNonUnique: undefined,
      reachedUnique: undefined,
      companyId: undefined,
      brand: undefined,
      product: undefined
    };
  }

  static areAllTouchPointsValueZero(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.value === 0);
  }

  // input
  static defaultInputType(touchPointName: string): string {
    if (
      ['asset', 'cinema', 'outdoor', 'pr', 'promotion', 'television', 'radio', 'sponsorship'].indexOf(
        touchPointName
      ) !== -1
    ) {
      return 'contacts'; // This defaultinputtype could be "grps" as well
    }
    if (
      [
        'advocacy',
        'app',
        'console_game',
        'display',
        'e_mail',
        'mobile',
        'social',
        'video_on_demand',
        'viral',
        'website',
        'sem',
        'seo'
      ].indexOf(touchPointName) !== -1
    ) {
      return 'impressions';
    }
    if (
      [
        'ambassador',
        'direct_mail',
        'door_drop',
        'event',
        'experiential',
        'internal_employee',
        'loyalty_crm',
        'magazines',
        'newspapers',
        'trade_fair',
        'packaging',
        'shopper',
        'word_of_mouth'
      ].indexOf(touchPointName) !== -1
    ) {
      return 'contacts';
    }
    return 'contacts';
  }

  // reset
  static resetTouchPoints(touchPoints: DeployedTouchPoint[]): DeployedTouchPoint[] {
    touchPoints.forEach((touchPoint) => (touchPoint.value = 0.0));
    return touchPoints;
  }

  // sort
  static sortByName(touchPoints: DeployedTouchPoint[], language: string) {
    return touchPoints.sort((a: TouchPointBasics, b: TouchPointBasics) => {
      const basicsOfTouchPointA = a.basics.find((item) => item.language == language);
      const basicsOfTouchPointB = b.basics.find((item) => item.language == language);
      if (basicsOfTouchPointA && basicsOfTouchPointB) {
        if (basicsOfTouchPointA.displayName > basicsOfTouchPointB.displayName) {
          return 1;
        }
        if (basicsOfTouchPointA.displayName < basicsOfTouchPointB.displayName) {
          return -1;
        }
      }
      return 0;
    });
  }

  static sortByReach(touchPoints: DeployedTouchPoint[]) {
    return touchPoints.sort((a: DeployedTouchPoint, b: DeployedTouchPoint) => b.value - a.value);
  }

  // hide
  static hide(touchPoints: DeployedTouchPoint[]) {
    touchPoints.forEach((touchPoint) => {
      if (touchPoint.value === 0) {
        touchPoint.show = false;
      }
    });
    return touchPoints;
  }

  static show(touchPoints: DeployedTouchPoint[]) {
    touchPoints.forEach((touchPoint) => (touchPoint.show = true));
    return touchPoints;
  }

  static isShowAll(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.show === true);
  }

  // results
  static updateDeployedTouchPoint(
    touchPointName: string,
    value: number,
    touchPoints: DeployedTouchPoint[]
  ): DeployedTouchPoint[] {
    const index: number = touchPoints.findIndex((touchPoint: DeployedTouchPoint): boolean => {
      return touchPoint.name === touchPointName;
    });
    const touchPointToUpdate: DeployedTouchPoint = touchPoints[index];
    touchPointToUpdate.value = value;
    touchPoints.splice(index, 1, touchPointToUpdate);
    return touchPoints;
  }
  private static calculateTotalReach(touchPoints: DeployedTouchPoint[]): number {
    let totalReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
      const r = touchPoint.value / 100;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    return 100 * totalReachPortion;
  }
  private static calculateLocus(touchPoints: DeployedTouchPoint[]): number {
    let duplicateReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
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
  static calculateResults(touchPoints: DeployedTouchPoint[]): [number, number] {
    const totalReach = Reach.calculateTotalReach(touchPoints);
    const overlap = Reach.calculateLocus(touchPoints);
    return [totalReach, overlap];
  }

  // Reach with data
  static findObjectAndProject(
    input: number | string,
    searchKey: string,
    collection: [],
    projectKey1: string,
    projectKey2: string
  ): number | string {
    const thisObject = collection.find((element) => element[searchKey] === input);
    if (thisObject === undefined) {
      throw new TypeError('No outcome for thisObject with 1 key.');
    }
    if (typeof projectKey2 === 'undefined') {
      return thisObject[projectKey1];
    } else {
      return thisObject[projectKey1][projectKey2];
    }
  }
}

// Schedule
export class Schedule {
  static assembleYears(start: Date, end: Date): Year[] {
    const years = [];
    const calendarDaysInFirstYear = dayjs(start).endOf('year').diff(dayjs(start).startOf('year'), 'days') + 1;
    const scheduledDaysInFirstYear = dayjs(start).endOf('year').diff(dayjs(start).startOf('month'), 'days') + 1;
    let year = {
      name: dayjs(start).format('YYYY'),
      days: scheduledDaysInFirstYear
    };
    years.push(year);

    if (scheduledDaysInFirstYear < calendarDaysInFirstYear) {
      const scheduledDaysInSecondYear = dayjs(end).endOf('month').diff(dayjs(end).startOf('year'), 'days') + 1;
      year = {
        name: dayjs(end).format('YYYY'),
        days: scheduledDaysInSecondYear
      };
      years.push(year);
    }
    console.log('years :', years);
    return years;
  }

  static assembleMonths(start: Date, end: Date): Month[] {
    const months = [];
    for (let current = dayjs(start); current.isBefore(dayjs(end).add(1, 'months'), 'month'); current.add(1, 'months')) {
      const scheduleDays = dayjs(current).daysInMonth();
      const month = {
        name: dayjs(current).format('MMM'),
        days: scheduleDays
      };
      months.push(month);
    }
    console.log('months :', months);
    return months;
  }

  static assembleWeeks(start: Date, end: Date): Week[] {
    const weeks = [];
    const dayOne = dayjs(start).startOf('month');
    for (
      let current = dayOne.startOf('isoWeek');
      current.isBefore(dayjs(end).endOf('month'));
      current.add(1, 'weeks')
    ) {
      const scheduleDays = dayjs(current).endOf('isoWeek').diff(dayjs(current).startOf('isoWeek'), 'days') + 1;
      const week = {
        name: dayjs(current).format('W'),
        days: scheduleDays,
        monday: dayjs(current).format('D')
      };
      weeks.push(week);
    }
    console.log('weeks :', weeks);
    return weeks;
  }

  static calculatePreambleDays(start: Date): number {
    const dayOne = dayjs(start).startOf('month');
    const preambleDays = dayjs(start).startOf('month').diff(dayOne.startOf('isoWeek'), 'days');
    console.log('preambleDays:', preambleDays, dayjs(start).startOf('month'), dayOne.startOf('isoWeek'));
    /* Preamble width is 2 units per day plus one to align with the right border of the first week */
    return preambleDays;
  }
}
