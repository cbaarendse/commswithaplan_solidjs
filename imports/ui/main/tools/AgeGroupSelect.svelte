<script lang="ts">
  // imports
  import type {AgeGroup} from '../../types/types';

  //variables

  // functions

  // exports
  export let ageGroups: AgeGroup[];
  export let ageGroup: AgeGroup;
</script>

<form>
  <select class="market" name="market" bind:value={ageGroup}>
    {#each ageGroups as thisAgeGroup, id}
      <option value={thisAgeGroup}>{id}: {thisAgeGroup[0]} - {thisAgeGroup[1]}</option>
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
