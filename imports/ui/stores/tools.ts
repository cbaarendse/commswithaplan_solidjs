// packages
import {writable, Writable, readable, Readable} from 'svelte/store';

// interfaces
import {
  Content,
  Color,
  Actionable,
  Chapter,
  Market,
  Strategy,
  StrategyExtension,
  TouchPointDefinition
} from '../../both/typings/types';

export const marketName: Writable<Strategy['marketName']> = writable('nl', () => {
  () => {
    console.log('marketName closed');
  };
});
export const marketData: Writable<Strategy['marketData']> = writable(false, () => {
  () => {
    console.log('markerData closed');
  };
});
export const deployedTouchPoints: Writable<Strategy['deployment']> = writable([], () => {
  () => {
    console.log('deployedTouchPoints closed');
  };
});
export const overlap: Writable<Strategy['overlap']> = writable(0, () => {
  () => {
    console.log('overlap closed');
  };
});
export const totalReach: Writable<Strategy['totalReach']> = writable(0, () => {
  () => {
    console.log('totalReach closed');
  };
});
export const useMarketData: Writable<StrategyExtension['useMarketData']> = writable(false, () => {
  () => {
    console.log('useMarketData closed');
  };
});
export const genders: Writable<StrategyExtension['genders']> = writable(new Set(['f', 'm', 'x']), () => {
  () => {
    console.log('genders closed');
  };
});
export const ageGroupStart: Writable<StrategyExtension['ageGroupStart']> = writable();
export const ageGroupEnd: Writable<StrategyExtension['ageGroupEnd']> = writable();
export const respondentsCount: Writable<number> = writable(0, () => {
  () => {
    console.log('respondentsCount closed');
  };
});
export const peopleInRange: Writable<number> = writable(0, () => {
  () => {
    console.log('peopleInRange closed');
  };
});
export const reachedNonUnique: Writable<number> = writable(0, () => {
  () => {
    console.log('reachedNonUnique closed');
  };
});
export const reachedUnique: Writable<number> = writable(0, () => {
  () => {
    console.log('reachedUnique closed');
  };
});

export const sortedByName: Writable<boolean> = writable(true, () => {
  () => {
    console.log('sortedByName closed');
  };
});

export const defaultStrategyWithFormula: Readable<Strategy> = readable({
  userId: '',
  title: 'New Strategy',
  marketName: 'nl',
  marketData: false,
  createdAt: new Date(),
  lastChanged: new Date(),
  deployment: [],
  overlap: 0,
  totalReach: 0
});

export const defaultStrategyExtensionForData: Readable<StrategyExtension> = readable({
  useMarketData: false,
  genders: undefined,
  ageGroupStart: undefined,
  ageGroupEnd: undefined,
  companyId: undefined,
  brandName: undefined,
  productName: undefined
});

export const markets: Readable<Market[]> = readable(
  [
    {
      name: 'be',
      flag: '🇧🇪',
      displayNames: [
        {language: 'english', displayName: 'Belgium'},
        {language: 'dutch', displayName: 'België'}
      ],
      ageGroups: [
        [9, 11],
        [12, 19],
        [20, 34],
        [35, 49],
        [50, 64],
        [65, 107]
      ]
    },
    {
      name: 'nl',
      flag: '🇳🇱',
      displayNames: [
        {language: 'english', displayName: 'The Netherlands'},
        {language: 'dutch', displayName: 'Nederland'}
      ],
      ageGroups: [
        [9, 11],
        [12, 19],
        [20, 34],
        [35, 49],
        [50, 64],
        [65, 107]
      ]
    },
    {
      name: 'uk',
      flag: '🇬🇧',
      displayNames: [
        {language: 'english', displayName: 'United Kingdom'},
        {language: 'dutch', displayName: 'Verenigd Koninkrijk'}
      ],
      ageGroups: [
        [9, 11],
        [12, 19],
        [20, 34],
        [35, 49],
        [50, 64],
        [65, 107]
      ]
    }
  ],
  () => {
    () => {
      console.log('Markets closed');
    };
  }
);

export const touchPointsPerInputType: Readable<{[key: string]: string[]}> = readable(
  {
    contacts: [
      'ambassador',
      'direct_mail',
      'door_drop',
      'event',
      'experiential',
      'internal_employee',
      'loyalty_crm',
      'magazines',
      'newspapers',
      'trade_fair',
      'packaging',
      'shopper',
      'word_of_mouth'
    ],
    grps: ['asset', 'cinema', 'outdoor', 'pr', 'promotion', 'television', 'radio', 'sponsorship'],
    impressions: [
      'advocacy',
      'app',
      'console_game',
      'display',
      'e_mail',
      'mobile',
      'social',
      'video_on_demand',
      'viral',
      'website',
      'sem',
      'seo'
    ],
    reach: []
  },
  () => {
    () => {
      console.log('TouchPoints Per InputType closed');
    };
  }
);
export const touchPointsDefinitions: Readable<TouchPointDefinition[]> = readable(
  [
    {
      name: 'advocacy',
      definitions: [
        {
          language: 'english',
          displayName: 'Advocacy',
          description: 'Consumers spread information about your brand.'
        },
        {
          language: 'dutch',
          displayName: 'Advocacy',
          description: 'Consumenten verspreiden informatie over je merk.'
        }
      ]
    },
    {
      name: 'ambassador',
      definitions: [
        {
          language: 'english',
          displayName: 'Ambassador',
          description: 'A (known) person acts as spokesperson for your brand.'
        },
        {
          language: 'dutch',
          displayName: 'Ambassador',
          description: 'Een (bekend) persoon treedt op als woordvoerder voor je merk.'
        }
      ]
    },
    {
      name: 'app',
      definitions: [
        {
          language: 'english',
          displayName: 'App',
          description: 'A branded software program that can be used on smartphones.'
        },
        {
          language: 'dutch',
          displayName: 'App',
          description: 'Een branded software programma dat werkt op smartphones.'
        }
      ]
    },
    {
      name: 'asset',
      definitions: [
        {
          language: 'english',
          displayName: 'Asset',
          description: 'A proprietary tool or platform that a brand owns and that can be used to further build it.'
        },
        {
          language: 'dutch',
          displayName: 'Asset',
          description:
            'Een hulpmiddel of programma dat eigendom is van een merk en dat gebruikt kan worden om het verder te bouwen.'
        }
      ]
    },
    {
      name: 'cinema',
      definitions: [
        {
          language: 'english',
          displayName: 'Cinema',
          description: 'Screen advertising in cinemas.'
        },
        {
          language: 'dutch',
          displayName: 'Cinema',
          description: 'Adverteren op het doek in bioscopen.'
        }
      ]
    },
    {
      name: 'console_game',
      definitions: [
        {
          language: 'english',
          displayName: 'Console / Game',
          description: 'Advertising in a game (online, console, PC) or on a console.'
        },
        {
          language: 'dutch',
          displayName: 'Console / Game',
          description: 'Adverteren in een game (online, console, PC) of via een console.'
        }
      ]
    },
    {
      name: 'direct_mail',
      definitions: [
        {
          language: 'english',
          displayName: 'Direct Mail',
          description: 'Physical mail, delivered to mail boxes, targeted and untargeted.'
        },
        {
          language: 'dutch',
          displayName: 'Direct Mail',
          description: 'Fysieke post, geleverd in de brievenbus, gericht of ongericht.'
        }
      ]
    },
    {
      name: 'display',
      definitions: [
        {
          language: 'english',
          displayName: 'Display',
          description: 'Advertising on websites, through all possible formats.'
        },
        {
          language: 'dutch',
          displayName: 'Display',
          description: 'Adverteren op websites, in alle mogelijke vormen.'
        }
      ]
    },
    {
      name: 'door_drop',
      definitions: [
        {
          language: 'english',
          displayName: 'Door Drop',
          description: 'Unadressed mailings and leaflets'
        },
        {
          language: 'dutch',
          displayName: 'Folder',
          description: 'Ongeadresseerde mailings en folders.'
        }
      ]
    },
    {
      name: 'e-mail',
      definitions: [
        {
          language: 'english',
          displayName: 'E-Mail',
          description: 'Electronic mail, delivered to the inbox, targeted and untargeted.'
        },
        {
          language: 'dutch',
          displayName: 'E-Mail',
          description: 'Electronische mail, geleverd in de inbox, gericht of ongericht.'
        }
      ]
    },
    {
      name: 'event',
      definitions: [
        {
          language: 'english',
          displayName: 'Event',
          description: 'A branded gathering of people at an arranged place and time.'
        },
        {
          language: 'dutch',
          displayName: 'Event',
          description: 'Een branded samenkomst van mensen op een afgesproken plaats en tijd.'
        }
      ]
    },
    {
      name: 'experiential',
      definitions: [
        {
          language: 'english',
          displayName: 'Experiential',
          description: 'Engaging consumers in an experience that involves the product and/or brand values.'
        },
        {
          language: 'dutch',
          displayName: 'Experiential',
          description: 'Betrekken van consumenten in een ervaring die het product en/of merkwaarden bevat.'
        }
      ]
    },
    {
      name: 'internal_employee',
      definitions: [
        {
          language: 'english',
          displayName: 'Internal / Employee',
          description: 'Personnel spreads information about your brand.'
        },
        {
          language: 'dutch',
          displayName: 'Internal / Employee',
          description:
            'Het merk verspreidt informatie naar personeelsleden. Zij delen deze informatie eventueel verder.'
        }
      ]
    },
    {
      name: 'loyalty_crm',
      definitions: [
        {
          language: 'english',
          displayName: 'Loyalty / CRM',
          description: 'IT supported relationship with consumers.'
        },
        {
          language: 'dutch',
          displayName: 'Loyalty / CRM',
          description: 'IT ondersteunde relatie met consumenten.'
        }
      ]
    },
    {
      name: 'magazines',
      definitions: [
        {
          language: 'english',
          displayName: 'Magazines',
          description: 'Advertising in magazines.'
        },
        {
          language: 'dutch',
          displayName: 'Magazines',
          description: 'Adverteren in magazines.'
        }
      ]
    },
    {
      name: 'mobile',
      definitions: [
        {
          language: 'english',
          displayName: 'Mobile',
          description: 'Branded messaging on mobile phones.'
        },
        {
          language: 'dutch',
          displayName: 'Mobiel',
          description: 'Branded boodschappen verspreiden door middel van mobiele telefoons.'
        }
      ]
    },
    {
      name: 'newspapers',
      definitions: [
        {
          language: 'english',
          displayName: 'Newspapers',
          description: 'Advertising in newspapers.'
        },
        {
          language: 'dutch',
          displayName: 'Dagbladen',
          description: 'Adverteren in kranten.'
        }
      ]
    },
    {
      name: 'outdoor',
      definitions: [
        {
          language: 'english',
          displayName: 'Outdoor',
          description: 'Advertising at physical places that are outside the consumers’ home.'
        },
        {
          language: 'dutch',
          displayName: 'Buitenreclame',
          description: 'Adverteren op fysieke punten waarmee de consument alleen buitenshuis in aanraking kan komen.'
        }
      ]
    },
    {
      name: 'packaging',
      definitions: [
        {
          language: 'english',
          displayName: 'Packaging',
          description: 'Messaging on a product’s package.'
        },
        {
          language: 'dutch',
          displayName: 'Verpakking',
          description: 'Boodschappen op de verpakking van het product.'
        }
      ]
    },
    {
      name: 'pr',
      definitions: [
        {
          language: 'english',
          displayName: 'PR',
          description: 'Communication that focuses on a mutual benefit for brand and consumers.'
        },
        {
          language: 'dutch',
          displayName: 'PR',
          description: 'Communicatie die zich concentreert op het wederzijds belang voor merk en consumenten.'
        }
      ]
    },
    {
      name: 'promotion',
      definitions: [
        {
          language: 'english',
          displayName: 'Promotion',
          description: 'Communication that focuses on a temporary change in price / value ratio.'
        },
        {
          language: 'dutch',
          displayName: 'Promotie',
          description:
            'Communicatie die zich concentreert op een tijdelijke verandering in de prijs / waarde verhouding.'
        }
      ]
    },
    {
      name: 'radio',
      definitions: [
        {
          language: 'english',
          displayName: 'Radio',
          description: 'Advertising on radio stations, in commercial airtime and in-program.'
        },
        {
          language: 'dutch',
          displayName: 'Radio',
          description: 'Adverteren in zendtijd van radiostations, reclamezendtijd en in-program.'
        }
      ]
    },
    {
      name: 'sem',
      definitions: [
        {
          language: 'english',
          displayName: 'SEM',
          description: 'Search engine marketing - Paid optimization and advertising on search engine results pages.'
        },
        {
          language: 'dutch',
          displayName: 'SEM',
          description:
            'Search engine marketing - Betaalde optimalisatie en advertenties op resultaatpagina’s van zoekmachines.'
        }
      ]
    },
    {
      name: 'seo',
      definitions: [
        {
          language: 'english',
          displayName: 'SEO',
          description: 'Search engine optimization - Free optimization on search engine results pages.'
        },
        {
          language: 'dutch',
          displayName: 'SEO',
          description: 'Search engine optimization -  Gratis optimalisatie op resultaatpagina’s van zoekmachines.'
        }
      ]
    },
    {
      name: 'shopper',
      definitions: [
        {
          language: 'english',
          displayName: 'Shopper',
          description: 'Communication in retail channels.'
        },
        {
          language: 'dutch',
          displayName: 'Shopper',
          description: 'Communicatie in retail-kanalen.'
        }
      ]
    },
    {
      name: 'social',
      definitions: [
        {
          language: 'english',
          displayName: 'Social',
          description: 'Branded appearance on social networks, paid and unpaid.'
        },
        {
          language: 'dutch',
          displayName: 'Social',
          description: 'Branded vertoning op sociale netwerken, betaald en onbetaald.'
        }
      ]
    },
    {
      name: 'sponsorship',
      definitions: [
        {
          language: 'english',
          displayName: 'Sponsorship',
          description: 'A branding opportunity in exchange for financial support of a person, activity or organization.'
        },
        {
          language: 'dutch',
          displayName: 'Sponsorship',
          description:
            'De mogelijkheid om je merk te tonen in ruil voor financiële steun van een persoon, activiteit of organisatie.'
        }
      ]
    },
    {
      name: 'television',
      definitions: [
        {
          language: 'english',
          displayName: 'Television',
          description: 'Advertising on television, in commercial airtime and in-program.'
        },
        {
          language: 'dutch',
          displayName: 'Televisie',
          description: 'Adverteren in zendtijd van een televisiestation, reclamezendtijd en in-program.'
        }
      ]
    },
    {
      name: 'trade_fair',
      definitions: [
        {
          language: 'english',
          displayName: 'Trade Fair',
          description: 'Appearing at an exhibition for a specific industry or purpose.'
        },
        {
          language: 'dutch',
          displayName: 'Trade Fair',
          description: 'Vertonen van een merk op een beurs voor een specifieke industrie of doel.'
        }
      ]
    },
    {
      name: 'video_on_demand',
      definitions: [
        {
          language: 'english',
          displayName: 'Video On Demand',
          description: 'Advertising in an environment that provides audio visual content to users at request.'
        },
        {
          language: 'dutch',
          displayName: 'Video On Demand',
          description: 'Adverteren in een omgeving die op verzoek audiovisuele content biedt aan gebruikers.'
        }
      ]
    },
    {
      name: 'viral',
      definitions: [
        {
          language: 'english',
          displayName: 'Viral',
          description: 'Communication in a way that optimizes the probability that people will forward your message.'
        },
        {
          language: 'dutch',
          displayName: 'Viral',
          description:
            'Communicatie op een manier die de kans maximaliseert dat mensen je boodschap zullen doorsturen aan andere mensen. '
        }
      ]
    },
    {
      name: 'website',
      definitions: [
        {
          language: 'english',
          displayName: 'Website',
          description: 'Electronic information, that is stored on a server and is accessible through a browser.'
        },
        {
          language: 'dutch',
          displayName: 'Website',
          description:
            'Elektronische informatie, die opgeslagen is op een server en toegankelijk door middel van een browser.'
        }
      ]
    },
    {
      name: 'word_of_mouth',
      definitions: [
        {
          language: 'english',
          displayName: 'Word Of Mouth',
          description: 'People pass opinions on a brand to other people.'
        },
        {
          language: 'dutch',
          displayName: 'Word Of Mouth',
          description: 'Mensen geven meningen door over je merk aan andere mensen.'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('TouchPointsBasics closed');
    };
  }
);
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
