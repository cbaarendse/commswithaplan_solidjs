// imports
import {writable, Writable, readable, Readable} from 'svelte/store';
import type {Content, Color, Actionable} from '../../both/typings/types';

export const consultancyHomeItems: Readable<(Content & Color & Actionable)[]> = readable(
  [
    {
      name: 'commswithaplan',
      color: 'blue',
      link: '/consultancy/contact',
      definitions: [
        {
          language: 'english',
          displayName: 'Comms With A Plan',
          description:
            'Comms With A Plan is a <mark>Media Management consultancy</mark> for advertisers. At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.',
          action: 'Call, contact me ...'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Consultancy',
          description:
            'Comms With A Plan is a flexible unit in the sense that work can be project based, or continuous, based on demand. (Give me a call to explain.)',
          action: 'Call, contact me ...'
        },
        {
          language: 'dutch',
          displayName: 'Consultancy',
          description:
            'Comms With A Plan is een flexibele partner in die zin dat het werk per project kan zijn, maar ook continu. Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)',
          action: 'Bel, neem contact op ...'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Consultancy Home Items closed');
    };
  }
);

export const workItems: Readable<(Content & Color)[]> = readable(
  [
    {
      name: 'reporting',
      color: 'blue',
      definitions: [
        {
          language: 'english',
          displayName: 'Reporting',
          description: 'Interpret, set up, manage dashboards or other kinds of reports.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Research and analysis',
          description: 'Interpretation of past campaigns / years etc.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Briefing',
          description:
            'Instruct the agencies to develop (media) campaigns. With the input of former results, all marketing functions, objectives etc. In principle I follow the steps (1) strategy (2) planning (3) execution (4) evaluation & adjustment.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Coördination',
          description:
            'I make sure the strategies are integrated. Possibly in a joint development effort by the agencies.'
        },
        {
          language: 'dutch',

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
          language: 'english',
          displayName: 'Planning',
          description: 'Precise elaboration of the strategy by the agencies.'
        },
        {
          language: 'dutch',

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
          language: 'english',
          displayName: 'Tools',
          description: 'Tools that support your marketing-communications work.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Execution',
          description: 'Buying, negotiation, implementation, placement by the agencies.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Evaluation and adjustment',
          description: 'Undertake action based on interim results.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Budget management',
          description:
            'Make sure that no one spends more than needed to reach the objectives. Or that he/she turns out to have at the end of the year.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Creation',
          description:
            'Do I know the difference between indigo, azure, navy or cobalt? No. But I do know whether a proposal is on or off strategy.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Contracts',
          description: 'Arrange yearly agreements with important media parties.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Agency management',
          description: 'Team composition, cost, performance rewarding etc.'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Auditing',
          description:
            'As an independent party I check spending, prices, timings, results against previous agreed benchmarks, like pitch documents, contracts, plans, previous years etcetera.'
        },
        {
          language: 'dutch',
          displayName: 'Audit',
          description:
            'Als een onafhankelijke partij vergelijk ik uitgaven, prijzen, timings, resultaten met vooraf overeengekomen ijkpunten, zoals pitch documenten, contracten, plannen, voorgaande jaren etcetera.'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Work Items closed');
    };
  }
);

export const aboutItems: Readable<(Content & Color)[]> = readable(
  [
    {
      name: 'about',
      color: 'blue',
      definitions: [
        {
          language: 'english',
          displayName: 'About',
          description:
            "I'm Constantijn Baarendse. I've worked on different continents, for blue chip advertisers, media- and advertising agencies."
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'E-Mail',
          description: 'cbaarendse[at]commswithaplan.com'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Telephone',
          description: 'Telephone: plus three one six, one two three nine eight seven three four'
        },
        {
          language: 'dutch',
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
          language: 'english',
          displayName: 'Address',
          description: 'Erich Salomonstraat 507, 1087 GT Amsterdam, The Netherlands'
        },
        {
          language: 'dutch',
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
