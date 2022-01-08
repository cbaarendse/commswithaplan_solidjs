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
  const thisReach = new ReachProvider($touchPointsBasics);
  const thisUi = new UiProvider($translations);
  let touchPoints = thisReach.touchPoints;

  let inputPlaceholder = thisUi.translate('input', $language);
  let totalReach = thisReach.totalReach;
  let locus = thisReach.locus;
  let allTouchPointValuesAreZero = thisReach.areAllTouchPointsValuesZero();
  let sortingByName = thisReach.sortingByName;
  let showAll = thisReach.showAll;

  // functions
  const reset = () => {
    if (thisReach.areAllTouchPointsValuesZero()) {
      console.log('all touchpoints values are zero in reset');
      thisReach.resetAllTouchPoints();
    } else {
      thisReach.resetVisibleTouchPoints();
    }
    touchPoints = thisReach.touchPoints;
    thisReach.calculateResults();
    totalReach = thisReach.totalReach;
    locus = thisReach.locus;
    allTouchPointValuesAreZero = thisReach.areAllTouchPointsValuesZero();
  };
  const sort = () => {
    if (thisReach.sortingByName) {
      thisReach.sortByName($language);
    } else {
      thisReach.sortByReach();
    }
    touchPoints = thisReach.touchPoints;
    thisReach.toggleSortingByName();
    sortingByName = thisReach.sortingByName;
  };
  const hide = () => {
    if (!thisReach.showAll) {
      thisReach.replenishTouchPoints();
      thisReach.sortByName();
    } else {
      if (!thisReach.areAllTouchPointsValuesZero()) {
        thisReach.removeZeros();
      }
    }
    touchPoints = thisReach.touchPoints;
    thisReach.toggleShowAll();
    showAll = thisReach.showAll;
  };
  const print = () => {
    window.print();
  };
  const pdf = () => {};
  const displayTouchPoint = () => {
    !thisReach.showAll && touchPoint.value === 0 ? 'none' : 'grid';
  };
  const changeReach = (event) => {
    const touchPoint = event.detail;
    console.log('change for', touchPoint);
    thisReach.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    touchPoints = thisReach.touchPoints;
    thisReach.calculateResults();
    totalReach = thisReach.totalReach;
    locus = thisReach.locus;
  };
  const inputReach = (event) => {
    const touchPoint = event.detail;
    console.log('input for', touchPoint);
    thisReach.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    touchPoints = thisReach.touchPoints;
    thisReach.calculateResults();
    totalReach = thisReach.totalReach;
    locus = thisReach.locus;
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
        touchPointDisplayName={thisReach.displayTouchPoint(touchPoint.name, $language)}
        touchPointDescription={thisReach.describeTouchPoint(touchPoint.name, $language)}
        on:handleChange={changeReach}
        on:handleInput={inputReach}
      />
    {/each}
  </section>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 48fr 1fr;
    grid-template-rows: auto, auto;
    grid-auto-rows: auto;
    padding: 0.4rem 0 0 0;
    margin: 0.4rem 0 0 0;
    overflow: auto;
  }
  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 10fr 1fr;
      padding: 2rem 0 0 0;
    }
  }
  section {
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-l));
    gap: 1em;
    margin: 2rem 0 0 0;
    min-width: 320px;
  }
</style>
