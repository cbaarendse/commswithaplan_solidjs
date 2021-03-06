export default function UiProvider(translations, language) {
  // functions should be in prototype, and reuseable for reachAppProvider
  this.translations = translations;
    this.language = language;
      
    this.translate = function (input) {
        return this.translations.find((element) => element.name === input)[this.language].displayName || undefined;
      }
    
      this.describe = function (input) {
        return this.translations.find((element) => element.name === input)[this.language].description || undefined;
      }

      this.capitalizeAndSplit =   function (str) {
        str = str[0].toUpperCase() + str.slice(1);
        str = str.split(/(?=[A-Z])/).join(' ');
        return str;
      }
}


  
  