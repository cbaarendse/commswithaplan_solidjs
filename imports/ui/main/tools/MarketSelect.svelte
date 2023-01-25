<script lang="ts">
  // imports
  import type {Strategy} from '../../typings/types';

  //variables

  // functions

  // exports
  export let markets: Strategy['market'][];
  export let market: Strategy['market'];
</script>

<form>
  <select class="market" name="market" bind:value={market}>
    {#each markets as thisMarket}
      <option value={thisMarket}>{thisMarket.flag || thisMarket.name}</option>
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
