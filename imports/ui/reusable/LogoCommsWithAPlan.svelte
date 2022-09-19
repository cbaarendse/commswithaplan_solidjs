<script lang="ts">
  // imports
  import {Logo} from '../types/types';

  // variables
  export let logo: Logo;
</script>

<div
  style:background="linear-gradient(to bottom, ${logo.colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)'} 33%, ${logo.colored
    ? 'var(--ra-green)'
    : 'var(--ra-green-grayscale)'} 33% 67%, ${logo.colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)'} 67%"
  style:font-size={logo.style.fontSize}
  style:width={logo.style.width}
  style:height={logo.style.height}
  style:minWidth={logo.style.minWidth}
  style:minHeight={logo.style.minHeight}
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
