<script lang="ts">
  // imports
  import type {AgeGroup} from '../../../../both/typings/types';
  import {translations, language} from '../../../stores/utils';
  import {marketName, markets, ageGroupStart, ageGroupEnd} from '../../../stores/tools';
  import createReachTool from '/imports/ui/functions/reach';
  import createConverter from '../../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';

  //variables
  const reachTool = createReachTool();
  const converter = createConverter();
  let groups: AgeGroup[] = reachTool.getAgeGroupsForMarket($marketName, $markets);
  let valueStart: number = 0;
  $: groupsEnd = groups.slice(valueStart + 1);
  let valueEnd: number = 0;
  ageGroupStart.set(groups[valueStart]);
  ageGroupEnd.set(groupsEnd[valueEnd]);

  // functions
</script>

<fieldset>
  {#if groups}
    <select class="agegroup__select" id="agegroup__select_start" bind:value={valueStart}>
      {#each groups as ageGroup, index}
        <option value={index}>
          {ageGroup[0]} - {ageGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
    <label for="agegroup__select_start"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
    <select class="agegroup__select" id="agegroup__select_end" bind:value={valueEnd}>
      {#each groupsEnd as ageGroup, index}
        <option value={index}>
          {ageGroup[0]} - {ageGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
    <label for="agegroup__select_end"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
  {/if}
</fieldset>

<style>
  fieldset {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    height: 100%;
    padding: 0.4rem 0.6rem;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  select {
    appearance: none;
    border: none;
    background-color: transparent;
    padding: 0.4em 0.6em 0.4em 0.4em;
  }
  select:focus {
    outline: solid 1px var(--ra-green);
  }
  label {
    background-color: none;
    padding: 0.2em 0.4em;
  }
</style>
