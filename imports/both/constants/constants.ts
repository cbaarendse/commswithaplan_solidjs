// packages
import {DateTime} from 'luxon';
import {InputType, Market, TouchPointDefinition, Translation} from '../typings/types';

// Consts

export const MARKETNAMES = ['be', 'nl', 'uk'];
// TODO: rename to subscriptions or tiers
export const PLANS = ['oneByOne', 'oneForMore', 'oneForAll'];

export const TOUCHPOINTSNAMES = [
  'advocacy',
  'ambassador',
  'app',
  'asset',
  'cinema',
  'console_game',
  'direct_mail',
  'display',
  'door_drop',
  'internal_employee',
  'event',
  'experiential',
  'e_mail',
  'loyalty_crm',
  'magazines',
  'mobile',
  'newspapers',
  'outdoor',
  'packaging',
  'pr',
  'promotion',
  'shopper',
  'radio',
  'sem',
  'seo',
  'social',
  'sponsorship',
  'trade_fair',
  'television',
  'video_on_demand',
  'viral',
  'website',
  'word_of_mouth'
];

export const YEARS = [
  DateTime.now().minus({years: 2}).toFormat('YYYY'),
  DateTime.now().minus({years: 1}).toFormat('YYYY'),
  DateTime.now().toFormat('YYYY'),
  DateTime.now().plus({years: 1}).toFormat('YYYY'),
  DateTime.now().plus({years: 2}).toFormat('YYYY')
];
export const QUARTERS = [1, 2, 3, 4].map(() => {
  return {
    name: DateTime.now().quarter,
    selected: false
  };
});
export const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
  return {
    name: DateTime.now().monthLong,
    selected: false
  };
});

export const AGE_MIN = 12;
export const AGE_MAX = 99;
export const MIN_AGE_RANGE = 5;

export const CURRENCIES: string[] = ['EUR', 'GBP', 'USD'];
export const LANGUAGES: string[] = ['nl-NL', 'en-GB', 'nl_BE', 'fr_BE', 'de_DE', 'fr_FR', 'es_ES', 'ms', 'zh_CN'];
export const CAMPAIGN_DATATYPES: string[] = ['dates', 'title', 'input', 'reach', 'costs'];

export const COMPANY_OWNER_ROLES: string[] = ['owner', 'companyAdmin'];
export const COMPANY_CONTRIBUTOR_ROLES: string[] = ['dates', 'input', 'costs', 'invited'];
export const COMPANY_EMPLOYEE_ROLES: string[] = ['employee'];
export const COMPANY_ALL_ROLES: string[] = [
  ...COMPANY_CONTRIBUTOR_ROLES,
  ...COMPANY_OWNER_ROLES,
  ...COMPANY_EMPLOYEE_ROLES,
  ...TOUCHPOINTSNAMES
];

export function allInputTypes(): Translation[] {
  return [
    {
      name: 'contacts',
      definitions: [
        {language: 'en-GB', displayName: 'contacts'},
        {language: 'nl-NL', displayName: 'contacten'}
      ]
    },
    {
      name: 'grps',
      definitions: [
        {language: 'en-GB', displayName: 'GRPs'},
        {language: 'nl-NL', displayName: 'GRPs'}
      ]
    },
    {
      name: 'impressions',
      definitions: [
        {language: 'en-GB', displayName: 'impressions'},
        {language: 'nl-NL', displayName: 'impressies'}
      ]
    },
    {
      name: 'reach',
      definitions: [
        {language: 'en-GB', displayName: 'reach'},
        {language: 'nl-NL', displayName: 'bereik'}
      ]
    }
  ];
}

export function touchPointsDefinitions(): TouchPointDefinition[] {
  return [
    {
      name: 'advocacy',
      defaultInputTypeIndex: InputType.Impressions,

      definitions: [
        {
          language: 'en-GB',
          displayName: 'Advocacy',
          description: 'Consumers spread information about your brand.'
        },
        {
          language: 'nl-NL',
          displayName: 'Advocacy',
          description: 'Consumenten verspreiden informatie over je merk.'
        }
      ]
    },
    {
      name: 'ambassador',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Ambassador',
          description: 'A (known) person acts as spokesperson for your brand.'
        },
        {
          language: 'nl-NL',
          displayName: 'Ambassador',
          description: 'Een (bekend) persoon treedt op als woordvoerder voor je merk.'
        }
      ]
    },
    {
      name: 'app',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'App',
          description: 'A branded software program that can be used on smartphones.'
        },
        {
          language: 'nl-NL',
          displayName: 'App',
          description: 'Een branded software programma dat werkt op smartphones.'
        }
      ]
    },
    {
      name: 'asset',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Asset',
          description: 'A proprietary tool or platform that a brand owns and that can be used to further build it.'
        },
        {
          language: 'nl-NL',
          displayName: 'Asset',
          description:
            'Een hulpmiddel of programma dat eigendom is van een merk en dat gebruikt kan worden om het verder te bouwen.'
        }
      ]
    },
    {
      name: 'cinema',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Cinema',
          description: 'Screen advertising in cinemas.'
        },
        {
          language: 'nl-NL',
          displayName: 'Cinema',
          description: 'Adverteren op het doek in bioscopen.'
        }
      ]
    },
    {
      name: 'console_game',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Console / Game',
          description: 'Advertising in a game (online, console, PC) or on a console.'
        },
        {
          language: 'nl-NL',
          displayName: 'Console / Game',
          description: 'Adverteren in een game (online, console, PC) of via een console.'
        }
      ]
    },
    {
      name: 'direct_mail',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Direct Mail',
          description: 'Physical mail, delivered to mail boxes, targeted and untargeted.'
        },
        {
          language: 'nl-NL',
          displayName: 'Direct Mail',
          description: 'Fysieke post, geleverd in de brievenbus, gericht of ongericht.'
        }
      ]
    },
    {
      name: 'display',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Display',
          description: 'Advertising on websites, through all possible formats.'
        },
        {
          language: 'nl-NL',
          displayName: 'Display',
          description: 'Adverteren op websites, in alle mogelijke vormen.'
        }
      ]
    },
    {
      name: 'door_drop',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Door Drop',
          description: 'Unadressed mailings and leaflets'
        },
        {
          language: 'nl-NL',
          displayName: 'Folder',
          description: 'Ongeadresseerde mailings en folders.'
        }
      ]
    },
    {
      name: 'e_mail',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'E-Mail',
          description: 'Electronic mail, delivered to the inbox, targeted and untargeted.'
        },
        {
          language: 'nl-NL',
          displayName: 'E-Mail',
          description: 'Electronische mail, geleverd in de inbox, gericht of ongericht.'
        }
      ]
    },
    {
      name: 'event',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Event',
          description: 'A branded gathering of people at an arranged place and time.'
        },
        {
          language: 'nl-NL',
          displayName: 'Event',
          description: 'Een branded samenkomst van mensen op een afgesproken plaats en tijd.'
        }
      ]
    },
    {
      name: 'experiential',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Experiential',
          description: 'Engaging consumers in an experience that involves the product and/or brand values.'
        },
        {
          language: 'nl-NL',
          displayName: 'Experiential',
          description: 'Betrekken van consumenten in een ervaring die het product en/of merkwaarden bevat.'
        }
      ]
    },
    {
      name: 'internal_employee',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Internal / Employee',
          description: 'Personnel spreads information about your brand.'
        },
        {
          language: 'nl-NL',
          displayName: 'Internal / Employee',
          description:
            'Het merk verspreidt informatie naar personeelsleden. Zij delen deze informatie eventueel verder.'
        }
      ]
    },
    {
      name: 'loyalty_crm',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Loyalty / CRM',
          description: 'IT supported relationship with consumers.'
        },
        {
          language: 'nl-NL',
          displayName: 'Loyalty / CRM',
          description: 'IT ondersteunde relatie met consumenten.'
        }
      ]
    },
    {
      name: 'magazines',
      defaultInputTypeIndex: InputType.Reach,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Magazines',
          description: 'Advertising in magazines.'
        },
        {
          language: 'nl-NL',
          displayName: 'Magazines',
          description: 'Adverteren in magazines.'
        }
      ]
    },
    {
      name: 'mobile',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Mobile',
          description: 'Branded messaging on mobile phones.'
        },
        {
          language: 'nl-NL',
          displayName: 'Mobiel',
          description: 'Branded boodschappen verspreiden door middel van mobiele telefoons.'
        }
      ]
    },
    {
      name: 'newspapers',
      defaultInputTypeIndex: InputType.Reach,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Newspapers',
          description: 'Advertising in newspapers.'
        },
        {
          language: 'nl-NL',
          displayName: 'Dagbladen',
          description: 'Adverteren in kranten.'
        }
      ]
    },
    {
      name: 'outdoor',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Outdoor',
          description: 'Advertising at physical places that are outside the consumers’ home.'
        },
        {
          language: 'nl-NL',
          displayName: 'Buitenreclame',
          description: 'Adverteren op fysieke punten waarmee de consument alleen buitenshuis in aanraking kan komen.'
        }
      ]
    },
    {
      name: 'packaging',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Packaging',
          description: 'Messaging on a product’s package.'
        },
        {
          language: 'nl-NL',
          displayName: 'Verpakking',
          description: 'Boodschappen op de verpakking van het product.'
        }
      ]
    },
    {
      name: 'pr',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'PR',
          description: 'Communication that focuses on a mutual benefit for brand and consumers.'
        },
        {
          language: 'nl-NL',
          displayName: 'PR',
          description: 'Communicatie die zich concentreert op het wederzijds belang voor merk en consumenten.'
        }
      ]
    },
    {
      name: 'promotion',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Promotion',
          description: 'Communication that focuses on a temporary change in price / value ratio.'
        },
        {
          language: 'nl-NL',
          displayName: 'Promotie',
          description:
            'Communicatie die zich concentreert op een tijdelijke verandering in de prijs / waarde verhouding.'
        }
      ]
    },
    {
      name: 'radio',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Radio',
          description: 'Advertising on radio stations, in commercial airtime and in-program.'
        },
        {
          language: 'nl-NL',
          displayName: 'Radio',
          description: 'Adverteren in zendtijd van radiostations, reclamezendtijd en in-program.'
        }
      ]
    },
    {
      name: 'sem',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'SEM',
          description: 'Search engine marketing - Paid optimization and advertising on search engine results pages.'
        },
        {
          language: 'nl-NL',
          displayName: 'SEM',
          description:
            'Search engine marketing - Betaalde optimalisatie en advertenties op resultaatpagina’s van zoekmachines.'
        }
      ]
    },
    {
      name: 'seo',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'SEO',
          description: 'Search engine optimization - Free optimization on search engine results pages.'
        },
        {
          language: 'nl-NL',
          displayName: 'SEO',
          description: 'Search engine optimization -  Gratis optimalisatie op resultaatpagina’s van zoekmachines.'
        }
      ]
    },
    {
      name: 'shopper',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Shopper',
          description: 'Communication in retail channels.'
        },
        {
          language: 'nl-NL',
          displayName: 'Shopper',
          description: 'Communicatie in retail-kanalen.'
        }
      ]
    },
    {
      name: 'social',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Social',
          description: 'Branded appearance on social networks, paid and unpaid.'
        },
        {
          language: 'nl-NL',
          displayName: 'Social',
          description: 'Branded vertoning op sociale netwerken, betaald en onbetaald.'
        }
      ]
    },
    {
      name: 'sponsorship',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Sponsorship',
          description: 'A branding opportunity in exchange for financial support of a person, activity or organization.'
        },
        {
          language: 'nl-NL',
          displayName: 'Sponsorship',
          description:
            'De mogelijkheid om je merk te tonen in ruil voor financiële steun van een persoon, activiteit of organisatie.'
        }
      ]
    },
    {
      name: 'television',
      defaultInputTypeIndex: InputType.Grps,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Television',
          description: 'Advertising on television, in commercial airtime and in-program.'
        },
        {
          language: 'nl-NL',
          displayName: 'Televisie',
          description: 'Adverteren in zendtijd van een televisiestation, reclamezendtijd en in-program.'
        }
      ]
    },
    {
      name: 'trade_fair',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Trade Fair',
          description: 'Appearing at an exhibition for a specific industry or purpose.'
        },
        {
          language: 'nl-NL',
          displayName: 'Trade Fair',
          description: 'Vertonen van een merk op een beurs voor een specifieke industrie of doel.'
        }
      ]
    },
    {
      name: 'video_on_demand',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Video On Demand',
          description: 'Advertising in an environment that provides audio visual content to users at request.'
        },
        {
          language: 'nl-NL',
          displayName: 'Video On Demand',
          description: 'Adverteren in een omgeving die op verzoek audiovisuele content biedt aan gebruikers.'
        }
      ]
    },
    {
      name: 'viral',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Viral',
          description: 'Communication in a way that optimizes the probability that people will forward your message.'
        },
        {
          language: 'nl-NL',
          displayName: 'Viral',
          description:
            'Communicatie op een manier die de kans maximaliseert dat mensen je boodschap zullen doorsturen aan andere mensen. '
        }
      ]
    },
    {
      name: 'website',
      defaultInputTypeIndex: InputType.Impressions,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Website',
          description: 'Electronic information, that is stored on a server and is accessible through a browser.'
        },
        {
          language: 'nl-NL',
          displayName: 'Website',
          description:
            'Elektronische informatie, die opgeslagen is op een server en toegankelijk door middel van een browser.'
        }
      ]
    },
    {
      name: 'word_of_mouth',
      defaultInputTypeIndex: InputType.Contacts,
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Word Of Mouth',
          description: 'People pass opinions on a brand to other people.'
        },
        {
          language: 'nl-NL',
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
        {language: 'en-GB', displayName: 'Belgium'},
        {language: 'nl-NL', displayName: 'België'}
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
        {language: 'en-GB', displayName: 'The Netherlands'},
        {language: 'nl-NL', displayName: 'Nederland'}
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
        {language: 'en-GB', displayName: 'United Kingdom'},
        {language: 'nl-NL', displayName: 'Verenigd Koninkrijk'}
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
