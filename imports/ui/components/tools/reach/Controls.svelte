<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import GenderButton from './GenderButton.svelte';
  import AgeGroupSelect from './AgeGroupSelect.svelte';
  import UseMarketDataCheck from './UseMarketDataCheck.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import reachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {marketName, marketData, useMarketData} from '../../../stores/tools';
  import {AgeGroup, CWAPUser, Genders} from '../../../../both/typings/types';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faArrowRotateLeft,
    fa0,
    faArrowDownAZ,
    faArrowDownWideShort,
    faBars,
    faMinus,
    faFolderOpen,
    faDownload
  } from '@fortawesome/free-solid-svg-icons';
  // variables
  let currentUser: CWAPUser | null;

  $m: {
    currentUser = Meteor.user();
  }
  let indexStart: number;
  const ageGroupsForMarket = reachTool.setAgeGroupsForMarket($marketName);
  $: ageGroupsStart = ageGroupsForMarket;
  $: ageGroupsEnd = ageGroupsForMarket.slice(indexStart ? indexStart : 1);
  export let genders: Genders;
  export let ageGroupStart: AgeGroup;
  export let ageGroupEnd: AgeGroup;

  // functions
</script>

<div class="container">
  {#if currentUser}
    <form>
      <fieldset class="market">
        <MarketSelect />
      </fieldset>
      <fieldset class="data">
        <UseMarketDataCheck />
      </fieldset>
      {#if $marketData && $useMarketData}
        <fieldset class="gender">
          <GenderButton {genders} />
        </fieldset>
        <fieldset class="age">
          <AgeGroupSelect groups={ageGroupsStart} name="ageGroupStart" id="age-start__select" value={ageGroupStart} />
          <AgeGroupSelect groups={ageGroupsEnd} name="ageGroupEnd" id="age-end__select" value={ageGroupEnd} />
        </fieldset>
      {/if}
    </form>
  {/if}
  <menu class="operations">
    <button type="button" on:click|stopPropagation|preventDefault={() => reachTool.reset($language)}>
      {#if reachTool.areAllTouchPointsValueZero()}<Fa icon={faArrowRotateLeft} />{:else}<Fa icon={fa0} />{/if}
    </button>
    <button type="button" on:click|stopPropagation|preventDefault={() => reachTool.sort($language)}>
      {#if reachTool.isSortedByName()}<Fa
          icon={faArrowDownWideShort}
        />{:else if !reachTool.isSortedByName && reachTool.areAllTouchPointsValueZero() && reachTool.isShowAll()}<Fa
          icon={faArrowDownAZ}
        />{:else}<Fa icon={faArrowDownAZ} />
      {/if}
    </button>
    <button type="button" on:click|stopPropagation|preventDefault={() => reachTool.hide()}>
      {#if reachTool.isShowAll()}<Fa icon={faMinus} />{:else}<Fa icon={faBars} />{/if}
    </button>
  </menu>

  <nav class="files">
    <a href={'/tools/reach/strategies'} data-tinro-ignore>
      <Fa icon={faFolderOpen} />
    </a>
  </nav>
  <menu class="memory">
    <button class="save" type="button" on:click|stopPropagation|preventDefault={() => reachTool.reset($language)}>
      <Fa icon={faDownload} />
    </button>
  </menu>
</div>

<style>
  div.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  /* form {
    display: grid;
    grid-template-columns: 1fr 3rem;
    grid-template-areas: 'select label';
    padding: 0;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  } */
  form {
    grid-column: span 3;
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto;
    justify-content: center;
    align-items: center;
  }
  fieldset {
    height: 100%;
    padding: 0.4remrem 0.6rem;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  fieldset.market {
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
  fieldset.data {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 1.4rem 1fr;
  }
  fieldset.gender {
    display: grid;
    grid-template-columns: auto;
    justify-content: center;
    align-items: center;
  }
  fieldset.age {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  menu {
    flex: 100%;
    display: flex;
    gap: 7%;
    justify-content: flex-start;
  }

  button {
    font-size: 2.1rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
  }
  menu.operations button {
    color: var(--ra-red);
  }
  nav.files a {
    color: var(--ra-green);
  }
  menu.memory button {
    color: var(--ra-blue);
  }

  menu button:hover {
    color: var(--ra-green);
  }

  @media screen and (min-width: 768px) {
    button {
      font-size: 1em;
    }
  }

  @media screen and (min-width: 1024px) {
    button {
      font-size: 1em;
    }
  }
</style>
