<script lang="ts">
  // imports
  import type {Brand} from '../typings/types';

  // variables
  export let brand: Brand;
</script>

<div class="brand">
  <slot />
  <span style="font-size:{brand.sizes}; font-color:{brand.color}">
    {brand.title}
  </span>
</div>

<style>
  .brand {
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.7em;
    align-items: center;
    font-family: 'Trebuchet MS';
  }
</style>
