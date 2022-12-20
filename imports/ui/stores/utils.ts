// packages
import {writable, Writable, readable, Readable} from 'svelte/store';

// interfaces
import type {Translation} from '../types/types';

// stores
export const language: Writable<string> = writable('dutch');

export const consentFooterVisible: Writable<boolean | null> = writable(true);

export const isSmallScreen: Writable<boolean | null> = writable(true);

export const navigationVisible: Writable<boolean | null> = writable(false);

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
    {name: '/', language: 'english', displayName: 'Home'},
    {name: '/', language: 'dutch', displayName: 'Home'},
    {name: 'advertisement', language: 'english', displayName: 'Advertisement'},
    {name: 'advertisement', language: 'dutch', displayName: 'Advertentie'},
    {name: 'consultancy', language: 'english', displayName: 'Consultancy'},
    {name: 'consultancy', language: 'dutch', displayName: 'Consultancy'},
    {name: 'contact', language: 'english', displayName: 'Contact'},
    {name: 'contact', language: 'dutch', displayName: 'Contact'},
    {name: 'docs', language: 'english', displayName: 'Docs'},
    {name: 'docs', language: 'dutch', displayName: 'Documentatie'},
    {name: 'dutch', language: 'english', displayName: 'Dutch'},
    {name: 'dutch', language: 'dutch', displayName: 'Nederlands'},
    {name: 'english', language: 'english', displayName: 'English'},
    {name: 'english', language: 'dutch', displayName: 'Engels'},
    {name: 'enter_reach', language: 'english', displayName: 'Enter Reach for'},
    {name: 'enter_reach', language: 'dutch', displayName: 'Vul Bereik in voor'},
    {name: 'hide', language: 'english', displayName: 'HIDE'},
    {name: 'hide', language: 'dutch', displayName: 'VERBERG'},
    {name: 'home', language: 'english', displayName: 'Home'},
    {name: 'home', language: 'dutch', displayName: 'Home'},
    {name: 'input', language: 'english', displayName: 'Input'},
    {name: 'input', language: 'dutch', displayName: 'Input'},
    {name: 'legal', language: 'english', displayName: 'Legal'},
    {name: 'legal', language: 'dutch', displayName: 'Juridisch'},
    {name: 'locus', language: 'english', displayName: 'Locus'},
    {name: 'locus', language: 'dutch', displayName: 'Locus'},
    {name: 'notfound', language: 'english', displayName: 'Not Found'},
    {name: 'notfound', language: 'dutch', displayName: 'Niet Gevonden'},
    {name: 'precisionInputFor', language: 'dutch', displayName: 'Precisie invoer voor '},
    {name: 'precisionInputFor', language: 'english', displayName: 'Precision input for '},
    {name: 'reach', language: 'english', displayName: 'Reach'},
    {name: 'reach', language: 'dutch', displayName: 'Bereik'},
    {name: 'reach_error', language: 'english', displayName: 'Reach can be maximum 100, minimum 0'},
    {name: 'reach_error', language: 'dutch', displayName: 'Bereik mag maximaal 100 zijn, minimaal 0'},
    {name: 'read', language: 'english', displayName: 'Read'},
    {name: 'read', language: 'dutch', displayName: 'Lees'},
    {name: 'reset', language: 'english', displayName: 'RESET'},
    {name: 'reset', language: 'dutch', displayName: 'RESET'},
    {name: 'show', language: 'english', displayName: 'SHOW'},
    {name: 'show', language: 'dutch', displayName: 'TOON'},
    {name: 'tools', language: 'english', displayName: 'Tools'},
    {name: 'tools', language: 'dutch', displayName: 'Tools'},
    {name: 'total', language: 'english', displayName: 'Total'},
    {name: 'total', language: 'dutch', displayName: 'Totaal'},
    {name: 'work', language: 'english', displayName: 'Work'},
    {name: 'work', language: 'dutch', displayName: 'Werk'}
  ],
  () => {
    () => {
      console.log('Translations closed');
    };
  }
);
