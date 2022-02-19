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
type Property = {property: string};
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
export interface ColorsScheme2 {
  blue: Colors;
  green: Colors;
  red: Colors;
  teal: Colors;
  grey: Colors;
  transparent: Colors;
  transparentnoborder: Colors;
}
type Size =
  | 'fit'
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xl_2'
  | 'xl_3'
  | 'xl_4'
  | 'xl_5'
  | 'xl_6'
  | 'xl_7'
  | 'xl_8';
type Sizes = {
  font_size?: string;
  padding: string;
  width?: string;
  height?: string;
  min_width: string;
};
export interface SizesScheme {
  [index: string]: Sizes;
}
export interface SizesScheme2 {
  fit: Sizes;
  xxs: Sizes;
  xs: Sizes;
  s: Sizes;
  m: Sizes;
  l: Sizes;
  xl: Sizes;
  xl_2: Sizes;
  xl_3: Sizes;
  xl_4: Sizes;
  xl_5: Sizes;
  xl_6: Sizes;
  xl_7: Sizes;
  xl_8: Sizes;
}
type Id = {id: string};
type Type = {type: 'submit' | 'reset' | 'button'};
type Role = {role: 'button'};
type OnClick = {onClick: () => void};
type AriaLabel = {ariaLabel: string};
type OnMouseenter = {onMouseenter: () => void};
type OnMousleave = {onMouseleave: () => void};
type Disabled = {disabled: boolean | null | undefined};
type DataDismiss = {dataDismiss: string};
type Visible = {visible: boolean};

export type Display = 'none' | 'block' | 'grid' | 'flex';

// interfaces
// intersections
interface Content extends Name, Language, DisplayName, Description, Color {}
interface Paragraph extends DisplayName, Description, Elaboration {}
interface ToolsDocsParagraph extends Paragraph {}
interface Chapter extends Name, Language, DisplayName, Partial<ImgFile> {}

// content
export interface ContentItem extends Content {}
export interface HomeItem extends Name, Language, DisplayName, Description, ImgFile, Link, Action {}
export interface ConsultancyItem extends Content {}
export interface ToolsItem extends Content {}
export interface ToolsHomeItem extends Content {}
export interface ToolsDocsChapter extends Chapter {
  paragraphs: ToolsDocsParagraph[];
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
export interface Accordion extends Visible {}
export interface Button {
  className?: string;
  id?: string;
  type?: string;
  role?: string;
  size: string;
  color: string;
  value?: string;
  onMouseenter?: () => void;
  onMouseleave?: () => void;
  disabled?: boolean | null | undefined;
  dataDismiss?: string;
  ariaLabel?: string;
}

export interface Brand extends Partial<ClassName>, Color, Title {
  size: Size;
}
export interface Slider extends Name, DisplayName, Value, Min, Max {}
