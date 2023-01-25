// imports
import {Mongo} from 'meteor/mongo';

// global
declare global {
  interface Window {
    dataLayer: Array<{[key: string]: string | number | Date}>;
  }
}

// content
export type Content = {name: string; language: 'english' | 'dutch'; displayName: string; description: string};
export type Color = {color: string};
export type Colored = {colored: boolean};
export type Illustrated = {imgFiles: string[]};
export type Actionable = {link: string; action: string};
type Paragraph = {displayName: string; description: string; elaboration?: string};
export type Chapter = Omit<Content & Illustrated, 'description'> & {paragraphs: Paragraph[]};
export type Article = Omit<Content, 'description'> & {paragraphs: Paragraph[]};
export type Translation = Omit<Content, 'description'>;
export type TouchPointBasics = Pick<Content, 'name'> & {basics: Omit<Content, 'name'>[]};
export type DeployedTouchPoint = TouchPointBasics & {
  value: number;
  show: boolean;
  inputType?: 'contacts' | 'grps' | 'impressions' | 'reach';
};
export type Market = {
  name: 'nl' | 'uk' | 'gb' | 'en' | 'be';
  flag: string;
  displayNames: {language: string; displayName: string}[];
};
export type AgeGroup = [number, number | string];

export interface Genders {
  m: boolean;
  f: boolean;
  x: boolean;
}
export interface Strategy {
  _id?: string | Mongo.ObjectID;
  title?: string;
  marketData?: boolean;
  market: Market;
  createdAt: Date;
  lastChanged: Date;
  deployment: DeployedTouchPoint[];
  overlap: number;
  totalReach: number;
  // Only required when marketData (population & probabilities) true
  userId?: string | Mongo.ObjectID;
  ageStart?: number;
  ageEnd?: number;
  ageGroupStart?: AgeGroup;
  ageGroupEnd?: AgeGroup;
  genders?: Genders;
  peopleInAgeRange?: number;
  respondentsCount?: number;
  reachedNonUnique?: number;
  reachedUnique?: number;
  companyId?: string | {[key: string]: string};
  brand?: string;
  product?: string;
}

export type Week = {name: string; days: number; monday: string};
export type Month = {name: string; days: number};
export type Year = {name: string; days: number};

// components
export type Accordion = {visible: boolean};
export type Brand = Partial<svelteHTML.IntrinsicElements['span']> & Partial<HTMLElement['style']>;
export type Card = Partial<Illustrated & Actionable> &
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
