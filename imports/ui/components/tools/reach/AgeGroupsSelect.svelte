<script lang="ts">
  // imports
  import type {Strategy} from '../../../../both/typings/types';
  import {translations, language} from '../../../stores/utils';
  import {briefing, ageGroups} from '../../../stores/reach';
  import createConverter from '../../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import {onDestroy} from 'svelte';

  //variables
  const converter = createConverter();
  let ageGroupIndexStart: Strategy['ageGroupIndexStart'];
  let ageGroupIndexEnd: Strategy['ageGroupIndexEnd'];
  const unsubscribe = briefing.subscribe((data) => {
    ageGroupIndexStart = data.ageGroupIndexStart ? data.ageGroupIndexStart : 0;
    ageGroupIndexEnd = data.ageGroupIndexEnd
      ? data.ageGroupIndexEnd <= ageGroupIndexStart
        ? ageGroupIndexStart + 1
        : data.ageGroupIndexEnd
      : ageGroupIndexStart + 1;
  });
  $: briefing.update((data) => {
    data.ageGroupIndexStart = ageGroupIndexStart;
    data.ageGroupIndexEnd = ageGroupIndexEnd;
    return data;
  });

  // functions

  onDestroy(() => unsubscribe());
</script>

<fieldset>
  {#if $ageGroups}
    <select class="agegroup__select" id="agegroup__select_start" bind:value={ageGroupIndexStart}>
      {#each $ageGroups as ageGroup, index}
        <option value={index} disabled={false}>
          {ageGroup[0]} - {ageGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
    <label for="agegroup__select_start"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
    <select class="agegroup__select" id="agegroup__select_end" bind:value={ageGroupIndexEnd}>
      {#each $ageGroups as ageGroup, index}
        <option value={index} disabled={index < (ageGroupIndexStart ? ageGroupIndexStart : 0) + 1}>
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
