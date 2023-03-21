<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import GenderButton from './GenderButton.svelte';
  import AgeGroupsSelect from './AgeGroupsSelect.svelte';
  import UseMarketDataCheck from './UseMarketDataCheck.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import createReachTool from '../../../functions/reach';
  import renew from '../../../functions/renew';
  import sort from '../../../functions/sort';
  import {language} from '../../../stores/utils';
  import {marketData, deployment, results, sortedByName, useMarketData} from '../../../stores/reach';
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
    if (reachTool.areAllTouchPointsValueZero($deployment)) {
      deployment.update((data) => {
        return data.map((touchPoint) => Object.assign(touchPoint, {value: 0.0}));
      });
    } else {
      renew();
    }
    $results = [0, 0];
  }
  function hide() {
    deployment.set(reachTool.hide($deployment));
  }

  function handleSort() {
    const [sortedDeployedTouchPoints, updatedSortedByName] = sort($language);
    deployment.set(sortedDeployedTouchPoints);
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
  <div class="operations__container">
    <menu>
      <button type="button" on:click|stopPropagation|preventDefault={reset}>
        {#if reachTool.areAllTouchPointsValueZero($deployment)}<Fa icon={faArrowRotateLeft} />{:else}<Fa
            icon={fa0}
          />{/if}
      </button>
      <button type="button" on:click|stopPropagation|preventDefault={handleSort}>
        {#if $sortedByName}<Fa
            icon={faArrowDownWideShort}
          />{:else if !$sortedByName && reachTool.areAllTouchPointsValueZero($deployment) && reachTool.isShowAll($deployment)}<Fa
            icon={faArrowDownAZ}
          />{:else}<Fa icon={faArrowDownAZ} />
        {/if}
      </button>
      <button type="button" on:click|stopPropagation|preventDefault={hide}>
        {#if reachTool.isShowAll($deployment)}<Fa icon={faMinus} />{:else}<Fa icon={faBars} />{/if}
      </button>
      <button
        class="save"
        type="button"
        on:click|stopPropagation|preventDefault={reset}
        on:click|stopPropagation|preventDefault={() => {
          $results = [0, 0];
        }}
      >
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
