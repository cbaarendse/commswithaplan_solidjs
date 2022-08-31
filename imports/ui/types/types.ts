// global
declare global {
  interface Window {
    dataLayer: Array<{[key: string]: string | number | Date}>;
  }
}

// content
export type Chapter = Definition & {imgFiles?: string[]; paragraphs: Paragraph[]};
export type Article = Chapter;
export type Content = Definition & ObjectDefault;
export type Definition = {name: string; language: string; displayName: string; description?: string};
export type HomeItem = Definition & {
  imgFile?: string;
  link?: string;
  action?: string;
};
export type ContentAttributes = {
  imgFile?: string;
  link: string;
  action: string;
};
export type Month = {name: string; days: number};
type Paragraph = {displayName: string; description: string; elaboration?: string};
export type Translation = Omit<Definition, 'description'>;
export type TouchPointBasics = Definition;
export type TouchPointInPlan = TouchPointBasics & {value: number; display: 'none' | 'grid'};
export type Week = {name: string; days: number; monday: string};
export type Year = {name: string; days: number};

// building blocks
type AlphaNumeric = string | number;
type AlphaUncertain = string | undefined | null;
type BooleanUncertain = boolean | undefined | null;
type ButtonType = {type: 'submit' | 'reset' | 'button'};
type ClassName = {className: AlphaUncertain};
type Colored = {colored: boolean};
export type Css = CssColors & CssSizes;
type CssColors = {
  backgroundColor?: string;
  color?: string;
  textColor?: string;
  background?: string;
};
export type CssSizes = {
  fontSize?: string;
  padding?: string;
  paddingInline?: string;
  paddingBlock?: string;
  marginInline?: string;
  marginBlock?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
};
type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
type Disabled = {disabled: BooleanUncertain};
export type Display = 'none' | 'block' | 'grid' | 'flex';
type InputType = {
  type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
};
type InputValue = {value: AlphaNumeric};
type ObjectDefault = {
  [index: string]: string;
};
type Placeholder = {placeholder: AlphaUncertain};
type Role = {role: 'button'};
export type Visible = {visible: boolean};

// components
export type Accordion = Visible;
export type Brand = {title: string} & Partial<ClassName> & Css;
export type Button = ClassName &
  ButtonType &
  Role &
  Disabled &
  Css & {
    id?: string;
    value?: string;
    dataDismiss?: string;
    ariaLabel?: string;
  };
export type Card = {title?: string; imgFile?: string; link?: string; action?: string} & CssColors;
export type Logo = Css & Colored;
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
