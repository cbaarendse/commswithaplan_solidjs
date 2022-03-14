// types
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
type Placeholder = {placeholder: string | null | undefined};
type InputValue = {value: number};
type Role = {role: 'button'};
type Disabled = {disabled: boolean | null | undefined};
type Color = {
  [index: string]: string;
};
type Size = {
  [index: string]: string;
};
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
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
};

export type Css = CssColors & CssSizes;

type Colored = {colored: boolean};
export type Visible = {visible: boolean};
export type Display = 'none' | 'block' | 'grid' | 'flex';

export type Content = {name: string; language: string; displayName: string; description: string} & Color;

type Paragraph = {displayName: string; description: string; elaboration: string};
type Chapter = {name: string; language: string; displayName: string; imgFile?: string; paragraphs?: Paragraph[]};
export type ToolsDocsChapter = Chapter;

export type HomeItem = {
  name: string;
  language: string;
  displayName: string;
  description: string;
  imgFile: string;
  link: string;
  action: string;
};
export type Translation = {name: string; language: string; displayName: string};

// planning
export type TouchPointBasics = {name: string; language: string; displayName: string; description: string};
export type TouchPointInPlan = TouchPointBasics & {value: number; display: 'none' | 'grid'};

export type Year = {name: string; days: number};
export type Month = {name: string; days: number};
export type Week = {name: string; days: number; monday: string};

// components
export type Card = {title?: string; imgFile?: string; link?: string; action?: string} & CssColors;
export type SelectItem = {name: string; index: string};
export type Accordion = Visible;
export type Button = ClassName &
  ButtonType &
  Role &
  Disabled &
  Css & {
    id?: string;
    value?: string;
    onMouseenter?: () => void;
    onMousleave?: () => void;
    onClick?: () => void;
    dataDismiss?: string;
    ariaLabel?: string;
  };

export type Input = ClassName &
  Partial<InputType> &
  InputValue &
  Placeholder & {
    id: string;
    name: string;
    value: number | string;
    readonly: boolean;
  };

export type Brand = {title: string} & Partial<ClassName> & Css;
export interface Logo extends Css, Colored {}
export type Slider = Partial<InputType> &
  InputValue & {
    id: string;
    name: string;
    displayName: string;
    step: number;
    min: number;
    max: number;
  };

// building types
type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
