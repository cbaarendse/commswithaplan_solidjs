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
type ColorVarieties = {[key: string]: string};
type Days = {days: number};
type Monday = {monday: string};
// element properties
type ClassName = {className: string};
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
export interface ColorScheme {
  [key: string]: ColorVarieties;
}
export interface Year extends Name, Days {}
export interface Month extends Name, Days {}
export interface Week extends Name, Days, Monday {}

// component properties
export interface Card extends Partial<Title>, Colors, Partial<ImgFile>, Partial<Link>, Partial<Action> {}
export interface SelectItem extends Name, Index {}
export interface Button
  extends Partial<ClassName>,
    Partial<Id>,
    Partial<Type>,
    Partial<Style>,
    Partial<Role>,
    Partial<Value>,
    OnClick,
    Partial<OnMouseenter>,
    Partial<OnMousleave>,
    Partial<Disabled>,
    Partial<DataDismiss>,
    Partial<AriaLabel> {}
