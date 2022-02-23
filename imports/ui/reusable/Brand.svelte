<script lang="ts">
  // stores
  import {colorsScheme, sizesScheme} from '../stores/stores';

  // types
  import {Brand} from '../typ../types/interfaces// variables
  export let brand: Brand;
  brand.color = 'blue';
  brand.size = 'xl_2';
  brand.title = 'Comms With A Plan';
</script>

<div class="brand">
  <slot />
  <h2 style:color={$colorsScheme[brand.color].base} style:font-size={$sizesScheme[brand.size].font_size}>
    {brand.title}
  </h2>
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
