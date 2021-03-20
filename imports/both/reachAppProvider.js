/* This class contains all the logic to make ReachApp work.
 * It's referred to all over the code, mainly by use of the Provider package.
 * In some cases public properties of this class are accessed directly.
 */
function ReachAppProvider(touchPointsBasics, language) {
    // public properties
    this.touchPointsBasics = touchPointsBasics;
    this.language = language;

    // private properties
    let _touchPoints = this.touchPointsBasics.map(touchPoint => { return { name: touchPoint.name, value: 0.0 } });
    let _totalReach = 0.0;
    let _locus = 0.0;

    // public settings
    this.showAll = true;
    this.sortingByName = true; // False means the sorting is done by reach
    this.planIsAllZeros = !_touchPoints.some((touchPoint) => touchPoint.value > 0.0);

    // public methods
    this.changeReachForTouchPoint = function(touchPointName, input) {
        let touchPointToChange = _touchPoints.find(touchPoint => touchPoint.name === touchPointName);
        touchPointToChange.value = input;
    }
    this.displayTouchPoint = function(input) {
        return this.touchPointsBasics.find((element) => element.name === input)[this.language].displayName || undefined;
    }
    this.describeTouchPoint = function(input) {
        return this.touchPointsBasics.find((element) => element.name === input)[this.language].description || undefined;
    }
    this.toggleShowAll = function() {
        this.showAll = !this.showAll;
    }
    this.toggleSortingByName = function() {
        this.sortingByName = !this.sortingByName;
    }

    // reset press 1
    this.resetVisibleTouchPoints = function() {
            _touchPoints = _touchPoints.map(touchPoint => touchPoint.value = 0.0)
        }
        // reset press 2
    this.resetAllTouchPoints = function() { _touchPoints = this.touchPointsBasics.map(touchPoint => { return { name: touchPoint.name, value: 0.0 } }); }

    /* When sortingByName is true. Sorting button executes this function, which sorts the plan alphabetically.
     * Going up, according to displayName. Because of this it's a pretty long function.
     */
    this.sortByName = function() {
            let sortedTouchPoints = [];
            //Sort touchPoinstBasics copy
            const touchPointsBasicsSorted = touchPointsBasics;
            touchPointsBasicsSorted.sort((a, b) => a[language].displayName - b[language].displayName);
            touchPointsBasicsSorted.forEach((touchPointBasics) => {
                let touchPointToBeSorted = _touchPoints.find((touchPoint) => touchPointBasics.name === touchPoint.name);
                if (touchPointToBeSorted) { _sortedTouchPoints.push(touchPointToBeSorted) }
                _touchPoints = _sortedTouchPoints;
            });
        }
        /* When sortByName is false. Sorting button executes this function, which sorts the plan according to reach.
         * Going down.
         */
    this.sortByReach = function() {
        _touchPoints.sort((a, b) => a.value - b.value);
    }

    // Hide the touchpoints in the plan, where reach == 0
    this.removeZeros = function() {
        _touchPoints = _touchPoints.filter((touchPoint) => touchPoint.value > 0);
    }

    // Insert touchpoints with reach == 0 back into the plan
    this.replenishPlan = function() {
        for (const touchPointBasics of touchPointsBasics) {
            if (!_touchPoints.some((touchPoint) => { touchPoint.name === touchPointBasics.name })) {
                _touchPoints.push({ name: touchPointBasics.name, value: 0.0 });
            }
        }
    }

    // Execute result calculations
    this.calculateResults = function() {
        console.log('results being calculated');
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
        console.log('total reach in provider function', 100 * totalReachPortion);
        _totalReach = 100 * totalReachPortion;
    }

    const _calculateLocus = function() {
        let duplicateReachPortion = 0.0;
        for (const touchPoint of _touchPoints) {
            if (touchPoint.value != 0.0 && duplicateReachPortion != 0.0) {
                let r = touchPoint.value / 100;
                duplicateReachPortion *= r;
            }
            if (touchPoint.value != 0.0 && duplicateReachPortion == 0.0) {
                duplicateReachPortion = touchPoint.value / 100;
            }
        }
        console.log('locus in provider function', 100 * duplicateReachPortion);
        _locus = 100 * duplicateReachPortion;
    }

    Object.defineProperty(this, 'touchPoints', {
        get: function() {
            return _touchPoints;
        }
    });

    Object.defineProperty(this, 'totalReach', {
        get: function() {
            return _totalReach;
        }
    });

    Object.defineProperty(this, 'locus', {
        get: function() {
            return _locus;
        }
    });
}


export default ReachAppProvider;