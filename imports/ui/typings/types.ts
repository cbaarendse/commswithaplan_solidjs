// imports
import {Mongo} from 'meteor/mongo';

// global
declare global {
  interface Window {
    dataLayer: Array<{[key: string]: string | number | Date}>;
  }
}

// content
export type Language = 'english' | 'dutch';
export type Content = {name: string; language: Language; displayName: string; description: string};
export type Color = {color: string};
export type Colored = {colored: boolean};
export type Illustrated = {imgFiles: string[]};
export type Actionable = {link: string; action: string};
type Paragraph = {displayName: string; description: string; elaboration?: string};
export type Chapter = Omit<Content & Illustrated, 'description'> & {paragraphs: Paragraph[]};
export type Article = Omit<Content, 'description'> & {paragraphs: Paragraph[]};
export type Translation = Omit<Content, 'description'>;
export type TouchPointBasics = {name: string; basics: {language: Language; displayName: string; description: string}[]};
export type DeployedTouchPoint = TouchPointBasics & {
  value: number;
  show: boolean;
  inputType?: 'contacts' | 'grps' | 'impressions' | 'reach';
};
export type Market = {
  name: 'be' | 'nl' | 'uk';
  flag: string;
  displayNames: {language: Language; displayName: string}[];
  ageGroups: AgeGroup[];
};
export type AgeGroup = [number, number | string];

export type Genders = {
  m: boolean;
  f: boolean;
  x: boolean;
};
export type Strategy = {
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
export type StrategyExtended = Strategy & {
  _id?: string | Mongo.ObjectID;
  userId?: string | Mongo.ObjectID;
  ageStart?: number | null;
  ageEnd?: number | null;
  ageGroupStart?: AgeGroup;
  ageGroupEnd?: AgeGroup;
  genders?: Genders;
  peopleInAgeRange?: number;
  respondentsCount?: number;
  reachedNonUnique?: number;
  reachedUnique?: number;
  companyId?: string | Mongo.ObjectID;
  brand?: string;
  product?: string;
};

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
