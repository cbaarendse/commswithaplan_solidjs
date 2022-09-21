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
export type Actionable = {
  link: string;
  action: string;
};
type Paragraph = {displayName: string; description: string; elaboration?: string};
export type Chapter = Omit<Content & Illustrated, 'description'> & {paragraphs: Paragraph[]};
export type Article = Omit<Content, 'description'> & {paragraphs: Paragraph[]};
export type Translation = Omit<Content, 'description'>;
export type TouchPointBasics = Content;
export type TouchPointInPlan = TouchPointBasics & {value: number; display: 'none' | 'grid'};
export type Week = {name: string; days: number; monday: string};
export type Month = {name: string; days: number};
export type Year = {name: string; days: number};

// building blocks
// type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
type Colored = {colored: boolean};
// type Display = 'none' | 'block' | 'grid' | 'flex';

// components
export type Accordion = {visible: boolean};
export type Brand = Omit<Partial<HTMLElement>, 'style'> & {style: Partial<CSSStyleDeclaration>};
export type Button = Omit<Partial<HTMLButtonElement>, 'type' | 'style'> & {
  type: 'submit' | 'reset' | 'button' | null | undefined;
  style: Partial<CSSStyleDeclaration>;
};
export type Card = Partial<{title: string} & Illustrated & Actionable> &
  Omit<Partial<HTMLDivElement>, 'style'> & {style: Partial<CSSStyleDeclaration>};
export type Checkbox = Omit<Partial<HTMLInputElement>, 'style'> & {style: Partial<CSSStyleDeclaration>};
export type Logo = Omit<Partial<HTMLElement>, 'style'> & {style: Partial<CSSStyleDeclaration>} & Colored;
export type SelectItem = {name: string; index: string};
