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
            'Via onze website wordt een cookie geplaatst van het Amerikaanse bedrijf Google,  als deel van de “Analytics”-dienst. Wij gebruiken deze dienst om bij te houden en rapportages te krijgen over hoe bezoekers de website gebruiken. Google kan deze informatie aan derden verschaffen indien Google hiertoe wettelijk wordt verplicht, of voor zover derden de informatie namens Google verwerken. Wij hebben hier geen invloed op. Wij hebben Google wel toegestaan de verkregen analytics informatie te  gebruiken voor andere Google-diensten.'
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
          description: 'Cookies for cookie policy',
          elaboration:
            'These are set by us and only we can read them. They remember: (1) if you have agreed to (or refused) this site’s cookie policy.'
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
          elaboration: 'Veiligheidscookies'
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

export const privacyPolicy: Readable<Chapter[]> = readable(
  [
    {
      name: 'privacy_policy',
      language: 'english',
      displayName: 'Privacy Policy',
      paragraphs: [
        {
          description: 'Personal data protection',
          elaboration:
            'Although you can browse through most of this website without giving any personal information, in some cases information is required in order to provide the e-services you request. This website within the commswithaplan.com domain may provide links to third-party sites. In order to use third party content on our website, you may need to accept their specific terms and conditions, including their cookie policies over which we have no control.'
        },
        {
          description: 'Regulation on the protection of personal data e-services',
          elaboration:
            'An e-service is a service or resource that improves communication between users and Comms With A Plan. 3 types of e-services are offered by Comms With A Plan:       (1) information services that provide easy and effective access to information; (2) interactive communication services to facilitate marketing communications work by the user; (3) consultations and feedback transaction services that allow basic forms of transactions with Comms With A Plan, such as procurement, financial operations, recruitment, event enrollment and ordering documents.'
        },
        {
          description: 'Information contained in a specific privacy statement',
          elaboration:
            'A specific privacy policy statement will contain the following information about the use of your data: (1) what information is collected; (2) for what purpose it is collected; (3) the technical means by which it is collected; (4) who sees your information; (5) how you can access, verify its accuracy and correct your information; (6) how long your data is kept; (7) what security measures are taken to safeguard your information; (8) who to contact if you have questions or complaints;'
        },
        {
          description: 'Analytics',
          elaboration:
            'Analytics measure the effectiveness and efficiency of the Comms With A Plan website. You are free to refuse the use of this service –  via the cookie banner that appears at the bottom of the first page you visit. Choosing not to use this service does not affect your navigation experience on the Comms With A Plan site.'
        },
        {
          description: 'Contacting Comms With A Plan site',
          elaboration:
            'Some web pages on Comms With A Pplan have a contact button, which activates your email software and invites you to send your comments to a specific mailbox. When you send such a message, your personal data is only collected in order to reply.Your email will be forwarded to another service if the person responsible for the mailbox is unable to answer your question. An email will inform you about which service your question has been forwarded to. If you have any questions about the processing of your email and related personal data, do not hesitate to include them in your message.'
        },
        {
          description: 'Safeguarding information',
          elaboration:
            'Collected personal data are stored by Comms With A Plan. In those cases where collected personal data are stored on a computer of an external subcontractor acting as processor, they are bound by specific contractual clauses and by the confidentiality obligations deriving from the general data protection regulation of April 2016.'
        }
      ]
    },
    {
      name: 'privacy_policy',
      language: 'dutch',
      displayName: 'Privacy Beleid',
      paragraphs: [
        {
          description: 'Bescherming van persoonsgegevens',
          elaboration:
            'Comms With A Plan hecht veel belang aan de bescherming van uw persoonlijke levenssfeer. Hoewel u de meeste van deze websites kunt bezoeken zonder informatie over uzelf te geven, moet u persoonsgegevens doorgeven om van sommige e-diensten gebruik te maken. De websites het commswithaplan.com-domein linken ook naar sites van andere instanties of personen. Om inhoud van derde partijen op onze websites te kunnen gebruiken, moet u in sommige gevallen akkoord gaan met hun specifieke voorwaarden, inclusief hun cookiebeleid waarover wij geen controle hebben.'
        },
        {
          description: 'Regulering bescherming persoonlijke data E-diensten',
          elaboration:
            'Een e-dienst is een dienst of informatiebron die toegankelijk is via internet met als doel de communicatie tussen gebruikers en Comms With A Plan te verbeteren. Op commswithaplan.com worden drie soorten e-diensten aangeboden: (2) interactieve communicatiediensten om marketing-communicatie werk door de gebruiker te vergemakkelijken; raadplegingen van informatie te vergemakkelijken; (3) transactiediensten die basistransacties met Comms With A Plan mogelijk maken, zoals opdrachten, financiële transacties, werving en selectie, inschrijvingen voor evenementen en het bestellen van documenten.'
        },
        {
          description: 'Wat houdt een specifieke privacyverklaring in?',
          elaboration:
            'Een specifieke privacyverklaring geeft antwoord op de volgende vragen: (1) Welke gegevens worden verzameld?; (2) Waarom worden de gegevens verzameld?; (3) Hoe worden de gegevens verzameld?; (4) Wie kan uw gegevens inzien?; (5) Hoe kunt u uw gegevens inzien, controleren en corrigeren?; (6) Hoelang worden uw gegevens bewaard?; (7) Hoe worden uw gegevens beschermd?; (8) Met wie kunt u contact opnemen bij vragen en klachten?;'
        },
        {
          description: 'Analytics',
          elaboration:
            'Analytics is de software waarmee we meten hoe doeltreffend en efficiënt de websites van Comms With A Plan is. Die dienst is niet verplicht, u kunt die uitschakelen via de banner over cookies onderaan de eerste pagina die u bezoekt. De keuze om deze dienst niet te gebruiken, heeft geen invloed op uw surfcomfort op de Comms With A Plan website.'
        },
        {
          description: 'Contact opnemen met Comms With A Plan-website',
          elaboration:
            'Enkele pagina’s op commswithaplan.com hebben een contactlink, die uw e-mailprogramma activeert en waarmee u opmerkingen naar een specifieke mailbox kunt sturen. Als we een e-mail van u ontvangen, verzamelen we alleen uw persoonsgegevens om u te kunnen antwoorden. Als we uw vraag niet kunnen beantwoorden, sturen we uw bericht door naar een andere dienst. U krijgt dan per e-mail te horen om welke dienst het gaat. Als u vragen heeft over de verwerking van uw e-mail of uw persoonsgegevens, kunt u die in uw bericht opnemen.'
        },
        {
          description: 'Gegevens beveiligen',
          elaboration:
            'Uw persoonsgegevens worden opgeslagen door Comms With A Plan. Indien verzamelde gegevens worden opgeslagen op een computer van een externe subcontractant, moet deze zich als verwerker ervan aan de algemene verordening gegevensbescherming (AVG - Verordening (EU) 2016/679) houden.'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Privacy Policy Chapters closed');
    };
  }
);
