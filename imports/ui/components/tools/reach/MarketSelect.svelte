<script lang="ts">
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';

  // imports
  import {Market} from '/imports/ui/typings/types';

  //variables
  export let markets: Market[];
  export let value: number = 1;

  // functions
  // exports
</script>

<label for="market__select"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
<select class="market" name="market" id="market__select" bind:value on:change>
  {#each markets as thisMarket, index}
    <option value={index}>{thisMarket.flag || thisMarket.name}</option>
  {/each}
</select>

<style>
  form {
    display: grid;
    grid-template-columns: 1fr 3rem;
    grid-template-areas: 'select label';
    padding: 0;
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
    background-color: transparent;
    padding: 0.2em 0.4em;
  }
</style>
