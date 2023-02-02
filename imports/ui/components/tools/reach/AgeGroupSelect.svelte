<script lang="ts">
  // imports
  import type {AgeGroup} from '../../../../both/typings/types';
  import {translations, language} from '../../../stores/utils';
  import createConverter from '../../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import {onMount} from 'svelte';

  //variables
  onMount(() => {});
  const converter = createConverter();
  export let groups: AgeGroup[];
  export let value: number = 0;
  export let name: string;
  export let id: string;

  // functions
</script>

{#if groups}
  <select class="age__select" {id} {name} bind:value>
    {#each groups as ageGroup, index}
      <option value={index}>
        {ageGroup[0]} - {ageGroup[1]}
        {converter.translate('year', $translations, $language)}
      </option>
    {/each}
  </select>
  <label for={id}><Fa icon={faSort} color={'var(--ra-teal'} /></label>
{/if}

<style>
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
