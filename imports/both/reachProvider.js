/* This class contains all the logic to make ReachApp work.
* It's referred to all over the code, mainly by use of the Provider package.
* In some cases public properties of this class are accessed directly.
*/
function  PlanProvider(touchPointsBasics) {
    // Private properties
    const _touchPoints = [];
    let _totalReach = 0.0;
    let _locus = 0.0;
    this.touchPointBasics  = touchPointsBasics;
  
    // Public properties
    this.showAll = true;
  this.sortingByName = true; // False means the sorting is done by reach
  this.planIsAllZeros = !_touchPoints.some((touchPoint) => touchPoint.value > 0.0 );
  // Setting up a new plan, with all reach values at zero.
   _touchPoints = _touchPointNames.map(touchPoint => {touchPoint.value = 0.0;
     return touchPoint});

    //Public methods
  
    // User can input change reach for a touchpoint by use of a slider, or manually
    this.changeReachForTouchPoint = function (touchPointName, input) {
      let touchPointToChange = _touchPoints.find(touchPoint => touchPoint.name === touchPointName);
      touchPointToChange.value = input;
    }
  
    /* 1. First press on reset button (0), this function keeps the appearance of the touchpoints list in tact.
    * It sets tha reach for all touchpoints back to 0.
     */
    this.touchPointsToAllZeros = function() {
      _touchPoints = _touchPoints.map(touchPoint => touchPoint.value = 0.0)
    }
  
    /* 2. Second press on reset button (icon is now ⟲), constructs a complete new plan, in the original order.
     *   All touchpoints are shown.
    */
      
    this.toggleShowAll = function() {
      this.showAll = !this.showAll;
    }
  
    this.toggleSortingByName = function() {
      this.sortingByName = !this.sortingByName;
    }
    
    /* When sortingTouchPoints is true. Sorting button executes this function, which sorts the plan alphabetically.
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
  
   
    

      export default PlanProvider;
  