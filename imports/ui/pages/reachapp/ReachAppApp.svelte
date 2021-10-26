<script>
  // packages

  // components
  import ReachHeader from '../../components/reachapp/ReachHeader.svelte';
  import ReachTouchPoint from '../../components/reachapp/ReachTouchPoint.svelte';

  // constants
  import {touchPointsBasics, translations} from '../../../../client/constants';

  // providers
  import ReachAppProvider from '../../../both/reachAppProvider';
  import UiProvider from '../../../both/uiProvider';

  // variables
  export let language;
  const thisReachApp = new ReachAppProvider(touchPointsBasics);
  const thisUi = new UiProvider(translations);
  let touchPoints = thisReachApp.touchPoints;

  let inputPlaceholder = thisUi.translate('input', language);
  let totalReach = thisReachApp.totalReach;
  let locus = thisReachApp.locus;
  let allTouchPointValuesAreZero = thisReachApp.areAllTouchPointsValuesZero();
  let sortingByName = thisReachApp.sortingByName;
  let showAll = thisReachApp.showAll;

  // functions
  const reset = () => {
    if (thisReachApp.areAllTouchPointsValuesZero()) {
      console.log('all touchpoints values are zero in reset');
      thisReachApp.resetAllTouchPoints();
    } else {
      thisReachApp.resetVisibleTouchPoints();
    }
    touchPoints = thisReachApp.touchPoints;
    thisReachApp.calculateResults();
    totalReach = thisReachApp.totalReach;
    locus = thisReachApp.locus;
    allTouchPointValuesAreZero = thisReachApp.areAllTouchPointsValuesZero();
  };
  const sort = () => {
    if (thisReachApp.sortingByName) {
      thisReachApp.sortByName(language);
    } else {
      thisReachApp.sortByReach();
    }
    touchPoints = thisReachApp.touchPoints;
    thisReachApp.toggleSortingByName();
    sortingByName = thisReachApp.sortingByName;
  };
  const hide = () => {
    if (!thisReachApp.showAll) {
      thisReachApp.replenishTouchPoints();
      thisReachApp.sortByName();
    } else {
      if (!thisReachApp.areAllTouchPointsValuesZero()) {
        thisReachApp.removeZeros();
      }
    }
    touchPoints = thisReachApp.touchPoints;
    thisReachApp.toggleShowAll();
    showAll = thisReachApp.showAll;
  };
  const print = () => {
    window.print();
  };
  const pdf = () => {};
  const displayTouchPoint = () => {
    !thisReachApp.showAll && touchPoint.value === 0 ? 'none' : 'grid';
  };
  const changeReach = (event) => {
    const touchPoint = event.detail;
    console.log('change for', touchPoint);
    thisReachApp.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    touchPoints = thisReachApp.touchPoints;
    thisReachApp.calculateResults();
    totalReach = thisReachApp.totalReach;
    locus = thisReachApp.locus;
  };
  const inputReach = (event) => {
    const touchPoint = event.detail;
    console.log('input for', touchPoint);
    thisReachApp.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    touchPoints = thisReachApp.touchPoints;
    thisReachApp.calculateResults();
    totalReach = thisReachApp.totalReach;
    locus = thisReachApp.locus;
  };
</script>

<section>
  <ReachHeader
    {totalReach}
    {locus}
    totalReachDisplayName={thisUi.translate('totalReach', language)}
    locusDisplayName={thisUi.translate('locus', language)}
    {allTouchPointValuesAreZero}
    {sortingByName}
    {showAll}
    on:reset={reset}
    on:sort={sort}
    on:hide={hide}
    on:print={print}
    on:pdf={pdf}
  />

  <!-- TODO: dispatch on:change and on:input -->
  {#each touchPoints as touchPoint}
    <ReachTouchPoint
      {displayTouchPoint}
      {language}
      {inputPlaceholder}
      {...touchPoint}
      touchPointDisplayName={thisReachApp.displayTouchPoint(touchPoint.name, language)}
      touchPointDescription={thisReachApp.describeTouchPoint(touchPoint.name, language)}
      on:handleChange={changeReach}
      on:handleInput={inputReach}
    />
  {/each}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0.5em 0 0 0;
  }
</style>
