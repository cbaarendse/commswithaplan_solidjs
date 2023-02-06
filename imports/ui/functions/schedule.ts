// Schedule
// imports
import {DateTime} from 'luxon';
import {Month, Week, Year} from '../../both/typings/types';

// class
export default function Scheduler() {
  function assembleYears(start: Date, end: Date): Year[] {
    const years = [];
    const calendarDaysInFirstYear =
      DateTime.fromJSDate(start).endOf('year').diff(DateTime.fromJSDate(start).startOf('year')).as('days') + 1;
    const scheduledDaysInFirstYear =
      DateTime.fromJSDate(start).endOf('year').diff(DateTime.fromJSDate(start).startOf('month')).as('days') + 1;
    let year = {
      name: DateTime.fromJSDate(start).toFormat('YYYY'),
      days: scheduledDaysInFirstYear
    };
    years.push(year);

    if (scheduledDaysInFirstYear < calendarDaysInFirstYear) {
      const scheduledDaysInSecondYear =
        DateTime.fromJSDate(end).endOf('month').diff(DateTime.fromJSDate(end).startOf('year')).as('days') + 1;
      year = {
        name: DateTime.fromJSDate(end).toFormat('YYYY'),
        days: scheduledDaysInSecondYear
      };
      years.push(year);
    }
    console.log('years :', years);
    return years;
  }

  function assembleMonths(start: Date, end: Date): Month[] {
    const months = [];
    for (let current = DateTime.fromJSDate(start); current < DateTime.fromJSDate(end); current.plus({months: 1})) {
      const scheduleDays = current.daysInMonth;
      const month = {
        name: current.toFormat('MMM'),
        days: scheduleDays
      };
      months.push(month);
    }
    console.log('months :', months);
    return months;
  }

  function assembleWeeks(start: Date, end: Date): Week[] {
    const weeks = [];
    const dayOne = DateTime.fromJSDate(start).startOf('month');
    for (
      //TODO: isoweek??
      let current = dayOne.startOf('week');
      current < DateTime.fromJSDate(end).endOf('month');
      current.plus({weeks: 1})
    ) {
      const scheduleDays = current.endOf('week').diff(current.startOf('week')).as('days') + 1;
      const week = {
        name: current.toFormat('W'),
        days: scheduleDays,
        monday: current.toFormat('D')
      };
      weeks.push(week);
    }
    console.log('weeks :', weeks);
    return weeks;
  }

  function calculatePreambleDays(start: Date): number {
    const dayOne = DateTime.fromJSDate(start).startOf('month');
    const preambleDays = DateTime.fromJSDate(start).startOf('month').diff(dayOne.startOf('week')).as('days');
    console.log('preambleDays:', preambleDays, DateTime.fromJSDate(start).startOf('month'), dayOne.startOf('week'));
    /* Preamble width is 2 units per day plus one to align with the right border of the first week */
    return preambleDays;
  }
  return {assembleYears, assembleMonths, assembleWeeks, calculatePreambleDays};
}
