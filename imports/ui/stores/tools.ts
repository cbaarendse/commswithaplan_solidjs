// packages
import {writable, Writable, readable, Readable} from 'svelte/store';

// interfaces
import {
  Content,
  Color,
  Actionable,
  Chapter,
  Strategy,
  StrategyExtension,
  Translation,
  Market
} from '../../both/typings/types';

export const marketName: Writable<Market['name']> = writable('nl');

export const marketData: Writable<boolean> = writable(false);

export const strategy: Writable<Strategy & StrategyExtension> = writable();

export const strategyWithData: Writable<Strategy & StrategyExtension> = writable();

export const toolsHomeItems: Readable<(Actionable & Color)[]> = readable(
  [
    {
      name: 'tools',
      color: 'green',
      link: '/tools/reach',
      definitions: [
        {
          language: 'english',
          displayName: 'Tools',
          description:
            'Comms With A Plan developes tools aimed to help advertisers who are not working with media agencies. For instance because they have inhouse capabilities, or because they currently do not have the proper size.',
          action: 'Try the reach tool...'
        },
        {
          language: 'dutch',
          displayName: 'Tools',
          description:
            'Comms With A Plan ontwikkelt tools voor adverteerders die niet met mediabureaus werken. Bijvoorbeeld omdat zij intern genoeg bekwaamheid bezitten, of omdat ze op het moment niet de juiste grootte hebben.',
          action: 'Probeer de bereikstool...'
        }
      ]
    },
    {
      name: 'reach',
      color: 'green',
      link: '/tools/docs',
      definitions: [
        {
          language: 'english',
          displayName: 'Reach',
          description:
            'Right now the Reach tool uses an algoritm to estimate the total reach of your campaign; If you input the reach of the individual medium types. Read the Docs for more information.',
          action: 'Read about the reach tool...'
        },
        {
          language: 'dutch',
          displayName: 'Bereik',
          description:
            'Op dit moment gebruikt de Bereik-tool een algoritme om het totaalbereik van je campagne in te schatten; Als je het bereik van elk individueel mediumtype invoert. Lees de Documentatie voor meer informatie.',
          action: 'Lees over de bereikstool...'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Tools Home Items closed');
    };
  }
);

export const definitions: Readable<Content[]> = readable(
  [
    {
      name: 'total_reach',
      definitions: [
        {
          language: 'english',
          displayName: 'Total Reach',
          description:
            'The % of people that perceive your message(s), through one or more of the selected Medium Types/ Touch Points'
        },
        {
          language: 'dutch',
          displayName: 'Total Bereik',
          description:
            'Het % mensen dat je boodschap waarneemt, door middel van één of meer van de geselecteerde Mediumtypen/ Touch Points'
        }
      ]
    },
    {
      name: 'overlap',
      definitions: [
        {
          language: 'english',
          displayName: 'Overlap',
          description:
            'Only the % of people that perceive your message(s), through áll of the selected Medium Types/ Touch Points'
        },
        {
          language: 'dutch',
          displayName: 'Overlap',
          description:
            'Alleen het % mensen dat je boodschap waarneemt door middel van álle geselecteerde Mediumtypen/ Touch Points'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Definitions closed');
    };
  }
);

export const toolsDocumentationChapters: Readable<Chapter[]> = readable(
  [
    {
      name: 'chapter_1',
      imgFiles: ['/chapter_1_1.png'],
      language: 'english',
      displayName: 'Operation',
      paragraphs: [
        {
          displayName: 'Sliders',
          description:
            'Use the sliders of the medium types you want to use in your plan. With the sliders you set the reach of that medium type.',
          elaboration: "The Reach tool works with an algorithm, that is why it's so fast."
        },
        {
          displayName: 'Result',
          description:
            'On top you then see an estimate of the Total Reach of your plan. And you see the Overlap ("Locus"), so the reach your plan obtains with áll medium types.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_1',
      imgFiles: ['/chapter_1_1.png'],
      language: 'dutch',
      displayName: 'Bediening',
      paragraphs: [
        {
          displayName: 'Sliders',
          description:
            'Gebruik de sliders van de medium types die je wilt gebruiken in je plan. Met de sliders stel je het bereik in van dat medium type.',
          elaboration: 'Reach werkt met een algoritme. Daarom is het zo snel.'
        },
        {
          displayName: 'Resultaat',
          description:
            'Bovenin zie je dan een inschatting van het Totaal Bereik van je plan. En je ziet de Overlap ("Locus"), dus het bereik dat je plan realiseert met álle medium types.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_2',
      imgFiles: ['/chapter_2_1.png'],
      language: 'english',
      displayName: 'Reset',
      paragraphs: [
        {
          displayName: 'Reset 1',
          description:
            'The 1st time you press reset, you keep your plan, in order, but the input for all medium types is set to "0".',
          elaboration: ''
        },
        {
          displayName: 'Reset 2',
          description:
            'The 2nd time you press reset, you get a new empty plan, with the full default list of medium types, in alphabetical order.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_2',
      imgFiles: ['/chapter_2_1.png'],
      language: 'dutch',
      displayName: 'Reset',
      paragraphs: [
        {
          displayName: 'Reset 1',
          description:
            'De eerste keer dat je op reset drukt, behoud je je plan, in volgorde, maar de input voor alle medium typen wordt "0".',
          elaboration: ''
        },
        {
          displayName: 'Reset 2',
          description:
            'De 2e keer dat je op reset drukt, krijg je een nieuw leeg plan, met de volledige basis lijst van mediumtypen, in alfabetische volgorde.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_3',
      imgFiles: ['/chapter_3_1.png'],
      language: 'english',
      displayName: 'Sort',
      paragraphs: [
        {
          displayName: 'Sort 1',
          description:
            'The 1st time you press sort, the order of your plan changes. The highest input will be on top, lowest input underneath.',
          elaboration: ''
        },
        {
          displayName: 'Sort 2',
          description: 'The 2nd time you press sort, the order will become alphabetical, in your chosen language.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_3',
      imgFiles: ['/chapter_3_1.png'],
      language: 'dutch',
      displayName: 'Sorteer',
      paragraphs: [
        {
          displayName: 'Sorteer  1',
          description:
            'De eerste keer dat je op sorteer drukt, verandert de volgorde. De hoogste input komt bovenaan en de laagste onderaan.',
          elaboration: ''
        },
        {
          displayName: 'Sorteer 2',
          description: 'De 2e keer dat je op sorteer drukt, wordt de volgorde alfabetisch, in je gekozen taal.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_4',
      imgFiles: ['/chapter_4_1.png'],
      language: 'english',
      displayName: 'Hide',
      paragraphs: [
        {
          displayName: 'Hide',
          description: 'The 1st time you press this button, you hide all the medium types with input 0.',
          elaboration: 'So it shows only the medium types you engage in your plan.'
        },
        {
          displayName: 'Show',
          description: 'The 2nd time you press this button, you reveal the medium types with input 0 again',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_4',
      imgFiles: ['/chapter_4_1.png'],
      language: 'dutch',
      displayName: 'Verberg',
      paragraphs: [
        {
          displayName: 'Verberg',
          description: 'De eerste keer dat je op deze knop drukt, verberg je de mediumtypes met input 0.',
          elaboration: 'Dus dit toont alleen de mediumtypes die je inzet in je plan.'
        },
        {
          displayName: 'Toon',
          description: 'De 2e keer dat je op deze knop drukt, laat je de mediumtypes met input 0 weer zien.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_5',
      imgFiles: ['/chapter_5_1.png'],
      language: 'english',
      displayName: 'Outcome',
      paragraphs: [
        {
          displayName: 'Result',
          description:
            'This area in the header shows the estimated result of your campaign. In terms of Total Reach and Locus (overlap).',
          elaboration: 'Click on the labels to see the meaning of each.'
        }
      ]
    },
    {
      name: 'chapter_5',
      imgFiles: ['/chapter_5_1.png'],
      language: 'dutch',
      displayName: 'Uitkomst',
      paragraphs: [
        {
          displayName: 'Resultaat',
          description:
            'Deze zone in dekop toont het ingeschatte resultaat van je campagne. Als Totaal Bereik en Locus (overlap).',
          elaboration: 'Klik op de labels voor de betekenis van beiden.'
        }
      ]
    },
    {
      name: 'chapter_6',
      imgFiles: ['/chapter_6_1.png'],
      language: 'english',
      displayName: 'Output',
      paragraphs: [
        {
          displayName: 'Print',
          description: 'This button brings up the print dialog of your browser. Most browsers and versions have this.',
          elaboration:
            'If you want to save your plan as a document, for instance PDF, usually you can use the same dialog.'
        }
      ]
    },
    {
      name: 'chapter_6',
      imgFiles: ['/chapter_6_1.png'],
      language: 'dutch',
      displayName: 'Uitvoer',
      paragraphs: [
        {
          displayName: 'Print',
          description: 'Deze knop roept de print dialoog van je browser op. De meeste browsers en versies hebben dit.',
          elaboration:
            'Als je je plan als document, bijvoorbeeld PDF, wil bewaren, dan kan dat normaliter door middel van dezelfde dialoog.'
        }
      ]
    },
    {
      name: 'chapter_7',
      imgFiles: ['/chapter_7_1.png', '/chapter_7_2.png'],
      language: 'english',
      displayName: 'Medium type',
      paragraphs: [
        {
          displayName: 'Definition',
          description: "If you click the icon of a medium type, you'll get the relevant definition.",
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_7',
      imgFiles: ['/chapter_7_1.png', '/chapter_7_2.png'],
      language: 'dutch',
      displayName: 'Mediumtype',
      paragraphs: [
        {
          displayName: 'Verberg',
          description: 'Klik op het icoon van een mediumtype, dan krijg je de relevante definitie.',
          elaboration: ''
        }
      ]
    },
    {
      name: 'chapter_8',
      imgFiles: ['/chapter_8_1.png', '/chapter_8_2.png'],
      language: 'english',
      displayName: 'Precision input',
      paragraphs: [
        {
          displayName: 'Call',
          description:
            'You can bring up a precision input field. Just click on the reach for a certain medium type, just right of the slider.',
          elaboration: ''
        },
        {
          displayName: 'Use',
          description: 'Fill in the reach for this medium type. And press submit (or cancel).',
          elaboration: 'Keep it less than or equal to 100.'
        }
      ]
    },
    {
      name: 'chapter_8',
      imgFiles: ['/chapter_8_1.png', '/chapter_8_2.png'],
      language: 'dutch',
      displayName: 'Precieze invoer',
      paragraphs: [
        {
          displayName: 'Oproepen',
          description:
            'Je kan een invoerveld oproepen. Klik op het bereik van een bepaald mediumtype, net rechts van de slider.',
          elaboration: ''
        },
        {
          displayName: 'Gebruiken',
          description: 'Vul het bereik in voor dit mediumtype. En klik op verstuur (of annuleer).',
          elaboration: 'Houd het lager dan of gelijk aan 100.'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Tools Documentation Chapters closed');
    };
  }
);
