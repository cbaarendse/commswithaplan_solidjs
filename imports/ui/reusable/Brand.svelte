<script lang="ts">
  // stores

  // types
  import type {Brand} from '../types/types';
  import {cssVariables} from '/imports/both/functions';

  // variables
  export let brand: Brand;

  const setCssVariables = function (element: HTMLElement) {
    element.style.setProperty('font-size', `${brand.fontSize}`);
    element.style.setProperty('color', `${brand.color}`);
  };
</script>

<div class="brand">
  <slot />
  <span use:cssVariables={setCssVariables}>
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
