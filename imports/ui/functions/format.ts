// imports
import {DateTime} from 'luxon';
import {language} from '../stores/utils';

// class
export default function createFormatter() {
  function capitalizeAndSplit(str: string): string {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }

  function latinizeAndJoin(str: string): string {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.split(' ').join('');
    str = str.toLowerCase();
    return str;
  }

  function toStringFormat(value: number): string {
    return value.toLocaleString();
  }

  function percentFixed(input: number, digits: number): string {
    return (input / 100).toFixed(digits);
  }
  function toDateFormat(date: Date): string {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED);
  }
  function toNumberFormat(value: number, digits: number): string {
    return new Intl.NumberFormat(language(), {style: 'decimal', maximumFractionDigits: digits}).format(value);
  }
  function toPercentFormat(value: number, digits: number): string {
    return new Intl.NumberFormat(language(), {style: 'percent', maximumFractionDigits: digits}).format(value);
  }
  function toMillionsFormat(value: number, digits: number): string {
    return new Intl.NumberFormat(language(), {
      style: 'decimal',
      maximumFractionDigits: digits,
      notation: 'compact'
    }).format(value);
  }

  function toCurrencySymbol(currency: string): string {
    const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '?';
    return `${symbol}`;
  }
  return {
    capitalizeAndSplit,
    latinizeAndJoin,
    toStringFormat,
    percentFixed,
    toDateFormat,
    toNumberFormat,
    toPercentFormat,
    toMillionsFormat,
    toCurrencySymbol
  };
}
