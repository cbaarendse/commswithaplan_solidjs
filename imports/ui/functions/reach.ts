// Reach
// imports
import type {
  TouchPointBasics,
  DeployedTouchPoint,
  Strategy,
  Market,
  AgeGroup,
  Genders,
  Language
} from '../typings/types';

// main function (closure)
export default function createReachTool() {
  const markets = setMarkets();
  const genders = setGenders();
  const agesForMarkets = setAgesForMarkets();
  const touchPointsBasics = setTouchPointsBasics();

  const defaultStrategy: Strategy = {
    title: undefined,
    market: undefined,
    marketData: undefined,
    createdAt: new Date(),
    lastChanged: new Date(),
    deployment: deployTouchPoints(),
    sortedByName: true,
    overlap: 0,
    totalReach: 0,
    // Only required when marketData (population & probabilities) true
    userId: undefined,
    genders: undefined,
    ageStart: undefined,
    ageEnd: undefined,
    ageGroupStart: null,
    ageGroupEnd: undefined,
    peopleInAgeRange: undefined,
    respondentsCount: undefined,
    reachedNonUnique: undefined,
    reachedUnique: undefined,
    companyId: undefined,
    brand: undefined,
    product: undefined
  };

  function setNewStrategy(marketName: Market['name'], marketData: boolean) {
    const market = markets.find((item) => item.name == marketName);
    const ageGroupsForMarket = agesForMarkets.find(
      (item: {marketName: Market['name']; groups: AgeGroup[]}) => item.marketName == marketName
    );
    defaultStrategy.title = 'New Strategy';
    defaultStrategy.market = market;
    defaultStrategy.marketData = marketData;
    if (marketData == true) {
      defaultStrategy.ageGroupStart = ageGroupsForMarket?.groups[0];
      defaultStrategy.ageGroupEnd = ageGroupsForMarket?.groups[5];
      defaultStrategy.genders = genders;
    }
    return defaultStrategy;
  }

  function deployTouchPoints(): DeployedTouchPoint[] {
    const deployedTouchPoints: DeployedTouchPoint[] = [];
    touchPointsBasics.forEach(
      (item, index) => (deployedTouchPoints[index] = {name: item.name, basics: item.basics, value: 0.0, show: true})
    );
    return deployedTouchPoints;
  }

  function areAllTouchPointsValueZero(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.value === 0);
  }

  function isShowAll(touchPoints: DeployedTouchPoint[]): boolean {
    return touchPoints.every((touchPoint) => touchPoint.show === true);
  }
  // input

  // reset
  function setAllTouchPointsToZero(touchPoints: DeployedTouchPoint[]): DeployedTouchPoint[] {
    touchPoints.forEach((touchPoint) => (touchPoint.value = 0.0));
    return touchPoints;
  }

  function reset(strategy: Strategy, language: Language): Strategy {
    if (areAllTouchPointsValueZero(strategy.deployment)) {
      strategy.deployment = setAllTouchPointsToZero(strategy.deployment);
    } else {
      strategy = setNewStrategy(strategy.market?.name || 'nl', false);
      strategy.deployment = sortByName(strategy.deployment, language);
      strategy.sortedByName = true;
    }
    const results = [0, 0];
    [strategy.totalReach, strategy.overlap] = results;
    return strategy;
  }

  // sort
  function sortByName(touchPoints: DeployedTouchPoint[], language: Language) {
    return touchPoints.sort((a: TouchPointBasics, b: TouchPointBasics) => {
      const basicsOfTouchPointA = a.basics.find((item) => item.language == language);
      const basicsOfTouchPointB = b.basics.find((item) => item.language == language);
      if (basicsOfTouchPointA && basicsOfTouchPointB) {
        if (basicsOfTouchPointA.displayName > basicsOfTouchPointB.displayName) {
          return 1;
        }
        if (basicsOfTouchPointA.displayName < basicsOfTouchPointB.displayName) {
          return -1;
        }
      }
      return 0;
    });
  }

  function sortByReach(touchPoints: DeployedTouchPoint[]) {
    return touchPoints.sort((a: DeployedTouchPoint, b: DeployedTouchPoint) => b.value - a.value);
  }

  function sort(strategy: Strategy, language: Language): Strategy {
    strategy.deployment = strategy.sortedByName
      ? sortByReach(strategy.deployment)
      : sortByName(strategy.deployment, language);
    strategy.sortedByName =
      isShowAll(strategy.deployment) && areAllTouchPointsValueZero(strategy.deployment) ? true : !strategy.sortedByName;
    return strategy;
  }

  // hide - show
  function hide(deployment: Strategy['deployment']): Strategy['deployment'] {
    if (isShowAll(deployment) && !areAllTouchPointsValueZero(deployment)) {
      deployment.forEach((touchPoint: DeployedTouchPoint) => {
        if (touchPoint.value === 0) {
          touchPoint.show = false;
        }
      });
    } else if (!isShowAll(deployment) || areAllTouchPointsValueZero(deployment)) {
      deployment.forEach((touchPoint: DeployedTouchPoint) => (touchPoint.show = true));
    }
    return deployment;
  }

  // results
  function updateDeployedTouchPoint(
    touchPointName: string,
    value: number,
    touchPoints: DeployedTouchPoint[]
  ): DeployedTouchPoint[] {
    const index: number = touchPoints.findIndex((touchPoint: DeployedTouchPoint): boolean => {
      return touchPoint.name === touchPointName;
    });
    const touchPointToUpdate: DeployedTouchPoint = touchPoints[index];
    touchPointToUpdate.value = value;
    touchPoints.splice(index, 1, touchPointToUpdate);
    return touchPoints;
  }

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
  function calculateResults(touchPoints: DeployedTouchPoint[]): [number, number] {
    const totalReach = calculateTotalReach(touchPoints);
    const overlap = calculateOverlap(touchPoints);
    return [totalReach, overlap];
  }

  // Reach with data
  function setDefaultInputType(touchPointName: string): string {
    if (
      ['asset', 'cinema', 'outdoor', 'pr', 'promotion', 'television', 'radio', 'sponsorship'].indexOf(
        touchPointName
      ) !== -1
    ) {
      return 'contacts'; // This defaultinputtype could be "grps" as well
    }
    if (
      [
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
      ].indexOf(touchPointName) !== -1
    ) {
      return 'impressions';
    }
    if (
      [
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
      ].indexOf(touchPointName) !== -1
    ) {
      return 'contacts';
    }
    return 'contacts';
  }
  function findObjectAndProject(
    input: number | string,
    searchKey: string,
    collection: [],
    projectKey1: string,
    projectKey2: string
  ): number | string {
    const thisObject = collection.find((element) => element[searchKey] === input);
    if (thisObject === undefined) {
      throw new TypeError('No outcome for thisObject with 1 key.');
    }
    if (typeof projectKey2 === 'undefined') {
      return thisObject[projectKey1];
    } else {
      return thisObject[projectKey1][projectKey2];
    }
  }

  function setMarkets(): Market[] {
    return [
      {
        name: 'be',
        flag: '🇧🇪',
        displayNames: [
          {language: 'english', displayName: 'Belgium'},
          {language: 'dutch', displayName: 'België'}
        ]
      },
      {
        name: 'nl',
        flag: '🇳🇱',
        displayNames: [
          {language: 'english', displayName: 'The Netherlands'},
          {language: 'dutch', displayName: 'Nederland'}
        ]
      },
      {
        name: 'uk',
        flag: '🇬🇧',
        displayNames: [
          {language: 'english', displayName: 'United Kingdom'},
          {language: 'dutch', displayName: 'Verenigd Koninkrijk'}
        ]
      }
    ];
  }

  function setGenders(): Genders {
    return {f: false, m: false, x: false};
  }

  function setAgesForMarkets(): {marketName: Market['name']; groups: AgeGroup[]}[] {
    return [
      {
        marketName: 'be',
        groups: [
          [9, 11],
          [12, 19],
          [20, 34],
          [35, 49],
          [50, 64],
          [65, '+']
        ]
      },
      {
        marketName: 'nl',
        groups: [
          [9, 11],
          [12, 19],
          [20, 34],
          [35, 49],
          [50, 64],
          [65, '+']
        ]
      },
      {
        marketName: 'uk',
        groups: [
          [9, 11],
          [12, 19],
          [20, 34],
          [35, 49],
          [50, 64],
          [65, '+']
        ]
      }
    ];
  }
  function setTouchPointsBasics(): TouchPointBasics[] {
    return [
      {
        name: 'advocacy',
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
          {
            language: 'english',
            displayName: 'Sponsorship',
            description:
              'A branding opportunity in exchange for financial support of a person, activity or organization.'
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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
        basics: [
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

  return {
    setMarkets,
    setNewStrategy,
    calculateResults,
    areAllTouchPointsValueZero,
    reset,
    sort,
    hide,
    isShowAll,
    updateDeployedTouchPoint
  };
}
