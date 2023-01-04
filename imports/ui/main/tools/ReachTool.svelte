<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import ReachControlsOutput from './ReachControlsOutput.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import {Reach} from '../../types/classes';
  import {language} from '../../stores/utils';
  import {touchPointsBasics} from '../../stores/tools';
  import type {TouchPointInPlan} from '../../types/types';

  // variables
  let touchPointsInPlan: TouchPointInPlan[] = Reach.setTouchPointsForPlan($touchPointsBasics, $language);
  let totalReach: number = 0;
  let locus: number = 0;
  let sortedByName = true;
  $: allTouchPointsValueIsZero = Reach.areAllTouchPointsValueZero(touchPointsInPlan);
  $: showAll = Reach.isShowAll(touchPointsInPlan);

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
    sortedByName = sortedByName ? false : true;
  }

  function hideIf() {
    if (showAll && !allTouchPointsValueIsZero) {
      touchPointsInPlan = Reach.hide(touchPointsInPlan);
    } else if (!showAll || allTouchPointsValueIsZero) {
      touchPointsInPlan = Reach.show(touchPointsInPlan);
    }
  }

  let languageUnsubscribe: Unsubscriber = language.subscribe((newLanguage) => {
    touchPointsInPlan = Reach.changeLanguage(newLanguage, touchPointsInPlan, $touchPointsBasics);
    touchPointsInPlan = Reach.sortByName(touchPointsInPlan);
  });
  onDestroy(languageUnsubscribe);
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <ReachControlsOutput
      {totalReach}
      {locus}
      {allTouchPointsValueIsZero}
      {sortedByName}
      {showAll}
      on:reset={reset}
      on:sort={sortBy}
      on:hide={hideIf}
    />
    {#each touchPointsInPlan as touchPoint}
      <ReachTouchPoint
        {touchPoint}
        on:changeValueForName={handleChange}
        on:inputValueForName={handleInput}
        on:submitValueForName={handleSubmit}
      />
    {/each}
  </div>
</section>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>
