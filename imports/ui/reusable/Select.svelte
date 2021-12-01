<script>
  import {createEventDispatcher} from 'svelte';
  import {translate} from '../../functions';

  export let size = 'normal'; // or small, large, xlarge
  export let list;
  export let selectedItem;
  export let id;
  export let name;

  const dispatch = createEventDispatcher();
</script>

<select class={size} {id} {name} bind:value={selectedItem} on:change={() => dispatch('selectItem', {selectedItem})}>
  {#each list as item (item._id)}
    <option value={item}>{translate(item.name) || item.name}</option>
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
