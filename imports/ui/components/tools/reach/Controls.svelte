<script lang="ts">
  // imports
  import GenderButton from './GenderButton.svelte';
  import AgeGroupSelect from './AgeGroupSelect.svelte';
  import MarketDataCheck from './MarketDataCheck.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {strategy} from '../../../stores/tools';
  import {Genders} from '/imports/ui/typings/types';
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
  let markets = reachTool.setMarkets();
  let indexMarket: number = 1; // == 'nl'
  let genders: Genders = reachTool.setGenders();
  let indexStart: number = 0;
  let indexEnd: number = 0;
  const ageGroupsForMarket = reachTool.setAgeGroupsForMarket($strategy.marketName);

  $: {
    $strategy.marketName = markets[indexMarket].name;
    $strategy.genders = genders;
  }
  $: groupsForAgeStart = ageGroupsForMarket;
  $: groupsForAgeEnd = ageGroupsForMarket.slice(indexStart ? indexStart : 1);

  let iconSize = '100%';

  // functions
  function handleChangeMarket() {
    $strategy = reachTool.setNewStrategyWithFormula($strategy.marketName);
  }
  function handleChangeMarketData() {
    if ($strategy.marketData) {
      $strategy = reachTool.setNewStrategyWithData($strategy.marketName);
    } else {
      $strategy = reachTool.setNewStrategyWithFormula($strategy.marketName);
    }
  }

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
  <form>
    <fieldset class="market">
      <MarketSelect {markets} bind:value={indexMarket} on:change={handleChangeMarket} />
    </fieldset>
    <fieldset class="data">
      <MarketDataCheck bind:checked={$strategy.marketData} on:change={handleChangeMarketData} />
    </fieldset>
    {#if $strategy.marketData}
      <fieldset class="gender">
        <GenderButton bind:value={genders} />
      </fieldset>
      <fieldset class="age">
        <AgeGroupSelect
          bind:value={indexStart}
          groups={groupsForAgeStart}
          name="age-start__select"
          id="age-start__select"
        />
        <AgeGroupSelect bind:value={indexEnd} groups={groupsForAgeEnd} name="age-end__select" id="age-end__select" />
      </fieldset>
    {/if}
  </form>
  <menu class="buttons">
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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  form {
    display: grid;
    gap: 0.4rem;
    grid-template-areas: 'market data data gender age age age';
  }
  fieldset {
    padding: 0;
    height: 100%;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
    justify-content: flex-start;
  }
  fieldset.market {
    grid-area: market;
    display: flex;
  }
  fieldset.data {
    grid-area: data;
    display: flex;
  }
  fieldset.gender {
    grid-area: gender;
    display: flex;
  }
  fieldset.age {
    grid-area: age;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
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
