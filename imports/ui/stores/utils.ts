// packages
import {createSignal, createMemo, Accessor} from 'solid-js';

// interfaces
import type {Translation, Language} from '../../both/typings/types';

// stores
const [getLanguage, setLanguage] = createSignal<Language>('nl-NL');
export const language = getLanguage;
language.set = setLanguage;

const [getConsentFooterVisible, setConsentFooterVisible] = createSignal<boolean | null>(true);
export const consentFooterVisible = getConsentFooterVisible;
consentFooterVisible.set = setConsentFooterVisible;

const [getIsSmallScreen, setIsSmallScreen] = createSignal<boolean | null>(true);
export const isSmallScreen = getIsSmallScreen;
isSmallScreen.set = setIsSmallScreen;

const [getNavigationVisible, setNavigationVisible] = createSignal<boolean | null>(false);
export const navigationVisible = getNavigationVisible;
navigationVisible.set = setNavigationVisible;

const [getSignin, setSignin] = createSignal<boolean | null>(false);
export const signin = getSignin;
signin.set = setSignin;

//export a function that return an accessor given a string media query as input
export const useMediaQuery = (mediaQuery: string): Accessor<boolean | null> => {
  const [matches, setMatches] = createSignal<boolean | null>(null);

  //we match the media query
  const m: MediaQueryList = window.matchMedia(mediaQuery);
  //we set the value to the matches property
  setMatches(m.matches);
  //we create the event listener that will set the new value on change
  const el: EventListener = (e: any) => {
    setMatches(e.matches);
  };
  //we add the new event listener
  m.addEventListener('change', el);

  return matches;
};

const translationsData: Translation[] = [
  {
    name: '/',
    definitions: [
      {language: 'en-GB', displayName: 'Home'},
      {language: 'nl-NL', displayName: 'Home'}
    ]
  },
  {
    name: 'about',
    definitions: [
      {language: 'en-GB', displayName: 'About'},
      {language: 'nl-NL', displayName: 'Over'}
    ]
  },
  {
    name: 'advertisement',
    definitions: [
      {language: 'en-GB', displayName: 'Advertisement'},
      {language: 'nl-NL', displayName: 'Advertentie'}
    ]
  },
  {
    name: 'consultancy',
    definitions: [
      {language: 'en-GB', displayName: 'Consultancy'},
      {language: 'nl-NL', displayName: 'Consultancy'}
    ]
  },
  {
    name: 'contact',
    definitions: [
      {language: 'en-GB', displayName: 'Contact'},
      {language: 'nl-NL', displayName: 'Contact'}
    ]
  },
  {
    name: 'data',
    definitions: [
      {language: 'en-GB', displayName: 'data'},
      {language: 'nl-NL', displayName: 'data'}
    ]
  },
  {
    name: 'docs',
    definitions: [
      {language: 'en-GB', displayName: 'Docs'},
      {language: 'nl-NL', displayName: 'Documentatie'}
    ]
  },
  {
    name: 'nl-NL',
    definitions: [
      {language: 'en-GB', displayName: 'Dutch'},
      {language: 'nl-NL', displayName: 'Nederlands'}
    ]
  },
  {
    name: 'en-GB',
    definitions: [
      {language: 'en-GB', displayName: 'English'},
      {language: 'nl-NL', displayName: 'Engels'}
    ]
  },
  {
    name: 'enter_reach',
    definitions: [
      {language: 'en-GB', displayName: 'Enter Reach for'},
      {language: 'nl-NL', displayName: 'Vul Bereik in voor'}
    ]
  },
  {
    name: 'formula',
    definitions: [
      {language: 'en-GB', displayName: 'formula'},
      {language: 'nl-NL', displayName: 'formule'}
    ]
  },
  {
    name: 'hide',
    definitions: [
      {language: 'en-GB', displayName: 'HIDE'},
      {language: 'nl-NL', displayName: 'VERBERG'}
    ]
  },
  {
    name: 'home',
    definitions: [
      {language: 'en-GB', displayName: 'Home'},
      {language: 'nl-NL', displayName: 'Home'}
    ]
  },
  {
    name: 'input',
    definitions: [
      {language: 'en-GB', displayName: 'Input'},
      {language: 'nl-NL', displayName: 'Input'}
    ]
  },
  {
    name: 'legal',
    definitions: [
      {language: 'en-GB', displayName: 'Legal'},
      {language: 'nl-NL', displayName: 'Juridisch'}
    ]
  },
  {
    name: 'choose_market',
    definitions: [
      {language: 'en-GB', displayName: 'choose market'},
      {language: 'nl-NL', displayName: 'kies markt'}
    ]
  },
  {
    name: 'no_data',
    definitions: [
      {language: 'en-GB', displayName: 'no data for this market'},
      {language: 'nl-NL', displayName: 'geen data voor deze markt'}
    ]
  },
  {
    name: 'notfound',
    definitions: [
      {language: 'en-GB', displayName: 'Not Found'},
      {language: 'nl-NL', displayName: 'Niet Gevonden'}
    ]
  },
  {
    name: 'overlap',
    definitions: [
      {language: 'en-GB', displayName: 'Overlap'},
      {language: 'nl-NL', displayName: 'Overlap'}
    ]
  },
  {
    name: 'precisionInputFor',
    definitions: [
      {language: 'nl-NL', displayName: 'Precisie invoer voor '},
      {language: 'en-GB', displayName: 'Precision input for '}
    ]
  },
  {
    name: 'reach',
    definitions: [
      {language: 'en-GB', displayName: 'Reach'},
      {language: 'nl-NL', displayName: 'Bereik'}
    ]
  },
  {
    name: 'reach_error',
    definitions: [
      {language: 'en-GB', displayName: 'Reach can be maximum 100, minimum 0'},
      {language: 'nl-NL', displayName: 'Bereik mag maximaal 100 zijn, minimaal 0'}
    ]
  },
  {
    name: 'read',
    definitions: [
      {language: 'en-GB', displayName: 'Read'},
      {language: 'nl-NL', displayName: 'Lees'}
    ]
  },
  {
    name: 'reset',
    definitions: [
      {language: 'en-GB', displayName: 'RESET'},
      {language: 'nl-NL', displayName: 'RESET'}
    ]
  },
  {
    name: 'show',
    definitions: [
      {language: 'en-GB', displayName: 'SHOW'},
      {language: 'nl-NL', displayName: 'TOON'}
    ]
  },
  {
    name: 'strategies',
    definitions: [
      {language: 'en-GB', displayName: 'Strategies'},
      {language: 'nl-NL', displayName: 'Strategieën'}
    ]
  },
  {
    name: 'tools',
    definitions: [
      {language: 'en-GB', displayName: 'Tools'},
      {language: 'nl-NL', displayName: 'Tools'}
    ]
  },
  {
    name: 'total',
    definitions: [
      {language: 'en-GB', displayName: 'Total'},
      {language: 'nl-NL', displayName: 'Totaal'}
    ]
  },
  {
    name: 'use',
    definitions: [
      {language: 'en-GB', displayName: 'use'},
      {language: 'nl-NL', displayName: 'gebruik'}
    ]
  },

  {
    name: 'work',
    definitions: [
      {language: 'en-GB', displayName: 'Work'},
      {language: 'nl-NL', displayName: 'Werk'}
    ]
  },
  {
    name: 'year',
    definitions: [
      {language: 'en-GB', displayName: 'Year'},
      {language: 'nl-NL', displayName: 'Jaar'}
    ]
  }
];

export const translations = () => translationsData;
