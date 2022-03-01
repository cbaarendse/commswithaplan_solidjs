// types
// content
type Name = {name: string};
type Language = {language: string};
type DisplayName = {displayName: string};
type Description = {description: string};
type Elaboration = {elaboration: string};
type Title = {title: string};
type Link = {link: string};
type ImgFile = {imgFile: string};
type Action = {action: string};
// planning
type Value = {value: number};
type Index = {index: number};
type Days = {days: number};
type Monday = {monday: string};
type Min = {min: number};
type Max = {max: number};
// component
type ClassName = {className: string | undefined | null};
type Color = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey' | 'transparent' | 'transparentnoborder'};
interface Colors {
  base: string;
  light: string;
  bright: string;
  offWhite: string;
  border: string;
  text: string;
}
export interface ColorsScheme {
  [index: string]: Colors;
}
type CssColors= {
  backgroundColor?: string;
  color?: string;
  background?: string;
}
type Colored ={colored: boolean;}

type Size = {
  size: 'fit' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xl_2' | 'xl_3' | 'xl_4' | 'xl_5' | 'xl_6' | 'xl_7' | 'xl_8';
};
type Sizes = {
  font_size: string;
  size?: string;
  padding: string;
  width: string;
  height: string;
  min_width: string;
};

type CssSizes  ={
  fontSize?: string;
  padding?: string;
  width?: string;
  height?: string;
  minWidth?: string;
};
export interface SizesScheme {
  [index: string]: Sizes;
}
export interface CssSizesScheme {
  [index: string]: CssSizes;
}
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
export type Visible = {visible: boolean};

export type Display = 'none' | 'block' | 'grid' | 'flex';

// interfaces
// intersections
export interface Content extends Name, Language, DisplayName, Description, Color {}
interface Paragraph extends DisplayName, Description, Elaboration {}
interface Chapter extends Name, Language, DisplayName, Partial<ImgFile> {}

// content
export interface HomeItem extends Name, Language, DisplayName, Description, ImgFile, Link, Action {}
export interface ToolsDocsChapter extends Chapter {
  paragraphs: Paragraph[];
}
export interface Translation extends Name, Language, DisplayName {}

// planning
export interface TouchPointBasics extends Name, Language, DisplayName, Description {}
export interface TouchPointInPlan extends TouchPointBasics, Value {}

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
export interface CssIndex {[key:string]:string}
export interface Brand extends Partial<ClassName>, Color,  Size, Title {}
export interface Logo extends Css, Colored{}
export interface Slider extends Name, DisplayName, Value, Min, Max, Partial<OnChange>, Partial<OnInput> {}
