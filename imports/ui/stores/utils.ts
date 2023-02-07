// packages
import {writable, Writable, readable, Readable} from 'svelte/store';

// interfaces
import type {Translation, Language} from '../../both/typings/types';

// stores
export const language: Writable<Language> = writable('dutch');

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
        {language: 'english', displayName: 'Home'},
        {language: 'dutch', displayName: 'Home'}
      ]
    },
    {
      name: 'about',
      definitions: [
        {language: 'english', displayName: 'About'},
        {language: 'dutch', displayName: 'Over'}
      ]
    },
    {
      name: 'advertisement',
      definitions: [
        {language: 'english', displayName: 'Advertisement'},
        {language: 'dutch', displayName: 'Advertentie'}
      ]
    },
    {
      name: 'consultancy',
      definitions: [
        {language: 'english', displayName: 'Consultancy'},
        {language: 'dutch', displayName: 'Consultancy'}
      ]
    },
    {
      name: 'contact',
      definitions: [
        {language: 'english', displayName: 'Contact'},
        {language: 'dutch', displayName: 'Contact'}
      ]
    },
    {
      name: 'docs',
      definitions: [
        {language: 'english', displayName: 'Docs'},
        {language: 'dutch', displayName: 'Documentatie'}
      ]
    },
    {
      name: 'dutch',
      definitions: [
        {language: 'english', displayName: 'Dutch'},
        {language: 'dutch', displayName: 'Nederlands'}
      ]
    },
    {
      name: 'english',
      definitions: [
        {language: 'english', displayName: 'English'},
        {language: 'dutch', displayName: 'Engels'}
      ]
    },
    {
      name: 'enter_reach',
      definitions: [
        {language: 'english', displayName: 'Enter Reach for'},
        {language: 'dutch', displayName: 'Vul Bereik in voor'}
      ]
    },
    {
      name: 'hide',
      definitions: [
        {language: 'english', displayName: 'HIDE'},
        {language: 'dutch', displayName: 'VERBERG'}
      ]
    },
    {
      name: 'home',
      definitions: [
        {language: 'english', displayName: 'Home'},
        {language: 'dutch', displayName: 'Home'}
      ]
    },
    {
      name: 'input',
      definitions: [
        {language: 'english', displayName: 'Input'},
        {language: 'dutch', displayName: 'Input'}
      ]
    },
    {
      name: 'legal',
      definitions: [
        {language: 'english', displayName: 'Legal'},
        {language: 'dutch', displayName: 'Juridisch'}
      ]
    },
    {
      name: 'no_data',
      definitions: [
        {language: 'english', displayName: 'no data for this market'},
        {language: 'dutch', displayName: 'geen data voor deze markt'}
      ]
    },
    {
      name: 'notfound',
      definitions: [
        {language: 'english', displayName: 'Not Found'},
        {language: 'dutch', displayName: 'Niet Gevonden'}
      ]
    },
    {
      name: 'overlap',
      definitions: [
        {language: 'english', displayName: 'Overlap'},
        {language: 'dutch', displayName: 'Overlap'}
      ]
    },
    {
      name: 'precisionInputFor',
      definitions: [
        {language: 'dutch', displayName: 'Precisie invoer voor '},
        {language: 'english', displayName: 'Precision input for '}
      ]
    },
    {
      name: 'reach',
      definitions: [
        {language: 'english', displayName: 'Reach'},
        {language: 'dutch', displayName: 'Bereik'}
      ]
    },
    {
      name: 'reach_error',
      definitions: [
        {language: 'english', displayName: 'Reach can be maximum 100, minimum 0'},
        {language: 'dutch', displayName: 'Bereik mag maximaal 100 zijn, minimaal 0'}
      ]
    },
    {
      name: 'read',
      definitions: [
        {language: 'english', displayName: 'Read'},
        {language: 'dutch', displayName: 'Lees'}
      ]
    },
    {
      name: 'reset',
      definitions: [
        {language: 'english', displayName: 'RESET'},
        {language: 'dutch', displayName: 'RESET'}
      ]
    },
    {
      name: 'show',
      definitions: [
        {language: 'english', displayName: 'SHOW'},
        {language: 'dutch', displayName: 'TOON'}
      ]
    },
    {
      name: 'strategies',
      definitions: [
        {language: 'english', displayName: 'Strategies'},
        {language: 'dutch', displayName: 'Strategieën'}
      ]
    },
    {
      name: 'tools',
      definitions: [
        {language: 'english', displayName: 'Tools'},
        {language: 'dutch', displayName: 'Tools'}
      ]
    },
    {
      name: 'total',
      definitions: [
        {language: 'english', displayName: 'Total'},
        {language: 'dutch', displayName: 'Totaal'}
      ]
    },
    {
      name: 'using_data',
      definitions: [
        {language: 'english', displayName: 'uses data'},
        {language: 'dutch', displayName: 'gebruikt data'}
      ]
    },
    {
      name: 'using_formula',
      definitions: [
        {language: 'english', displayName: 'uses formula'},
        {language: 'dutch', displayName: 'gebruikt formule'}
      ]
    },
    {
      name: 'work',
      definitions: [
        {language: 'english', displayName: 'Work'},
        {language: 'dutch', displayName: 'Werk'}
      ]
    },
    {
      name: 'year',
      definitions: [
        {language: 'english', displayName: 'Year'},
        {language: 'dutch', displayName: 'Jaar'}
      ]
    }
  ],
  () => {
    () => {
      console.log('Translations closed');
    };
  }
);
