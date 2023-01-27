<script lang="ts">
  // imports
  import type {AgeGroup} from '../../typings/types';
  import {strategy} from '../../stores/tools';
  import {translations, language} from '../../stores/utils';
  import createReachTool from '../../functions/reach';
  import createConverter from '../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

  //variables
  const reachTool = createReachTool();
  const converter = createConverter();
  const ageGroupsForMarkets = reachTool.setAgeGroupsForMarkets();
  const ageGroups = getGroups();
  export let ageGroup: AgeGroup | undefined;
  export let name: string;
  export let id: string;

  // functions
  function getGroups() {
    let marketName = $strategy.market?.name;
    let ageGroupsForMarket = ageGroupsForMarkets.find((item) => item.marketName == marketName);
    return ageGroupsForMarket?.groups;
  }
</script>

<form>
  {#if ageGroups}
    <label for={id}><Fa icon={faCaretDown} /></label>
    <select class="age__select" {id} {name} bind:value={ageGroup}>
      {#each ageGroups as thisAgeGroup}
        <option value={thisAgeGroup}>
          {thisAgeGroup[0]} - {thisAgeGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
  {/if}
</form>

<style>
  form {
    display: flex;
    gap: 0em;
  }
  label {
    display: flex;
    background-color: none;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  select {
    appearance: none;
    outline: none;
    background-color: var(--ra-teal-light);
    width: 100%;
    margin: 0em 0em;
    padding: 0.4em 0.6em 0.4em 0.4em;
    border: none;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
  }
</style>
