<script lang="ts">
  // imports
  import type {AgeGroup} from '../../typings/types';
  import {agesForMarkets, strategy} from '../../stores/tools';
  import {translations, language} from '../../stores/utils';
  import createConverter from '../../functions/convert';

  //variables
  const converter = createConverter();
  export let ageGroup: AgeGroup;
  export let name: string;
  export let displayAge: number | string;
  const ageGroups = getGroups();

  // functions
  function getGroups() {
    let marketName = $strategy.market?.name;
    let ageGroupsForMarket = $agesForMarkets.find((item) => item.marketName == marketName);
    return ageGroupsForMarket?.groups;
  }
</script>

<form>
  <label for={name}>{displayAge}</label>
  <select class="age__select" {name} bind:value={ageGroup}>
    {#if ageGroups}
      {#each ageGroups as thisAgeGroup}
        <option value={thisAgeGroup}>
          {thisAgeGroup[0]} - {thisAgeGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    {/if}
  </select>
</form>

<style>
  select {
    width: 100%;
    margin: 7px;
    border: none;
    background-color: --ra-grey-bright;
  }
</style>
