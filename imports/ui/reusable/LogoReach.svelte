<script lang="ts">
  // stores

  // functions
  import {cssVariables} from '/imports/both/functions';
  // variables
  import type {Logo} from '../types/types';
  export let logo: Logo;

  const setCssDivLogo = function (element: HTMLElement) {
    element.style.setProperty('font-size', `${logo.fontSize}`);
    element.style.setProperty('width', `${logo.width}`);
    element.style.setProperty('height', `${logo.height}`);
  };
  const setCssDivCircle_1 = function (element: HTMLElement) {
    element.style.setProperty('background-color', `${logo.colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)'}`);
  };

  const setCssDivCircle_2 = function (element: HTMLElement) {
    element.style.setProperty('background-color', `${logo.colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)'}`);
  };

  const setCssDivCircle_3 = function (element: HTMLElement) {
    element.style.setProperty('background-color', `${logo.colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)'}`);
  };
</script>

<div class="logo" use:cssVariables={setCssDivLogo}>
  <div class="circle1" use:cssVariables={setCssDivCircle_1} />
  <div class="circle2" use:cssVariables={setCssDivCircle_2} />
  <div class="circle3" use:cssVariables={setCssDivCircle_3} />
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
