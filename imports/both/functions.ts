// ====== IMPORTS ===============================
// packages
import {Roles} from 'meteor/alanning:roles';
import dayjs from 'dayjs';
const isoWeek = require('dayjs/plugin/isoWeek');
import advancedFormat from 'dayjs/plugin/advancedFormat';
//import {Mongo} from 'meteor/mongo';
dayjs.extend(advancedFormat);

// interfaces
import type {Year, Month, Week} from '../ui/types/types';

//collections
// import Translations from '../api/translations/translations';
// import TouchPointsBasics from '../api/touchpointsbasics/touchpointsbasics';

// variables

// CSS
export function cssVariables(element: HTMLElement, setCss: (e: HTMLElement) => void) {
  setCss(element);
  return {
    update() {
      setCss(element);
    }
  };
}

// cookies
export function setCookie(name: string, value: string, exdays: number, doc: Document): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires: string = 'expires=' + d.toUTCString();
  doc.cookie = name + '=' + value + ';' + expires + ';path=/';
  console.log('setCookie: ', name + '=' + value + ';' + expires + ';path=/');
}

export function getCookie(name: string, doc: Document): string {
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
export function checkCookie(name: string, doc: Document) {
  let value: string | null = getCookie(name, doc);
  if (value != '') {
    alert('Welcome again ' + value);
  } else {
    value = prompt('Please enter your name:', '');
    if (value != '' && value != null) {
      setCookie(name, value, 365, doc);
    }
  }
}

export function deleteCookie(name: string, value: string, doc: Document): void {
  const d = new Date(0);
  const expires: string = 'expires=' + d.toUTCString();
  doc.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// schedule functions
export function assembleYears(start: Date, end: Date): Year[] {
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

export function assembleMonths(start: Date, end: Date): Month[] {
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

export function assembleWeeks(start: Date, end: Date): Week[] {
  const weeks = [];
  const dayOne = dayjs(start).startOf('month');
  for (let current = dayOne.startOf(isoWeek); current.isBefore(dayjs(end).endOf('month')); current.add(1, 'weeks')) {
    const scheduleDays = dayjs(current).endOf(isoWeek).diff(dayjs(current).startOf(isoWeek), 'days') + 1;
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

export function calculatePreambleDays(start: Date): number {
  const dayOne = dayjs(start).startOf('month');
  const preambleDays = dayjs(start).startOf('month').diff(dayOne.startOf(isoWeek), 'days');
  console.log('preambleDays:', preambleDays, dayjs(start).startOf('month'), dayOne.startOf(isoWeek));
  /* Preamble width is 2 units per day plus one to align with the right border of the first week */
  return preambleDays;
}

export function mayChange(touchPointName: string, userId: string, companyId: string): boolean {
  // This check happens just for the ui, real authorisation check happens in validated methods.
  if (
    Roles.userIsInRole(userId, ['owner', 'companyAdmin', touchPointName], companyId) ||
    Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
  ) {
    return true;
  }
  return false;
}

export function maySeeDatesForCompany(userId: string, companyId?: string): boolean {
  // Client based check for more relevant presentation
  return (
    Roles.userIsInRole(userId, 'dates', companyId) ||
    Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
    Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
  );
}

export function maySeeInputForCompany(userId: string, companyId?: string): boolean {
  // Client based check for more relevant presentation
  return (
    Roles.userIsInRole(userId, 'input', companyId) ||
    Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
    Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
  );
}

export function maySeeCostsForCompany(userId: string, companyId?: string): boolean {
  // Client based check for more relevant presentation
  return (
    Roles.userIsInRole(userId, 'costs', companyId) ||
    Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
    Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
  );
}

export function mayChangeTouchPointForCompany(
  userId: string,
  touchPoint: string | string[],
  companyId?: string
): boolean {
  // Client based check for more relevant presentation
  return (
    Roles.userIsInRole(userId, touchPoint, companyId) ||
    Roles.userIsInRole(userId, ['owner', 'companyAdmin'], companyId) ||
    Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
  );
}

// general functions
export function defaultInputType(touchPointName: string): string {
  if (
    ['asset', 'cinema', 'outdoor', 'pr', 'promotion', 'television', 'radio', 'sponsorship'].indexOf(touchPointName) !==
    -1
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

export function findObjectAndProject(
  input: number | string,
  searchKey: any,
  collection: [],
  projectKey1: string,
  projectKey2: string
): any {
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
