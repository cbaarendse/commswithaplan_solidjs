// packages
import {writable, Writable, readable, Readable} from 'svelte/store';

// interfaces
import type {Translation, Language} from '../../both/typings/types';

// stores
export const language: Writable<Language> = writable('nl_NL');

export const consentFooterVisible: Writable<boolean | null> = writable(true);

export const isSmallScreen: Writable<boolean | null> = writable(true);

export const navigationVisible: Writable<boolean | null> = writable(false);

export const signin: Writable<boolean | null> = writable(false);

//export a function that return a readable given a string media query as input
export const useMediaQuery = (mediaQuery: string): Readable<boolean | null> => {
  //we inizialize the readable as null and get the callback with the set function
  const matches = readable(null, (set) => {
    //we match the media query
    const m: MediaQueryList | any = window.matchMedia(mediaQuery);
    //we set the value of the readable to the matches property
    set(m.matches);
    //we create the event listener that will set the new value on change
    const el: EventListener = (e: any) => {
      set(e.matches);
    };
    //we add the new event listener
    m.addEventListener('change', el);
    //we return the stop function that will clean the event listener
    return () => {
      m.removeEventListener('change', el);
    };
  });
  //then we return the readable
  return matches;
};

export const translations: Readable<Translation[]> = readable(
  [
    {
      name: '/',
      definitions: [
        {language: 'en_GB', displayName: 'Home'},
        {language: 'nl_NL', displayName: 'Home'}
      ]
    },
    {
      name: 'about',
      definitions: [
        {language: 'en_GB', displayName: 'About'},
        {language: 'nl_NL', displayName: 'Over'}
      ]
    },
    {
      name: 'advertisement',
      definitions: [
        {language: 'en_GB', displayName: 'Advertisement'},
        {language: 'nl_NL', displayName: 'Advertentie'}
      ]
    },
    {
      name: 'consultancy',
      definitions: [
        {language: 'en_GB', displayName: 'Consultancy'},
        {language: 'nl_NL', displayName: 'Consultancy'}
      ]
    },
    {
      name: 'contact',
      definitions: [
        {language: 'en_GB', displayName: 'Contact'},
        {language: 'nl_NL', displayName: 'Contact'}
      ]
    },
    {
      name: 'docs',
      definitions: [
        {language: 'en_GB', displayName: 'Docs'},
        {language: 'nl_NL', displayName: 'Documentatie'}
      ]
    },
    {
      name: 'nl_NL',
      definitions: [
        {language: 'en_GB', displayName: 'Dutch'},
        {language: 'nl_NL', displayName: 'Nederlands'}
      ]
    },
    {
      name: 'en_GB',
      definitions: [
        {language: 'en_GB', displayName: 'English'},
        {language: 'nl_NL', displayName: 'Engels'}
      ]
    },
    {
      name: 'enter_reach',
      definitions: [
        {language: 'en_GB', displayName: 'Enter Reach for'},
        {language: 'nl_NL', displayName: 'Vul Bereik in voor'}
      ]
    },
    {
      name: 'hide',
      definitions: [
        {language: 'en_GB', displayName: 'HIDE'},
        {language: 'nl_NL', displayName: 'VERBERG'}
      ]
    },
    {
      name: 'home',
      definitions: [
        {language: 'en_GB', displayName: 'Home'},
        {language: 'nl_NL', displayName: 'Home'}
      ]
    },
    {
      name: 'input',
      definitions: [
        {language: 'en_GB', displayName: 'Input'},
        {language: 'nl_NL', displayName: 'Input'}
      ]
    },
    {
      name: 'legal',
      definitions: [
        {language: 'en_GB', displayName: 'Legal'},
        {language: 'nl_NL', displayName: 'Juridisch'}
      ]
    },
    {
      name: 'no_data',
      definitions: [
        {language: 'en_GB', displayName: 'no data for this market'},
        {language: 'nl_NL', displayName: 'geen data voor deze markt'}
      ]
    },
    {
      name: 'notfound',
      definitions: [
        {language: 'en_GB', displayName: 'Not Found'},
        {language: 'nl_NL', displayName: 'Niet Gevonden'}
      ]
    },
    {
      name: 'overlap',
      definitions: [
        {language: 'en_GB', displayName: 'Overlap'},
        {language: 'nl_NL', displayName: 'Overlap'}
      ]
    },
    {
      name: 'precisionInputFor',
      definitions: [
        {language: 'nl_NL', displayName: 'Precisie invoer voor '},
        {language: 'en_GB', displayName: 'Precision input for '}
      ]
    },
    {
      name: 'reach',
      definitions: [
        {language: 'en_GB', displayName: 'Reach'},
        {language: 'nl_NL', displayName: 'Bereik'}
      ]
    },
    {
      name: 'reach_error',
      definitions: [
        {language: 'en_GB', displayName: 'Reach can be maximum 100, minimum 0'},
        {language: 'nl_NL', displayName: 'Bereik mag maximaal 100 zijn, minimaal 0'}
      ]
    },
    {
      name: 'read',
      definitions: [
        {language: 'en_GB', displayName: 'Read'},
        {language: 'nl_NL', displayName: 'Lees'}
      ]
    },
    {
      name: 'reset',
      definitions: [
        {language: 'en_GB', displayName: 'RESET'},
        {language: 'nl_NL', displayName: 'RESET'}
      ]
    },
    {
      name: 'show',
      definitions: [
        {language: 'en_GB', displayName: 'SHOW'},
        {language: 'nl_NL', displayName: 'TOON'}
      ]
    },
    {
      name: 'strategies',
      definitions: [
        {language: 'en_GB', displayName: 'Strategies'},
        {language: 'nl_NL', displayName: 'Strategieën'}
      ]
    },
    {
      name: 'tools',
      definitions: [
        {language: 'en_GB', displayName: 'Tools'},
        {language: 'nl_NL', displayName: 'Tools'}
      ]
    },
    {
      name: 'total',
      definitions: [
        {language: 'en_GB', displayName: 'Total'},
        {language: 'nl_NL', displayName: 'Totaal'}
      ]
    },
    {
      name: 'using_data',
      definitions: [
        {language: 'en_GB', displayName: 'uses data'},
        {language: 'nl_NL', displayName: 'gebruikt data'}
      ]
    },
    {
      name: 'using_formula',
      definitions: [
        {language: 'en_GB', displayName: 'uses formula'},
        {language: 'nl_NL', displayName: 'gebruikt formule'}
      ]
    },
    {
      name: 'work',
      definitions: [
        {language: 'en_GB', displayName: 'Work'},
        {language: 'nl_NL', displayName: 'Werk'}
      ]
    },
    {
      name: 'year',
      definitions: [
        {language: 'en_GB', displayName: 'Year'},
        {language: 'nl_NL', displayName: 'Jaar'}
      ]
    }
  ],
  () => {
    () => {
      console.log('Translations closed');
    };
  }
);
