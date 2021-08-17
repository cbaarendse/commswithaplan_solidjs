export default function UiProvider(translations) {
    // functions should be in prototype, and reuseable for reachAppProvider
    this.translations = translations;

    this.translate = function(input, language) {
        return this.translations.find((element) => element.name === input)[language].displayName || input;
    }

    this.describe = function(input, language) {
        return this.translations.find((element) => element.name === input)[language].description || input;
    }

    this.capitalizeAndSplit = function(str) {
        str = str[0].toUpperCase() + str.slice(1);
        str = str.split(/(?=[A-Z])/).join(' ');
        return str;
    }

    this.toStringFormat = function(value) { return value.toLocaleString() };
    this.percentFixed = function(input, digits) {
        return (input / 100).toFixed(digits);
    }
    this.toDateFormat = function(date) {
        return dayjs(date).format('DD-MMM-YYYY');
    }
    this.toNumberFormat = function(value) {
        return `${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
    }

    this.toCurrencySymbol = function(currency) {
        const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '?';
        return `${symbol}`;
    }


}