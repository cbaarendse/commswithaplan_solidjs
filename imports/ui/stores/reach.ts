// imports
import {writable, Writable, readable, Readable, derived} from 'svelte/store';
import {Meteor} from 'meteor/meteor';
import {
  Market,
  Strategy,
  TouchPointDefinition,
  DeployedTouchPoint,
  SortedByName,
  Translation,
  PopulationInRange,
  Results,
  RespondentsCount,
  InputType,
  TouchPointName,
  Probability
} from '../../both/typings/types';
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
export const ageGroups = derived(briefing, ($briefing) => {
  return reachTool.getAgeGroupsForMarket($briefing.marketName, allMarkets());
});
export const inputTypes: Readable<Translation[]> = readable(allInputTypes());
export const strategy = derived([briefing, deployment], ([$briefing, $deployment]) => {
  return {...$briefing, deployment: $deployment};
});

export const sortedByName: Writable<SortedByName> = writable(true, () => {
  () => {
    console.log('sortedByName closed');
  };
});

// results
export const respondentsCountForMarket: Readable<RespondentsCount> = derived(
  [briefing, marketData],
  ([$briefing, $marketData], set) => {
    if ($marketData && $briefing.useMarketData) {
      console.log('respondentsCountForMarket client, args sent: ', $briefing.marketName);

      Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: $briefing.marketName})
        .then((result: number) => {
          if (result >= 0) {
            set(result);
          }
        })
        .catch((error) => console.log('error in respondents for market', error));
    }
  }
);

export const populationInRange: Readable<PopulationInRange> = derived(
  [marketData, briefing, ageGroups],
  ([$marketData, $briefing, $ageGroups], set) => {
    if ($marketData && $briefing.useMarketData) {
      console.log('briefing ', $briefing, ' and ageGroups ', $ageGroups, 'in populationInRange');

      Meteor.callAsync('populations.countPopulationInRange', {
        briefing: $briefing,
        ageGroups: $ageGroups
      })
        .then((result: PopulationInRange) => {
          if (result >= 0) {
            set(result);
          }
        })
        .catch((error) => console.log('error in populationInRange ', error));
    }
  }
);

export const population: Readable<number> = derived([marketData, briefing], ([$marketData, $briefing], set) => {
  if ($marketData && $briefing.useMarketData) {
    console.log('briefing ', $briefing, 'in populationInRange');

    Meteor.callAsync('populations.countPopulationForMarket', {
      marketName: $briefing.marketName
    })
      .then((result: PopulationInRange) => {
        if (result >= 0) {
          set(result);
        }
      })
      .catch((error) => console.log('error in population ', error));
  }
});

export const results: Readable<Results> = derived(
  [marketData, briefing, deployment, populationInRange],
  ([$marketData, $briefing, $deployment, $populationInRange], set) => {
    console.log('produce results');
    if ($marketData && $briefing.useMarketData) {
      Meteor.callAsync('strategies.calculateResultsWithData', {
        briefing: $briefing,
        deployment: $deployment,
        populationInRange: $populationInRange
      })
        .then((result) => {
          set(result);
        })
        .catch((error) => console.log('error in calculate results with data', error));
    } else {
      set(reachTool.calculateResults($deployment));
    }
  }
);

export const totalReach = derived(results, ($results) => {
  if (!$results) {
    return 0;
  }
  return $results[0];
});

export const overlap = derived(results, ($results) => {
  if (!$results) {
    return 0;
  }
  return $results[1];
});

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
export const maxValues: Readable<Map<TouchPointName, number>> = derived(
  [briefing, deployment, populationInRange],
  ([$briefing, $deployment, $populationInRange], set) => {
    Meteor.callAsync('strategies.maxValuesForTouchPoints', {
      briefing: $briefing,
      deployment: $deployment,
      populationInRange: $populationInRange
    })
      .then((result) => {
        if (result) {
          set(result);
        }
      })
      .catch((error) => console.log('error in max value fr touch point', error));
  }
);

export function touchPointsForData(): DeployedTouchPoint[] {
  return touchPointsDefinitions().map(function (touchPointDefinition) {
    return {
      ...touchPointDefinition,
      value: 0.0,
      show: true,
      inputType: touchPointDefinition.defaultInputType
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

export function briefingForData(): Omit<Required<Strategy>, 'deployment'> {
  return {
    marketName: 'nl',
    useMarketData: false,
    userId: '',
    title: 'New Strategy',
    createdAt: new Date(),
    lastChanged: new Date(),
    genders: ['f', 'm', 'x'],
    ageGroupIndexStart: 0,
    ageGroupIndexEnd: 0,
    companyId: '',
    brandName: '',
    productName: ''
  };
}

export function allInputTypes(): Translation[] {
  return [
    {
      name: 'contacts',
      definitions: [
        {language: 'en_GB', displayName: 'contacts'},
        {language: 'nl_NL', displayName: 'contacten'}
      ]
    },
    {
      name: 'grps',
      definitions: [
        {language: 'en_GB', displayName: 'GRPs'},
        {language: 'nl_NL', displayName: 'GRPs'}
      ]
    },
    {
      name: 'impressions',
      definitions: [
        {language: 'en_GB', displayName: 'impressions'},
        {language: 'nl_NL', displayName: 'impressies'}
      ]
    },
    {
      name: 'reach',
      definitions: [
        {language: 'en_GB', displayName: 'reach'},
        {language: 'nl_NL', displayName: 'bereik'}
      ]
    }
  ];
}

export function touchPointsDefinitions(): TouchPointDefinition[] {
  return [
    {
      name: 'advocacy',
      defaultInputType: 'impressions',

      definitions: [
        {
          language: 'en_GB',
          displayName: 'Advocacy',
          description: 'Consumers spread information about your brand.'
        },
        {
          language: 'nl_NL',
          displayName: 'Advocacy',
          description: 'Consumenten verspreiden informatie over je merk.'
        }
      ]
    },
    {
      name: 'ambassador',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Ambassador',
          description: 'A (known) person acts as spokesperson for your brand.'
        },
        {
          language: 'nl_NL',
          displayName: 'Ambassador',
          description: 'Een (bekend) persoon treedt op als woordvoerder voor je merk.'
        }
      ]
    },
    {
      name: 'app',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'App',
          description: 'A branded software program that can be used on smartphones.'
        },
        {
          language: 'nl_NL',
          displayName: 'App',
          description: 'Een branded software programma dat werkt op smartphones.'
        }
      ]
    },
    {
      name: 'asset',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Asset',
          description: 'A proprietary tool or platform that a brand owns and that can be used to further build it.'
        },
        {
          language: 'nl_NL',
          displayName: 'Asset',
          description:
            'Een hulpmiddel of programma dat eigendom is van een merk en dat gebruikt kan worden om het verder te bouwen.'
        }
      ]
    },
    {
      name: 'cinema',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Cinema',
          description: 'Screen advertising in cinemas.'
        },
        {
          language: 'nl_NL',
          displayName: 'Cinema',
          description: 'Adverteren op het doek in bioscopen.'
        }
      ]
    },
    {
      name: 'console_game',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Console / Game',
          description: 'Advertising in a game (online, console, PC) or on a console.'
        },
        {
          language: 'nl_NL',
          displayName: 'Console / Game',
          description: 'Adverteren in een game (online, console, PC) of via een console.'
        }
      ]
    },
    {
      name: 'direct_mail',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Direct Mail',
          description: 'Physical mail, delivered to mail boxes, targeted and untargeted.'
        },
        {
          language: 'nl_NL',
          displayName: 'Direct Mail',
          description: 'Fysieke post, geleverd in de brievenbus, gericht of ongericht.'
        }
      ]
    },
    {
      name: 'display',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Display',
          description: 'Advertising on websites, through all possible formats.'
        },
        {
          language: 'nl_NL',
          displayName: 'Display',
          description: 'Adverteren op websites, in alle mogelijke vormen.'
        }
      ]
    },
    {
      name: 'door_drop',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Door Drop',
          description: 'Unadressed mailings and leaflets'
        },
        {
          language: 'nl_NL',
          displayName: 'Folder',
          description: 'Ongeadresseerde mailings en folders.'
        }
      ]
    },
    {
      name: 'e_mail',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'E-Mail',
          description: 'Electronic mail, delivered to the inbox, targeted and untargeted.'
        },
        {
          language: 'nl_NL',
          displayName: 'E-Mail',
          description: 'Electronische mail, geleverd in de inbox, gericht of ongericht.'
        }
      ]
    },
    {
      name: 'event',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Event',
          description: 'A branded gathering of people at an arranged place and time.'
        },
        {
          language: 'nl_NL',
          displayName: 'Event',
          description: 'Een branded samenkomst van mensen op een afgesproken plaats en tijd.'
        }
      ]
    },
    {
      name: 'experiential',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Experiential',
          description: 'Engaging consumers in an experience that involves the product and/or brand values.'
        },
        {
          language: 'nl_NL',
          displayName: 'Experiential',
          description: 'Betrekken van consumenten in een ervaring die het product en/of merkwaarden bevat.'
        }
      ]
    },
    {
      name: 'internal_employee',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Internal / Employee',
          description: 'Personnel spreads information about your brand.'
        },
        {
          language: 'nl_NL',
          displayName: 'Internal / Employee',
          description:
            'Het merk verspreidt informatie naar personeelsleden. Zij delen deze informatie eventueel verder.'
        }
      ]
    },
    {
      name: 'loyalty_crm',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Loyalty / CRM',
          description: 'IT supported relationship with consumers.'
        },
        {
          language: 'nl_NL',
          displayName: 'Loyalty / CRM',
          description: 'IT ondersteunde relatie met consumenten.'
        }
      ]
    },
    {
      name: 'magazines',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Magazines',
          description: 'Advertising in magazines.'
        },
        {
          language: 'nl_NL',
          displayName: 'Magazines',
          description: 'Adverteren in magazines.'
        }
      ]
    },
    {
      name: 'mobile',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Mobile',
          description: 'Branded messaging on mobile phones.'
        },
        {
          language: 'nl_NL',
          displayName: 'Mobiel',
          description: 'Branded boodschappen verspreiden door middel van mobiele telefoons.'
        }
      ]
    },
    {
      name: 'newspapers',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Newspapers',
          description: 'Advertising in newspapers.'
        },
        {
          language: 'nl_NL',
          displayName: 'Dagbladen',
          description: 'Adverteren in kranten.'
        }
      ]
    },
    {
      name: 'outdoor',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Outdoor',
          description: 'Advertising at physical places that are outside the consumers’ home.'
        },
        {
          language: 'nl_NL',
          displayName: 'Buitenreclame',
          description: 'Adverteren op fysieke punten waarmee de consument alleen buitenshuis in aanraking kan komen.'
        }
      ]
    },
    {
      name: 'packaging',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Packaging',
          description: 'Messaging on a product’s package.'
        },
        {
          language: 'nl_NL',
          displayName: 'Verpakking',
          description: 'Boodschappen op de verpakking van het product.'
        }
      ]
    },
    {
      name: 'pr',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'PR',
          description: 'Communication that focuses on a mutual benefit for brand and consumers.'
        },
        {
          language: 'nl_NL',
          displayName: 'PR',
          description: 'Communicatie die zich concentreert op het wederzijds belang voor merk en consumenten.'
        }
      ]
    },
    {
      name: 'promotion',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Promotion',
          description: 'Communication that focuses on a temporary change in price / value ratio.'
        },
        {
          language: 'nl_NL',
          displayName: 'Promotie',
          description:
            'Communicatie die zich concentreert op een tijdelijke verandering in de prijs / waarde verhouding.'
        }
      ]
    },
    {
      name: 'radio',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Radio',
          description: 'Advertising on radio stations, in commercial airtime and in-program.'
        },
        {
          language: 'nl_NL',
          displayName: 'Radio',
          description: 'Adverteren in zendtijd van radiostations, reclamezendtijd en in-program.'
        }
      ]
    },
    {
      name: 'sem',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'SEM',
          description: 'Search engine marketing - Paid optimization and advertising on search engine results pages.'
        },
        {
          language: 'nl_NL',
          displayName: 'SEM',
          description:
            'Search engine marketing - Betaalde optimalisatie en advertenties op resultaatpagina’s van zoekmachines.'
        }
      ]
    },
    {
      name: 'seo',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'SEO',
          description: 'Search engine optimization - Free optimization on search engine results pages.'
        },
        {
          language: 'nl_NL',
          displayName: 'SEO',
          description: 'Search engine optimization -  Gratis optimalisatie op resultaatpagina’s van zoekmachines.'
        }
      ]
    },
    {
      name: 'shopper',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Shopper',
          description: 'Communication in retail channels.'
        },
        {
          language: 'nl_NL',
          displayName: 'Shopper',
          description: 'Communicatie in retail-kanalen.'
        }
      ]
    },
    {
      name: 'social',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Social',
          description: 'Branded appearance on social networks, paid and unpaid.'
        },
        {
          language: 'nl_NL',
          displayName: 'Social',
          description: 'Branded vertoning op sociale netwerken, betaald en onbetaald.'
        }
      ]
    },
    {
      name: 'sponsorship',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Sponsorship',
          description: 'A branding opportunity in exchange for financial support of a person, activity or organization.'
        },
        {
          language: 'nl_NL',
          displayName: 'Sponsorship',
          description:
            'De mogelijkheid om je merk te tonen in ruil voor financiële steun van een persoon, activiteit of organisatie.'
        }
      ]
    },
    {
      name: 'television',
      defaultInputType: 'grps',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Television',
          description: 'Advertising on television, in commercial airtime and in-program.'
        },
        {
          language: 'nl_NL',
          displayName: 'Televisie',
          description: 'Adverteren in zendtijd van een televisiestation, reclamezendtijd en in-program.'
        }
      ]
    },
    {
      name: 'trade_fair',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Trade Fair',
          description: 'Appearing at an exhibition for a specific industry or purpose.'
        },
        {
          language: 'nl_NL',
          displayName: 'Trade Fair',
          description: 'Vertonen van een merk op een beurs voor een specifieke industrie of doel.'
        }
      ]
    },
    {
      name: 'video_on_demand',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Video On Demand',
          description: 'Advertising in an environment that provides audio visual content to users at request.'
        },
        {
          language: 'nl_NL',
          displayName: 'Video On Demand',
          description: 'Adverteren in een omgeving die op verzoek audiovisuele content biedt aan gebruikers.'
        }
      ]
    },
    {
      name: 'viral',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Viral',
          description: 'Communication in a way that optimizes the probability that people will forward your message.'
        },
        {
          language: 'nl_NL',
          displayName: 'Viral',
          description:
            'Communicatie op een manier die de kans maximaliseert dat mensen je boodschap zullen doorsturen aan andere mensen. '
        }
      ]
    },
    {
      name: 'website',
      defaultInputType: 'impressions',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Website',
          description: 'Electronic information, that is stored on a server and is accessible through a browser.'
        },
        {
          language: 'nl_NL',
          displayName: 'Website',
          description:
            'Elektronische informatie, die opgeslagen is op een server en toegankelijk door middel van een browser.'
        }
      ]
    },
    {
      name: 'word_of_mouth',
      defaultInputType: 'contacts',
      definitions: [
        {
          language: 'en_GB',
          displayName: 'Word Of Mouth',
          description: 'Population pass opinions on a brand to other people.'
        },
        {
          language: 'nl_NL',
          displayName: 'Word Of Mouth',
          description: 'Mensen geven meningen door over je merk aan andere mensen.'
        }
      ]
    }
  ];
}

export function allMarkets(): Market[] {
  return [
    {
      name: 'be',
      flag: '🇧🇪',
      displayNames: [
        {language: 'en_GB', displayName: 'Belgium'},
        {language: 'nl_NL', displayName: 'België'}
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
        {language: 'en_GB', displayName: 'The Netherlands'},
        {language: 'nl_NL', displayName: 'Nederland'}
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
        {language: 'en_GB', displayName: 'United Kingdom'},
        {language: 'nl_NL', displayName: 'Verenigd Koninkrijk'}
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
