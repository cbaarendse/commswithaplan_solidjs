<script lang="ts">
  // imports
  import createReachTool from '../../functions/reach';
  import {strategy} from '../../stores/tools';

  //variables
  const reachTool = createReachTool();
  const markets = reachTool.setMarkets();

  // functions
  function adaptMarketData() {
    $strategy.marketData = false; // TODO: or check for probabilities existence and then eventually change
  }
  // exports
</script>

<form>
  <select class="market" name="market" bind:value={$strategy.market} on:change={adaptMarketData}>
    {#each markets as thisMarket}
      <option value={thisMarket}>{thisMarket.flag || thisMarket.name}</option>
    {/each}
  </select>
</form>

<style>
  select {
    appearance: none;
    width: auto;
    margin: 0em 0em;
    padding: 0.6em;
    border: none;
    outline: none;
    box-shadow: none;
    background-color: var(--ra-teal-light);
  }
</style>
