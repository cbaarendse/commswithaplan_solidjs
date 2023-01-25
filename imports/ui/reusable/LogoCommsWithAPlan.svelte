<script lang="ts">
  // imports
  import {Logo} from '../typings/types';

  // variables
  export let logo: Logo;
</script>

<div
  style="background:{logo.colored
    ? undefined
    : 'linear-gradient(to bottom, var(--ra-red-grayscale) 33%, var(--ra-green-grayscale) 33% 67%, var(--ra-blue-grayscale) 67%'};
  font-size:{logo.fontSize}; width:{logo.width}; height:{logo.height}; min-width:{logo.minWidth}; min-height:{logo.minHeight}"
>
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
