<script lang="ts">
  // imports
  import {translations, language} from '../../../stores/utils';
  import {ageGroupIndexStart, ageGroupIndexEnd, ageGroups, marketData, useForResults} from '../../../stores/reach';
  import createConverter from '../../../functions/convert';
  import createResults from '/imports/ui/methods/results';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import prepareRespondents from '/imports/ui/methods/prepareRespondents';

  //variables
  const converter = createConverter();
  const calculateResults = createResults();

  // functions
  function adaptAgeGroupIndexEnd() {
    if ($ageGroupIndexEnd && $ageGroupIndexStart && $ageGroupIndexEnd - $ageGroupIndexStart < 1) {
      $ageGroupIndexEnd = $ageGroupIndexStart ? $ageGroupIndexStart + 1 : 1;
    }
  }
  function getResults() {
    if ($marketData && $useForResults == 'data') {
      prepareRespondents();
      calculateResults.forData();
    } else {
      calculateResults.forFormula();
    }
  }
</script>

<fieldset>
  {#if $ageGroups}
    <select
      class="agegroup__select"
      id="agegroup__select_start"
      bind:value={$ageGroupIndexStart}
      on:change={adaptAgeGroupIndexEnd}
      on:change={getResults}
    >
      {#each $ageGroups as ageGroup, index}
        <option value={index} disabled={false}>
          {ageGroup[0]} - {ageGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
    <label for="agegroup__select_start"><Fa icon={faSort} color={'var(--ra-teal)'} /></label>
    <select class="agegroup__select" id="agegroup__select_end" bind:value={$ageGroupIndexEnd} on:change={getResults}>
      {#each $ageGroups as ageGroup, index}
        <option value={index} disabled={index < ($ageGroupIndexStart ? $ageGroupIndexStart : 0) + 1}>
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
