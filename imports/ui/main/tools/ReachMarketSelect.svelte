<script lang="ts">
  // imports
  import {strategy, markets} from '../../stores/tools';

  //variables

  // functions

  // exports
</script>

<form>
  <select class="market" name="market" bind:value={$strategy.market} on:change>
    {#each $markets as thisMarket}
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
