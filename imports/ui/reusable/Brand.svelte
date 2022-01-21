<script lang="ts">
  // variables
  import {colorScheme} from '../../../client/stores';
  export let colors: string = 'blue';
  export let fontSize: string = 'var(--font-size-2xl)';
  export let title: string = 'Comms With A Plan';
</script>

<div class="brand">
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
