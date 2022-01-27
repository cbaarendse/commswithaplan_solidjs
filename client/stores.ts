// packages
import { writable, Writable, readable, Readable } from 'svelte/store';

// types

export const language:Writable<string> = writable('dutch');

export const navigationVisible:Writable<boolean> = writable(false);

//export a function that return a readable given a string media query as input
export const useMediaQuery = (mediaQuery: string) => {
    //we inizialize the readable as null and get the callback with the set function
    const matches = readable(null, (set) => {
        //we match the media query
        const m:MediaQueryList = window.matchMedia(mediaQuery);
        //we set the value of the reader to the matches property
        set(m.matches);
        //we create the event listener that will set the new value on change
        const el:EventListener = e => set(e.matches);
        //we add the new event listener
        m.addEventListener("change", el);
        //we return the stop function that will clean the event listener
        return () => { m.removeEventListener("change", el) };
    });
    //then we return the readable
    console.log('matches inside useMediaQuery', mediaQuery, matches);
    return matches;
}

export const homePageItems:Readable<T> = readable([{
        name: 'consultancy',
        imgUrl: '/home/consultant.jpeg',
        cardLink: '/consultancy/',
        colors: 'blue',
        english: {
            displayName: 'Consultancy',
            description: 'Comms With A Plan provides Media Management consultancy.',
            callToAction: 'Read more'
        },
        dutch: {
            displayName: 'Consultancy',
            description: 'Comms With A Plan levert Media Management consultancy.',
            callToAction: 'Lees meer'
        },
    },
    {
        name: 'tools',
        imgUrl: '/home/night_crowd.jpg',
        cardLink: '/tools/',
        colors: 'green',
        english: {
            displayName: 'Tools',
            description: 'Handy tools for your media efforts.',
            callToAction: 'Read more'
        },
        dutch: {
            displayName: 'Tools',
            description: 'Handige tools voor je media inzet.',
            callToAction: 'Lees meer'
        }
    }
]);

export const toolsItems = readable([{
        name: 'reporting',
        colors: 'blue',
        english: {
            displayName: 'Reporting',
            description: 'Interpret, set up, manage dashboards or other kinds of reports.',
        },
        dutch: {
            displayName: 'Rapportage',
            description: 'Inpreteren, opzetten, managen van dashboards of andersoortige rapporten.',
        },
    },
    {
        name: 'research_and_analysis',
        colors: 'blue',
        english: {
            displayName: 'Research and analysis',
            description: 'Interpretation of past campaigns / years etc.',
        },
        dutch: {
            displayName: 'Onderzoek en analyse',
            description: ' Interpretatie van afgelopen campagnes / jaren etc.',
        }
    }
]);

export const consultancyHomeItems = readable([{
        name: 'commswithaplan',
        colors: 'blue',
        english: {
            displayName: 'Comms With A Plan',
            description: 'Comms With A Plan is a Media Management consultancy for advertisers. At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.',
        },
        dutch: {
            displayName: 'Comms With A Plan',
            description: 'Comms With A Plan is een Media Management consultancy voor adverteerders. Ik initieer, onderhoud en evalueer je media strategie, ik manage je bureaus en budget.'

        },
    },
    {
        name: 'consultancy',
        colors: 'blue',
        english: {
            displayName: 'Consultancy',
            description: 'Comms With A Plan is a flexible unit in the sense that work can be project based, or more continuous, based on demand. (Give me a call to explain.)',
        },
        dutch: {
            displayName: 'Consultancy',
            description: 'Comms With A Plan is een flexibele partner in die zin dat het werk per project kan zijn, maar ook meer continu. Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)'

        },
    }
]);

export const workItems = readable([{
        name: 'reporting',
        colors: 'blue',
        english: {
            displayName: 'Reporting',
            description: 'Interpret, set up, manage dashboards or other kinds of reports.',
        },
        dutch: {
            displayName: 'Rapportage',
            description: 'Inpreteren, opzetten, managen van dashboards of andersoortige rapporten.',
        },
    },
    {
        name: 'research_and_analysis',
        colors: 'blue',
        english: {
            displayName: 'Research and analysis',
            description: 'Interpretation of past campaigns / years etc.',
        },
        dutch: {
            displayName: 'Onderzoek en analyse',
            description: ' Interpretatie van afgelopen campagnes / jaren etc.',
        }
    },
    {
        name: 'briefing',
        colors: 'blue',
        english: {
            displayName: 'Briefing',
            description: 'Instruct the agencies to develop (media) campaigns. With the input of former results, all marketing functions, objectives etc. In principle I follow the steps (1) strategy (2) planning (3) execution (4) evaluation & adjustment.',
        },
        dutch: {
            displayName: 'Briefing',
            description: 'Opdracht geven aan de bureaus om (media)campagnes te ontwikkelen. Met input van eerdere resultaten, alle marketing functies, doelstellingen etcetera. In principe volg ik de stappen (1) strategie (2) planning (3) uitvoering (4) evaluatie & bijstelling.',
        },
    },
    {
        name: 'coordination',
        colors: 'green',
        english: {
            displayName: 'Coördination',
            description: 'I make sure the strategies are integrated. Possibly in a joint development effort by the agencies.',
        },
        dutch: {
            displayName: 'Coördinatie',
            description: 'Ik zorg dat de strategieën geïntegreerd zijn. Eventueel door middel van gezamenlijke ontwikkeling door de bureaus.',
        },
    },
    {
        name: 'planning',
        colors: 'green',
        english: {
            displayName: 'Planning',
            description: 'Precise elaboration of the strategy by the agencies.',
        },
        dutch: {
            displayName: 'Planning',
            description: 'Precieze uitwerking van de strategie door de bureaus.',
        },
    },
    {
        name: 'tools',
        colors: 'green',
        english: {
            displayName: 'Tools',
            description: 'Tools that support your marketing-communications work.',
        },
        dutch: {
            displayName: 'Tools',
            description: 'Tools die je marketing-communicatie werkzaamheden ondersteunen.',
        },
    },
    {
        name: 'execution',
        colors: 'red',
        english: {
            displayName: 'Execution',
            description: 'Buying, negotiation, implementation, placement by the agencies.',
        },
        dutch: {
            displayName: 'Executie',
            description: 'Inkoop, onderhandeling, implementatie, plaatsing door de bureaus.',
        },
    },
    {
        name: 'evaluation_and_adjustment',
        colors: 'red',
        english: {
            displayName: 'Evaluation and adjustment',
            description: 'Undertake action based on interim results.',
        },
        dutch: {
            displayName: 'Evaluatie en aanpassingen',
            description: 'Actie ondernemen op basis van tussenresultaten.',
        },
    },

    {
        name: 'budget_management',
        colors: 'red',
        english: {
            displayName: 'Budget management',
            description: 'Make sure that no one spends more than needed to reach the objectives. Or that he/she turns out to have at the end of the year.',
        },
        dutch: {
            displayName: 'Budget management',
            description: 'Ervoor zorgen dat niemand meer uitgeeft dan nodig is voor de doelstellingen. Of wat hij/zij op het einde van het jaar blijkt te hebben.',
        },
    },
    {
        name: 'creation',
        colors: 'red',
        english: {
            displayName: 'Creation',
            description: 'Do I know the difference between indigo, azure, navy or cobalt? No. But I do know whether a proposal is on or off strategy.',
        },
        dutch: {
            displayName: 'Creatie',
            description: 'Weet ik het verschil tussen indigo, azuur, navy en kobalt? Nee. Maar ik weet wel of een voorstel op of naast strategie is.',
        },
    },
    {
        name: 'contracts',
        colors: 'grey',
        english: {
            displayName: 'Contracts',
            description: 'Arrange yearly agreements with important media parties.',
        },
        dutch: {
            displayName: 'Contracten',
            description: 'Regelen van jaarafspraken met belangrijke mediapartijen.',
        },
    },
    {
        name: 'agency_management',
        colors: 'grey',
        english: {
            displayName: 'Agency management',
            description: 'Team composition, cost, performance rewarding etc.',
        },
        dutch: {
            displayName: 'Bureau management',
            description: 'Team samenstelling, kosten, prestatiebeloning etcetera.',
        },
    },
    {
        name: 'auditing',
        colors: 'grey',
        english: {
            displayName: 'Auditing',
            description: 'As an independent party I check spending, prices, timings, results against previous agreed benchmarks, like pitch documents, contracts, plans, previous years etcetera. Only in case I haven\'t worked for you in the previous 2 fiscal years, in one of the capacities above.',
        },
        dutch: {
            displayName: 'Audit',
            description: 'Als een onafhankelijke partij vergelijk ik uitgaven, prijzen, timings, resultaten met vooraf overeengekomen ijkpunten, zoals pitch documenten, contracten, plannen, voorgaande jaren etcetera. \n Alleen als ik in de 2 voorafgaande fiscale jaren niet voor je bedrijf heb gewerkt, in een van de bovenstaande capaciteiten.',
        },
    },
]);

interface AboutItem { page:string, chapter?: string, paragraph?: string, colors: string, language: string, displayName: string, description: string }

export const aboutItems: Readable<AboutItem[]> = readable( [{
    page: 'about',
    colors: 'blue',
    language: 'english', displayName: 'About',
        description: "I'm Constantijn Baarendse. I've worked on different continents, for blue chip advertisers, media- and advertising agencies."
    },
    {page: 'about',
    colors: 'blue', language: 'dutch',
        displayName: 'Over',
        description: "Ik ben Constantijn Baarendse. Ik heb gewerkt op verschillende continenten, voor 'blue chip' adverteerders, media- en reclamebureaus."
}]);

export const contactItems = readable([{
        name: 'email',
        colors: 'blue',
        english: {
            displayName: 'E-Mail',
            description: 'cbaarendse[at]commswithaplan.com'
        },
        dutch: {
            displayName: 'E-Mail',
            description: 'cbaarendse[at]commswithaplan.com'
        },
    },
    {
        name: 'telephone',
        colors: 'blue',
        english: {
            displayName: 'Telephone',
            description: 'Telephone: plus three one six one two three nine eight seven three four',
        },
        dutch: {
            displayName: 'Telefoon',
            description: 'Telefoon: nul zes een twee drie negen acht zeven drie vier'
        },
    },
    {
        name: 'address',
        colors: 'blue',
        english: {
            displayName: 'Address',
            description: 'Erich Salomonstraat 507, 1087 GT Amsterdam, The Netherlands',
        },
        dutch: {
            displayName: 'Adres',
            description: 'Erich Salomonstraat 507, 1087 GT Amsterdam, The Netherlands'
        },
    }
]);

export const toolsHomeItems = readable([{
        name: 'tools',
        colors: 'green',
        english: {
            displayName: 'Tools',
            description: 'Comms With A Plan developes tools aimed to help advertisers who are not working with media agencies. For instance because they have inhouse capabilities, or because they currently do not have the proper size.',
        },
        dutch: {
            displayName: 'Tools',
            description: 'Comms With A Plan ontwikkelt tools voor adverteerders die niet met mediabureaus werken. Bijvoorbeeld omdat zij intern genoeg bekwaamheid bezitten, of omdat ze op het moment niet de juiste grootte hebben.'

        },
    },
    {
        name: 'reachapp',
        colors: 'green',
        english: {
            displayName: 'Reach',
            description: 'Comms With A Plan is a flexible unit in the sense that work can be project based, or more continuous, based on demand. (Give me a call to explain.)',
        },
        dutch: {
            displayName: 'Reach',
            description: 'Comms With A Plan is een flexibele partner in die zin dat het werk per project kan zijn, maar ook meer continu. Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)'

        },
    }
]);

export const toolsDocumentationChapters = readable([{
        name: 'chapter_1',
        img: '/chapter_1.png',
        english: { title: 'Operation', content: [{ subtitle: 'Sliders', text: 'Use the sliders of the medium types you want to use in your plan. With the sliders you set the reach of that medium type.', elaboration: "Reach works with an algorithm, that is why it's so fast." }, { subtitle: 'Result', text: 'On top you then see an estimate of the Total Reach of your plan. And you see the overlap ("locus"), so the reach your plan obtains with áll medium types.', elaboration: '' }] },
        dutch: {
            title: 'Bediening',
            content: [{ subtitle: 'Sliders', text: 'Gebruik de sliders van de medium types die je wilt gebruiken in je plan. Met de sliders stel je het bereik in van dat medium type.', elaboration: 'Reach werkt met een algoritme. Daarom is het zo snel.' }, { subtitle: 'Resultaat', text: 'Bovenin zie je dan een inschatting van het Totaal Bereik van je plan. En je ziet de overlap ("locus"), dus het bereik dat je plan realiseert met álle medium types.', elaboration: '' }]
        }
    },
    {
        name: 'chapter_2',
        img: '/chapter_2.png',
        english: {
            title: 'Reset',
            content: [{ subtitle: 'Reset 1', text: 'The 1st time you press reset, you keep your plan, in order, but the input for all medium types is set to "0".', elaboration: '' }, { subtitle: 'Reset 2', text: 'The 2nd time you press reset, you get a new empty plan, with the full default list of medium types, in alphabetical order.', elaboration: '' }]
        },
        dutch: { title: 'Reset', content: [{ subtitle: 'Reset 1', text: 'De eerste keer dat je op reset drukt, behoud je je plan, in volgorde, maar de input voor alle medium typen wordt "0".', elaboration: '' }, { subtitle: 'Reset 2', text: 'De 2e keer dat je op reset drukt, krijg je een nieuw leeg plan, met de volledige basis lijst van mediumtypen, in alfabetische volgorde.', elaboration: '' }] }
    },
    {
        name: 'chapter_3',
        img: '/chapter_3.png',
        english: {
            title: 'Sort',
            content: [{ subtitle: 'Sort 1', text: 'The 1st time you press sort, the order of your plan changes. The highest input will be on top, lowest input underneath.', elaboration: '' }, { subtitle: 'Sort 2', text: 'The 2nd time you press sort, the order will become alphabetical, in the chosen language.', elaboration: '' }]
        },
        dutch: { title: 'Sorteer', content: [{ subtitle: 'Sorteer  1', text: 'De eerste keer dat je op sorteer drukt, verandert de volgorde. De hoogste input komt bovenaan en de laagste onderaan.', elaboration: '' }, { subtitle: 'Sorteer 2', text: 'De 2e keer dat je op sorteer drukt, wordt de volgorde alfabetisch, in de gekozen taal.', elaboration: '' }] }
    },
    {
        name: 'chapter_4',
        img: '/chapter_4.png',
        english: {
            title: 'Hide',
            content: [{ subtitle: 'Hide', text: 'The 1st time you press this button, you hide all the medium types with input 0.', elaboration: 'So it shows only the medium types you engage in your plan.' }, { subtitle: 'Show', text: 'The 2nd time you press this button, you reveal the medium types with input 0 again', elaboration: '' }]
        },
        dutch: { title: 'Verberg', content: [{ subtitle: 'Verberg', text: 'De eerste keer dat je op deze knop drukt, verberg je de mediumtypes met input 0.', elaboration: 'Dus dit toont alleen de mediumtypes die je inzet in je plan.' }, { subtitle: 'Toon', text: 'De 2e keer dat je op deze knop drukt, laat je de mediumtypes met input 0 weer zien.', elaboration: '' }] }
    },
    {
        name: 'chapter_5',
        img: '/chapter_5.png',
        english: {
            title: 'Outcome',
            content: [{ subtitle: 'Result', text: 'This area in the header shows the estimated result of your campaign. In terms of Total Reach and Locus (overlap).', elaboration: 'Click on the labels to see the meaning of each.' }]
        },
        dutch: { title: 'Uitkomst', content: [{ subtitle: 'Resultaat', text: 'Deze zone toont het ingeschatte resultaat van je campagne.', elaboration: 'Dus dit toont alleen de mediumtypes die je inzet in je plan.' }] }
    },
    {
        name: 'chapter_6',
        img: '/chapter_6.png',
        english: {
            title: 'Output',
            content: [{ subtitle: 'Hide', text: 'The 1st time you press this button, you hide all the medium types with input 0.', elaboration: 'So it shows only the medium types you engage in your plan.' }, { subtitle: 'Show', text: 'The 2nd time you press this button, you reveal the medium types with input 0 again', elaboration: '' }]
        },
        dutch: { title: 'Uitvoer', content: [{ subtitle: 'Verberg', text: 'De eerste keer dat je op deze knop drukt, verberg je de mediumtypes met input 0.', elaboration: 'Dus dit toont alleen de mediumtypes die je inzet in je plan.' }, { subtitle: 'Toon', text: 'De 2e keer dat je op deze knop drukt, laat je de mediumtypes met input 0 weer zien.', elaboration: '' }] }
    },
    {
        name: 'chapter_7',
        img: '/chapter_7.png',
        english: {
            title: 'Medium type',
            content: [{ subtitle: 'Hide', text: 'The 1st time you press this button, you hide all the medium types with input 0.', elaboration: 'So it shows only the medium types you engage in your plan.' }, { subtitle: 'Show', text: 'The 2nd time you press this button, you reveal the medium types with input 0 again', elaboration: '' }]
        },
        dutch: { title: 'Mediumtype', content: [{ subtitle: 'Verberg', text: 'De eerste keer dat je op deze knop drukt, verberg je de mediumtypes met input 0.', elaboration: 'Dus dit toont alleen de mediumtypes die je inzet in je plan.' }, { subtitle: 'Toon', text: 'De 2e keer dat je op deze knop drukt, laat je de mediumtypes met input 0 weer zien.', elaboration: '' }] }
    },
    {
        name: 'chapter_8',
        img: '/chapter_8.png',
        english: {
            title: 'Precision input',
            content: [{ subtitle: 'Hide', text: 'The 1st time you press this button, you hide all the medium types with input 0.', elaboration: 'So it shows only the medium types you engage in your plan.' }, { subtitle: 'Show', text: 'The 2nd time you press this button, you reveal the medium types with input 0 again', elaboration: '' }]
        },
        dutch: { title: 'Precieze invoer', content: [{ subtitle: 'Verberg', text: 'De eerste keer dat je op deze knop drukt, verberg je de mediumtypes met input 0.', elaboration: 'Dus dit toont alleen de mediumtypes die je inzet in je plan.' }, { subtitle: 'Toon', text: 'De 2e keer dat je op deze knop drukt, laat je de mediumtypes met input 0 weer zien.', elaboration: '' }] }
    }
]);

export interface TouchPointBasics { name: string, language: string, displayName: string, description: string};

export const touchPointsBasics = readable<TouchPointBasics[]>([{ name: "advocacy", language: "english", displayName: "Advocacy", description: "Consumers spread information about your brand." }, {name: "advocacy",language: "dutch", displayName: "Advocacy", description: "Consumenten verspreiden informatie over je merk." } ,
    { name: "ambassador", language: "english", displayName: "Ambassador", description: "A (known) person acts as spokesperson for your brand." }, { name: "ambassador",language: "dutch", displayName: "Ambassador", description: "Een (bekend) persoon treedt op als woordvoerder voor je merk." } ,
    { name: "app", language: "english", displayName: "App", description: "A branded software program that can be used on smartphones." },{ name: "app",language: "dutch", displayName: "App", description: "Een branded software programma dat werkt op smartphones." } ,
    { name: "asset", language: "english",  displayName: "Asset", description: "A proprietary tool or platform that a brand owns and that can be used to further build it." },{ name: "asset",language: "dutch", displayName: "Asset", description: "Een hulpmiddel of programma dat eigendom is van een merk en dat gebruikt kan worden om het verder te bouwen." } ,
    { name: "cinema", language: "english", displayName: "Cinema", description: "Screen advertising in cinemas." }, {name: "cinema",language: "dutch", displayName: "Cinema", description: "Adverteren op het doek in bioscopen." } ,
    { name: "console_game", language: "english", displayName: "Console / Game", description: "Advertising in a game (online, console, PC) or on a console." },  {name: "console_game",language: "dutch", displayName: "Console / Game", description: "Adverteren in een game (online, console, PC) of via een console." } ,
    { name: "direct_mail", language: "english", displayName: "Direct Mail", description: "Physical mail, delivered to mail boxes, targeted and untargeted." },  {name: "direct_mail",language: "dutch", displayName: "Direct Mail", description: "Fysieke post, geleverd in de brievenbus, gericht of ongericht." },
    { name: "display", language: "english", displayName: "Display", description: "Advertising on websites, through all possible formats." },  {name: "display",language: "dutch", displayName: "Display", description: "Adverteren op websites, in alle mogelijke vormen." },
    { name: "door_drop", language: "english", displayName: "Door Drop", description: "Unadressed mailings and leaflets" },  {name: "door_drop",language: "dutch", displayName: "Folder", description: "Ongeadresseerde mailings en folders." },
    { name: "e-mail", language: "english", displayName: "E-Mail", description: "Electronic mail, delivered to the inbox, targeted and untargeted." },  {name: "e-mail", language: "dutch", displayName: "E-Mail", description: "Electronische mail, geleverd in de inbox, gericht of ongericht." },
    { name: "event", language: "english", displayName: "Event", description: "A branded gathering of people at an arranged place and time." },  {name: "event",language: "dutch", displayName: "Event", description: "Een branded samenkomst van mensen op een afgesproken plaats en tijd." },
    { name: "experiential", language: "english", displayName: "Experiential", description: "Engaging consumers in an experience that involves the product and/or brand values." },{name: "experiential",  language: "dutch", displayName: "Experiential", description: "Betrekken van consumenten in een ervaring die het product en/of merkwaarden bevat." },
    { name: "internal_employee", language: "english", displayName: "Internal / Employee", description: "Personnel spreads information about your brand." },  {name: "internal_employee",language: "dutch", displayName: "Internal / Employee", description: "Het merk verspreidt informatie naar personeelsleden. Zij delen deze informatie eventueel verder." },
    { name: "loyalty_crm", language: "english", displayName: "Loyalty / CRM", description: "IT supported relationship with consumers." },  {name: "loyalty_crm", language: "dutch", displayName: "Loyalty / CRM", description: "IT ondersteunde relatie met consumenten." },
    { name: "magazines", language: "english", displayName: "Magazines", description: "Advertising in magazines." },  {name: "magazines",language: "dutch", displayName: "Magazines", description: "Adverteren in magazines." },
    { name: "mobile", language: "english", displayName: "Mobile", description: "Branded messaging on mobile phones." },  {name: "mobile", language: "dutch", displayName: "Mobiel", description: "Branded boodschappen verspreiden door middel van mobiele telefoons." },
    { name: "newspapers", language: "english", displayName: "Newspapers", description: "Advertising in newspapers." },  {name: "newspapers", language: "dutch", displayName: "Dagbladen", description: "Adverteren in kranten." },
    { name: "outdoor", language: "english", displayName: "Outdoor", description: "Advertising at physical places that are outside the consumers’ home." },  {name: "outdoor",language: "dutch", displayName: "Buitenreclame", description: "Adverteren op fysieke punten waarmee de consument alleen buitenshuis in aanraking kan komen." },
    { name: "packaging", language: "english", displayName: "Packaging", description: "Messaging on a product’s package." },  {name: "packaging",language: "dutch", displayName: "Verpakking", description: "Boodschappen op de verpakking van het product." },
    { name: "pr", language: "english", displayName: "PR", description: "Communication that focuses on a mutual benefit for brand and consumers." },  {name: "pr", language: "dutch", displayName: "PR", description: "Communicatie die zich concentreert op het wederzijds belang voor merk en consumenten." },
    { name: "promotion", language: "english", displayName: "Promotion", description: "Communication that focuses on a temporary change in price / value ratio." },  {name: "promotion",language: "dutch", displayName: "Promotie", description: "Communicatie die zich concentreert op een tijdelijke verandering in de prijs / waarde verhouding." },
    { name: "radio", language: "english", displayName: "Radio", description: "Advertising on radio stations, in commercial airtime and in-program." },  {name: "radio", language: "dutch", displayName: "Radio", description: "Adverteren in zendtijd van radiostations, reclamezendtijd en in-program." },
    { name: "sem", language: "english", displayName: "SEM", description: "Search engine marketing - Paid optimization and advertising on search engine results pages." },  {name: "sem", language: "dutch", displayName: "SEM", description: "Search engine marketing - Betaalde optimalisatie en advertenties op resultaatpagina’s van zoekmachines." },
    { name: "seo", language: "english", displayName: "SEO", description: "Search engine optimization - Free optimization on search engine results pages." },  {name: "seo", language: "dutch", displayName: "SEO", description: "Search engine optimization -  Gratis optimalisatie op resultaatpagina’s van zoekmachines." },
    { name: "shopper", language: "english", displayName: "Shopper", description: "Communication in retail channels." },  {name: "shopper",language: "dutch", displayName: "Shopper", description: "Communicatie in retail-kanalen." },
    { name: "social", language: "english", displayName: "Social", description: "Branded appearance on social networks, paid and unpaid." },  {name: "social",language: "dutch", displayName: "Social", description: "Branded vertoning op sociale netwerken, betaald en onbetaald." },
    { name: "sponsorship", language: "english", displayName: "Sponsorship", description: "A branding opportunity in exchange for financial support of a person, activity or organization." },  {name: "sponsorship",language: "dutch", displayName: "Sponsorship", description: "De mogelijkheid om je merk te tonen in ruil voor financiële steun van een persoon, activiteit of organisatie." },
    { name: "television", language: "english", displayName: "Television", description: "Advertising on television, in commercial airtime and in-program." },  {name: "television", language: "dutch", displayName: "Televisie", description: "Adverteren in zendtijd van een televisiestation, reclamezendtijd en in-program." },
    { name: "trade_fair", language: "english", displayName: "Trade Fair", description: "Appearing at an exhibition for a specific industry or purpose." },  {name: "trade_fair", language: "dutch", displayName: "Trade Fair", description: "Vertonen van een merk op een beurs voor een specifieke industrie of doel." },
    { name: "video_on_demand", language: "english", displayName: "Video On Demand", description: "Advertising in an environment that provides audio visual content to users at request." },  {name: "video_on_demand", language: "dutch", displayName: "Video On Demand", description: "Adverteren in een omgeving die op verzoek audiovisuele content biedt aan gebruikers." },
    { name: "viral", language: "english", displayName: "Viral", description: "Communication in a way that optimizes the probability that people will forward your message." },  {name: "viral", language: "dutch", displayName: "Viral", description: "Communicatie op een manier die de kans maximaliseert dat mensen je boodschap zullen doorsturen aan andere mensen. " },
    { name: "website", language: "english", displayName: "Website", description: "Electronic information, that is stored on a server and is accessible through a browser." },  {name: "website",language: "dutch", displayName: "Website", description: "Elektronische informatie, die opgeslagen is op een server en toegankelijk door middel van een browser." },
    { name: "word_of_mouth", language: "english", displayName: "Word Of Mouth", description: "People pass opinions on a brand to other people." },  {name: "word_of_mouth", language: "dutch", displayName: "Word Of Mouth", description: "Mensen geven meningen door over je merk aan andere mensen." } 
]);

interface DisplayName {displayName: string};
export interface Translation {name: string, english: DisplayName};

export const translations: Readable<Translation[]> = readable([
    { name: 'english', english: { displayName: 'English' }, dutch: { displayName: 'Engels' } },
    { name: 'dutch', english: { displayName: 'Dutch' }, dutch: { displayName: 'Nederlands' } },
    { name: 'reset', english: { displayName: 'RESET' }, dutch: { displayName: 'RESET' } },
    { name: 'hide', english: { displayName: 'HIDE' }, dutch: { displayName: 'VERBERG' } },
    { name: 'show', english: { displayName: 'SHOW' }, dutch: { displayName: 'TOON' } },
    { name: 'input', english: { displayName: 'Input' }, dutch: { displayName: 'Input' } },
    { name: 'reach', english: { displayName: 'Reach' }, dutch: { displayName: 'Bereik' } },
    { name: 'total', english: { displayName: 'Total' }, dutch: { displayName: 'Totaal' } },
    { name: 'locus', english: { displayName: 'Locus' }, dutch: { displayName: 'Locus' } },
    { name: 'enter_reach', english: { displayName: 'Enter Reach for' }, dutch: { displayName: 'Vul Bereik in voor' } },
    { name: 'reach_error', english: { displayName: 'Reach can be maximum 100, minimum 0' }, dutch: { displayName: 'Bereik mag maximaal 100 zijn, minimaal 0' } },
    { name: 'advertisement', english: { displayName: 'Advertisement' }, dutch: { displayName: 'Advertentie' } },
    { name: 'read', english: { displayName: 'Read' }, dutch: { displayName: 'Lees' } }
]);

interface ColorVarieties {
    [key:string]:string
};
interface ColorScheme  {[key:string]:ColorVarieties};

export const colorScheme:Readable<ColorScheme> = readable({
    blue: {
        base: 'var(--ra-blue)',
        light: 'var(--ra-blue-light)',
        bright: 'var(--ra-blue-bright)',
        offWhite: 'var(--ra-blue-off-white)',
    },
    green: {
        base: 'var(--ra-green)',
        light: 'var(--ra-green-light)',
        bright: 'var(--ra-green-bright)',
        offWhite: 'var(--ra-green-off-white)',
    },
    red: {
        base: 'var(--ra-red)',
        light: 'var(--ra-red-light)',
        bright: 'var(--ra-red-bright)',
        offWhite: 'var(--ra-red-off-white)',
    },
    teal: {
        base: 'var(--ra-teal)',
        light: 'var(--ra-teal-light)',
        bright: 'var(--ra-teal-bright)',
        offWhite: 'var(--ra-teal-off-white)',
    },
    grey: {
        base: 'var(--ra-grey)',
        light: 'var(--ra-grey-light)',
        bright: 'var(--ra-grey-bright)',
        offWhite: 'var(--ra-grey-off-white)',
    },
});