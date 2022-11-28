// global
declare global {
  interface Window {
    dataLayer: Array<{[key: string]: string | number | Date}>;
  }
}

// content
export type Content = {name: string; language: string; displayName: string; description: string};
export type Color = {color: string};
export type Colored = {colored: boolean};
export type Illustrated = {imgFiles: string[]};
export type Actionable = {link: string; action: string};
type Paragraph = {displayName: string; description: string; elaboration?: string};
export type Chapter = Omit<Content & Illustrated, 'description'> & {paragraphs: Paragraph[]};
export type Article = Omit<Content, 'description'> & {paragraphs: Paragraph[]};
export type Translation = Omit<Content, 'description'>;
export type TouchPointBasics = Content;
export type TouchPointInPlan = TouchPointBasics & {value: number; display: 'none' | 'grid'};
export type Week = {name: string; days: number; monday: string};
export type Month = {name: string; days: number};
export type Year = {name: string; days: number};

// components
export type Accordion = {visible: boolean};
export type Brand = Partial<svelteHTML.IntrinsicElements['span']> & Partial<HTMLElement['style']>;
export type Button = Partial<svelteHTML.IntrinsicElements['button']> &
  Partial<HTMLElement['style']> & {ariaRoleDescription?: string | undefined | null};
export type Card = Partial<Illustrated & Actionable> &
  svelteHTML.IntrinsicElements['div'] &
  Partial<HTMLElement['style']>;
export type Checkbox = svelteHTML.IntrinsicElements['div'] & Partial<HTMLElement['style']>;
export type Logo = svelteHTML.IntrinsicElements['div'] & Partial<HTMLElement['style']> & Colored;
export type SelectItem = {name: string; index: string};
export type Input = Omit<
  Partial<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['input']>>,
  'value' | 'min' | 'max'
> & {
  value: string | undefined | null;
  min: string | undefined | null;
  max: string | undefined | null;
} & Partial<HTMLElement['style']>;
export type Select = Omit<
  Partial<svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['select']>>,
  'value' | 'min' | 'max'
> & {
  value: string | undefined | null;
  min: string | undefined | null;
  max: string | undefined | null;
} & Partial<HTMLElement['style']>;

export type Slider = Omit<Input, 'step'> & {step: string | undefined | null};

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
