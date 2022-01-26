import deburr from 'lodash/deburr';
import dayjs from 'dayjs';
import {Readable, readable} from 'svelte/store';
import translations from '../../client/stores';


interface DisplayName  {displayName: string};
interface Translation { name: string, english: DisplayName, dutch: DisplayName }
interface ContentItem { page:string, chapter?: string, paragraph?: string, colors: string, language: string, displayName: string, description: string }

export default class UiProvider {

   public translations: Translation[];

    constructor(){this.translations = translations;}

    static translate (input:string, items: Translation[] | any, language:string):string {
        return items.find((element: Translation) => element.name === input)[language].displayName;
    }

    static describe (input:string, items: Translation[] | any, language:string):string {
        return items.find((element:Translation) => element.name === input)[language].description;
    }

    static displayContent (page: string, items: ContentItem[] | any, language: string): string{
        return items.find((element: ContentItem) => {element.page === page && element.language === language} ).displayName;
    }

    static describeContent (page: string, items: ContentItem[] | any, language: string): string{
        return items.find((element: ContentItem) => {element.page === page && element.language === language} ).description;
    }

    static capitalizeAndSplit (str: string):string {
        str = str[0].toUpperCase() + str.slice(1);
        str = str.split(/(?=[A-Z])/).join(' ');
        return str;
    }

    static latinizeAndJoin (str:string):string {
        str = deburr(str);
        str = str.split(' ').join('');
        str = str.toLowerCase();
        console.log("Latinized and Joined:", str)
        return str;
    }

    static toStringFormat (value: number):string { return value.toLocaleString() };
    static percentFixed (input: number, digits: number):string {
        return (input / 100).toFixed(digits);
    }
    static toDateFormat (date:Date):string {
        return dayjs(date).format('DD-MMM-YYYY');
    }
    static toNumberFormat (value:number, digits:number):string {
        return `${value.toLocaleString(undefined, {maximumFractionDigits: digits})}`;
    }

    static toCurrencySymbol (currency:string):string {
        const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '?';
        return `${symbol}`;
    }


}