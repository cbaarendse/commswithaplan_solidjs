<script lang="ts">
  // imports
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Header from './layout/Header.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import ReachControlsOutput from './ReachControlsOutput.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import {Reach} from '../../types/classes';
  import {touchPointsBasics, language} from '../../stores/stores';
  import type {TouchPointInPlan} from '../../types/interfaces';

  // variables
  let touchPointsInPlan = Reach.selectTouchPointsForPlan($touchPointsBasics, $language);
  let changedTouchPointsInPlan: TouchPointInPlan[] = [];
  let totalReach: number = 0;
  let locus: number = 0;
  let allTouchPointsValueIsZero: boolean = true;
  let sortingByName = true;
  $: showAll = true;
  //TODO: incorporate display value in TouchPointInPlan
  // init
  onMount(() => (touchPointsInPlan = Reach.sortByName(touchPointsInPlan)));

  // functions
  function handleChange(event: CustomEvent) {
    changeReachForTouchPoint(event);
    getResults();
  }

  function handleInput(event: CustomEvent) {
    changeReachForTouchPoint(event);
    getResults();
    allTouchPointsValueIsZero = Reach.areAllTouchPointsValueZero(touchPointsInPlan);
    if (allTouchPointsValueIsZero) {
      showAll = true;
    }
    if (showAll === false) {
      const touchPointName: string = event.detail.name;
      const changedTouchPointInPlan: TouchPointInPlan = findChangedTouchPoint(touchPointName);
      addToChangedTouchPoints(changedTouchPointInPlan);
    }
  }

  function getResults(): void {
    const results = Reach.calculateResults(touchPointsInPlan);
    [totalReach, locus] = results;
  }

  function changeReachForTouchPoint(event: CustomEvent) {
    const touchPointName: string = event.detail.name;
    const sliderValue: number = event.detail.value;
    touchPointsInPlan = Reach.updateTouchPointsInPlan(touchPointName, sliderValue, touchPointsInPlan);
  }

  function findChangedTouchPoint(touchPointName: string): TouchPointInPlan {
    return touchPointsInPlan.filter((touchPoint) => touchPointName === touchPoint.name)[0];
  }

  function addToChangedTouchPoints(touchPoint: TouchPointInPlan) {
    changedTouchPointsInPlan = [...changedTouchPointsInPlan, touchPoint];
  }

  const reset = () => {
    if (allTouchPointsValueIsZero) {
      touchPointsInPlan = Reach.resetVisibleTouchPoints(touchPointsInPlan);
      showAll = true;
    } else {
      touchPointsInPlan = Reach.selectTouchPointsForPlan($touchPointsBasics, $language);
      touchPointsInPlan = Reach.sortByName(touchPointsInPlan);
      allTouchPointsValueIsZero = Reach.areAllTouchPointsValueZero(touchPointsInPlan);
    }
    const results = [0, 0];
    totalReach = results[0];
    locus = results[1];
  };

  const sortBy = (): void => {
    touchPointsInPlan = sortingByName ? Reach.sortByName(touchPointsInPlan) : Reach.sortByReach(touchPointsInPlan);
  };

  const toggleSorting = (): void => {
    sortingByName = Reach.toggleSortingByName(sortingByName);
  };
  const sort = (): void => {
    sortBy();
    toggleSorting();
  };
  const hide = () => {
    if (!allTouchPointsValueIsZero) {
      showAll = Reach.toggleShowAll(showAll);
    }
    touchPointsInPlan = touchPointsInPlan;
  };

  const print = () => {
    window.print();
  };

  const pdf = () => {
    window.print();
  };

  let languageUnsubscribe: Unsubscriber = language.subscribe((newLanguage) => {
    touchPointsInPlan = Reach.changeLanguage(newLanguage, touchPointsInPlan, $touchPointsBasics);
    touchPointsInPlan = Reach.sortByName(touchPointsInPlan);
  });
  onDestroy(languageUnsubscribe);
</script>

<Main>
  <Section>
    <div class="reach__grid">
      <Header>
        <Brand
          brand={{
            color: 'var(--ra-blue)',
            fontSize: 'var(--ra-fs-2xl)',
            title: `Reach - ${$language === 'dutch' ? 'Bereik' : 'Reach'}`
          }}
          ><LogoReachApp
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
          /></Brand
        >
      </Header>
      <ReachControlsOutput
        {totalReach}
        {locus}
        {allTouchPointsValueIsZero}
        {sortingByName}
        {showAll}
        on:reset={reset}
        on:sort={sort}
        on:hide={hide}
        on:print={print}
        on:pdf={pdf}
      />
      <div class="touchpoints__flex">
        {#each touchPointsInPlan as touchPoint}
          <ReachTouchPoint {touchPoint} on:changeValueForName={handleChange} on:inputValueForName={handleInput} />
        {/each}
      </div>
    </div>
  </Section>
</Main>

<style>
  .reach__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .touchpoints__flex {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
