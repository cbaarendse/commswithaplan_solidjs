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
            "The European Commission is committed to user privacy. The policy on protection of individuals with regard to the processing of personal data by the European Union institutions is based on the Regulation (EU) 2018/1725 on the protection of personal data by the EU institutions, bodies, offices and agencies.      This policy covers all the European Commission's websites within the ec.europa.eu domain. Although you can browse through most of these websites without giving any personal information, in some cases information is required in order to provide the e-services you request. Websites that require such information treat it in full compliance with the regulation above and provide information about the use of your data in their specific privacy policy statements. In this respect for each e-service, a controller ensures conformity with the privacy policy      for the European Commission, the Data Protection Officer ensures that the regulation is applied and advises controllers on fulfilling their obligations      for all the institutions, the European Data Protection Supervisor acts as an independent supervisory authority      The European Commission's websites within the ec.europa.eu domain may provide links to third-party sites. In order to use third party content on our websites, you may need to accept their specific terms and conditions, including their cookie policies over which we have no control.      Regulation on the protection of personal data      e-services           An e-service on Europa is a service or resource that improve communication between people and the European institutions.      3 types of e-services are offered by Europa      information services that provide easy and effective access to information      interactive communication services to facilitate policy consultations and feedback      transaction services that allow  basic forms of transactions with the EU, such as procurement, financial operations, recruitment, event enrollment, and ordering documents      Information contained in a specific privacy statement      A specific privacy policy statement will contain the following information about the use of your data      what information is collected      for what purpose it is collected      the technical means by which it is collected      who sees your information      how you can access, verify its accuracy and correct your information      how long your data is kept      what security measures are taken to safeguard your information      who to contact if you have questions or complaints      Europa Analytics      Europa Analytics is the corporate service that measures the effectiveness and efficiency of the European Commission's websites on Europa.  You are free to refuse the use of this service – either via the cookie banner that appears at the top of the first page you visit or at Europa Analytics.   Choosing not to use this service does not affect your navigation experience on Europa sites.     More about Europa Analytics     Contacting Europa sites     Many web pages on Europa have a contact button, which activates your email software and invites you to send your comments to a specific mailbox.         When you send such a message, your personal data is only collected in order to reply.    Your email will be forwarded to another service if the team responsible for the mailbox is unable to answer your question. An email will inform you about which service your question has been forwarded to.     If you have any questions about the processing of your email and related personal data, do not hesitate to include them in your message.    Safeguarding information     Collected personal data are stored by the European Commission under the Commission decision of January 2017 on the security of communication and information systems in the European Commission.        In those cases where collected personal data are stored on a computer of an external subcontractor acting as processor, they are bound by specific contractual clauses and by the confidentiality obligations deriving from the general data protection regulation of April 2016.     Regulation on the processing of personal data and on the free movement of such data     Verifying, modifying or deleting information    If you want to verify, modify or delete your personal data stored by the Europa website and its sub-sites, you can contact the Europa Web Communication unit in DG Communication using the form below.      In your email, clearly state the nature of your request (verifying, modifying or deleting personal data published on the Europa websites) and include the URL of the website/webpages your request refers to."
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
