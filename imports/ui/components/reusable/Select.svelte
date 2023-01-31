<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import createConverter from '../../functions/convert';
  import type {Select} from '../../../both/typings/types';
  import {language, translations} from '../../stores/utils';

  // exports
  export let select: Select;
  export let selectList: Select[];
  export let displayName: string;

  //variables
  const converter = createConverter();

  // functions
  const dispatch = createEventDispatcher();
  //TODO: find a way to send event.target.value along
  function selectOption() {
    dispatch('selectOptionValueForName', {value: 'value'});
  }
</script>

<form>
  <label for={select.name}>{$language === 'dutch' ? 'Kies ' : 'Choose '}{displayName}</label>
  <select
    class={select.class}
    id={select.id}
    name={select.name}
    bind:value={select.value}
    on:blur|preventDefault|stopPropagation={selectOption}
  >
    {#each selectList as option (option.id)}
      <option value={option.name}>{converter.translate(option.name, $translations, $language) || option.value}</option>
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
