// imports
import type {Content, Color, Actionable} from '../../both/typings/types';

const consultancyHomeItemsData: (Content & Color & Actionable)[] = [
  {
    name: 'commswithaplan',
    color: 'blue',
    link: '/consultancy/contact',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Comms With A Plan',
        description:
          'Comms With A Plan is a <mark>Media Management consultancy</mark> for advertisers. At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.',
        action: 'Call, contact me ...'
      },
      {
        language: 'nl-NL',
        displayName: 'Comms With A Plan',
        description:
          'Comms With A Plan is een <mark>Media Management consultancy</mark> voor adverteerders. Ik initieer, onderhoud en evalueer je media strategie, ik manage je bureaus en budget.',
        action: 'Bel, neem contact op ...'
      }
    ]
  },
  {
    name: 'consultancy',
    color: 'blue',
    link: '/consultancy/contact',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Consultancy',
        description:
          'Comms With A Plan is a flexible unit in the sense that work can be project based, or continuous, based on demand. (Give me a call to explain.)',
        action: 'Call, contact me ...'
      },
      {
        language: 'nl-NL',
        displayName: 'Consultancy',
        description:
          'Comms With A Plan is een flexibele partner in die zin dat het werk per project kan zijn, maar ook continu. Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)',
        action: 'Bel, neem contact op ...'
      }
    ]
  }
];

export const consultancyHomeItems = () => consultancyHomeItemsData;

const workItemsData: (Content & Color)[] = [
  {
    name: 'reporting',
    color: 'blue',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Reporting',
        description: 'Interpret, set up, manage dashboards or other kinds of reports.'
      },
      {
        language: 'nl-NL',
        displayName: 'Rapportage',
        description: 'Inpreteren, opzetten, managen van dashboards of andersoortige rapporten.'
      }
    ]
  },
  {
    name: 'research_and_analysis',
    color: 'blue',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Research and analysis',
        description: 'Interpretation of past campaigns / years etc.'
      },
      {
        language: 'nl-NL',
        displayName: 'Onderzoek en analyse',
        description: ' Interpretatie van afgelopen campagnes / jaren etc.'
      }
    ]
  },
  {
    name: 'briefing',
    color: 'blue',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Briefing',
        description:
          'Instruct the agencies to develop (media) campaigns. With the input of former results, all marketing functions, objectives etc. In principle I follow the steps (1) strategy (2) planning (3) execution (4) evaluation & adjustment.'
      },
      {
        language: 'nl-NL',
        displayName: 'Briefing',
        description:
          'Opdracht geven aan de bureaus om (media)campagnes te ontwikkelen. Met input van eerdere resultaten, alle marketing functies, doelstellingen etcetera. In principe volg ik de stappen (1) strategie (2) planning (3) uitvoering (4) evaluatie & bijstelling.'
      }
    ]
  },
  {
    name: 'coordination',
    color: 'green',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Coördination',
        description:
          'I make sure the strategies are integrated. Possibly in a joint development effort by the agencies.'
      },
      {
        language: 'nl-NL',

        displayName: 'Coördinatie',
        description:
          'Ik zorg dat de strategieën geïntegreerd zijn. Eventueel door middel van gezamenlijke ontwikkeling door de bureaus.'
      }
    ]
  },
  {
    name: 'planning',
    color: 'green',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Planning',
        description: 'Precise elaboration of the strategy by the agencies.'
      },
      {
        language: 'nl-NL',

        displayName: 'Planning',
        description: 'Precieze uitwerking van de strategie door de bureaus.'
      }
    ]
  },
  {
    name: 'tools',
    color: 'green',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Tools',
        description: 'Tools that support your marketing-communications work.'
      },
      {
        language: 'nl-NL',
        displayName: 'Tools',
        description: 'Tools die je marketing-communicatie werkzaamheden ondersteunen.'
      }
    ]
  },
  {
    name: 'execution',
    color: 'red',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Execution',
        description: 'Buying, negotiation, implementation, placement by the agencies.'
      },
      {
        language: 'nl-NL',
        displayName: 'Executie',
        description: 'Inkoop, onderhandeling, implementatie, plaatsing door de bureaus.'
      }
    ]
  },
  {
    name: 'evaluation_and_adjustment',
    color: 'red',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Evaluation and adjustment',
        description: 'Undertake action based on interim results.'
      },
      {
        language: 'nl-NL',
        displayName: 'Evaluatie en aanpassingen',
        description: 'Actie ondernemen op basis van tussenresultaten.'
      }
    ]
  },

  {
    name: 'budget_management',
    color: 'red',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Budget management',
        description:
          'Make sure that no one spends more than needed to reach the objectives. Or that he/she turns out to have at the end of the year.'
      },
      {
        language: 'nl-NL',
        displayName: 'Budget management',
        description:
          'Ervoor zorgen dat niemand meer uitgeeft dan nodig is voor de doelstellingen. Of wat hij/zij op het einde van het jaar blijkt te hebben.'
      }
    ]
  },
  {
    name: 'creation',
    color: 'red',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Creation',
        description:
          'Do I know the difference between indigo, azure, navy or cobalt? No. But I do know whether a proposal is on or off strategy.'
      },
      {
        language: 'nl-NL',
        displayName: 'Creatie',
        description:
          'Weet ik het verschil tussen indigo, azuur, navy en kobalt? Nee. Maar ik weet wel of een voorstel op of naast strategie is.'
      }
    ]
  },
  {
    name: 'contracts',
    color: 'grey',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Contracts',
        description: 'Arrange yearly agreements with important media parties.'
      },
      {
        language: 'nl-NL',
        displayName: 'Contracten',
        description: 'Regelen van jaarafspraken met belangrijke mediapartijen.'
      }
    ]
  },
  {
    name: 'agency_management',
    color: 'grey',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Agency management',
        description: 'Team composition, cost, performance rewarding etc.'
      },
      {
        language: 'nl-NL',
        displayName: 'Bureau management',
        description: 'Team samenstelling, kosten, prestatiebeloning etcetera.'
      }
    ]
  },
  {
    name: 'auditing',
    color: 'grey',
    definitions: [
      {
        language: 'en-GB',
        displayName: 'Auditing',
        description:
          'As an independent party I check spending, prices, timings, results against previous agreed benchmarks, like pitch documents, contracts, plans, previous years etcetera.'
      },
      {
        language: 'nl-NL',
        displayName: 'Audit',
        description:
          'Als een onafhankelijke partij vergelijk ik uitgaven, prijzen, timings, resultaten met vooraf overeengekomen ijkpunten, zoals pitch documenten, contracten, plannen, voorgaande jaren etcetera.'
      }
    ]
  }
];

export const workItems = () => workItemsData;

export const aboutItems: Readable<(Content & Color)[]> = readable(
  [
    {
      name: 'about',
      color: 'blue',
      definitions: [
        {
          language: 'en-GB',
          displayName: 'About',
          description:
            "I'm Constantijn Baarendse. I've worked on different continents, for blue chip advertisers, media- and advertising agencies."
        },
        {
          language: 'nl-NL',
          displayName: 'Over',
          description:
            "Ik ben Constantijn Baarendse. Ik heb gewerkt op verschillende continenten, voor 'blue chip' adverteerders, media- en reclamebureaus."
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('About Items closed');
    };
  }
);

export const contactItems: Readable<(Content & Color)[]> = readable(
  [
    {
      name: 'email',
      color: 'blue',
      definitions: [
        {
          language: 'en-GB',
          displayName: 'E-Mail',
          description: 'cbaarendse[at]commswithaplan.com'
        },
        {
          language: 'nl-NL',
          displayName: 'E-Mail',
          description: 'cbaarendse[at]commswithaplan.com'
        }
      ]
    },
    {
      name: 'telephone',
      color: 'blue',
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Telephone',
          description: 'Telephone: plus three one six, one two three nine eight seven three four'
        },
        {
          language: 'nl-NL',
          displayName: 'Telefoon',
          description: 'Telefoon: nul zes, een twee drie negen acht zeven drie vier'
        }
      ]
    },
    {
      name: 'address',
      color: 'blue',
      definitions: [
        {
          language: 'en-GB',
          displayName: 'Address',
          description: 'Erich Salomonstraat 507, 1087 GT Amsterdam, The Netherlands'
        },
        {
          language: 'nl-NL',
          displayName: 'Adres',
          description: 'Erich Salomonstraat 507, 1087 GT Amsterdam, The Netherlands'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Contact Items closed');
    };
  }
);
