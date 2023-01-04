// imports
import type {Content, TouchPointBasics, TouchPointInPlan, Translation, Year, Month, Week} from './types';
import {Roles} from 'meteor/alanning:roles';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import advancedFormat from 'dayjs/plugin/advancedFormat';
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
    console.log('setCookie: ', name + '=' + value + ';' + expires + ';path=/');
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

// Reach
export class Reach {
  static setTouchPointsForPlan(touchPointsBasics: TouchPointBasics[], language: string): TouchPointInPlan[] {
    return touchPointsBasics
      .filter((touchPointBasics: TouchPointBasics) => touchPointBasics.language === language)
      .map((touchPointBasics): TouchPointInPlan => ({...touchPointBasics, value: 0.0, show: true}));
  }

  static areAllTouchPointsValueZero(touchPointsInPlan: TouchPointInPlan[]): boolean {
    return touchPointsInPlan.every((touchPoint) => touchPoint.value === 0);
  }

  static changeLanguage(
    language: string,
    touchPointsInPlan: TouchPointInPlan[],
    touchPointsBasics: TouchPointBasics[]
  ): TouchPointInPlan[] {
    touchPointsInPlan.forEach((touchPointInPlan: TouchPointInPlan) => {
      const thisTouchPointBasics: TouchPointBasics = touchPointsBasics.filter(
        (touchPointBasics: TouchPointBasics) =>
          touchPointBasics.name === touchPointInPlan.name && touchPointBasics.language === language
      )[0];
      touchPointInPlan.displayName = thisTouchPointBasics.displayName;
      touchPointInPlan.description = thisTouchPointBasics.description;
    });
    return touchPointsInPlan;
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
        'e-mail',
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
  static resetTouchPoints(touchPointsInPlan: TouchPointInPlan[]): TouchPointInPlan[] {
    touchPointsInPlan.forEach((touchPoint) => (touchPoint.value = 0.0));
    return touchPointsInPlan;
  }

  // sort
  static sortByName(touchPointsInPlan: TouchPointInPlan[]) {
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
  static sortByReach(touchPointsInPlan: TouchPointInPlan[]) {
    return touchPointsInPlan.sort((a: TouchPointInPlan, b: TouchPointInPlan) => b.value - a.value);
  }

  // hide
  static hide(touchPointsInPlan: TouchPointInPlan[]) {
    touchPointsInPlan.forEach((touchPoint) => {
      if (touchPoint.value === 0) {
        touchPoint.show = false;
      }
    });
    return touchPointsInPlan;
  }

  static show(touchPointsInPlan: TouchPointInPlan[]) {
    touchPointsInPlan.forEach((touchPoint) => (touchPoint.show = true));
    return touchPointsInPlan;
  }

  static isShowAll(touchPointsInPlan: TouchPointInPlan[]): boolean {
    return touchPointsInPlan.every((touchPoint) => touchPoint.show === true);
  }

  // results
  static updateTouchPointInPlan(
    touchPointName: string,
    value: number,
    touchPointsInPlan: TouchPointInPlan[]
  ): TouchPointInPlan[] {
    const index: number = touchPointsInPlan.findIndex((touchPoint: TouchPointInPlan): boolean => {
      return touchPoint.name === touchPointName;
    });
    const touchPointToUpdate: TouchPointInPlan = touchPointsInPlan[index];
    touchPointToUpdate.value = value;
    touchPointsInPlan.splice(index, 1, touchPointToUpdate);
    return touchPointsInPlan;
  }
  private static calculateTotalReach(touchPointsInPlan: TouchPointInPlan[]): number {
    let totalReachPortion = 0.0;
    for (const touchPoint of touchPointsInPlan) {
      const r = touchPoint.value / 100;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    return 100 * totalReachPortion;
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
  static calculateResults(touchPointsInPlan: TouchPointInPlan[]): [number, number] {
    const totalReach = Reach.calculateTotalReach(touchPointsInPlan);
    const locus = Reach.calculateLocus(touchPointsInPlan);
    return [totalReach, locus];
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
