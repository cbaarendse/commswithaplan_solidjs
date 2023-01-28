<script lang="ts">
  // imports
  import type {Logo} from '../../typings/types';

  // variables
  export let logo: Logo;
</script>

<div class="logo" style="font-size:{logo.fontSize};width:{logo.width};height:{logo.height}">
  <div class="circle1" style="background-color:{logo.colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)'}" />
  <div class="circle2" style="background-color:{logo.colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)'}" />
  <div class="circle3" style="background-color:{logo.colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)'}" />
</div>

<style>
  div.logo {
    position: relative;
    background-color: transparent;
  }
  div.circle1,
  div.circle2,
  div.circle3 {
    position: absolute;
    width: 75%;
    height: 75%;
    border-radius: 50%;
  }

  div.circle1 {
    top: 14%;
    right: 0%;
    z-index: 50;
  }

  div.circle2 {
    top: 5%;
    left: 7.5%;
    z-index: 40;
  }

  div.circle3 {
    left: 0%;
    bottom: 5%;
    z-index: 30;
  }
</style>
