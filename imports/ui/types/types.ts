// global
declare global {
  interface Window {
    dataLayer: Array<{[key: string]: string | number | Date}>;
  }
}

// content
export type Content = {name: string; language: string; displayName: string; description: string};

export type ContentColored = Content & {
  color: string;
};

export type ContentIllustrated = Content & {
  imgFiles: string[];
};

export type ContentActionable = Content & {
  link: string;
  action: string;
};
type Paragraph = {displayName: string; description: string; elaboration?: string};
export type Chapter = Omit<ContentIllustrated, 'description'> & {paragraphs: Paragraph[]};
export type Article = Omit<Content, 'description'> & {paragraphs: Paragraph[]};
export type Translation = Omit<Content, 'description'>;
export type TouchPointBasics = Content;
export type TouchPointInPlan = TouchPointBasics & {value: number; display: 'none' | 'grid'};
export type Week = {name: string; days: number; monday: string};
export type Month = {name: string; days: number};
export type Year = {name: string; days: number};

// building blocks
type AlphaNumeric = string | number;
type AlphaUncertain = string | undefined | null;
type ClassName = {className: AlphaUncertain};
type Colored = {colored: boolean};
type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
export type Display = 'none' | 'block' | 'grid' | 'flex';
type InputValue = {value: AlphaNumeric};
type Placeholder = {placeholder: AlphaUncertain};
export type Visible = {visible: boolean};
export type ButtonType = {type: 'submit' | 'reset' | 'button' | null | undefined};

// components
export type Accordion = Visible;
export type Brand = {title: string} & Partial<ClassName> & Css;

export type Card = {title?: string; imgFile?: string; link?: string; action?: string} & HTMLElement;
export type Option = ClassName &
  InputValue &
  Placeholder &
  SelectItem & {
    displayName?: string;
    selected?: 'selected';
  };
export type Select = ClassName &
  InputValue &
  Placeholder & {
    displayName?: string;
    name: string;
    id: string;
    value: number | string;
    size?: string;
    disabled?: 'disabled';
    multiple?: 'multiple';
  };
export type SelectItem = {name: string; index: string};
