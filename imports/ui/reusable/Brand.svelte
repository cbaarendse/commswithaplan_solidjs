<script lang="ts">
  // types
  import type {Brand} from '../types/types';

  // variables
  export let brand: Brand;
</script>

<div class="brand">
  <slot />
  <span style:font-size={brand.style.fontSize} style:color={brand.style.color}>
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
