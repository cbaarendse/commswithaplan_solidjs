<script lang="ts">
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';

  // imports
  import {markets, marketName} from '../../../stores/tools';

  //variables

  // functions

  // exports
</script>

<select class="market" name="market" id="market__select" bind:value={$marketName}>
  {#each $markets as thisMarket}
    <option value={thisMarket.name}>{thisMarket.flag || thisMarket.name}</option>
  {/each}
</select>
<label for="market__select"><Fa icon={faSort} color={'var(--ra-teal'} /></label>

<style>
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
