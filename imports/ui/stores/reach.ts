// imports
import {writable, Writable, readable, Readable, derived} from 'svelte/store';
import {Meteor} from 'meteor/meteor';
import {Market, Strategy, TouchPointDefinition, DeployedTouchPoint, SortedByName} from '../../both/typings/types';
import createReachTool from '../functions/reach';

// variables
const reachTool = createReachTool();

// strategy
export const markets: Readable<Market[]> = readable(allMarkets());
export const briefing: Writable<Omit<Strategy, 'deployment'>> = writable(briefingForFormula());
export const marketData = derived(
  briefing,
  ($briefing, set) => {
    Meteor.callAsync('probabilities.checkForMarket', {marketName: $briefing.marketName})
      .then((result) => {
        console.log('result check in derived marketData ', result);
        set(result);
      })
      .catch((error) => console.log('error in check for market - in stores', error));
  },
  false
);
export const deployment: Writable<Strategy['deployment']> = writable(touchPointsForFormula());
export const strategy = derived([briefing, deployment], ([$briefing, $deployment]) => {
  return {...$briefing, deployment: $deployment};
});

export const sortedByName: Writable<SortedByName> = writable(true, () => {
  () => {
    console.log('sortedByName closed');
  };
});

// results
export const respondentsCount = derived([briefing, marketData], ([$briefing, $marketData], set) => {
  if ($marketData && $briefing.useMarketData) {
    Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: $briefing.marketName})
      .then((result: number) => {
        if (result > 0) {
          set(result);
        }
      })
      .catch((error) => console.log('error in count', error));
  }
});

export const peopleInRange: Writable<number> = writable(0, () => {
  () => {
    console.log('peopleInRange closed');
  };
});

export const population: Writable<number> = writable(0, () => {
  () => {
    console.log('population closed');
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

export const results = derived([marketData, briefing, deployment], ([$marketData, $briefing, $deployment]) => {
  console.log('produce results');
  if ($marketData && $briefing.useMarketData) {
    return [0, 0];
  } else {
    return reachTool.calculateResults($deployment);
  }
});

export const totalReach = derived(results, ($results) => $results[0]);

export const overlap = derived(results, ($results) => $results[1]);

export function touchPointsForFormula(): DeployedTouchPoint[] {
  return touchPointsDefinitions().map((touchPointDefinition) => {
    return {
      ...touchPointDefinition,
      value: 0.0,
      show: true,
      inputType: 'reach'
    };
  });
}

export function touchPointsForData(): DeployedTouchPoint[] {
  return touchPointsDefinitions().map((touchPointDefinition) => {
    return {
      ...touchPointDefinition,
      value: 0.0,
      show: true,
      inputType: reachTool.setDefaultInputType(touchPointDefinition.name, touchPointsPerInputType())
    };
  });
}

export function briefingForFormula(): Omit<Strategy, 'deployment'> {
  return {
    marketName: 'nl',
    useMarketData: undefined,
    userId: '',
    title: 'New Strategy',
    createdAt: new Date(),
    lastChanged: new Date(),
    genders: undefined,
    ageGroupIndexStart: undefined,
    ageGroupIndexEnd: undefined,
    companyId: undefined,
    brandName: undefined,
    productName: undefined
  };
}

export function briefingForData(): Omit<Strategy, 'deployment'> {
  return {
    marketName: 'nl',
    useMarketData: false,
    userId: '',
    title: 'New Strategy',
    createdAt: new Date(),
    lastChanged: new Date(),
    genders: new Set(['f', 'm', 'x']),
    ageGroupIndexStart: 0,
    ageGroupIndexEnd: 0,
    companyId: undefined,
    brandName: undefined,
    productName: undefined
  };
}

export function touchPointsDefinitions(): TouchPointDefinition[] {
  return [
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
  ];
}

export function touchPointsPerInputType(): Map<string, Set<string>> {
  const contacts = new Set([
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
  ]);
  const grps = new Set(['asset', 'cinema', 'outdoor', 'pr', 'promotion', 'television', 'radio', 'sponsorship']);
  const impressions = new Set([
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
  ]);
  const reach = new Set([]);
  return new Map([
    ['contacts', contacts],
    ['grps', grps],
    ['impressions', impressions],
    ['reach', reach]
  ]);
}

export function allMarkets(): Market[] {
  return [
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
  ];
}
