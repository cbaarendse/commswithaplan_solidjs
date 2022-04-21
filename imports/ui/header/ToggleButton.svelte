<script lang="ts">
  // imports
  import {cubicInOut, easeInOut} from 'svelte/easing';
  import {fly} from 'svelte/transition';
  import Button from '../../ui/reusable/Button.svelte';
  import {navigationVisible, isLargeScreen, toggleButtonVisible} from '../stores/utils';

  // variables
  //TODO: finetune
  toggleButtonVisible.subscribe((visible) => {
    return $navigationVisible === true ? $isLargeScreen === false : true;
  });

  //TODO: finetune
  function spinTop(node: HTMLElement) {
    return {
      duration: 1000,
      easing: cubicInOut,
      css: (t: number, u: number) => `transform: rotate(${t * 45}deg translateY(${t * 42}%)`
    };
  }
  function leaveCenter(node: HTMLElement) {
    return {
      duration: 1000,
      easing: cubicInOut,
      css: (t: number, u: number) => `transform: scale(${t}) translateX(${t * 100}%)`
    };
  }
  function spinBottom(node: HTMLElement) {
    return {
      duration: 1000,
      easing: cubicInOut,
      css: (t: number, u: number) => `transform: rotate(${t * 135}deg translateY(${u * 42}%)`
    };
  }
</script>

<!-- This button animates when used for toggling navigation, but also if screen size is changed beyond threshold. -->
<Button
  btn={{
    className: 'navigation__toggle',
    type: 'button',
    role: 'button',
    backgroundColor: 'transparent',
    width: 'var(--ra-xl)',
    height: 'var(--ra-xl)',
    disabled: false
  }}
  on:clickedButton={() => ($navigationVisible = !$navigationVisible)}
>
  {#if $navigationVisible}
    <div class="bars">
      {#if $toggleButtonVisible}
        <div class="bar-1" transition:spinTop />
      {/if}
      {#if $navigationVisible}
        <div
          class="bar-2"
          transition:fly={{delay: 0, duration: 300, x: 100, y: 0, opacity: 1, easing: cubicInOut}}
        />{/if}
      {#if $toggleButtonVisible}
        <div class="bar-3" transition:spinBottom />{/if}
    </div>
  {/if}
</Button>

<style>
  .bars {
    position: relative;
    width: 2rem;
    height: 2rem;
    background-color: var(--ra-grey-off-white);
  }
  .bar-1,
  .bar-2,
  .bar-3 {
    position: absolute;
    height: 16%;
    width: 100%;
    border-radius: 3px;
  }

  .bar-1 {
    top: 10%;
    background-color: var(--ra-blue);
  }

  .bar-2 {
    top: 42%;
    background-color: var(--ra-green);
  }

  .bar-3 {
    bottom: 10%;
    background-color: var(--ra-red);
  }
</style>
