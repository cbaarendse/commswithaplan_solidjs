// packages
import {readable, Readable} from 'svelte/store';

// interfaces
import type {Article} from '../../both/typings/types';

export const termsAndConditions: Readable<Article[]> = readable(
  [
    {
      displayName: 'Article 1. General',
      language: 'english',
      name: 'article_01',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'These terms and conditions apply to every offer, quotation and agreement between Five Trees BV, hereinafter referred to as: “User”, and a Client to which the User has declared these terms and conditions applicable, insofar as the parties have not expressly deviated from these terms and conditions in writing.'
        },
        {
          displayName: '2.',
          description:
            'The present terms and conditions also apply to agreements with the User, for the implementation of which the User must involve third parties. User can operate under registered trade names other than the name mentioned in Article 1, Member 1.'
        },
        {
          displayName: '3.',
          description:
            'These general terms and conditions are also written for the employees of the User and its management.'
        },
        {
          displayName: '4.',
          description: 'The applicability of any purchase or other conditions of the Client is expressly rejected.'
        },
        {
          displayName: '5.',
          description:
            'If one or more provisions in these general terms and conditions are at any time wholly or partially invalid or should be annulled, the other provisions of these general terms and conditions will remain fully applicable. The User and the Client will then enter into consultation in order to agree on new provisions to replace the void or voided provisions, taking into account as much as possible the purpose and intent of the original provisions.'
        },
        {
          displayName: '6.',
          description:
            "If there is a lack of clarity regarding the interpretation of one or more provisions of these general terms and conditions, the interpretation must be made 'in the spirit' of these provisions."
        },
        {
          displayName: '7.',
          description:
            'If a situation arises between the parties that is not regulated in these general terms and conditions, this situation must be assessed in the spirit of these general terms and conditions.'
        },
        {
          displayName: '8.',
          description:
            'If the User does not always require strict compliance with these terms and conditions, this does not mean that the provisions thereof do not apply, or that the User would to any extent lose the right to demand strict compliance with the provisions of these terms and conditions in other cases.'
        }
      ]
    },
    {
      displayName: 'Article 2 Quotations and offers',
      language: 'english',
      name: 'article_02',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'All quotations and offers from the User are without obligation, unless a term for acceptance has been set in the quotation. If no acceptance period has been set, no rights can be derived in any way from the quotation or offer if the product to which the quotation or offer relates is no longer available in the meantime.'
        },
        {
          displayName: '2.',
          description:
            'User cannot be held to his quotations or offers if the Client can reasonably understand that the quotations or offers, or a part thereof, contain an obvious mistake or error.'
        },
        {
          displayName: '3.',
          description:
            'The prices stated in a quotation or offer are exclusive of VAT and other government levies, any costs to be incurred in the context of the agreement, including travel and accommodation, shipping and administration costs, unless indicated otherwise.'
        },
        {
          displayName: '4.',
          description:
            'If the acceptance (whether or not on minor points) deviates from the offer included in the quotation or offer, the User is not bound by it. The agreement will then not be concluded in accordance with this deviating acceptance, unless the User indicates otherwise.'
        },
        {
          displayName: '5.',
          description:
            'A composite quotation does not oblige the User to perform part of the assignment for a corresponding part of the stated price. Offers or quotations do not automatically apply to future orders.'
        }
      ]
    },
    {
      displayName:
        'Article 3 Contract duration; execution terms, transfer of risk, execution and amendment of the agreement; price increase',
      language: 'english',
      name: 'article_03',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'The agreement between the User and the Client is entered into for an indefinite period of time, unless the nature of the agreement dictates otherwise or if the parties expressly agree otherwise in writing.'
        },
        {
          displayName: '2.',
          description:
            'If a term has been agreed or specified for the performance of certain activities or for the delivery of certain items, this is never a strict deadline. If a term is exceeded, the Client must therefore give User written notice of default. User must be offered a reasonable term to still implement the agreement.'
        },
        {
          displayName: '3.',
          description:
            'User will perform the agreement to the best of his knowledge and ability and in accordance with the requirements of good workmanship. All this on the basis of the state of science known at that time.'
        },
        {
          displayName: '4.',
          description:
            'User has the right to have certain activities performed by third parties. The applicability of Article 7:404, 7:407 paragraph 2 and 7:409 of the Dutch Civil Code is expressly excluded.'
        },
        {
          displayName: '5.',
          description:
            'If the User or third parties engaged by the User in the context of the assignment perform work at the location of the Client or a location designated by the Client, the Client will provide the facilities reasonably desired by those employees free of charge.'
        },
        {
          displayName: '6.',
          description:
            'Delivery is made ex company of the User. The Client is obliged to take delivery of the goods the moment they are made available to him. If the Client refuses to accept or is negligent in providing information or instructions. If necessary for the delivery, the User is entitled to store the goods at the expense and risk of the Client. The risk of loss, damage or depreciation is transferred to the Client at the moment when goods are available to the Client.'
        },
        {
          displayName: '7.',
          description:
            'User is entitled to execute the agreement in different phases and to invoice the part thus executed separately.'
        },
        {
          displayName: '8.',
          description:
            'If the agreement is executed in phases, the User can suspend the execution of those parts that belong to a following phase until the Client has approved the results of the preceding phase in writing.'
        },
        {
          displayName: '9.',
          description:
            'The Client shall ensure that all information, which the User indicates is necessary or which the Client should reasonably understand to be necessary for the execution of the agreement, is provided to the User in a timely manner. If the information required for the execution of the agreement has not been provided to the User in time, the User has the right to suspend the execution of the agreement and/or to charge the additional costs resulting from the delay to the Client according to the then usual rates. bring. The execution period does not start until after the Client has made the data available to the User. The User is not liable for damage, of whatever nature, because the User has based on incorrect and/or incomplete information provided by the Client.'
        },
        {
          displayName: '10.',
          description:
            'If during the execution of the agreement it appears that it is necessary for a proper execution to change or supplement it, the parties will proceed to adjust the agreement in good time and in mutual consultation. If the nature, scope or content of the agreement, whether or not at the request or direction of the Client, of the competent authorities, etc., is changed and the agreement is changed in qualitative and/or quantitative terms as a result, this may have consequences for what was originally agreed. As a result, the originally agreed amount can also be increased or decreased. The User will provide a price quote in advance as much as possible. Furthermore, by changing the agreement, the originally stated term of execution can be changed. The Client accepts the possibility of amending the agreement, including the change in price and term of execution.'
        },
        {
          displayName: '11.',
          description:
            'If the agreement is changed, including a supplement, the User is entitled to implement it only after approval has been given by the person authorized within the User and the Client has agreed to the price and other conditions stated for the implementation, including including the time to be determined at which time it will be implemented. Not or not immediately executing the amended agreement does not constitute default on the part of the User and is not a ground for the Client to terminate or cancel the agreement.'
        },
        {
          displayName: '12.',
          description:
            'Without being in default, User can refuse a request to change the agreement, if this could have qualitative and/or quantitative consequences, for example for the work to be performed or goods to be delivered in that context.'
        },
        {
          displayName: ' 13.',
          description:
            'If the Client should be in default in the proper fulfillment of what he is obliged to towards the User, then the Client is liable for all damage on the part of the User as a result, directly or indirectly. '
        },
        {
          displayName: '14.',
          description:
            'If the User agrees on a fixed fee or fixed price with the Client, the User is nevertheless entitled at all times to increase this fee or price without the Client being entitled to dissolve the agreement for that reason, if the increase of the price arises from a power or obligation under the law or regulations or is caused by an increase in the price of raw materials, wages, etc. or on other grounds that were not reasonably foreseeable when the agreement was entered into.'
        },
        {
          displayName: '15.',
          description:
            'If the price increase, other than as a result of an amendment to the agreement, exceeds 10% and takes place within three months after the conclusion of the agreement, then only the Client who is entitled to invoke Title 5 Section 3 of Book 6 of the Dutch Civil Code is entitled to to dissolve the agreement by means of a written statement, unless User - is then still willing to perform the agreement on the basis of what was originally agreed; - if the price increase results from a power or an obligation resting on the User under the law; - if it has been stipulated that the delivery is longer than three months after the conclusion of the agreement will take place; - or, in the case of delivery of an item, if it has been stipulated that delivery will take place more than three months after the purchase.'
        }
      ]
    },
    {
      displayName: 'Article 4 Suspension, dissolution and early termination of the agreement',
      language: 'english',
      name: 'article_04',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'User is authorized to suspend the fulfillment of the obligations or to dissolve the agreement, if the Client does not, not fully or not timely fulfill the obligations under the agreement, after the conclusion of the agreement User becomes aware of circumstances give good reason to fear that the Client will not fulfill its obligations if, when the agreement was concluded, the Client was requested to provide security for the fulfillment of its obligations under the agreement and this security is not forthcoming or is insufficient or if due to the delay on the part of the The Client can no longer be expected to fulfill the agreement under the originally agreed conditions.'
        },
        {
          displayName: '2.',
          description:
            'Furthermore, the User is authorized to dissolve the agreement if circumstances arise of such a nature that fulfillment of the agreement is impossible or if other circumstances arise that are of such a nature that unaltered maintenance of the agreement cannot reasonably be expected of the User.'
        },
        {
          displayName: '3.',
          description:
            "If the agreement is dissolved, the User's claims against the Client are immediately due and payable."
        },
        {
          displayName: '4.',
          description:
            'If the User suspends the fulfillment of the obligations, he retains his rights under the law and the agreement. If the User proceeds to suspension or dissolution, he is in no way obliged to compensate damage and costs incurred in any way.'
        },
        {
          displayName: '5.',
          description:
            'If the dissolution is attributable to the Client, the User is entitled to compensation for the damage, including the costs, incurred directly and indirectly as a result.'
        },
        {
          displayName: '6.',
          description:
            'If the Client fails to fulfill its obligations arising from the agreement and this non-compliance justifies dissolution, the User is entitled to dissolve the agreement immediately and with immediate effect without any obligation on its part to pay any compensation or indemnification, while the Client, by virtue of of breach of contract, but is obliged to pay compensation or indemnification.'
        },
        {
          displayName: '7.',
          description:
            'If the agreement is terminated prematurely by the User, the User will arrange for the transfer of work still to be performed to third parties in consultation with the Client. This unless the termination is attributable to the Client. If the transfer of the work entails additional costs for the User, these will be charged to the Client. The Client is obliged to pay these costs within the specified term, unless the User indicates otherwise.'
        },
        {
          displayName: '8.',
          description:
            "In the event of liquidation, (application for) suspension of payments or bankruptcy, attachment - if and insofar as the attachment is not lifted within three months - at the expense of the Client, debt restructuring or any other circumstance as a result of which the Client can no longer freely can dispose of his assets, the User is free to terminate the agreement with immediate effect or to cancel the order or agreement, without any obligation on his part to pay any compensation or compensation. In that case, the User's claims against the Client are immediately due and payable."
        },
        {
          displayName: '9.',
          description:
            'If the Client cancels an order placed in whole or in part, the work that was performed and the items ordered or prepared for that purpose, plus any delivery, removal and delivery costs thereof and the working time reserved for the execution of the agreement, will be fully paid to be charged to the Client.'
        }
      ]
    },
    {
      displayName: 'Article 5 Force majeure',
      language: 'english',
      name: 'article_05',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'The User is not obliged to fulfill any obligation towards the Client if he is prevented from doing so as a result of a circumstance that is not due to fault, and is not for his account under the law, a legal act or generally accepted standards.'
        },
        {
          displayName: '2.',
          description:
            'In these general terms and conditions, force majeure is understood to mean, in addition to what is understood in this regard in law and jurisprudence, all external causes, foreseen or unforeseen, over which the User cannot exercise any influence, but as a result of which the User is unable to fulfill its obligations. Strikes in the company of the User or of third parties included. User also has the right to invoke force majeure if the circumstance that prevents (further) fulfillment of the agreement occurs after User should have fulfilled his obligation.'
        },
        {
          displayName: '3.',
          description:
            'User can suspend the obligations under the agreement during the period that the force majeure continues. If this period is longerexceeds two months, each of the parties is entitled to dissolve the agreement, without any obligation to compensate the other party for damage.'
        },
        {
          displayName: '4.',
          description:
            'Insofar as the User has partially fulfilled or will be able to fulfill his obligations under the agreement at the time of the occurrence of force majeure, and the part fulfilled or to be fulfilled has independent value, the User is entitled to separately fulfill the part already fulfilled or to be fulfilled. to invoice. The Client is obliged to pay this invoice as if it were a separate agreement.'
        }
      ]
    },
    {
      displayName: 'Article 6 Payment and collection costs',
      language: 'english',
      name: 'article_06',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Payment must always be made within 30 days of the invoice date, in a manner to be indicated by the User in the currency in which the invoice is made, unless otherwise indicated in writing by the User. User is entitled to invoice periodically.'
        },
        {
          displayName: '2.',
          description:
            'If the Client fails to pay an invoice on time, the Client is legally in default. The Client will then owe an interest of 1% per month, unless the statutory interest is higher, in which case the statutory interest is due. The interest on the amount due and payable will be calculated from the moment that the Client is in default until the moment of payment of the full amount owed.'
        },
        {
          displayName: '3.',
          description:
            'The User has the right to have the payments made by the Client go first of all to reduce the costs, then to reduce the interest due and finally to reduce the principal sum and the current interest. The User can, without being in default as a result, refuse an offer of payment if the Client designates a different order for the allocation of the payment. The User can refuse full repayment of the principal if the outstanding and current interest and collection costs are not also paid.4.The Client is never entitled to set off the amount owed by him to the User. Objections to the amount of an invoice do not suspend the payment obligation. The Client who cannot invoke Section 6.5.3 (Articles 231 to 247, Book 6 of the Dutch Civil Code) is also not entitled to suspend payment of an invoice for any other reason.'
        },
        {
          displayName: '5.',
          description:
            'If the Client is in default or in default in the (timely) fulfillment of its obligations, all reasonable costs incurred in obtaining payment out of court will be borne by the Client. The extrajudicial costs are calculated on the basis of what is customary in Dutch collection practice, currently the calculation method according to Rapport Voorwerk II. However, if the User has incurred higher costs for collection that were reasonably necessary, the costs actually incurred will be eligible for reimbursement. Any judicial and enforcement costs incurred will also be recovered from the Client. The Client also owes interest on the collection costs owed.'
        }
      ]
    },
    {
      displayName: 'Article 7 Retention of title',
      language: 'english',
      name: 'article_07',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'The items delivered by the User in the context of the agreement remain the property of the User until the Client has properly fulfilled all obligations under the agreement(s) concluded with the User.'
        },
        {
          displayName: '2.',
          description:
            'Items delivered by the User, which are subject to retention of title pursuant to paragraph 1, may not be resold and may never be used as a means of payment. The Client is not authorized to pledge or in any other way encumber that which falls under the retention of title.'
        },
        {
          displayName: '3.',
          description:
            'The Client must always do everything that can reasonably be expected of him to safeguard the property rights of the User. If third parties seize the goods delivered under retention of title or wish to establish or enforce rights thereon, the Client is obliged to immediately inform the User thereof. Furthermore, the Client undertakes to insure and keep insured the goods delivered subject to retention of title against fire, explosion and water damage as well as against theft and to make the policy of this insurance available to the User for inspection on first request. In the event of a payment of the insurance, the User is entitled to these tokens. Insofar as necessary, the Client undertakes in advance towards the User to cooperate with everything that may (prove) be necessary or desirable in that context.'
        },
        {
          displayName: '4.',
          description:
            "In the event that the User wishes to exercise its property rights referred to in this Article, the Client gives unconditional and irrevocable permission in advance to the User and third parties to be designated by the User to enter all those places where the User's properties are located and to take them back."
        }
      ]
    },
    {
      displayName: 'Article 8 Warranties, research and complaints, limitation period',
      language: 'english',
      name: 'article_08',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'The items to be delivered by the User comply withn the usual requirements and standards that can reasonably be imposed on them at the time of delivery and for which they are intended under normal use in the Netherlands. The warranty referred to in this Article applies to items intended for use within the Netherlands. When used outside the Netherlands, the Client must verify whether its use is suitable for use there and whether it meets the conditions set for it. In that case, the user can set other warranty and other conditions with regard to the goods to be delivered or work to be performed.'
        },
        {
          displayName: '2.',
          description:
            'The warranty referred to in paragraph 1 of this Article applies for a period of 1 year after delivery, unless the nature of the delivery dictates otherwise or the parties have agreed otherwise. If the warranty provided by the User concerns an item that was produced by a third party, the warranty is limited to that provided by the producer of the item, unless stated otherwise.'
        },
        {
          displayName: '3.',
          description:
            "Any form of warranty will lapse if a defect has arisen as a result of or arises from injudicious or improper use thereof or use after the best-before date, incorrect storage or maintenance thereof by the Client and/or by third parties when, without the written permission of the User, the Client or third parties have made or attempted to make changes to the item, other items have been attached to it that should not be attached thereto, or if these have been processed or processed in a manner other than the prescribed one. The Client is also not entitled to a warranty if the defect is caused by or is the result of circumstances beyond the User's control, including weather conditions (such as, but not limited to, extreme rainfall or temperatures) et cetera."
        },
        {
          displayName: '4.',
          description:
            'The Client is obliged to inspect the delivered goods (or have them examined), immediately at the moment that the goods are made available to him or the relevant work has been carried out. In doing so, the Client should investigate whether the quality and/or quantity of the delivered goods corresponds to what has been agreed and meets the requirements that the parties have agreed in this regard. Any visible defects must be reported to the User in writing within seven days of delivery. Any non-visible defects must be reported to the User in writing immediately, but in any event no later than fourteen days after discovery. The report must contain as detailed a displayName as possible of the defect, so that the User is able to respond adequately. The Client must give the User the opportunity to investigate a complaint or have it investigated.'
        },
        {
          displayName: '5.',
          description:
            'If the Client makes a timely complaint, this does not suspend its payment obligation. In that case, the Client also remains obliged to purchase and pay for the items otherwise ordered and for what he has instructed the User.'
        },
        {
          displayName: '6.',
          description:
            'If a defect is reported later, the Client is no longer entitled to repair, replacement or compensation.'
        },
        {
          displayName: '7.',
          description:
            "If it is established that a good is defective and a complaint has been made in good time, the User will return the defective good within a reasonable term after receipt thereof or, if return is not reasonably possible, written notification with regard to the defect by the Client, at the User's discretion. replace or arrange for its repair or pay replacement compensation for it to the Client. In the event of replacement, the Client is obliged to return the replaced item to the User and to transfer ownership thereof to the User, unless the User indicates otherwise."
        },
        {
          displayName: '8.',
          description:
            'If it is established that a complaint is unfounded, the costs incurred as a result, including the investigation costs incurred by the User as a result, will be borne in full by the Client.'
        },
        {
          displayName: '9.',
          description:
            'After expiry of the warranty period, all costs for repair or replacement, including administration, shipping and call-out costs, will be charged to the Client.'
        },
        {
          displayName: '10.',
          description:
            'Contrary to the statutory limitation periods, the limitation period for all claims and defenses against the User and third parties involved by the User in the execution of an agreement is one year.'
        }
      ]
    },
    {
      displayName: 'Article 9 Liability',
      language: 'english',
      name: 'article_09',
      paragraphs: [
        {
          displayName: '1.',
          description: 'If the User should be liable, this liability is limited to what is regulated in this provision.'
        },
        {
          displayName: '2.',
          description:
            'The User is not liable for damage, of whatever nature, caused by the fact that the User relied on incorrect and/or incomplete information provided by or on behalf of the Client.'
        },
        {
          displayName: '3.',
          description:
            "If the User should be liable for any damage, the User's liability is limited to mano more than once the invoice value of the order, at least up to that part of the order to which the liability relates."
        },
        {
          displayName: '4.',
          description:
            "The User's liability is in any case always limited to the amount paid out by his insurer, where appropriate."
        },
        {displayName: '5.', description: 'User is only liable for direct damage.'},
        {
          displayName: '6.',
          description:
            "Direct damage is exclusively understood to mean the reasonable costs to determine the cause and extent of the damage, insofar as the determination relates to damage within the meaning of these terms and conditions, any reasonable costs incurred to fulfill the User's defective performance of the agreement, insofar as these can be attributed to the User and reasonable costs incurred to prevent or limit damage, insofar as the Client demonstrates that these costs have led to limitation of direct damage as referred to in these general terms and conditions. User is never liable for indirect damage, including consequential damage, lost profit, lost savings and damage due to business interruption."
        },
        {
          displayName: '7.',
          description:
            'The limitations of liability included in this Article do not apply if the damage is due to intent or gross negligence on the part of the User or his managerial subordinates.'
        }
      ]
    },
    {
      displayName: 'Article 10 Indemnification',
      language: 'english',
      name: 'article_10',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'The Client indemnifies the User against any claims from third parties who suffer damage in connection with the execution of the agreement and the cause of which is attributable to others than to the User. If the User should be addressed by third parties for this reason, the Client is obliged to assist the User both in and out of court and to immediately do everything that may be expected of him in that case. If the Client fails to take adequate measures, the User is entitled to do so himself, without notice of default. All costs and damage on the part of the User and third parties arising as a result will be entirely at the expense and risk of the Client.'
        }
      ]
    },
    {
      displayName: 'Article 11 Intellectual property',
      language: 'english',
      name: 'article_11',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'The User reserves the rights and powers that accrue to him under the Copyright Act and other intellectual laws and regulations. The User has the right to use the knowledge gained by the execution of an agreement for other purposes, insofar as no strictly confidential information of the Client is disclosed to third parties.'
        }
      ]
    },
    {
      displayName: 'Article 12 Applicable law and disputes',
      language: 'english',
      name: 'article_12',
      paragraphs: [
        {
          displayName: '1.',
          description:
            "All legal relationships to which the User is a party are exclusively governed by Dutch law, even if an agreement is wholly or partially performed abroad or if the party involved in the legal relationship is domiciled there. The applicability of the Vienna Sales Convention is excluded.'}, {displayName: '2.', description: 'The court in the User's place of business has exclusive jurisdiction to hear disputes, unless the law prescribes otherwise, or unless the Client and User have agreed otherwise. Nevertheless, the User has the right to submit the dispute to the competent court according to the law.'}, {displayName: '3.', description: 'The parties will only appeal to the court after they have made every effort to settle a dispute in mutual consultation."
        }
      ]
    },
    {
      displayName: 'Article 13 Location and change of conditions',
      language: 'english',
      name: 'article_13',
      paragraphs: [
        {
          displayName: '1.',
          description: 'These terms and conditions have been filed with the Chamber of Commerce in Amsterdam.'
        },
        {
          displayName: '2.',
          description:
            'The most recently registered version or the version that applied at the time of the establishment of the legal relationship with the User is always applicable.'
        },
        {
          displayName: '3.',
          description:
            'The Dutch text of the general terms and conditions is always decisive for the explanation thereof.'
        }
      ]
    },

    {
      displayName: 'Artikel 1 Algemeen',
      language: 'dutch',
      name: 'article_01',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Deze voorwaarden zijn van toepassing op iedere aanbieding, offerte en overeenkomst tussen Five Trees BV hierna te noemen: “Gebruiker”, en een Opdrachtgever waarop Gebruiker deze voorwaarden van toepassing heeft verklaard, voor zover van deze voorwaarden niet door partijen uitdrukkelijk en schriftelijk is afgeweken.'
        },
        {
          displayName: '2.',
          description:
            'De onderhavige voorwaarden zijn eveneens van toepassing op overeenkomsten met Gebruiker, voor de uitvoering waarvan door Gebruiker derden dienen te worden betrokken. Gebruiker kan opereren onder een geregistreerde handelsnaam die anders is dan de naam genoemd in Artikel 1, Lid 1.'
        },
        {
          displayName: '3.',
          description:
            'Deze algemene voorwaarden zijn eveneens geschreven voor de medewerkers van Gebruiker en zijn directie.'
        },
        {
          displayName: '4.',
          description:
            'De toepasselijkheid van eventuele inkoop­ of andere voorwaarden van Opdrachtgever wordt uitdrukkelijk van de hand gewezen.'
        },
        {
          displayName: '5.',
          description:
            'Indien één of meerdere bepalingen in deze algemene voorwaarden op enig moment geheel of gedeeltelijk nietig zijn of vernietigd mochten worden, dan blijft het overigens in deze algemene voorwaarden bepaalde volledig van toepassing. Gebruiker en de Opdrachtgever zullen alsdan in overleg treden teneinde nieuwe bepalingen ter vervanging van de nietige of vernietigde bepalingen overeen te komen, waarbij zoveel als mogelijk het doel en de strekking van de oorspronkelijke bepalingen in acht wordt genomen.'
        },
        {
          displayName: '6.',
          description:
            'Indien onduidelijkheid bestaat omtrent de uitleg van één of meerdere bepalingen van deze algemene voorwaarden, dan dient de uitleg plaats te vinden ‘naar de geest’ van deze bepalingen.'
        },
        {
          displayName: '7.',
          description:
            'Indien zich tussen partijen een situatie voordoet die niet in deze algemene voorwaarden geregeld is, dan dient deze situatie te worden beoordeeld naar de geest van deze algemene voorwaarden.'
        },
        {
          displayName: '8.',
          description:
            'Indien Gebruiker niet steeds strikte naleving van deze voorwaarden verlangt, betekent dit niet dat de bepalingen daarvan niet van toepassing zijn, of dat Gebruiker in enigerlei mate het recht zou verliezen om in andere gevallen de stipte naleving van de bepalingen van deze voorwaarden te verlangen.'
        }
      ]
    },
    {
      displayName: 'Artikel 2 Offertes en aanbiedingen',
      language: 'dutch',
      name: 'article_02',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Alle offertes en aanbiedingen van Gebruiker zijn vrijblijvend, tenzij in de offerte een termijn voor aanvaarding is gesteld. Indien geen aanvaardingstermijn is gesteld, kan aan de offerte of aanbieding op generlei wijze enig recht worden ontleend indien het product waarop de offerte of de aanbieding betrekking heeft in de tussentijd niet meer beschikbaar is.'
        },
        {
          displayName: '2.',
          description:
            'Gebruiker kan niet aan zijn offertes of aanbiedingen worden gehouden indien de Opdrachtgever redelijkerwijs kan begrijpen dat de offertes of aanbiedingen, dan wel een onderdeel daarvan, een kennelijke vergissing of verschrijving bevat.'
        },
        {
          displayName: '3.',
          description:
            'De in een offerte of aanbieding vermelde prijzen zijn exclusief BTW en andere heffingen van overheidswege, eventuele in het kader van de overeenkomst te maken kosten, daaronder begrepen reis- en verblijf-, verzend- en administratiekosten, tenzij anders aangegeven.'
        },
        {
          displayName: '4.',
          description:
            'Indien de aanvaarding (al dan niet op ondergeschikte punten) afwijkt van het in de offerte of de aanbieding opgenomen aanbod dan is Gebruiker daaraan niet gebonden. De overeenkomst komt dan niet overeenkomstig deze afwijkende aanvaarding tot stand, tenzij Gebruiker anders aangeeft.'
        },
        {
          displayName: '5.',
          description:
            'Een samengestelde prijsopgave verplicht Gebruiker niet tot het verrichten van een gedeelte van de opdracht tegen een overeenkomstig deel van de opgegeven prijs. Aanbiedingen of offertes gelden niet automatisch voor toekomstige orders.'
        }
      ]
    },
    {
      displayName:
        'Artikel 3 	Contractsduur; uitvoeringstermijnen, risico-overgang, uitvoering en wijziging overeenkomst; prijsverhoging',
      language: 'dutch',
      name: 'article_03',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'De overeenkomst tussen Gebruiker en de Opdrachtgever wordt aangegaan voor onbepaalde tijd, tenzij uit de aard van de overeenkomst anders voortvloeit of indien partijen uitdrukkelijk en schriftelijk anders overeenkomen.'
        },
        {
          displayName: '2.',
          description:
            'Is voor de uitvoering van bepaalde werkzaamheden of voor de levering van bepaalde zaken een termijn overeengekomen of opgegeven, dan is dit nimmer een fatale termijn. Bij overschrijding van een termijn dient de Opdrachtgever Gebruiker derhalve schriftelijk in gebreke te stellen. Gebruiker dient daarbij een redelijke termijn te worden geboden om alsnog uitvoering te geven aan de overeenkomst.'
        },
        {
          displayName: '3.',
          description:
            'Gebruiker zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van goed vakmanschap uitvoeren. Een en ander op grond van de op dat moment bekende stand der wetenschap.'
        },
        {
          displayName: '4.',
          description:
            'Gebruiker heeft het recht bepaalde werkzaamheden te laten verrichten door derden. De toepasselijkheid van Artikel 7:404, 7:407 lid 2 en 7:409 BW wordt uitdrukkelijk uitgesloten. '
        },
        {
          displayName: '5.',
          description:
            'Indien door Gebruiker of door Gebruiker ingeschakelde derden in het kader van de opdracht werkzaamheden worden verricht op de locatie van de Opdrachtgever of een door de Opdrachtgever aangewezen locatie, draagt de Opdrachtgever kosteloos zorg voor de door die medewerkers in redelijkheid gewenste faciliteiten.'
        },
        {
          displayName: '6.',
          description:
            'Levering geschiedt af bedrijf van Gebruiker. De Opdrachtgever is verplicht de zaken af te nemen op het moment dat deze hem ter beschikking worden gesteld. Indien de Opdrachtgever afname weigert of nalatig is met het verstrekken van informatie of instructies die noodzakelijk zijn voor de levering, dan is Gebruiker gerechtigd de zaken op te slaan voor rekening en risico van de Opdrachtgever. Het risico van verlies, beschadiging of waardevermindering gaat op de Opdrachtgever over op het moment waarop zaken aan de Opdrachtgever ter beschikking staan.'
        },
        {
          displayName: '7.',
          description:
            'Gebruiker is gerechtigd de overeenkomst in verschillende fasen uit te voeren en het aldus uitgevoerde gedeelte afzonderlijk te factureren.'
        },
        {
          displayName: '8.',
          description:
            'Indien de overeenkomst in fasen wordt uitgevoerd kan Gebruiker de uitvoering van die onderdelen die tot een volgende fase behoren opschorten totdat de Opdrachtgever de resultaten van de daaraan voorafgaande fase schriftelijk heeft goedgekeurd.'
        },
        {
          displayName: '9.',
          description:
            'De Opdrachtgever draagt er zorg voor dat alle gegevens, waarvan Gebruiker aangeeft dat deze noodzakelijk zijn of waarvan de Opdrachtgever redelijkerwijs behoort te begrijpen dat deze noodzakelijk zijn voor het uitvoeren van de overeenkomst, tijdig aan Gebruiker worden verstrekt. Indien de voor de uitvoering van de overeenkomst benodigde gegevens niet tijdig aan Gebruiker zijn verstrekt, heeft Gebruiker het recht de uitvoering van de overeenkomst op te schorten en / of de uit de vertraging voortvloeiende extra kosten volgens de alsdan gebruikelijke tarieven aan de Opdrachtgever in rekening te brengen. De uitvoeringstermijn vangt niet eerder aan dan nadat de Opdrachtgever de gegevens aan Gebruiker ter beschikking heeft gesteld. Gebruiker is niet aansprakelijk voor schade, van welke aard ook, doordat Gebruiker is uitgegaan van door de Opdrachtgever verstrekte onjuiste en / of onvolledige gegevens.'
        },
        {
          displayName: '10.',
          description:
            'Indien tijdens de uitvoering van de overeenkomst blijkt dat het voor een behoorlijke uitvoering daarvan noodzakelijk is om deze te wijzigen of aan te vullen, dan zullen partijen tijdig en in onderling overleg tot aanpassing van de overeenkomst overgaan. Indien de aard, omvang of inhoud van de overeenkomst, al dan niet op verzoek of aanwijzing van de Opdrachtgever, van de bevoegde instanties et cetera, wordt gewijzigd en de overeenkomst daardoor in kwalitatief en / of kwantitatief opzicht wordt gewijzigd, dan kan dit consequenties hebben voor hetgeen oorspronkelijk overeengekomen werd. Daardoor kan ook het oorspronkelijk overeengekomen bedrag worden verhoogd of verlaagd. Gebruiker zal daarvan zoveel als mogelijk vooraf prijsopgaaf doen. Door een wijziging van de overeenkomst kan voorts de oorspronkelijk opgegeven termijn van uitvoering worden gewijzigd. De Opdrachtgever aanvaardt de mogelijkheid van wijziging van de overeenkomst, daaronder begrepen de wijziging in prijs en termijn van uitvoering.'
        },
        {
          displayName: '11.',
          description:
            'Indien de overeenkomst wordt gewijzigd, daaronder begrepen een aanvulling, dan is Gebruiker gerechtigd om daaraan eerst uitvoering te geven nadat daarvoor akkoord is gegeven door de binnen Gebruiker bevoegde persoon en de Opdrachtgever akkoord is gegaan met de voor de uitvoering opgegeven prijs en andere voorwaarden, daaronder begrepen het alsdan te bepalen tijdstip waarop daaraan uitvoering gegeven zal worden. Het niet of niet onmiddellijk uitvoeren van de gewijzigde overeenkomst levert geen wanprestatie van Gebruiker op en is voor de Opdrachtgever geen grond om de overeenkomst op te zeggen of te annuleren.'
        },
        {
          displayName: '12.',
          description:
            'Zonder daarmee in gebreke te komen, kan Gebruiker een verzoek tot wijziging van de overeenkomst weigeren, indien dit in kwalitatief en / of kwantitatief opzicht gevolg zou kunnen hebben bijvoorbeeld voor de in dat kader te verrichten werkzaamheden of te leveren zaken.'
        },
        {
          displayName: ' 13.',
          description:
            'Indien de Opdrachtgever in gebreke mocht komen in de deugdelijke nakoming van hetgeen waartoe hij jegens Gebruiker gehouden is, dan is de Opdrachtgever aansprakelijk voor alle schade aan de zijde van Gebruiker daardoor direct of indirect ontstaan. '
        },
        {
          displayName: '14.',
          description:
            'Indien Gebruiker met de Opdrachtgever een vast honorarium of vaste prijs overeenkomt, dan is Gebruiker niettemin te allen tijde gerechtigd tot verhoging van dit honorarium of deze prijs zonder dat de Opdrachtgever in dat geval gerechtigd is om de overeenkomst om die reden te ontbinden, indien de verhoging van de prijs voortvloeit uit een bevoegdheid of verplichting ingevolge de wet- of regelgeving of haar oorzaak vindt in een stijging van de prijs van grondstoffen, lonen et cetera of op andere gronden die bij het aangaan van de overeenkomst redelijkerwijs niet voorzienbaar waren.'
        },
        {
          displayName: '15.',
          description:
            'Indien de prijsstijging anders dan als gevolg van een wijziging van de overeenkomst meer bedraagt dan 10% en plaatsvindt binnen drie maanden na het sluiten van de overeenkomst, dan is uitsluitend de Opdrachtgever die een beroep toekomt op titel 5 afdeling 3 van Boek 6 BW gerechtigd de overeenkomst door een schriftelijke verklaring te ontbinden, tenzij Gebruiker -	alsdan alsnog bereid is om de overeenkomst op basis van het oorspronkelijk overeengekomene uit te voeren; -	indien de prijsverhoging voortvloeit uit een bevoegdheid of een op Gebruiker rustende verplichting ingevolge de wet; -	indien bedongen is dat de aflevering langer dan drie maanden na de totstandkoming van de overeenkomst zal plaatsvinden; -	of, bij levering van een zaak, indien is bedongen dat de aflevering langer dan drie maanden na de koop zal plaatsvinden.'
        }
      ]
    },
    {
      displayName: 'Artikel 4  Opschorting, ontbinding en tussentijdse opzegging van de overeenkomst',
      language: 'dutch',
      name: 'article_04',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Gebruiker is bevoegd de nakoming van de verplichtingen op te schorten of de overeenkomst te ontbinden, indien de Opdrachtgever de verplichtingen uit de overeenkomst niet, niet volledig of niet tijdig nakomt, na het sluiten van de overeenkomst Gebruiker ter kennis gekomen omstandigheden goede grond geven te vrezen dat de Opdrachtgever de verplichtingen niet zal nakomen, indien de Opdrachtgever bij het sluiten van de overeenkomst verzocht is om zekerheid te stellen voor de voldoening van zijn verplichtingen uit de overeenkomst en deze zekerheid uitblijft of onvoldoende is of indien door de vertraging aan de zijde van de Opdrachtgever niet langer van Gebruiker kan worden gevergd dat hij de overeenkomst tegen de oorspronkelijk overeengekomen condities zal nakomen.'
        },
        {
          displayName: '2.',
          description:
            'Voorts is Gebruiker bevoegd de overeenkomst te ontbinden indien zich omstandigheden voordoen welke van dien aard zijn dat nakoming van de overeenkomst onmogelijk is of indien er zich anderszins omstandigheden voordoen die van dien aard zijn dat ongewijzigde instandhouding van de overeenkomst in redelijkheid niet van Gebruiker kan worden gevergd.'
        },
        {
          displayName: '3.',
          description:
            'Indien de overeenkomst wordt ontbonden zijn de vorderingen van Gebruiker op de Opdrachtgever onmiddellijk opeisbaar. Indien Gebruiker de nakoming van de verplichtingen opschort, behoudt hij zijn aanspraken uit de wet en overeenkomst.'
        },
        {
          displayName: '4.',
          description:
            'Indien Gebruiker tot opschorting of ontbinding overgaat, is hij op generlei wijze gehouden tot vergoeding van schade en kosten daardoor op enigerlei wijze ontstaan.'
        },
        {
          displayName: '5.',
          description:
            'Indien de ontbinding aan de Opdrachtgever toerekenbaar is, is Gebruiker gerechtigd tot vergoeding van de schade, daaronder begrepen de kosten, daardoor direct en indirect ontstaan.'
        },
        {
          displayName: '6.',
          description:
            'Indien de Opdrachtgever zijn uit de overeenkomst voortvloeiende verplichtingen niet nakomt en deze niet-nakoming ontbinding rechtvaardigt, dan is Gebruiker gerechtigd de overeenkomst terstond en met directe ingang te ontbinden zonder enige verplichting zijnerzijds tot betaling van enige schadevergoeding of schadeloosstelling, terwijl de Opdrachtgever, uit hoofde van wanprestatie, wél tot schadevergoeding of schadeloosstelling is verplicht.'
        },
        {
          displayName: '7.',
          description:
            'Indien de overeenkomst tussentijds wordt opgezegd door Gebruiker, zal Gebruiker in overleg met de Opdrachtgever zorgdragen voor overdracht van nog te verrichten werkzaamheden aan derden. Dit tenzij de opzegging aan de Opdrachtgever toerekenbaar is. Indien de overdracht van de werkzaamheden voor Gebruiker extra kosten met zich meebrengt, dan worden deze aan de Opdrachtgever in rekening gebracht. De Opdrachtgever is gehouden deze kosten binnen de daarvoor genoemde termijn te voldoen, tenzij Gebruiker anders aangeeft.'
        },
        {
          displayName: '8.',
          description:
            'In geval van liquidatie, van (aanvrage van) surséance van betaling of faillissement, van beslaglegging - indien en voor zover het beslag niet binnen drie maanden is opgeheven - ten laste van de Opdrachtgever, van schuldsanering of een andere omstandigheid waardoor de Opdrachtgever niet langer vrijelijk over zijn vermogen kan beschikken, staat het Gebruiker vrij om de overeenkomst terstond en met directe ingang op te zeggen danwel de order of overeenkomst te annuleren, zonder enige verplichting zijnerzijds tot betaling van enige schadevergoeding of schadeloosstelling. De vorderingen van Gebruiker op de Opdrachtgever zijn in dat geval onmiddellijk opeisbaar.'
        },
        {
          displayName: '9.',
          description:
            'Indien de Opdrachtgever een geplaatste order geheel of gedeeltelijk annuleert, dan zullen de werkzaamheden die werden verricht en de daarvoor bestelde of gereedgemaakte zaken, vermeerderd met de eventuele aan- afvoer- en afleveringskosten daarvan en de voor de uitvoering van de overeenkomst gereserveerde arbeidstijd, integraal aan de Opdrachtgever in rekening worden gebracht.'
        }
      ]
    },
    {
      displayName: 'Artikel 5 Overmacht',
      language: 'dutch',
      name: 'article_05',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Gebruiker is niet gehouden tot het nakomen van enige verplichting jegens de Opdrachtgever indien hij daartoe gehinderd wordt als gevolg van een omstandigheid die niet is te wijten aan schuld, en noch krachtens de wet, een rechtshandeling of in het verkeer geldende opvattingen voor zijn rekening komt.'
        },
        {
          displayName: '2.',
          description:
            'Onder overmacht wordt in deze algemene voorwaarden verstaan, naast hetgeen daaromtrent in de wet en jurisprudentie wordt begrepen, alle van buitenkomende oorzaken, voorzien of niet-voorzien, waarop Gebruiker geen invloed kan uitoefenen, doch waardoor Gebruiker niet in staat is zijn verplichtingen na te komen. Werkstakingen in het bedrijf van Gebruiker of van derden daaronder begrepen. Gebruiker heeft ook het recht zich op overmacht te beroepen indien de omstandigheid die (verdere) nakoming van de overeenkomst verhindert, intreedt nadat Gebruiker zijn verbintenis had moeten nakomen.'
        },
        {
          displayName: '3.',
          description:
            'Gebruiker kan gedurende de periode dat de overmacht voortduurt de verplichtingen uit de overeenkomst opschorten. Indien deze periode langer duurt dan twee maanden, dan is ieder der partijen gerechtigd de overeenkomst te ontbinden, zonder verplichting tot vergoeding van schade aan de andere partij.'
        },
        {
          displayName: '4.',
          description:
            'Voorzoveel Gebruiker ten tijde van het intreden van overmacht zijn verplichtingen uit de overeenkomst inmiddels gedeeltelijk is nagekomen of deze zal kunnen nakomen, en aan het nagekomen respectievelijk na te komen gedeelte zelfstandige waarde toekomt, is Gebruiker gerechtigd om het reeds nagekomen respectievelijk na te komen gedeelte separaat te factureren. De Opdrachtgever is gehouden deze factuur te voldoen als ware er sprake van een afzonderlijke overeenkomst.'
        }
      ]
    },
    {
      displayName: 'Artikel 6	Betaling en incassokosten',
      language: 'dutch',
      name: 'article_06',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Betaling dient steeds te geschieden binnen 30 dagen na factuurdatum, op een door Gebruiker aan te geven wijze in de valuta waarin is gefactureerd, tenzij schriftelijk anders door Gebruiker aangegeven. Gebruiker is gerechtigd om periodiek te factureren.'
        },
        {
          displayName: '2.',
          description:
            'Indien de Opdrachtgever in gebreke blijft in de tijdige betaling van een factuur, dan is de Opdrachtgever van rechtswege in verzuim. De Opdrachtgever is alsdan een rente verschuldigd van 1% per maand, tenzij de wettelijke rente hoger is, in welk geval de wettelijke rente verschuldigd is. De rente over het opeisbare bedrag zal worden berekend vanaf het moment dat de Opdrachtgever in verzuim is tot het moment van voldoening van het volledig verschuldigde bedrag.'
        },
        {
          displayName: '3.',
          description:
            'Gebruiker heeft het recht de door Opdrachtgever gedane betalingen te laten strekken in de eerste plaats in mindering van de kosten, vervolgens in mindering van de opengevallen rente en tenslotte in mindering van de hoofdsom en de lopende rente. Gebruiker kan, zonder daardoor in verzuim te komen, een aanbod tot betaling weigeren, indien de Opdrachtgever een andere volgorde voor de toerekening van de betaling aanwijst. Gebruiker kan volledige aflossing van de hoofdsom weigeren, indien daarbij niet eveneens de opengevallen en lopende rente en incassokosten worden voldaan.'
        },
        {
          displayName: '4.',
          description:
            'De Opdrachtgever is nimmer gerechtigd tot verrekening van het door hem aan Gebruiker verschuldigde. Bezwaren tegen de hoogte van een factuur schorten de betalingsverplichting niet op. De Opdrachtgever die geen beroep toekomt op afdeling 6.5.3 (de Artikelen 231 tot en met 247 boek 6 BW) is evenmin gerechtigd om de betaling van een factuur om een andere reden op te schorten.'
        },
        {
          displayName: '5.',
          description:
            'Indien de Opdrachtgever in gebreke of in verzuim is in de (tijdige) nakoming van zijn verplichtingen, dan komen alle redelijke kosten ter verkrijging van voldoening buiten rechte voor rekening van de Opdrachtgever. De buitengerechtelijke kosten worden berekend op basis van hetgeen in de Nederlandse incassopraktijk gebruikelijk is, momenteel de berekeningsmethode volgens Rapport Voorwerk II. Indien Gebruiker echter hogere kosten ter incasso heeft gemaakt die redelijkerwijs noodzakelijk waren, komen de werkelijk gemaakte kosten voor vergoeding in aanmerking. De eventuele gemaakte gerechtelijke en executiekosten zullen eveneens op de Opdrachtgever worden verhaald. De Opdrachtgever is over de verschuldigde incassokosten eveneens rente verschuldigd.'
        }
      ]
    },
    {
      displayName: 'Artikel 7  Eigendomsvoorbehoud',
      language: 'dutch',
      name: 'article_07',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Het door in het kader van de overeenkomst Gebruiker geleverde blijft eigendom van Gebruiker totdat de Opdrachtgever alle verplichtingen uit de met Gebruiker gesloten overeenkomst(en) deugdelijk is nagekomen.'
        },
        {
          displayName: '2.',
          description:
            'Het door Gebruiker geleverde, dat ingevolge lid 1. onder het eigendomsvoorbehoud valt, mag niet worden doorverkocht en mag nimmer als betaalmiddel worden gebruikt. De Opdrachtgever is niet bevoegd om het onder het eigendomsvoorbehoud vallende te verpanden of op enige andere wijze te bezwaren.'
        },
        {
          displayName: '3.',
          description:
            'De Opdrachtgever dient steeds al hetgeen te doen dat redelijkerwijs van hem verwacht mag worden om de eigendomsrechten van Gebruiker veilig te stellen. Indien derden beslag leggen op het onder eigendomsvoorbehoud geleverde danwel rechten daarop willen vestigen of doen gelden, dan is de Opdrachtgever verplicht om Gebruiker daarvan onmiddellijk op de hoogte te stellen. Voorts verplicht de Opdrachtgever zich om het onder eigendomsvoorbehoud geleverde te verzekeren en verzekerd te houden tegen brand, ontploffings- en waterschade alsmede tegen diefstal en de polis van deze verzekering op eerste verzoek aan Gebruiker ter inzage te geven. Bij een eventuele uitkering van de verzekering is Gebruiker gerechtigd tot deze penningen. Voorzoveel als nodig verbindt de Opdrachtgever zich er jegens Gebruiker bij voorbaat toe om zijn medewerking te verlenen aan al hetgeen dat in dat kader nodig of wenselijk mocht (blijken) te zijn. '
        },
        {
          displayName: '4.',
          description:
            'Voor het geval Gebruiker zijn in dit Artikel aangeduide eigendomsrechten wil uitoefenen, geeft de Opdrachtgever bij voorbaat onvoorwaardelijke en niet herroepelijke toestemming aan Gebruiker en door Gebruiker aan te wijzen derden om al die plaatsen te betreden waar de eigendommen van Gebruiker zich bevinden en deze terug te nemen.'
        }
      ]
    },
    {
      displayName: 'Artikel 8  Garanties, onderzoek en reclames, verjaringstermijn',
      language: 'dutch',
      name: 'article_08',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'De door Gebruiker te leveren zaken voldoen aan de gebruikelijke eisen en normen die daaraan op het moment van levering redelijkerwijs gesteld kunnen worden en waarvoor zij bij normaal gebruik in Nederland zijn bestemd. De in dit Artikel genoemde garantie is van toepassing op zaken die bestemd zijn voor het gebruik binnen Nederland. Bij gebruik buiten Nederland dient de Opdrachtgever zelf te verifiëren of het gebruik daarvan geschikt is voor het gebruik aldaar en voldoen aan de voorwaarden die daaraan gesteld worden. Gebruiker kan in dat geval andere garantie- en andere voorwaarden stellen ter zake van de te leveren zaken of uit te voeren werkzaamheden.'
        },
        {
          displayName: '2.',
          description:
            'De in lid 1 van dit Artikel genoemde garantie geldt voor een periode van 1 jaar na levering, tenzij uit de aard van het geleverde anders voortvloeit of partijen anders zijn overeengekomen. Indien de door Gebruiker verstrekte garantie een zaak betreft die door een derde werd geproduceerd, dan is de garantie beperkt tot die, die door de producent van de zaak ervoor wordt verstrekt, tenzij anders wordt vermeld.'
        },
        {
          displayName: '3.',
          description:
            'Iedere vorm van garantie komt te vervallen indien een gebrek is ontstaan als gevolg van of voortvloeit uit onoordeelkundig of oneigenlijk gebruik daarvan of gebruik na de houdbaarheidsdatum, onjuiste opslag of onderhoud daaraan door de Opdrachtgever en / of door derden wanneer, zonder schriftelijke toestemming van Gebruiker, de Opdrachtgever of derden aan de zaak wijzigingen hebben aangebracht danwel hebben getracht aan te brengen, daaraan andere zaken werden bevestigd die daaraan niet bevestigd dienen te worden of indien deze werden ver- of bewerkt op een andere dan de voorgeschreven wijze. De Opdrachtgever komt evenmin aanspraak op garantie toe indien het gebrek is ontstaan door of het gevolg is van omstandigheden waar Gebruiker geen invloed op kan uitoefenen, daaronder begrepen weersomstandigheden (zoals bijvoorbeeld doch niet uitsluitend, extreme regenval of temperaturen) et cetera.'
        },
        {
          displayName: '4.',
          description:
            'De Opdrachtgever is gehouden het geleverde te (doen) onderzoeken, onmiddellijk op het moment dat de zaken hem ter beschikking worden gesteld respectievelijk de desbetreffende werkzaamheden zijn uitgevoerd. Daarbij behoort de Opdrachtgever te onderzoeken of kwaliteit en/of kwantiteit van het geleverde overeenstemt met hetgeen is overeengekomen en voldoet aan de eisen die partijen dienaangaande zijn overeengekomen. Eventuele zichtbare gebreken dienen binnen zeven dagen na levering schriftelijk aan Gebruiker te worden gemeld. Eventuele niet zichtbare gebreken dienen terstond, doch in ieder geval uiterlijk binnen veertien dagen, na ontdekking daarvan, schriftelijk aan Gebruiker te worden gemeld. De melding dient een zo gedetailleerd mogelijke omschrijving van het gebrek te bevatten, zodat Gebruiker in staat is adequaat te reageren. De Opdrachtgever dient Gebruiker in de gelegenheid te stellen een klacht te (doen) onderzoeken.'
        },
        {
          displayName: '5.',
          description:
            'Indien de Opdrachtgever tijdig reclameert, schort dit zijn betalingsverplichting niet op. De Opdrachtgever blijft in dat geval ook gehouden tot afname en betaling van de overigens bestelde zaken en hetgeen waartoe hij Gebruiker opdracht gegeven heeft.'
        },
        {
          displayName: '6.',
          description:
            'Indien van een gebrek later melding wordt gemaakt, dan komt de Opdrachtgever geen recht meer toe op herstel, vervanging of schadeloosstelling.'
        },
        {
          displayName: '7.',
          description:
            'Indien vaststaat dat een zaak gebrekkig is en dienaangaande tijdig is gereclameerd, dan zal Gebruiker de gebrekkige zaak binnen redelijke termijn na retourontvangst daarvan danwel, indien retournering redelijkerwijze niet mogelijk is, schriftelijke kennisgeving ter zake van het gebrek door de Opdrachtgever, ter keuze van Gebruiker, vervangen of zorgdragen voor herstel daarvan danwel vervangende vergoeding daarvoor aan de Opdrachtgever voldoen. In geval van vervanging is de Opdrachtgever gehouden om de vervangen zaak aan Gebruiker te retourneren en de eigendom daarover aan Gebruiker te verschaffen, tenzij Gebruiker anders aangeeft.'
        },
        {
          displayName: '8.',
          description:
            'Indien komt vast te staan dat een klacht ongegrond is, dan komen de kosten daardoor ontstaan, daaronder begrepen de onderzoekskosten, aan de zijde van Gebruiker daardoor gevallen, integraal voor rekening van de Opdrachtgever.'
        },
        {
          displayName: '9.',
          description:
            'Na verloop van de garantietermijn zullen alle kosten voor herstel of vervanging, inclusief administratie-, verzend- en voorrijdkosten, aan de Opdrachtgever in rekening gebracht worden.'
        },
        {
          displayName: '10.',
          description:
            'In afwijking van de wettelijke verjaringstermijnen, bedraagt de verjaringstermijn van alle vorderingen en verweren jegens Gebruiker en de door Gebruiker bij de uitvoering van een overeenkomst betrokken derden, één jaar.'
        }
      ]
    },
    {
      displayName: 'Artikel 9  Aansprakelijkheid',
      language: 'dutch',
      name: 'article_09',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Indien Gebruiker aansprakelijk mocht zijn, dan is deze aansprakelijkheid beperkt tot hetgeen in deze bepaling is geregeld.'
        },
        {
          displayName: '2.',
          description:
            'Gebruiker is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat Gebruiker is uitgegaan van door of namens de Opdrachtgever verstrekte onjuiste en / of onvolledige gegevens.'
        },
        {
          displayName: '3.',
          description:
            'Indien Gebruiker aansprakelijk mocht zijn voor enigerlei schade, dan is de aansprakelijkheid van Gebruiker beperkt tot maximaal eenmaal de factuurwaarde van de order, althans tot dat gedeelte van de order waarop de aansprakelijkheid betrekking heeft.'
        },
        {
          displayName: '4.',
          description:
            'De aansprakelijkheid van Gebruiker is in ieder geval steeds beperkt tot het bedrag der uitkering van zijn verzekeraar in voorkomend geval.'
        },
        {displayName: '5.', description: 'Gebruiker is uitsluitend aansprakelijk voor directe schade.'},
        {
          displayName: '6.',
          description:
            'Onder directe schade wordt uitsluitend verstaan de redelijke kosten ter vaststelling van de oorzaak en de omvang van de schade, voor zover de vaststelling betrekking heeft op schade in de zin van deze voorwaarden, de eventuele redelijke kosten gemaakt om de gebrekkige prestatie van Gebruiker aan de overeenkomst te laten beantwoorden, voor zoveel deze aan Gebruiker toegerekend kunnen worden en redelijke kosten, gemaakt ter voorkoming of beperking van schade, voor zover de Opdrachtgever aantoont dat deze kosten hebben geleid tot beperking van directe schade als bedoeld in deze algemene voorwaarden. Gebruiker is nimmer aansprakelijk voor indirecte schade, daaronder begrepen gevolgschade, gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie.'
        },
        {
          displayName: '7.',
          description:
            'De in dit Artikel opgenomen beperkingen van de aansprakelijkheid gelden niet indien de schade te wijten is aan opzet of grove schuld van Gebruiker of zijn leidinggevende ondergeschikten.'
        }
      ]
    },
    {
      displayName: 'Artikel 10 Vrijwaring',
      language: 'dutch',
      name: 'article_10',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'De Opdrachtgever vrijwaart Gebruiker voor eventuele aanspraken van derden, die in verband met de uitvoering van de overeenkomst schade lijden en waarvan de oorzaak aan andere dan aan Gebruiker toerekenbaar is. Indien Gebruiker uit dien hoofde door derden mocht worden aangesproken, dan is de Opdrachtgever gehouden Gebruiker zowel buiten als in rechte bij te staan en onverwijld al hetgeen te doen dat van hem in dat geval verwacht mag worden. Mocht de Opdrachtgever in gebreke blijven in het nemen van adequate maatregelen, dan is Gebruiker, zonder ingebrekestelling, gerechtigd zelf daartoe over te gaan. Alle kosten en schade aan de zijde van Gebruiker en derden daardoor ontstaan, komen integraal voor rekening en risico van de Opdrachtgever.'
        }
      ]
    },
    {
      displayName: 'Artikel 11	Intellectuele eigendom',
      language: 'dutch',
      name: 'article_11',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Gebruiker behoudt zich de rechten en bevoegdheden voor die hem toekomen op grond van de Auteurswet en andere intellectuele wet- en regelgeving. Gebruiker heeft het recht de door de uitvoering van een overeenkomst aan zijn zijde toegenomen kennis ook voor andere doeleinden te gebruiken, voorzover hierbij geen strikt vertrouwelijke informatie van de Opdrachtgever ter kennis van derden wordt gebracht.'
        }
      ]
    },
    {
      displayName: 'Artikel 12 Toepasselijk recht en geschillen',
      language: 'dutch',
      name: 'article_12',
      paragraphs: [
        {
          displayName: '1.',
          description:
            'Op alle rechtsbetrekkingen waarbij Gebruiker partij is, is uitsluitend het Nederlands recht van toepassing, ook indien aan een verbintenis geheel of gedeeltelijk in het buitenland uitvoering wordt gegeven of indien de bij de rechtsbetrekking betrokken partij aldaar woonplaats heeft. De toepasselijkheid van het Weens Koopverdrag wordt uitgesloten.'
        },
        {
          displayName: '2.',
          description:
            'De rechter in de vestigingsplaats van Gebruiker is bij uitsluiting bevoegd van geschillen kennis te nemen, tenzij de wet dwingend anders voorschrijft, of tenzij door Opdrachtgever en Gebruiker anders is overeengekomen. Niettemin heeft Gebruiker het recht het geschil voor te leggen aan de volgens de wet bevoegde rechter.3.Partijen zullen eerst een beroep op de rechter doen nadat zij zich tot het uiterste hebben ingespannen een geschil in onderling overleg te beslechten.'
        }
      ]
    },
    {
      displayName: 'Artikel 13 Vindplaats en wijziging voorwaarden',
      language: 'dutch',
      name: 'article_13',
      paragraphs: [
        {
          displayName: '1.',
          description: 'Deze voorwaarden zijn gedeponeerd bij de Kamer van Koophandel te Amsterdam.'
        },
        {
          displayName: '2.',
          description:
            'Van toepassing is steeds de laatst gedeponeerde versie c.q. de versie zoals die gold ten tijde van het totstandkomen van de rechtsbetrekking met Gebruiker.'
        },
        {
          displayName: '3.',
          description: 'De Nederlandse tekst van de algemene voorwaarden is steeds bepalend voor de uitleg daarvan.'
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Terms And Conditions Chapters closed');
    };
  }
);

export const privacyPolicy: Readable<Article[]> = readable(
  [
    {
      name: 'data_protection',
      language: 'english',
      displayName: 'Personal data protection',
      paragraphs: [
        {
          displayName: 'Information requirements',
          description:
            'Comms With A Plan cares for the protection of your private life. Although you can browse through most of its websites without giving any personal information, in some cases information is required in order to provide the services you request. This website within the commswithaplan.com domain may provide links to third-party sites. In order to use third party content on our site, you may need to accept their specific terms and conditions, including their cookie policies over which we have no control.'
        }
      ]
    },
    {
      name: 'e_services',
      language: 'english',
      displayName: 'Regulation on the protection of personal data e-services',
      paragraphs: [
        {
          displayName: 'E-services',
          description:
            'An e-service is a service or resource that improves communication between users and Comms With A Plan. 3 types of e-services are offered by Comms With A Plan: (1) information services that provide easy and effective access to information; (2) interactive communication services to facilitate marketing communications wohe user; (3) consultations and feedback transaction services that allow basic forms of transactions with Comms With A Plan, such as procurement, financial tions, recruitment, event enrollment and ordering documents.'
        }
      ]
    },
    {
      name: 'privacy_statement',
      language: 'english',
      displayName: 'Information contained in a specific privacy statement',
      paragraphs: [
        {
          displayName:
            'A specific privacy policy statement will contain the following information about the use of your data:',
          description:
            '(1) what information is collected; (2) for what purpose it is collected; (3) the technical means by which it is collected; (4) who sees your information; (5) how you can access, verify its accuracy and correct your tion; (6) how long your data is kept; (7) what security measures are taken to safeguard your information; (8) who to contact if you have questions or aints;'
        }
      ]
    },
    {
      name: 'analytics',
      language: 'english',
      displayName: 'Analytics',
      paragraphs: [
        {
          displayName: 'Measurement',
          description:
            'Analytics measure the effectiveness and efficiency of the Comms With A Plan website. You are free to refuse the use of this service –  via the cookie that appears at the bottom of the first page you visit. Choosing not to use this service does not affect your navigation experience on the Comms With A Plan '
        }
      ]
    },
    {
      name: 'contact',
      language: 'english',
      displayName: 'Contacting Comms With A Plan site',
      paragraphs: [
        {
          displayName: 'Contact and personal information',
          description:
            'Some web pages on commswithaplan.com have a contact button, which activates your email software and invites you to send your comments to a specific mailbox. When you send such a message, your personal data is only collected in order to reply.Your email will be forwarded to another service if the person responsible for the  is unable to answer your question. An email will inform you about which service your question has been forwarded to. If you have any questions about the ssing of your email and related personal data, do not hesitate to include them in your message.'
        }
      ]
    },
    {
      name: 'safe_guarding',
      language: 'english',
      displayName: 'Safeguarding information',
      paragraphs: [
        {
          displayName: 'Safe storage',
          description:
            'Collected personal data are stored by Comms With A Plan. In those cases where collected personal data are stored on a computer of an external subcontractor acting as processor, they are bound by specific contractual clauses and by the confidentiality obligations deriving from the general data protection regulation of April 2016.'
        }
      ]
    },
    {
      name: 'data_protection',
      language: 'dutch',
      displayName: 'Bescherming van persoonsgegevens',
      paragraphs: [
        {
          displayName: 'Informatie vereisten',
          description:
            'Comms With A Plan hecht veel belang aan de bescherming van uw persoonlijke levenssfeer. Hoewel u de meeste van deze websites kunt bezoeken zonder informatie over uzelf te geven, moet u persoonsgegevens doorgeven om van sommige e-diensten gebruik te maken. De websites het commswithaplan.com-domein linken ook naar sitesdere instanties of personen. Om inhoud van derde partijen op onze websites te kunnen gebruiken, moet u in sommige gevallen akkoord gaan met hun specifieke aarden, inclusief hun cookiebeleid waarover wij geen controle hebben.'
        }
      ]
    },
    {
      name: 'e_services',
      language: 'dutch',
      displayName: 'Regulering bescherming persoonlijke data E-diensten',
      paragraphs: [
        {
          displayName: 'E-diensten',
          description:
            'Een e-dienst is een dienst of informatiebron die toegankelijk is via internet met als doel de communicatie tussen gebruikers en Comms With A Plan te verbeteren. Op commswithaplan.com worden drie soorten e-diensten aangeboden: (1) informatieve communicatiediensten om raadplegingen van informatie te vergemakkelijken; (2) interactieve communicatiediensten om marketing-communicatie werk door de gebruiker te vergemakkelijken; (3) transactiediensten die basistransacties met Comms With A Plan mogelijk maken, zoals opdrachten, financiële transacties, werving en selectie, inschrijvingen voor evenementen en het bestellen van documenten.'
        }
      ]
    },
    {
      name: 'privacy_statement',
      language: 'dutch',
      displayName: 'Wat houdt een specifieke privacyverklaring in?',
      paragraphs: [
        {
          displayName: 'Een specifieke privacyverklaring geeft antwoord op de volgende vragen: ',
          description:
            '(1) Welke gegevens worden verzameld?; (2) Waarom worden de gegevens verzameld?; (3) Hoe worden de gegevens verzameld?; (4) Wie kan uw gegevens inzien?; (5) Hoe kunt u uw gegevens inzien, controleren en corrigeren?; (6) Hoelang worden uw gegevens bewaard?; (7) Hoe worden uw gegevens beschermd?; (8) Met wie kunt u contact opnemen bij vragen en klachten?;'
        }
      ]
    },
    {
      name: 'analytics',
      language: 'dutch',
      displayName: 'Analytics',
      paragraphs: [
        {
          displayName: 'Meten',
          description:
            "'Analytics' is de software waarmee we meten hoe doeltreffend en efficiënt de websites van Comms With A Plan zijn. Die dienst is niet verplicht, u kunt die uitschakelen via de banner over cookies onderaan de eerste pagina die u bezoekt. De keuze om deze dienst niet te gebruiken, heeft geen invloed op uw surfcomfort op de Comms With A Plan website."
        }
      ]
    },
    {
      name: 'contact',
      language: 'dutch',
      displayName: 'Contact opnemen met Comms With A Plan-website',
      paragraphs: [
        {
          displayName: 'Contact en persoonsgegevens',
          description:
            'Enkele pagina’s op commswithaplan.com hebben een contactlink, die uw e-mailprogramma activeert en waarmee u opmerkingen naar een specifieke mailbox kunt sturen. Als we een e-mail van u ontvangen, verzamelen we alleen uw persoonsgegevens om u te kunnen antwoorden. Als we uw vraag niet kunnen beantwoorden, sturen we uw bericht door naar een andere dienst. U krijgt dan per e-mail te horen om welke dienst het gaat. Als u vragen heeft over de verwerking van uw e-mail of uw persoonsgegevens, kunt u die in uw bericht opnemen.'
        }
      ]
    },
    {
      name: 'safe_guarding',
      language: 'dutch',
      displayName: 'Gegevens beveiligen',
      paragraphs: [
        {
          displayName: 'Veilige opslag',
          description:
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

export const cookiePolicy: Readable<Article[]> = readable(
  [
    {
      name: 'about_cookies',
      language: 'english',
      displayName: 'About cookies',
      paragraphs: [
        {
          displayName: 'What is a cookie?',
          description:
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
          displayName: 'Wat is een cookie?',
          description:
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
          displayName: 'Tracking cookies of our advertisers',
          description:
            'With your permission our advertisers place so called tracking cookies on your device. They use these cookies to keep track of the website pages and apps you visit that are in their network, to build a profile of your online surf behaviour. This profile partly gets built based on comparable information they get from your visits to other websites and apps from their network. This profile will not be linked to your name, address, e-mail address and comparable pieces of information that are known with us, but it only serves to adjust advertisements to your interests so these are most relevant for you.'
        }
      ]
    },
    {
      name: 'ads_cookies',
      language: 'dutch',
      displayName: 'Advertenties',
      paragraphs: [
        {
          displayName: 'Tracking cookies van onze adverteerders',
          description:
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
          displayName: 'Google Analytics',
          description:
            "Through our website cookies of the American company Google will be placed, as part of their 'Analytics'-service. We use this service to keep track of and get reports on the way visitors use the website.Google can provide this information to third parties when Google is legally required to do so, or as far as third parties process the information on behalf of Google. We have no influence on this. We have allowed Google to use the acquired analytics-information for other Google-services. Names of these cookies can be: '__gpi', '__gads', '__ga', '__gid'"
        }
      ]
    },
    {
      name: 'analytics_cookies',
      language: 'dutch',
      displayName: 'Analyse Cookies',

      paragraphs: [
        {
          displayName: 'Google Analytics',
          description:
            "Via onze website worden cookies geplaatst van het Amerikaanse bedrijf Google,  als deel van de “Analytics”-dienst. Wij gebruiken deze dienst om bij te houden en rapportages te krijgen over hoe bezoekers de website gebruiken. Google kan deze informatie aan derden verschaffen indien Google hiertoe wettelijk wordt verplicht, of voor zover derden de informatie namens Google verwerken. Wij hebben hier geen invloed op. Wij hebben Google wel toegestaan de verkregen analytics informatie te  gebruiken voor andere Google-diensten.  Namen van deze cookies kunnen zijn: '__gpi', '__gads', '__ga', '__gid'"
        },
        {
          displayName: 'Anonimisering',
          description:
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
          displayName: 'Use of functional (permanent) cookies',
          description:
            "These cookies allow us to remember how you're logged in, whether you chose to no longer see advertisements, whether you made an edit to an Article on the Service while logged out, when you logged in or out, the state or history of Service tools you've used. These cookies also allow us to tailor the Service to provide enhanced features and content for you and to remember how you've customized the Service in other ways, such as customizing the toolbars we offer in the right column of every page. The information these cookies collect may be anonymous, and they are not used to track your browsing activity on other sites or services."
        }
      ]
    },
    {
      name: 'functional_cookies',
      language: 'dutch',
      displayName: 'Functionele Cookies',
      paragraphs: [
        {
          displayName: 'Gebruik van functionele (permanente) cookies',
          description:
            'Met behulp van een permanente cookie kunnen wij jou herkennen bij een nieuw bezoek op onze website. De website kan daardoor speciaal op jouw voorkeuren worden ingesteld. Ook wanneer je toestemming hebt gegeven voor het plaatsen van cookies kunnen wij dit door middel van een cookie onthouden. Hierdoor hoef je niet steeds jouw voorkeuren te herhalen waardoor je dus tijd bespaart en een prettiger gebruik van onze website kunt maken. Permanente cookies kun je verwijderen via de instellingen van jouw browser.'
        }
      ]
    },
    {
      name: 'personal_cookies',
      language: 'english',
      displayName: 'Personal cookies',
      paragraphs: [
        {
          displayName: 'Cookies for cookie policy',
          description:
            "These are set by us and only we can read them. They remember: (1) if you have agreed to (or refused) this site’s cookie policy; (2) if you have already replied to our survey pop-up (about how helpful the site content was) - so you won't be asked again."
        }
      ]
    },
    {
      name: 'personal_cookies',
      language: 'dutch',
      displayName: 'Persoonlijke Cookies',
      paragraphs: [
        {
          displayName: 'Cookies voor cookie beleid',
          description:
            'Deze worden door ons ingesteld en alleen wij kunnen ze lezen. Zij onthouden: of u het cookiebeleid van de website heeft aanvaard (of afgewezen) of u onze enquête al heeft beantwoord (over hoe nuttig de inhoud van de site was), zodat wij u dat niet telkens opnieuw hoeven te vragen.'
        }
      ]
    },
    {
      name: 'security_cookies',
      language: 'english',
      displayName: 'Security cookies',
      paragraphs: [
        {
          displayName: 'Use of security cookies',
          description:
            'It is our aim to optimize security for you when you visit our website. For this purpose it might be necessary to maintain cookies, set through us, that track unwanted third party activity on your browser.'
        }
      ]
    },
    {
      name: 'security_cookies',
      language: 'dutch',
      displayName: 'VeiligheidsCookies',
      paragraphs: [
        {
          displayName: 'Gebruik van veiligheidscookies',
          description:
            "Ons doel is om de veiligheid te optimaliseren wanneer U onze website bezoekt. Voor dit doel is het mogelijk nodig om cookies te plaatsen, door ons, die ongewilde 'third party' activiteit volgt in uw browser."
        }
      ]
    }
  ],
  () => {
    () => {
      console.log('Cookie Policy Articles closed');
    };
  }
);
