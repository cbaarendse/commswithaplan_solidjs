// Reach
// imports
import {
  TouchPointDefinition,
  DeployedTouchPoint,
  Market,
  Language,
  Results,
  InputType,
  Translation,
  Strategy
} from '../../both/typings/types';

// main function (IIFE closure)
export default function createReachTool() {
  function areAllTouchPointsValueZero(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.value === 0);
  }

  function isShowAll(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.show === true);
  }

  // sort
  function sortByName(touchPoints: DeployedTouchPoint[], language: Language) {
    return touchPoints.sort((a: TouchPointDefinition, b: TouchPointDefinition) => {
      const definitionOfTouchPointA = a.definitions.find((definition) => definition.language == language);
      const definitionOfTouchPointB = b.definitions.find((definition) => definition.language == language);
      if (definitionOfTouchPointA && definitionOfTouchPointB) {
        if (definitionOfTouchPointA.displayName > definitionOfTouchPointB.displayName) {
          return 1;
        }
        if (definitionOfTouchPointA.displayName < definitionOfTouchPointB.displayName) {
          return -1;
        }
      }
      return 0;
    });
  }

  function sortByValue(touchPoints: DeployedTouchPoint[]) {
    return touchPoints.sort((a: DeployedTouchPoint, b: DeployedTouchPoint) => b.value - a.value);
  }

  function sort(
    touchPoints: DeployedTouchPoint[],
    sortedByName: boolean,
    language: Language
  ): [DeployedTouchPoint[], boolean] {
    sortedByName ? sortByValue(touchPoints) : sortByName(touchPoints, language);
    sortedByName = isShowAll(touchPoints) && areAllTouchPointsValueZero(touchPoints) ? true : !sortedByName;
    return [touchPoints, sortedByName];
  }

  // hide - show
  function hide(touchPoints: DeployedTouchPoint[]): DeployedTouchPoint[] {
    if (isShowAll(touchPoints) && !areAllTouchPointsValueZero(touchPoints)) {
      return touchPoints.map((touchPoint: DeployedTouchPoint) => {
        touchPoint.value === 0 ? (touchPoint.show = false) : (touchPoint.show = true);
        return touchPoint;
      });
    } else if (!isShowAll(touchPoints) || areAllTouchPointsValueZero(touchPoints)) {
      return touchPoints.map((touchPoint: DeployedTouchPoint) => {
        touchPoint.show = true;
        return touchPoint;
      });
    }
    return touchPoints;
  }

  // results
  function calculateTotalReach(touchPoints: DeployedTouchPoint[]): number {
    let totalReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
      const r = touchPoint.value / 100;
      totalReachPortion = totalReachPortion + (1 - totalReachPortion) * r;
    }
    return 100 * totalReachPortion;
  }

  function calculateOverlap(touchPoints: DeployedTouchPoint[]): number {
    let duplicateReachPortion = 0.0;
    for (const touchPoint of touchPoints) {
      if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
        const r = touchPoint.value / 100;
        duplicateReachPortion *= r;
      }
      if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
        duplicateReachPortion = touchPoint.value / 100;
      }
    }
    return 100 * duplicateReachPortion;
  }
  function calculateResults(touchPoints: DeployedTouchPoint[]): Results {
    const totalReach = calculateTotalReach(touchPoints);
    const overlap = calculateOverlap(touchPoints);
    return [totalReach, overlap];
  }

  function getAgeGroupsForMarket(marketName: Market['name'], markets: Market[]) {
    return markets.filter((item: Market) => item.name == marketName)[0].ageGroups;
  }

  function touchPointsForDeployment(touchPointsDefinitions: TouchPointDefinition[]): DeployedTouchPoint[] {
    console.log('touchPointsForFormula called');
    const touchPointsForDeployment: DeployedTouchPoint[] = [];
    for (let index = 0; index < touchPointsDefinitions.length; index++) {
      const touchPointDefinition = touchPointsDefinitions[index];
      const touchPointForDeployment: DeployedTouchPoint = {
        name: touchPointDefinition.name,
        definitions: touchPointDefinition.definitions,
        defaultInputTypeIndex: touchPointDefinition.defaultInputTypeIndex,
        value: 0.0,
        show: true,
        inputTypeIndex: InputType.Reach
      };
      touchPointsForDeployment.push(touchPointForDeployment);
    }
    console.log('deployedTouchPoints constructed for formula: ', touchPointsForDeployment);
    return touchPointsForDeployment;
  }

  function makeNewBriefing(marketName: Strategy['marketName']): Omit<Strategy, 'deployment'> {
    return {
      marketName: marketName,
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

  function allInputTypes(): Translation[] {
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

  function touchPointsDefinitions(): TouchPointDefinition[] {
    return [
      {
        name: 'advocacy',
        defaultInputTypeIndex: InputType.Impressions,

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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Grps,
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
        defaultInputTypeIndex: InputType.Grps,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Reach,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Reach,
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
        defaultInputTypeIndex: InputType.Grps,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Grps,
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
        defaultInputTypeIndex: InputType.Grps,
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
        defaultInputTypeIndex: InputType.Grps,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Grps,
        definitions: [
          {
            language: 'en_GB',
            displayName: 'Sponsorship',
            description:
              'A branding opportunity in exchange for financial support of a person, activity or organization.'
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
        defaultInputTypeIndex: InputType.Grps,
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
        defaultInputTypeIndex: InputType.Contacts,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Impressions,
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
        defaultInputTypeIndex: InputType.Contacts,
        definitions: [
          {
            language: 'en_GB',
            displayName: 'Word Of Mouth',
            description: 'People pass opinions on a brand to other people.'
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

  function allMarkets(): Market[] {
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

  return {
    allInputTypes,
    allMarkets,
    areAllTouchPointsValueZero,
    calculateResults,
    getAgeGroupsForMarket,
    hide,
    isShowAll,
    makeNewBriefing,
    sort,
    touchPointsDefinitions,
    touchPointsForDeployment
  };
}
