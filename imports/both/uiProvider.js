export default function UiProvider(language) {
    this.language = language;

    
    
    this.translate = function (input) {
        return this.translations.find((element) => element.name === input)[language].displayName || undefined;
      }
    
      this.describe = function (input) {
        return this.translations.find((element) => element.name === input)[language].description || undefined;
      }
}

// {
//     "advocacy": {
//       "displayName": "Advocacy",
//       "description": "Consumenten verspreiden informatie over je merk."
//     },
//     "ambassador": {
//       "displayName": "Ambassador",
//       "description": "Een (bekend) persoon treedt op als woordvoerder voor je merk."
//     },
//     "app": {
//       "displayName": "App",
//       "description": "Een branded software programma dat werkt op smartphones."
//     },
//     "asset": {
//       "displayName": "Asset",
//       "description": "Een hulpmiddel of programma dat eigendom is van een merk en dat gebruikt kan worden om het verder te bouwen."
//     },
//     "cinema": {
//       "displayName": "Cinema",
//       "description": "Adverteren op het doek in bioscopen."
//     },
//     "console_game": {
//       "displayName": "Console / Game",
//       "description": "Adverteren in een game (online, console, PC) of via een console."
//     },
//     "direct_mail": {
//       "displayName": "Direct Mail",
//       "description": "Fysieke post, geleverd in de brievenbus, gericht of ongericht."
//     },
//     "display": {
//       "displayName": "Display",
//       "description": "Adverteren op websites, in alle mogelijke vormen."
//     },
//     "door_drop": {
//       "displayName": "Folder",
//       "description": "Ongeadresseerde mailings en folders."
//     },
//     "e-mail": {
//       "displayName": "E-Mail",
//       "description": "Electronische mail, geleverd in de inbox, gericht of ongericht."
//     },
//     "event": {
//       "displayName": "Event",
//       "description": "Een branded samenkomst van mensen op een afgesproken plaats en tijd."
//     },
//     "experiential": {
//       "displayName": "Experiential",
//       "description": "Betrekken van consumenten in een ervaring die het product en/of merkwaarden bevat."
//     },
//     "internal_employee": {
//       "displayName": "Internal / Employee",
//       "description": "Het merk verspreidt informatie naar personeelsleden. Zij delen deze informatie eventueel verder."
//     },
//     "loyalty_crm": {
//       "displayName": "Loyalty / CRM",
//       "description": "IT ondersteunde relatie met consumenten."
//     },
//     "magazines": {
//       "displayName": "Magazines",
//       "description": "Adverteren in magazines."
//     },
//     "mobile": {
//       "displayName": "Mobiel",
//       "description": "Branded boodschappen verspreiden door middel van mobiele telefoons."
//     },
//     "newspapers": {
//       "displayName": "Dagbladen",
//       "description": "Adverteren in kranten."
//     },
//     "outdoor": {
//       "displayName": "Buitenreclame",
//       "description": "Adverteren op fysieke punten waarmee de consument alleen buitenshuis in aanraking kan komen."
//     },
//     "packaging": {
//       "displayName": "Verpakking",
//       "description": "Boodschappen op de verpakking van het product."
//     },
//     "pr": {
//       "displayName": "PR",
//       "description": "Communicatie die zich concentreert op het wederzijds belang voor merk en consumenten."
//     },
//     "promotion": {
//       "displayName": "Promotie",
//       "description": "Communicatie die zich concentreert op een tijdelijke verandering in de prijs / waarde verhouding."
//     },
//     "radio": {
//       "displayName": "Radio",
//       "description": "Adverteren in zendtijd van radiostations, reclamezendtijd en in-program."
//     },
//     "sem": {
//       "displayName": "SEM",
//       "description": "Search engine marketing - Betaalde optimalisatie en advertenties op resultaatpagina’s van zoekmachines."
//     },
//     "seo": {
//       "displayName": "SEO",
//       "description": "Search engine optimization -  Gratis optimalisatie op resultaatpagina’s van zoekmachines."
//     },
//     "shopper": {
//       "displayName": "Shopper",
//       "description": "Communicatie in retail-kanalen."
//     },
//     "social": {
//       "displayName": "Social",
//       "description": "Branded vertoning op sociale netwerken, betaald en onbetaald."
//     },
//     "sponsorship": {
//       "displayName": "Sponsorship",
//       "description": "De mogelijkheid om je merk te tonen in ruil voor financiële steun van een persoon, activiteit of organisatie."
//     },
//     "television": {
//       "displayName": "Televisie",
//       "description": "Adverteren in zendtijd van een televisiestation, reclamezendtijd en in-program."
//     },
//     "trade_fair": {
//       "displayName": "Trade Fair",
//       "description": "Vertonen van een merk op een beurs voor een specifieke industrie of doel."
//     },
//     "video_on_demand": {
//       "displayName": "Video On Demand",
//       "description": "Adverteren in een omgeving die op verzoek audiovisuele content biedt aan gebruikers."
//     },
//     "viral": {
//       "displayName": "Viral",
//       "description": "Communicatie op een manier die de kans maximaliseert dat mensen je boodschap zullen doorsturen aan andere mensen. "
//     },
//     "website": {
//       "displayName": "Website",
//       "description": "Elektronische informatie, die opgeslagen is op een server en toegankelijk door middel van een browser."
//     },
//     "word_of_mouth": {
//       "displayName": "Word Of Mouth",
//       "description": "Mensen geven meningen door over je merk aan andere mensen."
//     },
//     "total_reach": {
//       "displayName": "Totaal Bereik",
//       "description": "Het % mensen dat je boodschap waarneemt, door middel van één of meer van de geselecteerde Touch Points."
//     },
//     "locus": {
//       "displayName": "Locus",
//       "description": "Alleen het % mensen dat je boodschap waarneemt door middel van álle geselecteerde Touch Points."
//     }
//   }
//   {
//     "advocacy": {
//       "displayName": "Advocacy",
//       "description": "Consumers spread information about your brand."
//     },
//     "ambassador": {
//       "displayName": "Ambassador",
//       "description": "A (known) person acts as spokesperson for your brand."
//     },
//     "app": {
//       "displayName": "App",
//       "description": "A branded software program that can be used on smartphones."
//     },
//     "asset": {
//       "displayName": "Asset",
//       "description": "A proprietary tool or platform that a brand owns and that can be used to further build it."
//     },
//     "cinema": {
//       "displayName": "Cinema",
//       "description": "Screen advertising in cinemas."
//     },
//     "console_game": {
//       "displayName": "Console / Game",
//       "description": "Advertising in a game (online, console, PC) or on a console."
//     },
//     "direct_mail": {
//       "displayName": "Direct Mail",
//       "description": "Physical mail, delivered to mail boxes, targeted and untargeted."
//     },
//     "display": {
//       "displayName": "Display",
//       "description": "Advertising on websites, through all possible formats."
//     },
//     "door_drop": {
//       "displayName": "Door Drop",
//       "description": "Unadressed mailings and leaflets"
//     },
//     "e-mail": {
//       "displayName": "E-Mail",
//       "description": "Electronic mail, delivered to the inbox, targeted and untargeted."
//     },
//     "event": {
//       "displayName": "Event",
//       "description": "A branded gathering of people at an arranged place and time."
//     },
//     "experiential": {
//       "displayName": "Experiential",
//       "description": "Engaging consumers in an experience that involves the product and/or brand values."
//     },
//     "internal_employee": {
//       "displayName": "Internal / Employee",
//       "description": "Personnel spreads information about your brand."
//     },
//     "loyalty_crm": {
//       "displayName": "Loyalty / CRM",
//       "description": "IT supported relationship with consumers."
//     },
//     "magazines": {
//       "displayName": "Magazines",
//       "description": "Advertising in magazines."
//     },
//     "mobile": {
//       "displayName": "Mobile",
//       "description": "Branded messaging on mobile phones."
//     },
//     "newspapers": {
//       "displayName": "Newspapers",
//       "description": "Advertising in newspapers."
//     },
//     "outdoor": {
//       "displayName": "Outdoor",
//       "description": "Advertising at physical places that are outside the consumers’ home."
//     },
//     "packaging": {
//       "displayName": "Packaging",
//       "description": "Messaging on a product’s package."
//     },
//     "pr": {
//       "displayName": "PR",
//       "description": "Communication that focuses on a mutual benefit for brand and consumers."
//     },
//     "promotion": {
//       "displayName": "Promotion",
//       "description": "Communication that focuses on a temporary change in price / value ratio."
//     },
//     "radio": {
//       "displayName": "Radio",
//       "description": "Advertising on radio stations, in commercial airtime and in-program."
//     },
//     "sem": {
//       "displayName": "SEM",
//       "description": "Search engine marketing - Paid optimization and advertising on search engine results pages."
//     },
//     "seo": {
//       "displayName": "SEO",
//       "description": "Search engine optimization - Free optimization on search engine results pages."
//     },
//     "shopper": {
//       "displayName": "Shopper",
//       "description": "Communication in retail channels."
//     },
//     "social": {
//       "displayName": "Social",
//       "description": "Branded appearance on social networks, paid and unpaid."
//     },
//     "sponsorship": {
//       "displayName": "Sponsorship",
//       "description": "A branding opportunity in exchange for financial support of a person, activity or organization."
//     },
//     "television": {
//       "displayName": "Television",
//       "description": "Advertising on television, in commercial airtime and in-program."
//     },
//     "trade_fair": {
//       "displayName": "Trade Fair",
//       "description": "Appearing at an exhibition for a specific industry or purpose."
//     },
//     "video_on_demand": {
//       "displayName": "Video On Demand",
//       "description": "Advertising in an environment that provides audio visual content to users at request."
//     },
//     "viral": {
//       "displayName": "Viral",
//       "description": "Communication in a way that optimizes the probability that people will forward your message."
//     },
//     "website": {
//       "displayName": "Website",
//       "description": "Electronic information, that is stored on a server and is accessible through a browser."
//     },
//     "word_of_mouth": {
//       "displayName": "Word Of Mouth",
//       "description": "People pass opinions on a brand to other people."
//     },
//     "total_reach": {
//       "displayName": "Total Reach",
//       "description": "The % of people that perceive your message(s), through one or more of the selected Touch Points."
//     },
//     "locus": {
//       "displayName": "Locus",
//       "description": "Only the % of people that perceive your message(s), through áll of the selected Touch Points."
//     }
//   }



  
  