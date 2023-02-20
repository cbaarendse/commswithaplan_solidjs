<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import {onDestroy} from 'svelte';
  import GenderButton from './GenderButton.svelte';
  import AgeGroupsSelect from './AgeGroupsSelect.svelte';
  import UseMarketDataCheck from './UseMarketDataCheck.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {
    marketData,
    briefing,
    deployment,
    sortedByName,
    touchPointsForData,
    touchPointsForFormula
  } from '../../../stores/reach';
  import {CWAPUser, Strategy} from '../../../../both/typings/types';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faArrowRotateLeft,
    fa0,
    faArrowDownAZ,
    faArrowDownWideShort,
    faBars,
    faMinus,
    faFolderOpen,
    faDownload,
    faPlus
  } from '@fortawesome/free-solid-svg-icons';

  // variables
  let currentUser: CWAPUser | null;
  const reachTool = createReachTool();
  let useMarketData: Strategy['useMarketData'];
  let deployedTouchPoints: Strategy['deployment'];

  const unsubscribeBriefing = briefing.subscribe((data) => {
    useMarketData = data.useMarketData;
  });

  const unsubscribeDeployment = deployment.subscribe((data) => {
    deployedTouchPoints = data;
  });
  const unsubscribeSortedByName = sortedByName.subscribe((data) => {});

  $m: {
    currentUser = Meteor.user();
  }

  // functions
  function reset() {
    if (!reachTool.areAllTouchPointsValueZero(deployedTouchPoints)) {
      deployment.update((data) => {
        return data.map((touchPoint) => Object.assign(touchPoint, {value: 0.0}));
      });
    } else {
      $marketData ? deployment.set(touchPointsForData()) : deployment.set(touchPointsForFormula());
    }
  }

  function hide() {
    deployment.set(reachTool.hide($deployment));
  }

  function sort() {
    const [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort(
      deployedTouchPoints,
      $sortedByName,
      $language
    );
    deployment.set(sortedDeployedTouchPoints);
    sortedByName.set(updatedSortedByName);
  }

  onDestroy(() => {
    unsubscribeBriefing;
    unsubscribeDeployment;
    unsubscribeSortedByName;
  });
</script>

<div class="container">
  {#if currentUser}
    <form>
      <MarketSelect />
      <UseMarketDataCheck />
      {#if $marketData && useMarketData}
        <GenderButton />
        <AgeGroupsSelect />
      {/if}
    </form>
  {/if}
  <div class="operations__container">
    <menu>
      <button type="button" on:click|stopPropagation|preventDefault={reset}>
        {#if reachTool.areAllTouchPointsValueZero(deployedTouchPoints)}<Fa icon={faArrowRotateLeft} />{:else}<Fa
            icon={fa0}
          />{/if}
      </button>
      <button type="button" on:click|stopPropagation|preventDefault={sort}>
        {#if $sortedByName}<Fa
            icon={faArrowDownWideShort}
          />{:else if !$sortedByName && reachTool.areAllTouchPointsValueZero(deployedTouchPoints) && reachTool.isShowAll(deployedTouchPoints)}<Fa
            icon={faArrowDownAZ}
          />{:else}<Fa icon={faArrowDownAZ} />
        {/if}
      </button>
      <button type="button" on:click|stopPropagation|preventDefault={hide}>
        {#if reachTool.isShowAll(deployedTouchPoints)}<Fa icon={faMinus} />{:else}<Fa icon={faBars} />{/if}
      </button>
      <button class="save" type="button" on:click|stopPropagation|preventDefault={reset}>
        <Fa icon={faDownload} />
      </button>
    </menu>

    <nav class="files">
      <a href={'/tools/reach/strategies'} data-tinro-ignore>
        <Fa icon={faFolderOpen} />
      </a>
      <a href={'/tools/reach/'} data-tinro-ignore>
        <Fa icon={faPlus} />
      </a>
    </nav>
  </div>
</div>

<style>
  div.container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }

  form {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto;
    justify-content: center;
    align-items: center;
  }
  div.operations__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.7em;
  }

  menu {
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
  }
  nav {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
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
  menu button {
    color: var(--ra-red);
  }
  menu button:last-of-type {
    color: var(--ra-blue);
  }
  menu button:hover {
    color: var(--ra-green);
  }
  nav.files a {
    font-size: 2.1rem;
    color: var(--ra-green);
  }
  nav.files a:hover {
    opacity: 0.7;
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
