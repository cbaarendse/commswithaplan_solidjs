<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import type {Select, Option} from '../types/types';
  import {Ui} from '../types/classes';
  import {language, translations} from '../stores/uii // variables
  export let select: Select;
  export let list: Option[];

  // constants

  // functions
  const dispatch = createEventDispatcher();
  //TODO: find a way to send event.target.value along
  function selectOption() {
    dispatch('selectOptionValueForName', {value: 'value'});
  }
</script>

<form>
  <label for={select.name}>{$language === 'dutch' ? 'Kies ' : 'Choose '}{select.displayName}</label>
  <select
    class={select.className}
    id={select.id}
    name={select.name}
    bind:value={select.value}
    on:blur|preventDefault|stopPropagation={selectOption}
  >
    {#each list as option (option.index)}
      <option value={option.name}>{Ui.translate(option.name, $translations, $language) || option.value}</option>
    {/each}
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
