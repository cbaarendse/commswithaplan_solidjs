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

export const termsAndConditions: Readable<Chapter[]> = readable(
  [
    {
      name: 'terms_and_conditions',
      language: 'english',
      displayName: 'Terms and Conditions',
      paragraphs: [
        {
          description: 'article 1. General',
          elaboration:
            "These terms and conditions apply to every offer, quotation and agreement between Five Trees BV, hereinafter referred to as: “User”, and a Client to which the User has declared these terms and conditions applicable, insofar as the parties have not expressly deviated from these terms and conditions in writing. The present terms and conditions also apply to agreements with the User, for the implementation of which the User must involve third parties.   These general terms and conditions are also written for the employees of the User and its management. The applicability of any purchase or other conditions of the Client is expressly rejected. If one or more provisions in these general terms and conditions are at any time wholly or partially invalid or should be annulled, the other provisions of these general terms and conditions will remain fully applicable. The User and the Client will then enter into consultation in order to agree on new provisions to replace the void or voided provisions, taking into account as much as possible the purpose and intent of the original provisions. If there is a lack of clarity regarding the interpretation of one or more provisions of these general terms and conditions, the interpretation must be made 'in the spirit' of these provisions. If a situation arises between the parties that is not regulated in these general terms and conditions, this situation must be assessed in the spirit of these general terms and conditions.If the User does not always require strict compliance with these terms and conditions, this does not mean that the provisions thereof do not apply, or that the User would to any extent lose the right to demand strict compliance with the provisions of these terms and conditions in other cases."
        },
        {
          description: 'article 2 Quotations and offers',
          elaboration:
            'All quotations and offers from the User are without obligation, unless a term for acceptance has been set in the quotation. If no acceptance period has been set, no rights can be derived in any way from the quotation or offer if the product to which the quotation or offer relates is no longer available in the meantime. User cannot be held to his quotations or offers if the Client can reasonably understand that the quotations or offers, or a part thereof, contain an obvious mistake or error. The prices stated in a quotation or offer are exclusive of VAT and other government levies, any costs to be incurred in the context of the agreement, including travel and accommodation, shipping and administration costs, unless indicated otherwise. If the acceptance (whether or not on minor points) deviates from the offer included in the quotation or offer, the User is not bound by it. The agreement will then not be concluded in accordance with this deviating acceptance, unless the User indicates otherwise. A composite quotation does not oblige the User to perform part of the assignment for a corresponding part of the stated price. Offers or quotations do not automatically apply to future orders.'
        },
        {
          description:
            'Article 3 Contract duration; execution terms, transfer of risk, execution and amendment of the agreement; price increase',
          elaboration:
            'The agreement between the User and the Client is entered into for an indefinite period of time, unless the nature of the agreement dictates otherwise or if the parties expressly agree otherwise in writing. If a term has been agreed or specified for the performance of certain activities or for the delivery of certain items, this is never a strict deadline. If a term is exceeded, the Client must therefore give User written notice of default. User must be offered a reasonable term to still implement the agreement. User will perform the agreement to the best of his knowledge and ability and in accordance with the requirements of good workmanship. All this on the basis of the state of science known at that time. User has the right to have certain activities performed by third parties. The applicability of article 7:404, 7:407 paragraph 2 and 7:409 of the Dutch Civil Code is expressly excluded. If the User or third parties engaged by the User in the context of the assignment perform work at the location of the Client or a location designated by the Client, the Client will provide the facilities reasonably desired by those employees free of charge. Delivery is made ex company of the User. The Client is obliged to take delivery of the goods the moment they are made available to him. If the Client refuses to accept or is negligent in providing information or instructions. If necessary for the delivery, the User is entitled to store the goods at the expense and risk of the Client. The risk of loss, damage or depreciation is transferred to the Client at the moment when goods are available to the Client. User is entitled to execute the agreement in different phases and to invoice the part thus executed separately. If the agreement is executed in phases, the User can suspend the execution of those parts that belong to a following phase until the Client has approved the results of the preceding phase in writing. The Client shall ensure that all information, which the User indicates is necessary or which the Client should reasonably understand to be necessary for the execution of the agreement, is provided to the User in a timely manner. If the information required for the execution of the agreement has not been provided to the User in time, the User has the right to suspend the execution of the agreement and/or to charge the additional costs resulting from the delay to the Client according to the then usual rates. bring. The execution period does not start until after the Client has made the data available to the User. The User is not liable for damage, of whatever nature, because the User has based on incorrect and/or incomplete information provided by the Client. If during the execution of the agreement it appears that it is necessary for a proper execution to change or supplement it, the parties will proceed to adjust the agreement in good time and in mutual consultation. If the nature, scope or content of the agreement, whether or not at the request or direction of the Client, of the competent authorities, etc., is changed and the agreement is changed in qualitative and/or quantitative terms as a result, this may have consequences for what was originally agreed. As a result, the originally agreed amount can also be increased or decreased. The User will provide a price quote in advance as much as possible. Furthermore, by changing the agreement, the originally stated term of execution can be changed. The Client accepts the possibility of amending the agreement, including the change in price and term of execution. If the agreement is changed, including a supplement, the User is entitled to implement it only after approval has been given by the person authorized within the User and the Client has agreed to the price and other conditions stated for the implementation, including including the time to be determined at which time it will be implemented. Not or not immediately executing the amended agreement does not constitute default on the part of the User and is not a ground for the Client to terminate or cancel the agreement. Without being in default, User can refuse a request to change the agreement, if this could have qualitative and/or quantitative consequences, for example for the work to be performed or goods to be delivered in that context. If the Client should be in default in the proper fulfillment of what he is obliged to towards the User, then the Client is liable for all damage on the part of the User as a result, directly or indirectly. If the User agrees on a fixed fee or fixed price with the Client, the User is nevertheless entitled at all times to increase this fee or price without the Client being entitled to dissolve the agreement for that reason, if the increase of the price arises from a power or obligation under the law or regulations or is caused by an increase in the price of raw materials, wages, etc. or on other grounds that were not reasonably foreseeable when the agreement was entered into. If the price increase, other than as a result of an amendment to the agreement, exceeds 10% and takes place within three months after the conclusion of the agreement, then only the Client who is entitled to invoke Title 5 Section 3 of Book 6 of the Dutch Civil Code is entitled to to dissolve the agreement by means of a written statement, unless User is then still willing to perform the agreement on the basis of what was originally agreed; if the price increase results from a power or an obligation resting on the User under the law; if it has been stipulated that the delivery is longer than three months after the conclusion of the   agreement will take place; or, in the case of delivery of an item, if it has been stipulated that delivery will take place more than three months after the purchase.'
        },
        {
          description: 'Article 4 Suspension, dissolution and early termination of the agreement',
          elaboration:
            "User is authorized to suspend the fulfillment of the obligations or to dissolve the agreement, if the Client does not, not fully or not timely fulfill the obligations under the agreement, after the conclusion of the agreement User becomes aware of circumstances give good reason to fear that the Client will not fulfill its obligations if, when the agreement was concluded, the Client was requested to provide security for the fulfillment of its obligations under the agreement and this security is not forthcoming or is insufficient or if due to the delay on the part of the The Client can no longer be expected to fulfill the agreement under the originally agreed conditions. Furthermore, the User is authorized to dissolve the agreement if circumstances arise of such a nature that fulfillment of the agreement is impossible or if other circumstances arise that are of such a nature that unaltered maintenance of the agreement cannot reasonably be expected of the User. If the agreement is dissolved, the User's claims against the Client are immediately due and payable. If the User suspends the fulfillment of the obligations, he retains his rights under the law and the agreement. If the User proceeds to suspension or dissolution, he is in no way obliged to compensate damage and costs incurred in any way. If the dissolution is attributable to the Client, the User is entitled to compensation for the damage, including the costs, incurred directly and indirectly as a result. If the Client fails to fulfill its obligations arising from the agreement and this non-compliance justifies dissolution, the User is entitled to dissolve the agreement immediately and with immediate effect without any obligation on its part to pay any compensation or indemnification, while the Client, by virtue of of breach of contract, but is obliged to pay compensation or indemnification. If the agreement is terminated prematurely by the User, the User will arrange for the transfer of work still to be performed to third parties in consultation with the Client. This unless the termination is attributable to the Client. If the transfer of the work entails additional costs for the User, these will be charged to the Client. The Client is obliged to pay these costs within the specified term, unless the User indicates otherwise. In the event of liquidation, (application for) suspension of payments or bankruptcy, attachment - if and insofar as the attachment is not lifted within three months - at the expense of the Client, debt restructuring or any other circumstance as a result of which the Client can no longer freely can dispose of his assets, the User is free to terminate the agreement with immediate effect or to cancel the order or agreement, without any obligation on his part to pay any compensation or compensation. In that case, the User's claims against the Client are immediately due and payable. If the Client cancels an order placed in whole or in part, the work that was performed and the items ordered or prepared for that purpose, plus any delivery, removal and delivery costs thereof and the working time reserved for the execution of the agreement, will be fully paid to be charged to the Client."
        },
        {
          description: 'Article 5 Force majeure',
          elaboration:
            'The User is not obliged to fulfill any obligation towards the Client if he is prevented from doing so as a result of a circumstance that is not due to fault, and is not for his account under the law, a legal act or generally accepted standards. In these general terms and conditions, force majeure is understood to mean, in addition to what is understood in this regard in law and jurisprudence, all external causes, foreseen or unforeseen, over which the User cannot exercise any influence, but as a result of which the User is unable to fulfill its obligations. . Strikes in the company of the User or of third parties included. User also has the right to invoke force majeure if the circumstance that prevents (further) fulfillment of the agreement occurs after User should have fulfilled his obligation. User can suspend the obligations under the agreement during the period that the force majeure continues. If this period is longerexceeds two months, each of the parties is entitled to dissolve the agreement, without any obligation to compensate the other party for damage. Insofar as the User has partially fulfilled or will be able to fulfill his obligations under the agreement at the time of the occurrence of force majeure, and the part fulfilled or to be fulfilled has independent value, the User is entitled to separately fulfill the part already fulfilled or to be fulfilled. to invoice. The Client is obliged to pay this invoice as if it were a separate agreement.'
        },
        {
          description: 'Article 6 Payment and collection costs',
          elaboration:
            'Payment must always be made within 30 days of the invoice date, in a manner to be indicated by the User in the currency in which the invoice is made, unless otherwise indicated in writing by the User. User is entitled to invoice periodically. If the Client fails to pay an invoice on time, the Client is legally in default. The Client will then owe an interest of 1% per month, unless the statutory interest is higher, in which case the statutory interest is due. The interest on the amount due and payable will be calculated from the moment that the Client is in default until the moment of payment of the full amount owed. The User has the right to have the payments made by the Client go first of all to reduce the costs, then to reduce the interest due and finally to reduce the principal sum and the current interest. The User can, without being in default as a result, refuse an offer of payment if the Client designates a different order for the allocation of the payment. The User can refuse full repayment of the principal if the outstanding and current interest and collection costs are not also paid.The Client is never entitled to set off the amount owed by him to the User. Objections to the amount of an invoice do not suspend the payment obligation. The Client who cannot invoke Section 6.5.3 (Articles 231 to 247, Book 6 of the Dutch Civil Code) is also not entitled to suspend payment of an invoice for any other reason. If the Client is in default or in default in the (timely) fulfillment of its obligations, all reasonable costs incurred in obtaining payment out of court will be borne by the Client. The extrajudicial costs are calculated on the basis of what is customary in Dutch collection practice, currently the calculation method according to Rapport Voorwerk II. However, if the User has incurred higher costs for collection that were reasonably necessary, the costs actually incurred will be eligible for reimbursement. Any judicial and enforcement costs incurred will also be recovered from the Client. The Client also owes interest on the collection costs owed.'
        },
        {
          description: 'Article 7 Retention of title',
          elaboration:
            "The items delivered by the User in the context of the agreement remain the property of the User until the Client has properly fulfilled all obligations under the agreement(s) concluded with the User. Items delivered by the User, which are subject to retention of title pursuant to paragraph 1, may not be resold and may never be used as a means of payment. The Client is not authorized to pledge or in any other way encumber that which falls under the retention of title. The Client must always do everything that can reasonably be expected of him to safeguard the property rights of the User. If third parties seize the goods delivered under retention of title or wish to establish or enforce rights thereon, the Client is obliged to immediately inform the User thereof. Furthermore, the Client undertakes to insure and keep insured the goods delivered subject to retention of title against fire, explosion and water damage as well as against theft and to make the policy of this insurance available to the User for inspection on first request. In the event of a payment of the insurance, the User is entitled to these tokens. Insofar as necessary, the Client undertakes in advance towards the User to cooperate with everything that may (prove) be necessary or desirable in that context. In the event that the User wishes to exercise its property rights referred to in this article, the Client gives unconditional and irrevocable permission in advance to the User and third parties to be designated by the User to enter all those places where the User's properties are located and to take them back."
        },
        {
          description: 'Article 8 Warranties, research and complaints, limitation period',
          elaboration:
            "The items to be delivered by the User comply withn the usual requirements and standards that can reasonably be imposed on them at the time of delivery and for which they are intended under normal use in the Netherlands. The warranty referred to in this article applies to items intended for use within the Netherlands. When used outside the Netherlands, the Client must verify whether its use is suitable for use there and whether it meets the conditions set for it. In that case, the user can set other warranty and other conditions with regard to the goods to be delivered or work to be performed. The warranty referred to in paragraph 1 of this article applies for a period of 1 year after delivery, unless the nature of the delivery dictates otherwise or the parties have agreed otherwise. If the warranty provided by the User concerns an item that was produced by a third party, the warranty is limited to that provided by the producer of the item, unless stated otherwise. Any form of warranty will lapse if a defect has arisen as a result of or arises from injudicious or improper use thereof or use after the best-before date, incorrect storage or maintenance thereof by the Client and/or by third parties when, without the written permission of the User, the Client or third parties have made or attempted to make changes to the item, other items have been attached to it that should not be attached thereto, or if these have been processed or processed in a manner other than the prescribed one. The Client is also not entitled to a warranty if the defect is caused by or is the result of circumstances beyond the User's control, including weather conditions (such as, but not limited to, extreme rainfall or temperatures) et cetera. The Client is obliged to inspect the delivered goods (or have them examined), immediately at the moment that the goods are made available to him or the relevant work has been carried out. In doing so, the Client should investigate whether the quality and/or quantity of the delivered goods corresponds to what has been agreed and meets the requirements that the parties have agreed in this regard. Any visible defects must be reported to the User in writing within seven days of delivery. Any non-visible defects must be reported to the User in writing immediately, but in any event no later than fourteen days after discovery. The report must contain as detailed a description as possible of the defect, so that the User is able to respond adequately. The Client must give the User the opportunity to investigate a complaint or have it investigated. If the Client makes a timely complaint, this does not suspend its payment obligation. In that case, the Client also remains obliged to purchase and pay for the items otherwise ordered and for what he has instructed the User. If a defect is reported later, the Client is no longer entitled to repair, replacement or compensation. If it is established that a good is defective and a complaint has been made in good time, the User will return the defective good within a reasonable term after receipt thereof or, if return is not reasonably possible, written notification with regard to the defect by the Client, at the User's discretion. replace or arrange for its repair or pay replacement compensation for it to the Client. In the event of replacement, the Client is obliged to return the replaced item to the User and to transfer ownership thereof to the User, unless the User indicates otherwise. If it is established that a complaint is unfounded, the costs incurred as a result, including the investigation costs incurred by the User as a result, will be borne in full by the Client. After expiry of the warranty period, all costs for repair or replacement, including administration, shipping and call-out costs, will be charged to the Client. Contrary to the statutory limitation periods, the limitation period for all claims and defenses against the User and third parties involved by the User in the execution of an agreement is one year."
        },
        {
          description: 'Article 9 Liability',
          elaboration:
            "If the User should be liable, this liability is limited to what is regulated in this provision. The User is not liable for damage, of whatever nature, caused by the fact that the User relied on incorrect and/or incomplete information provided by or on behalf of the Client. If the User should be liable for any damage, the User's liability is limited to mano more than once the invoice value of the order, at least up to that part of the order to which the liability relates. The User's liability is in any case always limited to the amount paid out by his insurer, where appropriate. User is only liable for direct damage. Direct damage is exclusively understood to mean the reasonable costs to determine the cause and extent of the damage, insofar as the determination relates to damage within the meaning of these terms and conditions, any reasonable costs incurred to fulfill the User's defective performance of the agreement. insofar as these can be attributed to the User and reasonable costs incurred to prevent or limit damage, insofar as the Client demonstrates that these costs have led to limitation of direct damage as referred to in these general terms and conditions. User is never liable for indirect damage, including consequential damage, lost profit, lost savings and damage due to business interruption. The limitations of liability included in this article do not apply if the damage is due to intent or gross negligence on the part of the User or his managerial subordinates."
        },
        {
          description: 'Article 10 Indemnification',
          elaboration:
            'The Client indemnifies the User against any claims from third parties who suffer damage in connection with the execution of the agreement and the cause of which is attributable to others than to the User. If the User should be addressed by third parties for this reason, the Client is obliged to assist the User both in and out of court and to immediately do everything that may be expected of him in that case. If the Client fails to take adequate measures, the User is entitled to do so himself, without notice of default. All costs and damage on the part of the User and third parties arising as a result will be entirely at the expense and risk of the Client.'
        },
        {
          description: 'Article 11 Intellectual property',
          elaboration:
            'The User reserves the rights and powers that accrue to him under the Copyright Act and other intellectual laws and regulations. The User has the right to use the knowledge gained by the execution of an agreement for other purposes, insofar as no strictly confidential information of the Client is disclosed to third parties.'
        },
        {
          description: 'Article 12 Applicable law and disputes',
          elaboration:
            "All legal relationships to which the User is a party are exclusively governed by Dutch law, even if an agreement is wholly or partially performed abroad or if the party involved in the legal relationship is domiciled there. The applicability of the Vienna Sales Convention is excluded. The court in the User's place of business has exclusive jurisdiction to hear disputes, unless the law prescribes otherwise, or unless the Client and User have agreed otherwise. Nevertheless, the User has the right to submit the dispute to the competent court according to the law. The parties will only appeal to the court after they have made every effort to settle a dispute in mutual consultation."
        },
        {
          description: 'Article 13 Location and change of conditions',
          elaboration:
            'These terms and conditions have been filed with the Chamber of Commerce in Amsterdam. The most recently registered version or the version that applied at the time of the establishment of the legal relationship with the User is always applicable. The Dutch text of the general terms and conditions is always decisive for the explanation thereof.'
        }
      ]
    },
    {
      name: 'terms_and_conditions',
      language: 'dutch',
      displayName: 'Algemene Voorwaarden',
      paragraphs: [
        {
          description: 'Wat is een cookie?',
          elaboration:
            'Wij maken op deze website gebruik van cookies. Een cookie is een eenvoudig klein bestandje dat met pagina’s van deze website [en/of Flash-applicaties] wordt meegestuurd en door uw browser op uw device (computer/telefoon/tablet) wordt opgeslagen. De daarin opgeslagen informatie kan bij een volgend bezoek weer naar onze servers teruggestuurd worden.'
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
