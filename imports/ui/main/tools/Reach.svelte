<script>
  // packages

  // components
  import ReachHeader from './ReachHeader.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';

  // providers
  import ReachProvider from '../../../both/reachProvider';
  import UiProvider from '../../../both/uiProvider';

  // variables
  import {language, touchPointsBasics, translations} from '../../../../client/stores';
  const thisReachApp = new ReachProvider($touchPointsBasics);
  const thisUi = new UiProvider($translations);
  let touchPoints = thisReachApp.touchPoints;

  let inputPlaceholder = thisUi.translate('input', $language);
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
      thisReachApp.sortByName($language);
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

<main>
  <ReachHeader
    {totalReach}
    {locus}
    {allTouchPointValuesAreZero}
    {sortingByName}
    {showAll}
    on:reset={reset}
    on:sort={sort}
    on:hide={hide}
    on:print={print}
    on:pdf={pdf}
  />
  <section>
    <!-- TODO: dispatch on:change and on:input -->
    {#each touchPoints as touchPoint}
      <ReachTouchPoint
        {displayTouchPoint}
        {language}
        {inputPlaceholder}
        {...touchPoint}
        touchPointDisplayName={thisReachApp.displayTouchPoint(touchPoint.name, $language)}
        touchPointDescription={thisReachApp.describeTouchPoint(touchPoint.name, $language)}
        on:handleChange={changeReach}
        on:handleInput={inputReach}
      />
    {/each}
  </section>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1rem 1fr 1rem;
    grid-template-rows: auto, auto;
    grid-auto-rows: auto;
    gap: 2rem;
    padding: 0.4rem 0 0 0;
    margin: 0.4rem 0 0 0;
    overflow: auto;
  }
  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 10fr 1fr;
      padding: 2rem 0 0 0;
      margin: 2rem 0 0 0;
    }
  }
  section {
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-l));
    gap: 1em;
    margin: 0.5em 0 0 0;
    min-width: 320px;
  }
</style>
