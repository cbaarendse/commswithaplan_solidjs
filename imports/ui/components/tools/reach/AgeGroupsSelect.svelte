<script lang="ts">
  // imports
  import type {Market, Strategy} from '../../../../both/typings/types';
  import {translations, language} from '../../../stores/utils';
  import {briefing} from '../../../stores/reach';
  import createReachTool from '/imports/ui/functions/reach';
  import createConverter from '../../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import {onDestroy} from 'svelte';

  //variables
  const reachTool = createReachTool();
  const converter = createConverter();
  let marketName: Strategy['marketName'];
  let markets: Market[];
  let ageGroupIndexStart: Strategy['ageGroupIndexStart'];
  let ageGroupIndexEnd: Strategy['ageGroupIndexEnd'];
  const unsubscribe = briefing.subscribe((value) => {
    marketName = value.marketName;
    ageGroupIndexStart = value.ageGroupIndexStart;
    ageGroupIndexEnd = value.ageGroupIndexEnd;
  });
  $: groups = reachTool.getAgeGroupsForMarket(marketName, markets);
  $: groupsEnd = groups.slice(ageGroupIndexStart ? ageGroupIndexStart : 0 + 1);
  $: briefing.update((value) => {
    value.ageGroupIndexStart = ageGroupIndexStart;
    value.ageGroupIndexEnd = ageGroupIndexEnd;
    return value;
  });

  // functions

  onDestroy(() => unsubscribe());
</script>

<fieldset>
  {#if groups}
    <select class="agegroup__select" id="agegroup__select_start" bind:value={ageGroupIndexStart}>
      {#each groups as ageGroup, index}
        <option value={index}>
          {ageGroup[0]} - {ageGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
    <label for="agegroup__select_start"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
    <select class="agegroup__select" id="agegroup__select_end" bind:value={ageGroupIndexEnd}>
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
