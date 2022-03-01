<script lang="ts">
  // functions
  import {cssVariables} from '/imports/both/functions';
  // variables
  import type {Logo} from '/imports/ui/types/interfaces';
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

<div use:cssVariables={setCssDiv}>
  <span>P</span>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, var(--ra-red) 33%, var(--ra-green) 33% 67%, var(--ra-blue) 67%);
    border-radius: 50%;
  }
  span {
    color: var(--ra-white);
    font-family: 'Stencil Std' 'Trebuchet MS', 'American Typewriter', serif;
    font-size: 0.9em;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';
  }
</style>
