<script lang="ts">
  // imports
  import GenderButton from './GenderButton.svelte';
  import AgeGroupSelect from './AgeGroupSelect.svelte';
  import MarketDataCheck from './MarketDataCheck.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {strategy} from '../../../stores/tools';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faArrowRotateLeft,
    fa0,
    faArrowDownAZ,
    faArrowDownWideShort,
    faBars,
    faMinus
  } from '@fortawesome/free-solid-svg-icons';

  // variables
  const reachTool = createReachTool();
  let iconSize = '100%';
  let markets = reachTool.setMarkets();
  let indexMarket = 1;
  let indexStart: number = 0;
  let indexEnd: number = 0;
  const ageGroupsForMarkets = reachTool.setAgeGroupsForMarkets();
  let ageGroupsForMarket = $strategy.market?.name
    ? ageGroupsForMarkets.find((item) => item.marketName == $strategy.market?.name)
    : ageGroupsForMarkets.find((item) => item.marketName == 'nl');
  $: groupsForAgeStart = ageGroupsForMarket?.groups;
  $: groupsForAgeEnd = ageGroupsForMarket?.groups.slice(indexStart ? indexStart : 1);

  // functions
  function reset() {
    $strategy = reachTool.reset($strategy, $language);
  }

  function sort() {
    $strategy = reachTool.sort($strategy, $language);
  }

  function hide() {
    $strategy.deployment = reachTool.hide($strategy.deployment);
  }
</script>

<div class="container">
  <menu>
    <MarketSelect {markets} bind:value={indexMarket} />
    <MarketDataCheck />
    {#if $strategy.marketData}
      <GenderButton />
      <AgeGroupSelect
        bind:value={indexStart}
        groups={groupsForAgeStart}
        name="age-start__select"
        id="age-start__select"
      />
      <AgeGroupSelect bind:value={indexEnd} groups={groupsForAgeEnd} name="age-end__select" id="age-end__select" />
    {/if}
  </menu>
  <menu>
    <button type="button" on:click|stopPropagation|preventDefault={reset}>
      {#if reachTool.areAllTouchPointsValueZero($strategy.deployment)}<Fa
          icon={faArrowRotateLeft}
          size={iconSize}
        />{:else}<Fa icon={fa0} size={iconSize} />{/if}
    </button>
    <button type="button" on:click|stopPropagation|preventDefault={sort}>
      {#if $strategy.sortedByName}<Fa
          icon={faArrowDownWideShort}
          size={iconSize}
        />{:else if !$strategy.sortedByName && reachTool.areAllTouchPointsValueZero($strategy.deployment) && reachTool.isShowAll($strategy.deployment)}<Fa
          icon={faArrowDownAZ}
          size={iconSize}
        />{:else}<Fa icon={faArrowDownAZ} size={iconSize} />
      {/if}
    </button>
    <button type="button" on:click={hide}>
      {#if reachTool.isShowAll($strategy.deployment)}<Fa icon={faMinus} size={iconSize} />{:else}<Fa
          icon={faBars}
          size={iconSize}
        />{/if}
    </button>
  </menu>
</div>

<style>
  div.container {
    display: flex;
    flex-flow: row wrap;
    gap: 1.4em;
    justify-content: flex-start;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  menu {
    flex: 100%;
    display: flex;
    gap: 7%;
    justify-content: flex-start;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.6em;
    height: 3.6em;
    font-size: 1em;
    border-radius: 50%;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
  }
  menu > button:nth-of-type(1) {
    background-color: var(--ra-red);
  }
  menu > button:nth-of-type(2) {
    background-color: var(--ra-green);
  }
  menu > button:nth-of-type(3) {
    background-color: var(--ra-blue);
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
