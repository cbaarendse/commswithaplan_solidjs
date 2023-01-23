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
  import type {DeployedTouchPoint} from '../../types/types';
  import type {Strategy} from '/imports/api/strategies/strategies';

  // variables
  let title: string = 'New Strategy';
  let marketData = false;
  let market: 'nl' | 'uk' | 'gb' | 'en' | 'be' = 'nl';
  let strategy: Strategy = Reach.setStrategy(title, market, marketData, $touchPointsBasics);
  let sortedByName = true;
  $: allTouchPointsValueIsZero = Reach.areAllTouchPointsValueZero(strategy.deployment);
  $: showAll = Reach.isShowAll(strategy.deployment);

  onMount(() => (strategy.deployment = Reach.sortByName(strategy.deployment, $language)));

  // functions
  function changeReachForTouchPoint(event: CustomEvent) {
    const touchPointName: string = event.detail.name;
    const sliderValue: number = event.detail.value;
    strategy.deployment = Reach.updateDeployedTouchPoint(touchPointName, sliderValue, strategy.deployment);
  }

  function getResults(): void {
    const results = Reach.calculateResults(strategy.deployment);
    [strategy.totalReach, strategy.overlap] = results;
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
      strategy.deployment = Reach.resetTouchPoints(strategy.deployment);
    } else {
      strategy = Reach.setStrategy(title, market, marketData, $touchPointsBasics);
      strategy.deployment = Reach.sortByName(strategy.deployment, $language);
      sortedByName = true;
    }
    const results = [0, 0];
    [strategy.totalReach, strategy.overlap] = results;
  }

  function sortBy(): void {
    strategy.deployment = sortedByName
      ? Reach.sortByReach(strategy.deployment)
      : Reach.sortByName(strategy.deployment, $language);
    sortedByName = showAll && allTouchPointsValueIsZero ? true : !sortedByName;
  }

  function hideIf(): void {
    if (showAll && !allTouchPointsValueIsZero) {
      strategy.deployment = Reach.hide(strategy.deployment);
    } else if (!showAll || allTouchPointsValueIsZero) {
      strategy.deployment = Reach.show(strategy.deployment);
    }
  }

  let languageUnsubscribe: Unsubscriber = language.subscribe(() => {
    strategy.deployment = Reach.sortByName(strategy.deployment, $language);
  });
  onDestroy(languageUnsubscribe);
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <ReachControlsOutput
      {strategy}
      {allTouchPointsValueIsZero}
      {sortedByName}
      {showAll}
      on:reset={reset}
      on:sort={sortBy}
      on:hide={hideIf}
    />
    {#each strategy.deployment as touchPoint}
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
    /* TODO: no flex column */
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0em auto;
  }
  @media screen and (min-width: 768px) {
    .container {
      width: 80%;
    }
  }
</style>
