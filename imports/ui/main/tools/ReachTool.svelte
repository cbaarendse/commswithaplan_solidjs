<script lang="ts">
  // packages
  import {jsPDF} from 'jspdf';

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
  import {Reach} from '../../types/classes';

  // variables
  import {touchPointsBasics, language} from '../../stores/stores';
  import type {Display, TouchPointInPlan} from '../../types/interfaces';

  let touchPointsInPlan = Reach.makePlan($touchPointsBasics, $language);
  let totalReach: number = 0;
  let locus: number = 0;
  let allTouchPointsValueIsZero: boolean = true;
  let sortingByName = true;
  let showAll: boolean = true;

  function changeReachForTouchPoint(event: CustomEvent) {
    const touchPointName: string = event.detail.name;
    const sliderValue: number = event.detail.value;
    touchPointsInPlan = Reach.updateTouchPointsInPlan(touchPointName, sliderValue, touchPointsInPlan);
    const results = Reach.calculateResults(touchPointsInPlan);
    totalReach = results[0];
    locus = results[1];
    allTouchPointsValueIsZero = Reach.areAllTouchPointsValueZero(touchPointsInPlan);
    console.log('totalReach', totalReach, 'locus', locus, 'allTouchPointsValueIsZero', allTouchPointsValueIsZero);
  }

  // functions
  const reset = () => {
    if (allTouchPointsValueIsZero) {
      Reach.resetAllTouchPoints(touchPointsInPlan, $touchPointsBasics);
    } else {
      touchPointsInPlan = Reach.makePlan($touchPointsBasics, $language);
    }
    const results = Reach.calculateResults(touchPointsInPlan);
    totalReach = results[0];
    locus = results[1];
    allTouchPointsValueIsZero = Reach.areAllTouchPointsValueZero(touchPointsInPlan);
  };
  const sort = () => {
    if (sortingByName) {
      touchPointsInPlan = Reach.sortByName(touchPointsInPlan);
    } else {
      touchPointsInPlan = Reach.sortByReach(touchPointsInPlan);
    }
    sortingByName = Reach.toggleSortingByName(sortingByName);
    console.log('sorting by name after sort', sortingByName);
  };
  const hide = () => {
    if (!showAll) {
      touchPointsInPlan = Reach.replenishTouchPoints(touchPointsInPlan, $touchPointsBasics);
      touchPointsInPlan = Reach.sortByName(touchPointsInPlan);
    } else {
      if (!allTouchPointsValueIsZero) {
        touchPointsInPlan = Reach.removeZeros(touchPointsInPlan);
      }
    }
    showAll = Reach.toggleShowAll(showAll);
    console.log('showAll after hide', showAll);
  };
  const print = () => {
    window.print();
  };
  const pdf = () => {
    const doc = new jsPDF();
    console.log('jsPDF doc', doc);
    doc.html(document.body, {
      callback: function (doc) {
        doc.save('reach_01.pdf');
      },
      width: 200
    });
    doc.output('dataurlnewwindow');
  };

  const showThisTouchPoint = (touchPoint: TouchPointInPlan): Display => {
    return !showAll && touchPoint.value === 0 ? 'none' : 'grid';
  };

  let languageUnsubscribe: Unsubscriber = language.subscribe((newLanguage) =>
    Reach.changeLanguage(newLanguage, touchPointsInPlan, $touchPointsBasics)
  );
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
      <!-- TODO: dispatch on:change and on:input -->
      <div class="touchpoints__flex">
        {#each touchPointsInPlan as touchPoint}
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
