<script>
  // variables
  import {colorScheme} from '../../../client/stores';
  export let colors = 'blue';
  export let gridArea = 'brand';
  export let fontSize = 'var(--font-size-2xl)';
  export let title = 'Comms With A Plan';
</script>

<div class="brand" style="grid-area: {gridArea}">
  <slot />
  <span style="color:{$colorScheme[colors].base};font-size: {fontSize};">{title}</span>
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
