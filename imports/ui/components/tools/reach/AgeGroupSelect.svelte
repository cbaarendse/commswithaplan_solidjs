<script lang="ts">
  // imports
  import type {AgeGroup} from '../../../typings/types';
  import {translations, language} from '../../../stores/utils';
  import createReachTool from '../../../functions/reach';
  import createConverter from '../../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';

  //variables
  const converter = createConverter();
  const reachTool = createReachTool();
  export let groups: AgeGroup[];
  export let value: number = 0;
  export let name: string;
  export let id: string;

  // functions
</script>

{#if groups}
  <form>
    <label for={id} />
    <select class="age__select" {id} {name} bind:value>
      {#each groups as thisAgeGroup, index}
        <option value={index}>
          {thisAgeGroup[0]} - {thisAgeGroup[1]}
          {converter.translate('year', $translations, $language)}
        </option>
      {/each}
    </select>
    <Fa icon={faSort} />
  </form>
{/if}

<style>
  form {
    background-color: grey;
    border-radius: 3px;
  }
  label {
    background-color: none;
    padding: 0.2em 0.4em;
  }
  select::after {
    content: '^';
    color: red;
  }
  select {
    appearance: none;
    /* outline: none; */
    background-color: none;
    /* width: auto; */

    /* margin: 0em 0em; */
    padding: 0.4em 0.6em 0.4em 0.4em;
    border: solid 1px var(--ra-teal);
    /* font-family: inherit; */
    /* font-size: inherit; */
    cursor: inherit;
    /* line-height: inherit; */
  }
</style>
