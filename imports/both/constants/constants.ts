// packages
import {DateTime} from 'luxon';

// Consts

export const MARKETNAMES = ['be', 'nl', 'uk'];
// TODO: rename to subscriptions or tiers
export const PLANS = ['oneByOne', 'oneForMore', 'oneForAll'];

export const TOUCHPOINTSNAMES = [
  'advocacy',
  'ambassador',
  'app',
  'asset',
  'cinema',
  'console_game',
  'direct_mail',
  'display',
  'door_drop',
  'internal_employee',
  'event',
  'experiential',
  'e_mail',
  'loyalty_crm',
  'magazines',
  'mobile',
  'newspapers',
  'outdoor',
  'packaging',
  'pr',
  'promotion',
  'shopper',
  'radio',
  'sem',
  'seo',
  'social',
  'sponsorship',
  'trade_fair',
  'television',
  'video_on_demand',
  'viral',
  'website',
  'word_of_mouth'
];

export const YEARS = [
  DateTime.now().minus({years: 2}).toFormat('YYYY'),
  DateTime.now().minus({years: 1}).toFormat('YYYY'),
  DateTime.now().toFormat('YYYY'),
  DateTime.now().plus({years: 1}).toFormat('YYYY'),
  DateTime.now().plus({years: 2}).toFormat('YYYY')
];
export const QUARTERS = [1, 2, 3, 4].map(() => {
  return {
    name: DateTime.now().quarter,
    selected: false
  };
});
export const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
  return {
    name: DateTime.now().monthLong,
    selected: false
  };
});

export const AGE_MIN = 12;
export const AGE_MAX = 99;
export const MIN_AGE_RANGE = 5;

export const CURRENCIES: string[] = ['EUR', 'GBP', 'USD'];
export const LANGUAGES: string[] = ['nl_NL', 'en_GB', 'nl_BE', 'fr_BE', 'de_DE', 'fr_FR', 'es_ES', 'ms', 'zh_CN'];
export const CAMPAIGN_DATATYPES: string[] = ['dates', 'title', 'input', 'reach', 'costs'];

export const COMPANY_OWNER_ROLES: string[] = ['owner', 'companyAdmin'];
export const COMPANY_CONTRIBUTOR_ROLES: string[] = ['dates', 'input', 'costs', 'invited'];
export const COMPANY_EMPLOYEE_ROLES: string[] = ['employee'];
export const COMPANY_ALL_ROLES: string[] = [
  ...COMPANY_CONTRIBUTOR_ROLES,
  ...COMPANY_OWNER_ROLES,
  ...COMPANY_EMPLOYEE_ROLES,
  ...TOUCHPOINTSNAMES
];
