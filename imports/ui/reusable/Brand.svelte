<script>
  // variables
  import {colorScheme} from '../../../client/stores';
  export let title;
  export let colors = 'blue';
  export let gridArea = 'brand';
</script>

<div class="brand" style="grid-area: {gridArea}">
  <slot />
  <span style="color:{$colorScheme[colors].base}">{title}</span>
</div>

<style>
  .brand {
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.7em;
    align-items: center;
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }
</style>
