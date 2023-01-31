// Schedule
// imports
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import {Month, Week, Year} from '../../both/typings/types';
dayjs.extend(isoWeek, advancedFormat);

// class
export default function Scheduler() {
  function assembleYears(start: Date, end: Date): Year[] {
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

  function assembleMonths(start: Date, end: Date): Month[] {
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

  function assembleWeeks(start: Date, end: Date): Week[] {
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

  function calculatePreambleDays(start: Date): number {
    const dayOne = dayjs(start).startOf('month');
    const preambleDays = dayjs(start).startOf('month').diff(dayOne.startOf('isoWeek'), 'days');
    console.log('preambleDays:', preambleDays, dayjs(start).startOf('month'), dayOne.startOf('isoWeek'));
    /* Preamble width is 2 units per day plus one to align with the right border of the first week */
    return preambleDays;
  }
  return {assembleYears, assembleMonths, assembleWeeks, calculatePreambleDays};
}
