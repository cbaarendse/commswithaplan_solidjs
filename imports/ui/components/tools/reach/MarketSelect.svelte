<script lang="ts">
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';

  // imports
  import {briefing, marketName, markets} from '../../../stores/reach';

  //variables

  // functions
</script>

<fieldset>
  <select
    class="market"
    name="market"
    id="market__select"
    bind:value={$marketName}
    on:change={() => {
      $briefing.useMarketData = false;
    }}
  >
    {#each $markets as thisMarket}
      <option value={thisMarket.name}>{thisMarket.flag || thisMarket.name}</option>
    {/each}
  </select>
  <label for="market__select"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
</fieldset>

<style>
  fieldset {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    height: 100%;
    padding: 0.4rem 0.6rem;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
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
    background-color: transparent;
    padding: 0.2em 0.4em;
  }
</style>
