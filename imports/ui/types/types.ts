// global
declare global {
  interface Window {
    dataLayer: Array<{[key: string]: string | number | Date}>;
  }
}

// content
export type Content = {name: string; language: string; displayName: string; description: string};
export type Color = {color: string};
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
export type Brand = Omit<svelteHTML.IntrinsicElements['span'], 'size'> & {size?: string | null | undefined};
export type Button = svelteHTML.IntrinsicElements['button'] & {
  backgroundColor?: string | null | undefined;
  padding?: number | null | undefined;
  minWidth?: number | null | undefined;
  minHeight?: number | null | undefined;
  borderWidth?: number | null | undefined;
  borderStyle?: string | null | undefined;
  borderColor?: string | null | undefined;
};
export type Card = Partial<Illustrated & Actionable> &
  svelteHTML.IntrinsicElements['div'] & {backgroundColor?: string | null | undefined};
export type Checkbox = svelteHTML.IntrinsicElements['div'] & {backgroundColor?: string | null | undefined};
export type Logo = Omit<svelteHTML.IntrinsicElements['div'], 'size'> & {
  size?: string | null | undefined;
  minWidth?: string | null | undefined;
  minHeight?: string | null | undefined;
  colored: boolean;
};
export type SelectItem = {name: string; index: string};
export type Input = Partial<Omit<svelteHTML.IntrinsicElements['input'], 'value' | 'min' | 'max'>> & {
  value: string;
  min: string;
  max: string;
};

// building blocks
// type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
// type Display = 'none' | 'block' | 'grid' | 'flex';
