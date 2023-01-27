<script lang="ts">
  // imports
  import {Strategy} from '../../typings/types';
  import createReachTool from '../../functions/reach';

  //variables
  export let market: Strategy['market'];
  const reachTool = createReachTool();
  const markets = reachTool.setMarkets();

  // functions

  // exports
</script>

<form>
  <select class="market" name="market" bind:value={market} on:change>
    {#each markets as thisMarket}
      <option value={thisMarket}>{thisMarket.flag || thisMarket.name}</option>
    {/each}
  </select>
</form>

<style>
  select {
    all: unset;
    width: auto;
    margin: 0em 0em;
    border: none;
    background-color: transparent;
  }
</style>
