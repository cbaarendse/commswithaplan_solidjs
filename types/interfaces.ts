// basic interfaces
interface Name {name: string}
interface Language {language: string}
interface DisplayName  {       displayName: string     }
interface Description {description: string }
interface Elaboration { elaboration: string }
interface Colors {colors: string}
interface Link  {         link: string                 }
interface Media{imgFile: string  }
interface Action { callToAction: string  }
interface Value{value: number}
interface ColorVarieties {[key:string]:string}

// combined interfaces
export interface Content extends  Name,  Language,DisplayName, Description, Colors{}
interface Paragraph extends DisplayName, Description{} 
interface ToolsDocsParagraph extends Paragraph, Elaboration{} 
interface Chapter extends  Name, Language, DisplayName{}

// final interfaces
export interface HomeItem extends Name, Language, DisplayName, Description, Media, Link, Action{}
export interface ConsultancyItem extends  Content{}
export interface ToolItem extends Name, Language,DisplayName, Description,  Colors{}
export interface ToolsHomeItem extends Content{}
export interface ToolsDocsChapter extends Chapter{paragraphs: ToolsDocsParagraph[]}
export interface Translation extends  Name, Language, DisplayName{}
export interface TouchPointBasics extends Name,Language, DisplayName, Description{}
export interface TouchPointInPlan extends TouchPointBasics, Value{}
export interface ColorScheme  {[key:string]:ColorVarieties}