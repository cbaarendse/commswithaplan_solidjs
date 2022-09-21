<script lang="ts">
  // imports
  import type {Logo} from '../types/types';

  // variables
  export let logo: Logo;
</script>

<div
  style:background={logo.colored
    ? undefined
    : 'linear-gradient(to bottom, var(--ra-red-grayscale) 33%, var(--ra-green-grayscale) 33% 67%, var(--ra-blue-grayscale) 67%'}
  style:font-size={logo.style.fontSize}
  style:width={logo.style.width}
  style:height={logo.style.height}
/>

<style>
  div {
    border-radius: 50%;
  }
</style>
