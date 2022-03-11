// types
type Colors = {
  base: string;
  light: string;
  bright: string;
  offWhite: string;
  border: string;
  text: string;
}
export type ColorsScheme = {
  [index: string]: Colors;
}
type CssColors= {
  backgroundColor?: string;
  color?: string;
  background?: string;
}
type Colored ={colored: boolean;}
export type CssSizes  ={
  fontSize?: string;
  padding?: string;
  width?: string;
  height?: string;
  minWidth?: string;
};

type Size = {
  size: 'fit' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xl_2' | 'xl_3' | 'xl_4' | 'xl_5' | 'xl_6' | 'xl_7' | 'xl_8';
};

export type Sizes = CssSizes & Size;

export type SizesScheme = {
  [index: string]: Size;
};
export type CssSizesScheme = {
  [index: string]: CssSizes;
};

export type Visible = {visible: boolean};
export type Display = 'none' | 'block' | 'grid' | 'flex';

export type Content = {name: string, language: string, displayName: string, description: string} & Color;

type Paragraph = {displayName: string, description: string, elaboration: string};
type Chapter = {name: string, language: string, displayName: string, imgFile?: string, paragraphs?: Paragraph[]};
export type ToolsDocsChapter = Chapter;

export type HomeItem =   {name: string, language: string, displayName: string, description: string, imgFile: string, link: string, action: string};
export type Translation = {name: string, language: string, displayName: string};

// planning
export type TouchPointBasics = {name: string, language: string, displayName: string, description: string};
export type TouchPointInPlan = TouchPointBasics & {value: number, display: 'none' | 'grid'}

export interface Year extends Name, Days {}
export interface Month extends Name, Days {}
export interface Week extends Name, Days, Monday {}

// components
export interface Card extends Partial<Title>, Color, Partial<ImgFile>, Partial<Link>, Partial<Action> {}
export interface SelectItem extends Name, Index {}
export type Accordion = Visible
export interface Button
  extends Partial<ClassName>,
    Partial<Id>,
    Partial<Type>,
    Partial<Role>,
    Size,
    Color,
    Partial<Value>,
    Partial<OnMouseenter>,
    Partial<OnMousleave>,
    Partial<OnClick>,
    Partial<Disabled>,
    Partial<DataDismiss>,
    Partial<AriaLabel> {}
export interface Css extends CssColors,  CssSizes {}
export type CssIndex = {[key:string]:string};
export interface Brand extends Partial<ClassName>, Css, Title {}
export interface Logo extends Css, Colored{}
export type Slider = {name: string, displayName: string};

// building types
type Color = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};


// types
type Id = {id: string};
type Type = {type: 'submit' | 'reset' | 'button'};
type Role = {role: 'button'};
type OnClick = {onClick: () => void};
type AriaLabel = {ariaLabel: string};
type OnMouseenter = {onMouseenter: () => void};
type OnMousleave = {onMouseleave: () => void};
type OnChange = {onChange: () => void};
type OnInput = {onInput: () => void};
type Disabled = {disabled: boolean | null | undefined};
type DataDismiss = {dataDismiss: string};
type Name = {name: string};
type Title = {title: string};
type Link = {link: string};
type ImgFile = {imgFile: string};
type Action = {action: string};
type Value = {value: number};
type Index = {index: number};
type Days = {days: number};
type Monday = {monday: string};
type ClassName = {className: string | undefined | null};
