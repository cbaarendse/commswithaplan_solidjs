// this function / object contains all the logic to make ReachApp work
function ReachAppProvider(touchPointsBasics, language) {
    // public properties
    this.touchPointsBasics = touchPointsBasics;
    this.language = language;

    // private properties
    let _touchPoints = this.touchPointsBasics.map(touchPoint => { return { name: touchPoint.name, value: 0.0 } });
    let _totalReach = 0.0;
    let _locus = 0.0;

    // ui
    this.displayTouchPoint = function(input) {
        return this.touchPointsBasics.find((touchPointBasics) => touchPointBasics.name === input)[this.language].displayName || undefined;
    }
    this.describeTouchPoint = function(input) {
        return this.touchPointsBasics.find((touchPointBasics) => touchPointBasics.name === input)[this.language].description || undefined;
    }

    // reset
    this.areAllTouchPointsValuesZero = function() { return !_touchPoints.some((touchPoint) => touchPoint.value > 0.0) };
    this.resetVisibleTouchPoints = function() {
        _touchPoints.forEach(touchPoint => touchPoint.value = 0.0)
    }
    this.resetAllTouchPoints = function() {
        _touchPoints = this.touchPointsBasics.map(touchPoint => { return { name: touchPoint.name, value: 0.0 } });
    }

    // sort
    this.sortingByName = false; // false means the sorting is done by reach
    this.toggleSortingByName = function() {
        this.sortingByName = !this.sortingByName;
    }
    this.sortByName = function() {
        let _sortedTouchPoints = [];
        const touchPointsBasicsSorted = this.touchPointsBasics;
        touchPointsBasicsSorted.sort((a, b) => a[language].displayName - b[language].displayName);
        touchPointsBasicsSorted.forEach((touchPointBasics) => {
            let touchPointToBeSorted = _touchPoints.find((touchPoint) => touchPointBasics.name === touchPoint.name);
            if (touchPointToBeSorted) { _sortedTouchPoints.push(touchPointToBeSorted) }
        });
        _touchPoints = _sortedTouchPoints;
    }
    this.sortByReach = function() {
        _touchPoints.sort((a, b) => b.value - a.value);
    }

    // hide
    this.showAll = true;
    this.toggleShowAll = function() {
        this.showAll = !this.showAll;
    }
    this.removeZeros = function() {
        _touchPoints = _touchPoints.filter((touchPoint) => touchPoint.value > 0);
    }
    this.replenishTouchPoints = function() {
        for (const touchPointBasics of touchPointsBasics) {
            if (!_touchPoints.some((touchPoint) => { touchPoint.name === touchPointBasics.name })) {
                _touchPoints.push({ name: touchPointBasics.name, value: 0.0 });
            }
        }
    }

    // results
    this.changeReachForTouchPoint = function(touchPointName, input) {
        let touchPointToChange = _touchPoints.find(touchPoint => touchPoint.name === touchPointName);
        touchPointToChange.value = input;
    }
    this.calculateResults = function() {
        console.log('results being calculated');
        _calculateTotalNetReach();
        _calculateLocus();
    }
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

    // getters
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