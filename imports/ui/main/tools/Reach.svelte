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
  import {TouchPointInPlan} from '/types/interfaces';
  let reach = new ReachProvider($touchPointsBasics, $language);
  let inputPlaceholder = UiProvider.translate('input', $translations, $language);

  // functions
  const reset = () => {
    if (reach.areAllTouchPointsValuesZero()) {
      console.log('all touchpoints values are zero in reset');
      reach.resetAllTouchPoints();
    } else {
      reach = new ReachProvider($touchPointsBasics, $language);
    }
    reach.calculateResults();
    reach.areAllTouchPointsValuesZero();
  };
  const sort = () => {
    if (reach.sortingByName) {
      reach.sortByName();
    } else {
      reach.sortByReach();
    }
    reach.toggleSortingByName();
  };
  const hide = () => {
    if (!reach.showAll) {
      reach.replenishTouchPoints();
      reach.sortByName();
    } else {
      if (!reach.areAllTouchPointsValuesZero) {
        reach.removeZeros();
      }
    }
    reach.toggleShowAll();
  };
  const print = () => {
    window.print();
  };
  const pdf = () => {};
  const displayThisTouchPoint = (touchPoint: TouchPointInPlan): string => {
    return !reach.showAll && touchPoint.value === 0 ? 'none' : 'grid';
  };
  const changeReach = (event: CustomEvent) => {
    const touchPoint = event.detail;
    reach.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    reach.calculateResults();
  };
  const inputReach = (event: CustomEvent) => {
    const touchPoint = event.detail;
    reach.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    reach.calculateResults();
  };
</script>

<Main>
  <Header
    ><Brand title={'Reach'}>
      <LogoReachApp size="3rem" />
    </Brand>
    <ReachHeaderContent
      totalReach={reach.totalReach}
      locus={reach.locus}
      allTouchPointValuesAreZero={reach.allTouchPointValuesAreZero}
      sortingByName={reach.sortingByName}
      showAll={reach.showAll}
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
      {#each reach.touchPoints as touchPoint}
        <ReachTouchPoint
          display={displayThisTouchPoint(touchPoint)}
          {inputPlaceholder}
          {...touchPoint}
          touchPointDisplayName={reach.displayTouchPoint(touchPoint.name)}
          touchPointDescription={reach.describeTouchPoint(touchPoint.name)}
          on:handleChange={changeReach}
          on:handleInput={inputReach}
        />
      {/each}
    </Article>
  </Section>
</Main>

<style>
</style>
