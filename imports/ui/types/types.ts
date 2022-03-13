// types
type Name = {name: string};
type Days = {days: number};
type Monday = {monday: string};
type ClassName = {className: string | undefined | null};
type Type = 'submit' | 'reset' | 'button';
type Role = 'button';
type Disabled = boolean | null | undefined;
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
  marginInline: string;
  marginBlock: string;
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

export interface Year extends Name, Days {}
export interface Month extends Name, Days {}
export interface Week extends Name, Days, Monday {}

// components
export type Card = {title?: string; color: Color; imgFile?: string; link?: string; action?: string};
export type SelectItem = {name: string; index: string};
export type Accordion = Visible;
export type Button =
  | {
      id?: string;
      value?: string;
      onMouseenter?: () => void;
      onMousleave?: () => void;
      onClick?: () => void;
      dataDismiss?: string;
      ariaLabel?: string;
    }
  | ClassName
  | Type
  | Role
  | Disabled
  | Css;

export type Brand = {title: string} & ClassName & Css;
export interface Logo extends Css, Colored {}
export type Slider = {name: string; displayName: string};

// building types
type CWAPColor = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
