<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import GenderButton from './GenderButton.svelte';
  import AgeGroupsSelect from './AgeGroupsSelect.svelte';
  import UseMarketDataCheck from './UseMarketDataCheck.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {
    marketData,
    useMarketData,
    defaultStrategyWithFormula,
    defaultStrategyExtensionForData,
    deployedTouchPoints,
    sortedByName
  } from '../../../stores/tools';
  import {CWAPUser} from '../../../../both/typings/types';
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

  $m: {
    currentUser = Meteor.user();
  }

  // functions
  function reset() {
    if (!reachTool.areAllTouchPointsValueZero($deployedTouchPoints)) {
      //TODO: circular reference?
      deployedTouchPoints.set(reachTool.setAllTouchPointsToZero($deployedTouchPoints));
    } else {
      $marketData
        ? reachTool.initWithData($defaultStrategyWithFormula, $defaultStrategyExtensionForData)
        : reachTool.init($defaultStrategyWithFormula);
    }
  }

  function hide() {
    deployedTouchPoints.update(($deployedTouchPoints) => {
      return reachTool.hide($deployedTouchPoints);
    });
  }

  function sort() {
    const [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort(
      $deployedTouchPoints,
      $sortedByName,
      $language
    );
    deployedTouchPoints.set(sortedDeployedTouchPoints);
    sortedByName.set(updatedSortedByName);
  }
</script>

<div class="container">
  {#if currentUser}
    <form>
      <MarketSelect />
      <UseMarketDataCheck />
      {#if $marketData && $useMarketData}
        <GenderButton />
        <AgeGroupsSelect />
      {/if}
    </form>
  {/if}
  <menu class="operations">
    <button type="button" on:click|stopPropagation|preventDefault={reset}>
      {#if reachTool.areAllTouchPointsValueZero($deployedTouchPoints)}<Fa icon={faArrowRotateLeft} />{:else}<Fa
          icon={fa0}
        />{/if}
    </button>
    <button type="button" on:click|stopPropagation|preventDefault={sort}>
      {#if $sortedByName}<Fa
          icon={faArrowDownWideShort}
        />{:else if !$sortedByName && reachTool.areAllTouchPointsValueZero($deployedTouchPoints) && reachTool.isShowAll($deployedTouchPoints)}<Fa
          icon={faArrowDownAZ}
        />{:else}<Fa icon={faArrowDownAZ} />
      {/if}
    </button>
    <button type="button" on:click|stopPropagation|preventDefault={hide}>
      {#if reachTool.isShowAll($deployedTouchPoints)}<Fa icon={faMinus} />{:else}<Fa icon={faBars} />{/if}
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
  <menu class="memory">
    <button class="save" type="button" on:click|stopPropagation|preventDefault={reset}>
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

  form {
    grid-column: span 3;
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto;
    justify-content: center;
    align-items: center;
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
