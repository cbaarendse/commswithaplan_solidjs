// imports
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {HTMLInputAttributes, HTMLAttributes} from 'svelte/elements';

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
export type InputType = Omit<Translation, 'name'> & {name: 'contacts' | 'grps' | 'impressions' | 'reach'};

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
export type Genders = Array<'f' | 'm' | 'x'>;
export type MarketData = boolean;
export type RespondentsCount = number;
export type PopulationInRange = number;
export type ReachedNonUnique = number;
export type ReachedUnique = number;
export type SortedByName = boolean;
export type Overlap = number;
export type TotalReach = number;
export type Results = [TotalReach, Overlap];
export type TouchPointName =
  | 'advocacy'
  | 'ambassador'
  | 'app'
  | 'asset'
  | 'cinema'
  | 'console_game'
  | 'direct_mail'
  | 'display'
  | 'door_drop'
  | 'internal_employee'
  | 'event'
  | 'experiential'
  | 'e_mail'
  | 'loyalty_crm'
  | 'magazines'
  | 'mobile'
  | 'newspapers'
  | 'outdoor'
  | 'packaging'
  | 'pr'
  | 'promotion'
  | 'shopper'
  | 'radio'
  | 'sem'
  | 'seo'
  | 'social'
  | 'sponsorship'
  | 'trade_fair'
  | 'television'
  | 'video_on_demand'
  | 'viral'
  | 'website'
  | 'word_of_mouth';
export type TouchPointDefinition = Omit<Content, 'name'> & {name: TouchPointName} & {
  defaultInputType: InputType['name'];
};
export type DeployedTouchPoint = TouchPointDefinition & {
  value: number;
  show: boolean;
  inputType: InputType['name'];
};
export type ComplementedTouchPoint = {
  name: TouchPointName;
  value: number;
  inputType: InputType['name'];
  selected?: boolean;
  maxReachedRespondents?: number;
  sumOfProbabilities?: number;
  minValue?: number;
  grps?: number;
  maxValue?: number;
  averageProbability?: number;
};

export type Strategy = {
  userId: string | Mongo.ObjectID;
  title: string;
  marketName: Market['name'];
  createdAt: Date;
  lastChanged: Date;
  deployment: DeployedTouchPoint[];
  useMarketData?: boolean;
  ageGroupIndexStart?: number;
  ageGroupIndexEnd?: number;
  genders?: Genders;
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
  age: number;
  gender: 'm' | 'f' | 'x';
  marketName: string;
} & {
  [key in TouchPointName]: number;
};

export type Week = {name: string; days: number; monday: string};
export type Month = {name: string; days: number};
export type Year = {name: string; days: number};

// components
export type Accordion = {visible: boolean};
export type Brand = Partial<HTMLAttributes<HTMLSpanElement>> & Partial<HTMLElement['style']>;
export type Card = Partial<Illustrated & Action & Link> & ['article'] & Partial<HTMLElement['style']>;
export type Checkbox = HTMLInputAttributes;
export type Logo = HTMLAttributes<HTMLDivElement> & Partial<HTMLElement['style']> & Colored;
export type Input = HTMLInputAttributes;
export type Label = HTMLAttributes<HTMLLabelElement> & Partial<HTMLElement['style']>;
export type Meter = HTMLAttributes<HTMLMeterElement> & Partial<HTMLElement['style']>;

// building blocks
// type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
// type Display = 'none' | 'block' | 'grid' | 'flex';
