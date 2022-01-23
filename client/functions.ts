  // ====== IMPORTS ===============================
  // packages
  import { Meteor } from 'meteor/meteor';
 // import { Roles } from 'meteor/alanning:roles';
  import dayjs from 'dayjs';
  var isoWeek = require('dayjs/plugin/isoWeek')
  import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Mongo } from 'meteor/mongo';
  dayjs.extend(advancedFormat);

  //collections
  // import Translations from '../api/translations/translations';
  // import TouchPointsBasics from '../api/touchpointsbasics/touchpointsbasics';

  // variables

  // schedule functions
  interface Year {name:string, days: number};
  interface Month {name:string, days: number};
  interface Week {name:string, days: number, monday:string};
  export function assembleYears(start:Date, end:Date):Year[] {
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
  };

  export function assembleMonths(start:Date, end: Date): Month[] {
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
  };

  export function assembleWeeks(start:Date, end:Date):Week[] {
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
  };

  export function calculatePreambleDays(start:Date):number {
      const dayOne = dayjs(start).startOf('month');
      const preambleDays = dayjs(start).startOf('month').diff(dayOne.startOf(isoWeek), 'days');
      console.log('preambleDays:', preambleDays, dayjs(start).startOf('month'), dayOne.startOf(isoWeek));
      /* Preamble width is 2 units per day plus one to align with the right border of the first week */
      return preambleDays;
  };

//   export function mayChange(touchPointName:string, userId:string, companyId:string):boolean {
//       // This check happens just for the ui, real authorisation check happens in validated methods.
//       if (
//           Roles.userIsInRole(userId, ['owner', 'companyAdmin', touchPointName], companyId) ||
//           Roles.userIsInRole(userId, 'admin', Roles.GLOBAL_GROUP)
//       ) {
//           return true;
//       }
//       return false;
//   }

//   export function maySeeDatesForCompany(id:string):boolean {
//       // Client based check for more relevant presentation
//       return Roles.userIsInRole(Meteor.userId(), 'dates', id) ||
//           Roles.userIsInRole(Meteor.userId(), ['owner', 'companyAdmin'], id) ||
//           Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
//   };

//   export function maySeeInputForCompany(id: string):boolean {
//       // Client based check for more relevant presentation
//       return Roles.userIsInRole(Meteor.userId(), 'input', id) ||
//           Roles.userIsInRole(Meteor.userId(), ['owner', 'companyAdmin'], id) ||
//           Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
//   };

//   export function maySeeCostsForCompany(id:string):boolean {
//       // Client based check for more relevant presentation
//       return Roles.userIsInRole(Meteor.userId(), 'costs', id) ||
//           Roles.userIsInRole(Meteor.userId(), ['owner', 'companyAdmin'], id) ||
//           Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
//   };

//   export function mayChangeTouchPointForCompany(tp:string, id:string):boolean {
//       // Client based check for more relevant presentation
//       return Roles.userIsInRole(Meteor.userId(), tp, id) ||
//           Roles.userIsInRole(Meteor.userId(), ['owner', 'companyAdmin'], id) ||
//           Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
//   };

  // general functions
  export function defaultInputType(touchPointName:string):string {
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

//   export function findObjectAndProject(input:number|string, searchKey:any, collection:Mongo.Collection<any, any>, projectKey1:any, projectKey2:any):Mongo.Cursor<any> {
//       if (typeof projectKey2 === 'undefined') {
//           return collection.find((element) => element[searchKey] === input)[projectKey1];
//       } else {
//           return collection.find((element:any) => element[searchKey] === input)[projectKey1][projectKey2];
//       }
//   }