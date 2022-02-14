<script lang="ts">
  // stores
  import {colorScheme, fontSizes} from '../../../client/stores';

  // types
  import {Brand} from '/types/interfaces';

  // variables
  export let brand: Brand;
  brand.color = 'blue';
  brand.fontSize = 'fs_2xl';
  brand.title = 'Comms With A Plan';
</script>

<div class="brand">
  <slot />
  <span style:color={$colorScheme[brand.color].base} style:font-size={$fontSizes[brand.fontSize]}>{brand.title}</span>
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
