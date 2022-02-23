<script lang="ts">
  // packages
  import {createEventDispatcher} from 'svelte';

  // types
  import type {SelectItem} from '../types/interfaces';
  import {UiProvider} from '../types/classes';

  // variables
  import {language, translations} from '../stores/stores';
  export let size: string = 'normal'; // or small, large, xlarge
  export let selectItem: SelectItem;
  export let list: SelectItem[];
  export let id: string;
  export let name: SelectItem['name'];

  // constants

  // functions
  const dispatch = createEventDispatcher();
</script>

<select class={size} {id} {name} bind:value={selectItem} on:change={() => dispatch('selectItem', {selectItem})}>
  {#each list as item (item.index)}
    <option value={item}>{UiProvider.translate(item.name, $translations, $language) || item.name}</option>
  {/each}
</select>

<style>
  select {
    width: 100%;
    margin: 7px;
    border: none;
    background-color: --ra-grey-bright;
  }

  .small {
    height: 0.5rem;
  }
  .normal {
    height: 1rem;
  }
  .large {
    height: 1.5rem;
  }
  .xlarge {
    height: 2rem;
  }
</style>
