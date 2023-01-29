<script lang="ts">
  // imports
  import type {AgeGroup} from '../../../typings/types';
  import {translations, language} from '../../../stores/utils';
  import createConverter from '../../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';

  //variables
  const converter = createConverter();
  export let groups: AgeGroup[];
  export let value: number = 0;
  export let name: string;
  export let id: string;

  // functions
</script>

{#if groups}
  <form>
    <label for={id}><Fa icon={faSort} color={'var(--ra-teal'} /></label>
    <select class="age__select" {id} {name} bind:value>
      {#each groups as thisAgeGroup, index}
        <option value={index}>
          {thisAgeGroup[0]} - {thisAgeGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
  </form>
{/if}

<style>
  form {
    display: grid;
    grid-template-columns: auto 3rem;
    grid-template-areas: 'select label';
    padding: 0;
    height: fit-content;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  select {
    grid-area: select;
    appearance: none;
    border: none;
    background-color: transparent;
    padding: 0.4em 0.6em 0.4em 0.4em;
  }
  select:focus {
    outline: solid 1px var(--ra-green);
  }
  label {
    grid-area: label;
    background-color: none;
    padding: 0.2em 0.4em;
  }
</style>
