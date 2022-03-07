<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Header from './layout/Header.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import ReachControlsOutput from './ReachControlsOutput.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';
  import {onDestroy} from 'svelte';
  import {Unsubscriber} from 'svelte/store';

  // providers
  import {ReachProvider} from '../../types/classes';

  // variables
  import {language, touchPointsBasics} from '../../stores/stores';
  import type {Display, TouchPointInPlan} from '../../types/interfaces';

  let reach = new ReachProvider($language, $touchPointsBasics);
  let touchPointsInPlan: TouchPointInPlan[];

  // functions
  const reset = () => {
    if (reach.allTouchPointsValueIsZero) {
      reach.resetAllTouchPoints();
    } else {
      reach = new ReachProvider($language, $touchPointsBasics);
    }
    reach.totalReach;
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
      if (!reach.allTouchPointsValueIsZero) {
        reach.removeZeros();
      }
    }
    reach.toggleShowAll();
  };
  const print = () => {
    window.print();
  };
  const pdf = () => {};
  const showThisTouchPoint = (touchPoint: TouchPointInPlan): Display => {
    return !reach.showAll && touchPoint.value === 0 ? 'none' : 'grid';
  };

  function changeReachForTouchPoint(event: CustomEvent) {
    const touchPointName: string = event.detail.name;
    const sliderValue: number = event.detail.value;
    reach.updateTouchPointsInPlan(touchPointName, sliderValue);
    console.log('reach.totalReach', reach.totalReach, 'reach.locus', reach.locus);
  }
  let languageUnsubscribe: Unsubscriber = language.subscribe((newLanguage) => reach.changeLanguage(newLanguage));
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
      <!-- TODO: move all reach methods and properties to this component -->
      <ReachControlsOutput
        bind:touchPointsInPlan
        {reach}
        totalReach={reach.totalReach}
        locus={reach.locus}
        allTouchPointsValueIsZero={reach.allTouchPointsValueIsZero}
        sortingByName={reach.sortingByName}
        showAll={reach.showAll}
        on:reset={reset}
        on:sort={sort}
        on:hide={hide}
        on:print={print}
        on:pdf={pdf}
      />
      <!-- TODO: dispatch on:change and on:input -->
      <div class="touchpoints__flex">
        {#each reach.touchPointsInPlan as touchPoint}
          <ReachTouchPoint
            display={showThisTouchPoint(touchPoint)}
            {touchPoint}
            on:valueForName={changeReachForTouchPoint}
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
  .touchpoints__flex {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
