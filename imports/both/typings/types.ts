// imports
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// global
declare global {
  interface Window {
    dataLayer: Array<{[key: string]: string | number | Date}>;
  }
}

// content
export type Language = 'english' | 'dutch';
export type Definition = {language: Language; displayName: string; description: string};
export type Content = {name: string; definitions: Definition[]};
export type Translation = {name: string; definitions: Omit<Definition, 'description'>[]};
export type Action = {action: string};
export type Link = {link: string};
export type Actionable = {name: string; definitions: (Definition & Action)[]} & Link;
export type Color = {color: string};
export type Colored = {colored: boolean};
export type Illustrated = {imgFiles: string[]};
type Paragraph = {displayName: string; description: string; elaboration?: string};
export type Chapter = Omit<Definition, 'description'> &
  Omit<Content, 'definitions'> &
  Illustrated & {
    paragraphs: Paragraph[];
  };
export type Article = Omit<Definition, 'description'> & Omit<Content, 'definitions'> & {paragraphs: Paragraph[]};

export type TouchPointBasics = {name: string; basics: {language: Language; displayName: string; description: string}[]};
export type DeployedTouchPoint = TouchPointBasics & {
  value: number;
  show: boolean;
  inputType?: 'contacts' | 'grps' | 'impressions' | 'reach';
};

export type UserProfile = {
  firstname?: string;
  surname?: string;
  phone?: number;
  street?: string;
  zipcode?: string;
  city?: string;
  companyId?: string;
  lastLanguage?: string;
  lastCompanyId?: string;
  lastBrandId?: string;
  lastProductId?: string;
  lastStrategyId?: string;
  lastCampaignDataType?: string;
  lastRoute?: string;
  stripeId?: string;
  roles?: {[key: string]: [string]};
  heartbeat?: Date;
};

export type CWAPUser = Meteor.User & {
  profile?: UserProfile;
};

export interface UsersMethods {
  _id: string;
  modifier: Omit<Meteor.User, 'profile'> & {profile: UserProfile};
  touchPoint: string;
}

export type Market = {
  name: 'be' | 'nl' | 'uk';
  flag: string;
  displayNames: {language: Language; displayName: string}[];
  ageGroups: AgeGroup[];
};
export type AgeGroup = [number, number];
// export type Genders = {f: boolean; m: boolean; x: boolean};
export type Genders = Set<'f' | 'm' | 'x' | undefined | null>;

export type Strategy = {
  _id?: string | Mongo.ObjectID;
  userId: string | Mongo.ObjectID;
  title: string;
  marketData: boolean;
  marketName: Market['name'];
  createdAt: Date;
  lastChanged: Date;
  deployment: DeployedTouchPoint[];
  sortedByName: boolean;
  overlap: number;
  totalReach: number;
};
export type StrategyExtension = {
  useMarketData?: boolean;
  ageGroupStart?: AgeGroup;
  ageGroupEnd?: AgeGroup;
  genders?: Genders;
  ageStart?: number;
  ageEnd?: number;
  respondentsCount?: number;
  peopleInRange?: number;
  reachedNonUnique?: number;
  reachedUnique?: number;
  companyId?: string | Mongo.ObjectID;
  brandName?: string;
  productName?: string;
};

export type Population = {
  _id: Mongo.ObjectID;
  market: string;
} & {
  [key: string]: number;
};
export type Probability = {
  _id: Mongo.ObjectID;
  respondentId: number;
  age_group: number;
  age: number;
  gender: 'm' | 'f' | 'x';
  marketName: string;
} & {
  [key: string]: number;
};

export type Week = {name: string; days: number; monday: string};
export type Month = {name: string; days: number};
export type Year = {name: string; days: number};

// components
export type Accordion = {visible: boolean};
export type Brand = Partial<svelteHTML.IntrinsicElements['span']> & Partial<HTMLElement['style']>;
export type Card = Partial<Illustrated & Action & Link> &
  svelteHTML.IntrinsicElements['article'] &
  Partial<HTMLElement['style']>;
export type Checkbox = svelteHTML.IntrinsicElements['input'] & Partial<HTMLElement['style']>;
export type Logo = svelteHTML.IntrinsicElements['div'] & Partial<HTMLElement['style']> & Colored;
export type SelectItem = {name: string; index: string};
export type Input = Omit<Partial<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['input']>>, 'value'> & {
  value: number | string | undefined | null;
} & Partial<HTMLElement['style']>;
export type Select = Omit<Partial<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['select']>>, 'value'> & {
  value: number | string | undefined | null;
} & Partial<HTMLElement['style']>;

// export type RangeInput = Omit<Input, 'step'> & {step: number | string | undefined | null};
export type Label = svelteHTML.IntrinsicElements['label'] & Partial<HTMLElement['style']>;
export type Meter = svelteHTML.IntrinsicElements['meter'] & Partial<HTMLElement['style']>;

// building blocks
// type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
// type Display = 'none' | 'block' | 'grid' | 'flex';
// type Appa = svelte.JSX.AriaAttributes['aria-roledescription'];

// export type Slider = Omit<
//   Partial<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['input']>>,
//   'value' | 'min' | 'max' | 'step'
// > & {
//   value: string | undefined | null;
//   min: string | undefined | null;
//   max: string | undefined | null;
//   step: string | undefined | null;
// } & Partial<HTMLElement['style']>;

// declare module 'meteor/didericis:callpromise-mixin' {
//   export function CallPromiseMixinType(methodOptions: any): any;
// }
