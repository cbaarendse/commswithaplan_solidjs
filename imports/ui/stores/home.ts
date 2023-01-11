// imports
import {readable, Readable} from 'svelte/store';
import type {Content, Color, Illustrated, Actionable} from '../types/types';

export const homeItems: Readable<(Content & Color & Illustrated & Actionable)[]> = readable(
  [
    {
      name: 'consultancy',
      imgFiles: ['/home/night_crowd.jpg'],
      link: '/consultancy/',
      color: 'blue',
      language: 'english',
      displayName: 'Consultancy',
      description: 'Comms With A Plan provides Media Management consultancy.',
      action: 'Read more'
    },
    {
      name: 'consultancy',
      imgFiles: ['/home/night_crowd.jpg'],
      link: '/consultancy/',
      color: 'blue',
      language: 'dutch',
      displayName: 'Consultancy',
      description: 'Comms With A Plan levert Media Management consultancy.',
      action: 'Lees meer'
    },
    {
      name: 'tools',
      imgFiles: ['/home/tools.jpg'],
      link: '/tools/',
      color: 'green',
      language: 'english',
      displayName: 'Tools',
      description: 'Handy tools for your media efforts.',
      action: 'Read more'
    },
    {
      name: 'tools',
      imgFiles: ['/home/tools.jpg'],
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
