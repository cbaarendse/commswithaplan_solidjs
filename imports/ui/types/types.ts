// types
export type Consent = 'necessary' | 'necessaryAnalytics' | 'necessaryAnalyticsAds';
type ClassName = {className: string | undefined | null};
type ButtonType = {type: 'submit' | 'reset' | 'button'};
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
type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
type Placeholder = {placeholder: string | null | undefined};
type InputValue = {value: number | string};
type Role = {role: 'button'};
type Disabled = {disabled: boolean | null | undefined};
type Color = {
  [index: string]: string;
};
type Size = Color;
export type CssIndex = {[key: string]: string};

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

export type Css = CssColors & CssSizes;

type Colored = {colored: boolean};
export type Visible = {visible: boolean};
export type Display = 'none' | 'block' | 'grid' | 'flex';

export type Definition = {name: string; language: string; displayName: string; description: string};
export type Content = Definition & Color;
type Paragraph = {displayName: string; description: string; elaboration: string};
type Chapter = Definition & {imgFiles?: string[]; paragraphs?: Paragraph[]};
export type ToolsDocsChapter = Chapter;

export type HomeItem = Definition & {
  imgFile: string;
  link: string;
  action: string;
};
export type Translation = Omit<Definition, 'description'>;

// planning

export type TouchPointBasics = Definition;
export type TouchPointInPlan = TouchPointBasics & {value: number; display: 'none' | 'grid'};

export type Year = {name: string; days: number};
export type Month = {name: string; days: number};
export type Week = {name: string; days: number; monday: string};

// components
export type Card = {title?: string; imgFile?: string; link?: string; action?: string} & CssColors;

export type Accordion = Visible;
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

export type Input = ClassName &
  Partial<InputType> &
  InputValue &
  Placeholder & {
    displayName?: string;
    name: string;
    id: string;
    value: number | string;
    min: number;
    max: number;
    readonly: boolean;
  };

export type Brand = {title: string} & Partial<ClassName> & Css;
export type Logo = Css & Colored;
export type Slider = Partial<InputType> &
  InputValue & {
    displayName?: string;
    name: string;
    id: string;
    step: number;
    min: number;
    max: number;
  };

export type SelectItem = {name: string; index: string};
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

export type Option = ClassName &
  InputValue &
  Placeholder &
  SelectItem & {
    displayName?: string;
    selected?: 'selected';
  };
