import deburr from 'lodash/deburr';
import dayjs from 'dayjs';
import {Readable, readable} from 'svelte/store';
import translations from '../../client/stores';


interface DisplayName  {displayName: string};
interface Translation { name: string, english: DisplayName, dutch: DisplayName }


export default class UiProvider {

   public translations: Translation[];

    constructor(){this.translations = translations;}

    public translate (input:string, language:string):string {
        return translations.find((element: Translation) => element.name === input)[language].displayName || input;
    }

    public describe (input:string, language:string):string {
        return translations.find((element:Translation) => element.name === input)[language].description || input;
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
    static toNumberFormat (value:number):string {
        return `${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    }

    static toCurrencySymbol (currency:string):string {
        const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '?';
        return `${symbol}`;
    }


}