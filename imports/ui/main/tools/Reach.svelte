<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import ReachHeaderContent from './ReachHeaderContent.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';

  // providers
  import ReachProvider from '../../../both/reachProvider';
  import UiProvider from '../../../both/uiProvider';

  // variables
  import {language, touchPointsBasics, translations} from '../../../../client/stores';
  const thisReach = new ReachProvider($touchPointsBasics);
  let touchPoints = thisReach.touchPoints;

  let inputPlaceholder = UiProvider.translate('input', $translations, $language);
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

<Main>
  <Header
    ><Brand title={'Reach'}>
      <LogoReachApp size="3rem" />
    </Brand>
    <ReachHeaderContent
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
  </Header>
  <Section>
    <Article>
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
    </Article>
  </Section>
</Main>

<style>
</style>
