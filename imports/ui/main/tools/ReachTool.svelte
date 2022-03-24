<script lang="ts">
  // imports
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Header from './layout/Header.svelte';
  import LogoReach from '../../reusable/LogoReach.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import ReachControlsOutput from './ReachControlsOutput.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import {Reach} from '../../types/classes';
  import {touchPointsBasics, language} from '../../stores/stores';
  import type {TouchPointInPlan} from '../../types/types';

  // variables
  let touchPointsInPlan: TouchPointInPlan[] = Reach.setTouchPointsForPlan($touchPointsBasics, $language);
  let totalReach: number = 0;
  let locus: number = 0;
  $: allTouchPointsValueIsZero = Reach.areAllTouchPointsValueZero(touchPointsInPlan);
  let sortedByName: boolean = true;
  $: showAll = Reach.isShowAll(touchPointsInPlan);

  // init
  onMount(() => (touchPointsInPlan = Reach.sortByName(touchPointsInPlan)));

  // functions
  function changeReachForTouchPoint(event: CustomEvent) {
    const touchPointName: string = event.detail.name;
    const sliderValue: number = event.detail.value;
    touchPointsInPlan = Reach.updateTouchPointInPlan(touchPointName, sliderValue, touchPointsInPlan);
  }

  function getResults(): void {
    const results = Reach.calculateResults(touchPointsInPlan);
    [totalReach, locus] = results;
  }

  function handleChange(event: CustomEvent) {
    changeReachForTouchPoint(event);
    getResults();
  }

  function handleInput(event: CustomEvent): void {
    changeReachForTouchPoint(event);
    getResults();
  }

  function handleSubmit(event: CustomEvent): void {
    changeReachForTouchPoint(event);
    getResults();
  }

  function reset(): void {
    if (!allTouchPointsValueIsZero) {
      touchPointsInPlan = Reach.resetTouchPoints(touchPointsInPlan);
    } else {
      touchPointsInPlan = Reach.setTouchPointsForPlan($touchPointsBasics, $language);
      touchPointsInPlan = Reach.sortByName(touchPointsInPlan);
    }
    const results = [0, 0];
    [totalReach, locus] = results;
  }

  function sortBy(): void {
    touchPointsInPlan = sortedByName ? Reach.sortByReach(touchPointsInPlan) : Reach.sortByName(touchPointsInPlan);
  }

  function sort(): void {
    sortBy();
    sortedByName = !sortedByName;
  }

  function hideIf() {
    if (showAll && !allTouchPointsValueIsZero) {
      touchPointsInPlan = Reach.hide(touchPointsInPlan);
    } else if (!showAll || allTouchPointsValueIsZero) {
      touchPointsInPlan = Reach.show(touchPointsInPlan);
    }
  }

  function hide() {
    hideIf();
  }

  function print() {
    window.print();
  }

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
            title: `Tools - ${$language === 'dutch' ? 'Bereik' : 'Reach'}`
          }}
          ><LogoReach
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
          /></Brand
        >
      </Header>
      <ReachControlsOutput
        {totalReach}
        {locus}
        {allTouchPointsValueIsZero}
        {sortedByName}
        {showAll}
        on:reset={reset}
        on:sort={sort}
        on:hide={hide}
        on:print={print}
      />
      <div class="touchpoints__flex">
        {#each touchPointsInPlan as touchPoint}
          <ReachTouchPoint
            {touchPoint}
            on:changeValueForName={handleChange}
            on:inputValueForName={handleInput}
            on:submitValueForName={handleSubmit}
          />
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

  .reach__grid :global(header) {
    grid-column: 1 / -1;
  }

  .touchpoints__flex {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
