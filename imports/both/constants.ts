// packages
import dayjs from 'dayjs';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(QuarterOfYear);

// Consts
export const PROBABILITIES_CODING = {
  // Coding variable in data is equal to index
  nl: {
    genders: [
      {gender: 'male', category: 0},
      {gender: 'female', category: 1}
    ],
    ages: [
      {start: 9, end: 11, category: 0},
      {start: 12, end: 19, category: 1},
      {start: 20, end: 34, category: 2},
      {start: 35, end: 49, category: 3},
      {start: 50, end: 64, category: 4},
      {start: 65, end: 99, category: 5}
    ]
  },
  uk: {
    genders: [
      {gender: 'male', category: 0},
      {gender: 'female', category: 1}
    ],
    ages: [
      {start: 9, end: 11, category: 0},
      {start: 12, end: 19, category: 1},
      {start: 20, end: 34, category: 2},
      {start: 35, end: 49, category: 3},
      {start: 50, end: 64, category: 4},
      {start: 65, end: 99, category: 5}
    ]
  }
};
export const MARKETS = ['nl', 'gb', 'uk', 'en', 'de', 'fr', 'be', 'es', 'ie', 'us', 'ca', 'ch', 'my', 'sg'];
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
  'e-mail',
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
  dayjs().subtract(2, 'years').format('YYYY'),
  dayjs().subtract(1, 'years').format('YYYY'),
  dayjs().format('YYYY'),
  dayjs().add(1, 'years').format('YYYY'),
  dayjs().add(2, 'years').format('YYYY')
];
export const QUARTERS = [1, 2, 3, 4].map((quarter) => {
  return {
    name: dayjs().quarter(quarter).format('Q'),
    selected: false
  };
});
export const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
  return {
    name: dayjs().month(month).format('MMMM'),
    selected: false
  };
});

export const AGE_MIN = 12;
export const AGE_MAX = 99;
export const MIN_AGE_RANGE = 5;

export const INPUT_TYPES: string[] = ['reach', 'grps', 'impressions', 'contacts'];
export const CURRENCIES: string[] = ['EUR', 'GBP', 'USD'];
export const LANGUAGES: string[] = ['dutch', 'english', 'german', 'french', 'spanish', 'malay', 'chinese'];
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
