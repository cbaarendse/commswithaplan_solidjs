<script lang="ts">
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';

  // imports
  import {markets, marketName} from '../../../stores/tools';
  import {Market} from '/imports/both/typings/types';

  //variables
  let value: Market['name'] = $marketName;
  marketName.set(value);

  // functions
</script>

<fieldset>
  <select class="market" name="market" id="market__select" bind:value>
    {#each $markets as thisMarket}
      <option value={thisMarket.name}>{thisMarket.flag || thisMarket.name}</option>
    {/each}
  </select>
  <label for="market__select"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
</fieldset>

<style>
  fieldset {
    height: 100%;
    padding: 0.4remrem 0.6rem;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
    display: grid;
    grid-template-columns: 3fr 1fr;
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
