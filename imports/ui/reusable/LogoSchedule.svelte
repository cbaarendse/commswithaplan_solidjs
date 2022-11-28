<script lang="ts">
  // imports
  import type {Logo} from '../types/types';

  // variables
  export let logo: Logo;
</script>

<div
  style:background={logo.colored
    ? null
    : 'linear-gradient(to bottom, var(--ra-red-grayscale) 33%, var(--ra-green-grayscale) 33% 67%, var(--ra-blue-grayscale) 67%'}
  style:font-size={logo.sizes}
  style:width={logo.width}
  style:height={logo.height}
/>

<style>
  div {
    border-radius: 50%;
  }
</style>
