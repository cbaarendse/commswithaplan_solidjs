// types
// content
type Name = {name: string};
type Language = {language: string};
type DisplayName = {displayName: string};
type Description = {description: string};
type Elaboration = {elaboration: string};
type Colors = {colors: string};
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
// component type
type ClassName = {className: string | undefined | null};
type Size = {size: 'fit' | 'x_small' | 'small' | 'medium' | 'large' | 'x_large' | 'xx_large'};
type Padding = {padding: string};
type Width = {width: string};
type Height = {height: string};
type MinWidth = {min_width: string};
type Color = {color: 'blue' | 'green' | 'red' | 'teal' | 'grey'};
type BackgroundColor = {backgroundColor: 'blue' | 'green' | 'red' | 'grey' | 'transparant' | 'transparantnoborder'};
type FontSize = {
  fontSize:
    | 'fs_xxs'
    | 'fs_xs'
    | 'fs_s'
    | 'fs_m'
    | 'fs_l'
    | 'fs_xl'
    | 'fs_2xl'
    | 'fs_3xl'
    | 'fs_4xl'
    | 'fs_5xl'
    | 'fs_6xl'
    | 'fs_7xl'
    | 'fs_8xl';
};
type Id = {id: string};
type Style = {style: string};
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
interface Content extends Name, Language, DisplayName, Description, Colors {}
interface Paragraph extends DisplayName, Description, Elaboration {}
interface ToolsDocsParagraph extends Paragraph {}
interface Chapter extends Name, Language, DisplayName, Partial<ImgFile> {}

// content
export interface ContentItem extends Content {}
export interface HomeItem extends Name, Language, DisplayName, Description, ImgFile, Link, Action {}
export interface ConsultancyItem extends Content {}
export interface ToolItem extends Name, Language, DisplayName, Description, Colors {}
export interface ToolsHomeItem extends Content {}
export interface ToolsDocsChapter extends Chapter {
  paragraphs: ToolsDocsParagraph[];
}
export interface Translation extends Name, Language, DisplayName {}

// planning
export interface TouchPointBasics extends Name, Language, DisplayName, Description {}
export interface TouchPointInPlan extends TouchPointBasics, Value {}
export interface Property {
  [key: string]: string;
}
export interface Scheme {
  [key: string]: Property;
}
export interface Year extends Name, Days {}
export interface Month extends Name, Days {}
export interface Week extends Name, Days, Monday {}

// components
export interface Card extends Partial<Title>, Color, Partial<ImgFile>, Partial<Link>, Partial<Action> {}
export interface SelectItem extends Name, Index {}
export interface Accordion extends Visible {}
interface ButtonStyle extends Size, Padding, FontSize, BackgroundColor, Width, Height, MinWidth {}
export interface Button
  extends Partial<Size>,
    Partial<ClassName>,
    Partial<Id>,
    Partial<Type>,
    Partial<ButtonStyle>,
    Partial<Role>,
    Partial<Value>,
    OnClick,
    Partial<OnMouseenter>,
    Partial<OnMousleave>,
    Partial<Disabled>,
    Partial<DataDismiss>,
    Partial<AriaLabel> {}
export interface Brand extends Partial<ClassName>, FontSize, Color, Title {}
export interface Slider extends Name, DisplayName, Value, Min, Max {}
