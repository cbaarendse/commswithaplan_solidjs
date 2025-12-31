// imports
import type {Actionable, Illustrated, Color} from '../../both/typings/types';

const homeItemsData: (Actionable & Illustrated & Color)[] = [
  {
    name: 'consultancy',
    imgFiles: ['/home/night_crowd.jpg'],
    link: '/consultancy/',
    color: 'blue',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Consultancy',
        description: 'Comms With A Plan provides Media Management consultancy.',
        action: 'Read more'
      },
      {
        language: 'nl-NL',
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
        language: 'en-GB',
        displayName: 'Tools',
        description: 'Handy tools for your media efforts.',
        action: 'Read more'
      },
      {
        language: 'nl-NL',
        displayName: 'Tools',
        description: 'Handige tools voor je media inzet.',
        action: 'Lees meer'
      }
    ]
  }
];

export const homeItems = () => homeItemsData;
