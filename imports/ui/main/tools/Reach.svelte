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
  import {ReachProvider, UiProvider} from '../../../../types/classes';

  // variables
  import {language, touchPointsBasics, translations} from '../../../../client/stores';
  const reach = new ReachProvider($touchPointsBasics, $language);
  let touchPoints = reach.touchPoints;

  let inputPlaceholder = UiProvider.translate('input', $translations, $language);
  let totalReach = reach.totalReach;
  let locus = reach.locus;
  let allTouchPointValuesAreZero = reach.areAllTouchPointsValuesZero();
  let sortingByName = reach.sortingByName;
  let showAll = reach.showAll;

  // functions
  const reset = () => {
    if (reach.areAllTouchPointsValuesZero()) {
      console.log('all touchpoints values are zero in reset');
      reach.resetAllTouchPoints();
    } else {
      reach.resetVisibleTouchPoints();
    }
    touchPoints = reach.touchPoints;
    reach.calculateResults();
    totalReach = reach.totalReach;
    locus = reach.locus;
    allTouchPointValuesAreZero = reach.areAllTouchPointsValuesZero();
  };
  const sort = () => {
    if (reach.sortingByName) {
      reach.sortByName($language);
    } else {
      reach.sortByReach();
    }
    touchPoints = reach.touchPoints;
    reach.toggleSortingByName();
    sortingByName = reach.sortingByName;
  };
  const hide = () => {
    if (!reach.showAll) {
      reach.replenishTouchPoints();
      reach.sortByName();
    } else {
      if (!reach.areAllTouchPointsValuesZero()) {
        reach.removeZeros();
      }
    }
    touchPoints = reach.touchPoints;
    reach.toggleShowAll();
    showAll = reach.showAll;
  };
  const print = () => {
    window.print();
  };
  const pdf = () => {};
  const displayTouchPoint = () => {
    !reach.showAll && touchPoint.value === 0 ? 'none' : 'grid';
  };
  const changeReach = (event) => {
    const touchPoint = event.detail;
    console.log('change for', touchPoint);
    reach.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    touchPoints = reach.touchPoints;
    reach.calculateResults();
    totalReach = reach.totalReach;
    locus = reach.locus;
  };
  const inputReach = (event) => {
    const touchPoint = event.detail;
    console.log('input for', touchPoint);
    reach.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    touchPoints = reach.touchPoints;
    reach.calculateResults();
    totalReach = reach.totalReach;
    locus = reach.locus;
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
