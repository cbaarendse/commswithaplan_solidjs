<script lang="ts">
  // stores
  import {colorsScheme, sizesScheme} from '../stores/stores';

  // types
  import type {Brand} from '../types/interfaces';

  // functions
  import {cssVariables} from '/imports/both/functions';

  // variables
  export let brand: Brand;
  // brand.color = 'blue';
  // brand.size = 'xl_2';
  // brand.title = 'Comms With A Plan';

  const setCssVariables = function (element: HTMLElement) {
    element.style.setProperty('font-size', `${brand.fontSize}`);
    element.style.setProperty('color', `${brand.color}`);
  };
</script>

<div class="brand">
  <slot />
  <h2 use:cssVariables={setCssVariables}>
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
