// types, interfaces, classes

interface ItemBasics {name: string, language: string}
interface ItemDisplay  {       displayName: string, description?: string ,elaboration?: string,colors?: string,  imgFile?: string       }
interface ItemActions  {         cardLink: string,            callToAction: string        }
interface ActionsItem extends ItemBasics, ItemDisplay, ItemActions{}
interface DisplayItem extends ItemBasics, ItemDisplay{}
interface ChapterItem extends ItemBasics, ItemDisplay {paragraphs: ItemDisplay[]}
interface TouchPointBasics extends DisplayItem{}
interface TouchPointInPlan {name: string, value: number}
interface ColorVarieties {[key:string]:string}
interface ColorScheme  {[key:string]:ColorVarieties}