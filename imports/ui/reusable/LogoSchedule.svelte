<script lang="ts">
  // stores
  // functions
  import {cssVariables} from '/imports/both/functions';
  // variables
  import type {Logo} from '/imports/ui/types/types';
  export let logo: Logo;

  const setCssDiv = function (element: HTMLElement) {
    element.style.setProperty(
      'background',
      `linear-gradient(to bottom, ${logo.colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)'} 33%,
${logo.colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)'} 33% 67%, ${
        logo.colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)'
      } 67%)`
    );
    element.style.setProperty('font-size', `${logo.fontSize}`);
    element.style.setProperty('width', `${logo.width}`);
    element.style.setProperty('height', `${logo.height}`);
  };
</script>

<div use:cssVariables={setCssDiv} />

<style>
  div {
    border-radius: 50%;
  }
</style>
