/* This class contains all the logic to make ReachApp work.
* It's referred to all over the code, mainly by use of the Provider package.
* In some cases public properties of this class are accessed directly.
*/
function  ReachAppProvider(touchPointsBasics) {
    // private properties
    const _touchPoints = [];
    let _totalReach = 0.0;
    let _locus = 0.0;
    const _touchPointBasics = [{name:"advocacy",english:{displayName:"Advocacy",description:"Consumers spread information about your brand."},dutch:{displayName:"Advocacy",description:"Consumenten verspreiden informatie over je merk."}},
    {name:"ambassador",english:{displayName:"Ambassador",description:"A (known) person acts as spokesperson for your brand."},dutch:{displayName:"Ambassador",description:"Een (bekend) persoon treedt op als woordvoerder voor je merk."}},
    {name:"app",english:{displayName:"App",description:"A branded software program that can be used on smartphones."},dutch:{displayName:"App",description:"Een branded software programma dat werkt op smartphones."}},
    {name:"asset",english:{displayName:"Asset",description:"A proprietary tool or platform that a brand owns and that can be used to further build it."},dutch:{displayName:"Asset",description:"Een hulpmiddel of programma dat eigendom is van een merk en dat gebruikt kan worden om het verder te bouwen."}},
    {name:"cinema",english:{displayName:"Cinema",description:"Screen advertising in cinemas."},dutch:{displayName:"Cinema",description:"Adverteren op het doek in bioscopen."}},
    {name:"console_game",english:{displayName:"Console / Game",description:"Advertising in a game (online, console, PC) or on a console."},dutch:{displayName:"Console / Game",description:"Adverteren in een game (online, console, PC) of via een console."}},
    {name:"direct_mail",english:{displayName:"Direct Mail",description:"Physical mail, delivered to mail boxes, targeted and untargeted."},dutch:{displayName:"Direct Mail",description:"Fysieke post, geleverd in de brievenbus, gericht of ongericht."}},
    {name:"display",english:{displayName:"Display",description:"Advertising on websites, through all possible formats."},dutch:{displayName:"Display",description:"Adverteren op websites, in alle mogelijke vormen."}},
    {name:"door_drop",english:{displayName:"Door Drop",description:"Unadressed mailings and leaflets"},dutch:{displayName:"Folder",description:"Ongeadresseerde mailings en folders."}},
    {name:"e-mail",english:{displayName:"E-Mail",description:"Electronic mail, delivered to the inbox, targeted and untargeted."},dutch:{displayName:"E-Mail",description:"Electronische mail, geleverd in de inbox, gericht of ongericht."}},
    {name:"event",english:{displayName:"Event",description:"A branded gathering of people at an arranged place and time."},dutch:{displayName:"Event",description:"Een branded samenkomst van mensen op een afgesproken plaats en tijd."}},
    {name:"experiential",english:{displayName:"Experiential",description:"Engaging consumers in an experience that involves the product and/or brand values."},dutch:{displayName:"Experiential",description:"Betrekken van consumenten in een ervaring die het product en/of merkwaarden bevat."}},
    {name:"internal_employee",english:{displayName:"Internal / Employee",description:"Personnel spreads information about your brand."},dutch:{displayName:"Internal / Employee",description:"Het merk verspreidt informatie naar personeelsleden. Zij delen deze informatie eventueel verder."}},
    {name:"loyalty_crm",english:{displayName:"Loyalty / CRM",description:"IT supported relationship with consumers."},dutch:{displayName:"Loyalty / CRM",description:"IT ondersteunde relatie met consumenten."}},
    {name:"magazines",english:{displayName:"Magazines",description:"Advertising in magazines."},dutch:{displayName:"Magazines",description:"Adverteren in magazines."}},
    {name:"mobile",english:{displayName:"Mobile",description:"Branded messaging on mobile phones."},dutch:{displayName:"Mobiel",description:"Branded boodschappen verspreiden door middel van mobiele telefoons."}},
    {name:"newspapers",english:{displayName:"Newspapers",description:"Advertising in newspapers."},dutch:{displayName:"Dagbladen",description:"Adverteren in kranten."}},
    {name:"outdoor",english:{displayName:"Outdoor",description:"Advertising at physical places that are outside the consumers’ home."},dutch:{displayName:"Buitenreclame",description:"Adverteren op fysieke punten waarmee de consument alleen buitenshuis in aanraking kan komen."}},
    {name:"packaging",english:{displayName:"Packaging",description:"Messaging on a product’s package."},dutch:{displayName:"Verpakking",description:"Boodschappen op de verpakking van het product."}},
    {name:"pr",english:{displayName:"PR",description:"Communication that focuses on a mutual benefit for brand and consumers."},dutch:{displayName:"PR",description:"Communicatie die zich concentreert op het wederzijds belang voor merk en consumenten."}},
    {name:"promotion",english:{displayName:"Promotion",description:"Communication that focuses on a temporary change in price / value ratio."},dutch:{displayName:"Promotie",description:"Communicatie die zich concentreert op een tijdelijke verandering in de prijs / waarde verhouding."}},
    {name:"radio",english:{displayName:"Radio",description:"Advertising on radio stations, in commercial airtime and in-program."},dutch:{displayName:"Radio",description:"Adverteren in zendtijd van radiostations, reclamezendtijd en in-program."}},
    {name:"sem",english:{displayName:"SEM",description:"Search engine marketing - Paid optimization and advertising on search engine results pages."},dutch:{displayName:"SEM",description:"Search engine marketing - Betaalde optimalisatie en advertenties op resultaatpagina’s van zoekmachines."}},
    {name:"seo",english:{displayName:"SEO",description:"Search engine optimization - Free optimization on search engine results pages."},dutch:{displayName:"SEO",description:"Search engine optimization -  Gratis optimalisatie op resultaatpagina’s van zoekmachines."}},
    {name:"shopper",english:{displayName:"Shopper",description:"Communication in retail channels."},dutch:{displayName:"Shopper",description:"Communicatie in retail-kanalen."}},
    {name:"social",english:{displayName:"Social",description:"Branded appearance on social networks, paid and unpaid."},dutch:{displayName:"Social",description:"Branded vertoning op sociale netwerken, betaald en onbetaald."}},
    {name:"sponsorship",english:{displayName:"Sponsorship",description:"A branding opportunity in exchange for financial support of a person, activity or organization."},dutch:{displayName:"Sponsorship",description:"De mogelijkheid om je merk te tonen in ruil voor financiële steun van een persoon, activiteit of organisatie."}},
    {name:"television",english:{displayName:"Television",description:"Advertising on television, in commercial airtime and in-program."},dutch:{displayName:"Televisie",description:"Adverteren in zendtijd van een televisiestation, reclamezendtijd en in-program."}},
    {name:"trade_fair",english:{displayName:"Trade Fair",description:"Appearing at an exhibition for a specific industry or purpose."},dutch:{displayName:"Trade Fair",description:"Vertonen van een merk op een beurs voor een specifieke industrie of doel."}},
    {name:"video_on_demand",english:{displayName:"Video On Demand",description:"Advertising in an environment that provides audio visual content to users at request."},dutch:{displayName:"Video On Demand",description:"Adverteren in een omgeving die op verzoek audiovisuele content biedt aan gebruikers."}},
    {name:"viral",english:{displayName:"Viral",description:"Communication in a way that optimizes the probability that people will forward your message."},dutch:{displayName:"Viral",description:"Communicatie op een manier die de kans maximaliseert dat mensen je boodschap zullen doorsturen aan andere mensen. "}},
    {name:"website",english:{displayName:"Website",description:"Electronic information, that is stored on a server and is accessible through a browser."},dutch:{displayName:"Website",description:"Elektronische informatie, die opgeslagen is op een server en toegankelijk door middel van een browser."}},
    {name:"word_of_mouth",english:{displayName:"Word Of Mouth",description:"People pass opinions on a brand to other people."},dutch:{displayName:"Word Of Mouth",description:"Mensen geven meningen door over je merk aan andere mensen."}}]
       
  
    // public properties
    this.showAll = true;
  this.sortingByName = true; // False means the sorting is done by reach
  this.planIsAllZeros = !_touchPoints.some((touchPoint) => touchPoint.value > 0.0 );

  // setting up a new plan
   _touchPoints = _touchPointBasics.map(touchPoint => {return {name:touchPoint.name, value: 0.0}});

    // public methods
      this.changeReachForTouchPoint = function (touchPointName, input) {
      let touchPointToChange = _touchPoints.find(touchPoint => touchPoint.name === touchPointName);
      touchPointToChange.value = input;
    }
  
    // reset press 1
    this.touchPointsToAllZeros = function() {
      _touchPoints = _touchPoints.map(touchPoint => touchPoint.value = 0.0)
    }
  
    // reset press 2
    this.toggleShowAll = function() {
      this.showAll = !this.showAll;
    }
  
    this.toggleSortingByName = function() {
      this.sortingByName = !this.sortingByName;
    }
    
    /* When sortingByName is true. Sorting button executes this function, which sorts the plan alphabetically.
    * Going up, according to displayName. Because of this it's a pretty long function.
    */
    this.sortByName = function(dictionary) {
      let sortedTouchPoints = [];
        //Sort dictionary List according to displayName
      dictionary.sort((a,b) => a[language].displayName - b[language].displayName);
      //Make a sorted plan Map out of sorted dictionary List and use values of the original _plan
      dictionary.forEach((touchPointsBasics) => {
       let touchPointToBeSorted = _touchPoints.find((touchPoint)=> touchPointBasics.name === touchPoint.name);
if  (touchPointToBeSorted) {         _sortedTouchPoints.push(touchPointToBeSorted)}
      // Store sorted plan Map in _plan variable
      _touchPoints = _sortedTouchPoints;
      });
    }
  /* When sortingTouchPoints is false. Sorting button executes this function, which sorts the plan according to reach.
    * Going down.
    */
    this.sortByReach = function () {
      _touchPoints.sort((a,b) => a.value - b.value);
    }
  
    // Hide the touchpoints in the plan, where reach == 0
    this.removeZeros = function () {
      _plan.removeWhere((key, value) => value == 0.0);
    }
  
  // Insert touchpoints with reach == 0 back into the plan
    this.replenishPlan = function() {
      for (touchPointName of _touchPointNames) {
        if (!_touchPoints.some(touchPoint=>touchPoint.name === touchPointName)) {
          _touchPoints.push({name: touchPointName, value: 0.0});
        }
      }
    }
  
  // Execute result calculations
    this.calculateResults=function() {
      _calculateTotalNetReach();
      _calculateLocus();
    }
  
    //Private methods
    const _calculateTotalNetReach = function() {
     let totalReachPortion = 0.0;
      for (const touchPoint of _touchPoints) {
        let r = touchPoint.value / 100;
        totalReachPortion = totalReachPortion + ((1 - totalReachPortion) * r);
      }
      _totalReach = 100 * totalReachPortion;
    }
  
    const _calculateLocus = function() {
      let duplicateReachPortion = 0.0;
      for (const touchPoint of _touchPoints) {
        if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
          let r = _plan[touchPointName] / 100;
          duplicateReachPortion *= r;
        }
        if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
          duplicateReachPortion = touchPoint.value / 100;
        }
      }
      _locus = 100 * duplicateReachPortion;
    }

    // TODO: is this OK?
    Object.defineProperty(this, 'touchPoints', {get: function() {
      return _touchPoints;}
    });
  }

    Object.defineProperty(PlanProvider(), 'touchPoints', {get: function() {
        return _touchPoints;}
      });
    
      Object.defineProperty(PlanProvider(), 'totalReach', {get: function() {
        return _totalReach;}
      });
      Object.defineProperty(PlanProvider(), 'locus', {get: function() {
        return _locus;}
      });   

      export default ReachAppProvider;
  