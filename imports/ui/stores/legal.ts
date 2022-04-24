// packages
import {writable, Writable, readable, Readable} from 'svelte/store';

// interfaces
import type {Chapter} from '../types/types';

export const cookiePolicy: Readable<Chapter[]> = readable(
  [
    {
      name: 'about_cookies',
      language: 'english',
      displayName: 'About cookies',
      paragraphs: [
        {
          description: 'What is a cookie?',
          elaboration:
            "Cookies are small text files that websites place on the computers and mobile devices of people who visit those websites. These text files allow a website to remember your device and how you interacted with the website, which is useful for a number of different purposes. For example, cookies can be used to remember username and password information so that you don't have to re-enter all of your login information every time you visit a site you frequently log in to. Other functions of cookies are to provide custom advertising to users based on searches and personal interests, as well as site performance cookies that enhance website use by remembering things such as custom video streaming or volume settings you have selected while using the website in the past."
        }
      ]
    },
    {
      name: 'about_cookies',
      language: 'dutch',
      displayName: 'Over Cookies',
      paragraphs: [
        {
          description: 'Wat is een cookie?',
          elaboration:
            'Wij maken op deze website gebruik van cookies. Een cookie is een eenvoudig klein bestandje dat met pagina’s van deze website [en/of Flash-applicaties] wordt meegestuurd en door uw browser op uw device (computer/telefoon/tablet) wordt opgeslagen. De daarin opgeslagen informatie kan bij een volgend bezoek weer naar onze servers teruggestuurd worden.'
        }
      ]
    },
    {
      name: 'ads_cookies',
      language: 'english',
      displayName: 'Ads',
      paragraphs: [
        {
          description: 'lll',
          elaboration: 'kkk'
        }
      ]
    },
    {
      name: 'ads_cookies',
      language: 'dutch',
      displayName: 'Advertenties',
      paragraphs: [
        {
          description: 'Tracking cookies van onze adverteerders',
          elaboration:
            "Met jouw toestemming plaatsen onze adverteerders zogenaamde tracking cookies op jouw apparatuur. Deze cookies gebruiken zij om bij te houden welke pagina's je bezoekt uit hun netwerk, om zo een profiel op te bouwen van jouw online surfgedrag. Dit profiel wordt mede opgebouwd op basis van vergelijkbare informatie die zij van jouw bezoek aan andere websites uit hun netwerk krijgen. Dit profiel wordt niet gekoppeld aan jouw naam, adres, e-mailadres en dergelijke zoals bij ons bekend, maar dient alleen om advertenties af te stemmen op jouw interesses zodat deze zo veel mogelijk relevant voor je zijn."
        }
      ]
    },
    {
      name: 'analytics_cookies',
      language: 'english',
      displayName: 'Analytics cookies',
      paragraphs: [
        {
          description: 'lll',
          elaboration: 'kkk'
        }
      ]
    },
    {
      name: 'analytics_cookies',
      language: 'dutch',
      displayName: 'Analyse Cookies',

      paragraphs: [
        {
          description: 'Google Analytics',
          elaboration:
            'Via onze website wordt een cookie geplaatst van het Amerikaanse bedrijf Google,  als deel van de “Analytics”-dienst. Wij gebruiken deze dienst om bij te houden en rapportages te krijgen over            hoe bezoekers de website gebruiken. Google kan deze informatie aan derden verschaffen indien Google hiertoe wettelijk            wordt verplicht, of voor zover derden de informatie namens Google verwerken. Wij hebben hier geen invloed op.            Wij hebben Google wel/niet toegestaan de verkregen analytics informatie te gebruiken voor andere Google-diensten.'
        },
        {
          description: 'Anonimisering',
          elaboration:
            'De informatie die Google verzamelt wordt zo veel mogelijk geanonimiseerd. Uw IP-adres wordt nadrukkelijk niet meegegeven. De informatie wordt overgebracht naar en door Google opgeslagen op servers in de Verenigde Staten. Standard Contractual Clauses zijn daarom onderdeel van de voorwaarden van Google.'
        }
      ]
    },
    {
      name: 'functional_cookies',
      language: 'english',
      displayName: 'Functional cookies',
      paragraphs: [
        {
          description: 'Use of functional (permanent) cookies',
          elaboration:
            "These cookies allow us to remember how you're logged in, whether you chose to no longer see advertisements, whether you made an edit to an article on the Service while logged out, when you logged in or out, the state or history of Service tools you've used. These cookies also allow us to tailor the Service to provide enhanced features and content for you and to remember how you've customized the Service in other ways, such as customizing the toolbars we offer in the right column of every page. The information these cookies collect may be anonymous, and they are not used to track your browsing activity on other sites or services."
        }
      ]
    },
    {
      name: 'functional_cookies',
      language: 'dutch',
      displayName: 'Functionele Cookies',
      paragraphs: [
        {
          description: 'Gebruik van functionele (permanente) cookies',
          elaboration:
            'Met behulp van een permanente cookie kunnen wij jou herkennen bij een nieuw bezoek op onze website. De website kan daardoor speciaal op jouw voorkeuren worden ingesteld. Ook wanneer je toestemming hebt gegeven voor het plaatsen van cookies kunnen wij dit door middel van een cookie onthouden. Hierdoor hoef je niet steeds jouw voorkeuren te herhalen waardoor je dus tijd bespaart en een prettiger gebruik van onze website kunt maken. Permanente ookies kan je verwijderen via de instellingen van jouw browser.'
        }
      ]
    },
    {
      name: 'personal_cookies',
      language: 'english',
      displayName: 'Personal cookies',
      paragraphs: [
        {
          description: 'lll',
          elaboration: 'kkk'
        }
      ]
    },
    {
      name: 'personal_cookies',
      language: 'dutch',
      displayName: 'Persoonlijke Cookies',
      paragraphs: [
        {
          description: 'Persoonlijk',
          elaboration: 'Persoonlijke cookies'
        }
      ]
    },
    {
      name: 'security_cookies',
      language: 'english',
      displayName: 'Security cookies',
      paragraphs: [
        {
          description: 'ssss',
          elaboration: 'sesesese'
        }
      ]
    },
    {
      name: 'security_cookies',
      language: 'dutch',
      displayName: 'VeiligheidsCookies',
      paragraphs: [
        {
          description: 'Voor je veiligheid',
          elaboration: 'Veligheidscookies'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Cookie Policy Chapters closed');
    };
  }
);
