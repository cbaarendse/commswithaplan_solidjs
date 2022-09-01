// imports
import {readable, Readable} from 'svelte/store';
import type {Content} from '../types/types';

export const homeItems: Readable<Content[]> = readable(
  [
    {
      name: 'consultancy',
      imgFile: '/home/consultant.jpeg',
      link: '/consultancy/',
      color: 'blue',
      language: 'english',
      displayName: 'Consultancy',
      description: 'Comms With A Plan provides Media Management consultancy.',
      action: 'Read more'
    },
    {
      name: 'consultancy',
      imgFile: '/home/consultant.jpeg',
      link: '/consultancy/',
      color: 'blue',
      language: 'dutch',
      displayName: 'Consultancy',
      description: 'Comms With A Plan levert Media Management consultancy.',
      action: 'Lees meer'
    },
    {
      name: 'tools',
      imgFile: '/home/night_crowd.jpg',
      link: '/tools/',
      color: 'green',
      language: 'english',
      displayName: 'Tools',
      description: 'Handy tools for your media efforts.',
      action: 'Read more'
    },
    {
      name: 'tools',
      imgFile: '/home/night_crowd.jpg',
      link: '/tools/',
      color: 'green',
      language: 'dutch',
      displayName: 'Tools',
      description: 'Handige tools voor je media inzet.',
      action: 'Lees meer'
    }
  ],
  () => {
    () => {
      console.log('Home Items closed');
    };
  }
);
//TODO: doubles with toolsHomeItems
export const toolsItems: Readable<Content[]> = readable(
  [
    {
      name: 'reporting',
      color: 'blue',
      language: 'english',
      displayName: 'Reporting',
      description: 'Interpret, set up, manage dashboards or other kinds of reports.'
    },
    {
      name: 'reporting',
      color: 'blue',
      language: 'dutch',
      displayName: 'Rapportage',
      description: 'Inpreteren, opzetten, managen van dashboards of andersoortige rapporten.'
    },
    {
      name: 'research_and_analysis',
      color: 'blue',
      language: 'english',
      displayName: 'Research and analysis',
      description: 'Interpretation of past campaigns / years etc.'
    },
    {
      name: 'research_and_analysis',
      color: 'blue',
      language: 'dutch',
      displayName: 'Onderzoek en analyse',
      description: ' Interpretatie van afgelopen campagnes / jaren etc.'
    }
  ],
  () => {
    () => {
      console.log('Tools Items closed');
    };
  }
);
