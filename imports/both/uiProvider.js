export default function UiProvider(translations, language) {
  // functions should be in prototype, and reuseable for reachAppProvider
    this.language = language;
    this.translations = 
    [
    {name: 'english', english: {displayName: 'English'}, dutch: {displayName: 'Engels'} }, 
    {name: 'dutch',  english: {displayName: 'Dutch'}, dutch: {displayName: 'Nederlands'} },
    {name: 'reset', english: {displayName: 'RESET'}, dutch: {displayName: 'RESET'} }, 
    {name: 'hide',  english: {displayName: 'HIDE'}, dutch: {displayName: 'VERBERG'} },
    {name: 'show', english: {displayName: 'SHOW'}, dutch: {displayName: 'TOON'} }, 
    {name: 'could_not_be_launched',  english: {displayName: ' could not be opened'}, dutch: {displayName: ' kon niet worden geopend'} },
    {name: 'reach', english: {displayName: 'Reach'}, dutch: {displayName: 'Bereik'} }, 
    {name: 'enter_reach', english: {displayName: 'Enter Reach for'}, dutch: {displayName: 'Vul Bereik in voor'} }, 
    {name: 'reach_error',  english: {displayName: 'Reach can be maximum 100, minimum 0'}, dutch: {displayName: 'Bereik mag maximaal 100 zijn, minimaal 0'} },
    {name: 'advertisement',  english: {displayName: 'Advertisement'}, dutch: {displayName: 'Advertentie'} },
    ];
    
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


  
  