// imports
import {readable, Readable} from 'svelte/store';
import type {Actionable, Illustrated, Color} from '../../both/typings/types';

export const homeItems: Readable<(Actionable & Illustrated & Color)[]> = readable(
  [
    {
      name: 'consultancy',
      imgFiles: ['/home/night_crowd.jpg'],
      link: '/consultancy/',
      color: 'blue',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Consultancy',
          description: 'Comms With A Plan provides Media Management consultancy.',
          action: 'Read more'
        },
        {
          language: 'nl_NL',
          displayName: 'Consultancy',
          description: 'Comms With A Plan levert Media Management consultancy.',
          action: 'Lees meer'
        }
      ]
    },
    {
      name: 'tools',
      imgFiles: ['/home/tools.jpg'],
      link: '/tools/',
      color: 'green',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Tools',
          description: 'Handy tools for your media efforts.',
          action: 'Read more'
        },
        {
          language: 'nl_NL',
          displayName: 'Tools',
          description: 'Handige tools voor je media inzet.',
          action: 'Lees meer'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Home Items closed');
    };
  }
);
