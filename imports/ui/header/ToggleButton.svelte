<script lang="ts">
  // packages
  import {tweened} from 'svelte/motion';
  import type {Tweened} from 'svelte/motion';
  import {cubicInOut} from 'svelte/easing';
  import Button from '../../ui/reusable/Button.svelte';
  import {navigationVisible, isLargeScreen} from '../stores/stores';

  // variables
  let top: Tweened<number> = tweened(10, {duration: 300, easing: cubicInOut});
  let topRotation: Tweened<number> = tweened(0, {duration: 300, easing: cubicInOut});
  let center: Tweened<number> = tweened(42, {duration: 300, easing: cubicInOut});
  let width: Tweened<number> = tweened(1, {duration: 300, easing: cubicInOut});
  let height: Tweened<number> = tweened(1, {duration: 300, easing: cubicInOut});
  let bottom: Tweened<number> = tweened(10, {duration: 300, easing: cubicInOut});
  let bottomRotation: Tweened<number> = tweened(0, {duration: 300, easing: cubicInOut});

  $: options = {duration: 500, cubicInOut, times: 2};

  // functions
  navigationVisible.subscribe((visible) => {
    $top = visible === true ? 42 : 10;
    $topRotation = visible === true ? 45 : 0;
    $width = visible === true ? 0 : 1;
    $bottom = visible === true ? 42 : 10;
    $bottomRotation = visible === true ? 135 : 0;
  });

  function spin(node: HTMLElement, options: {duration: number; cubicInOut: Function; times: number}) {
    return {
      ...options,
      // The value of t passed to the css method
      // varies between zero and one during an "in" transition
      // and between one and zero during an "out" transition.
      css() {
        // Svelte takes care of applying the easing function.
        const degrees: number = 45; // through which to spin
        const center: number = 42;
        return `transform: slide(${center}%) rotate(${degrees}deg);`;
      }
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
  <div class="bars">
    <div class="bar-1" style="top:{$top}%;transform:rotate({$topRotation}deg);" />
    <div class="bar-2" style="top:{$center}%; transform:scale({$width}, {$height}); transform-origin: right 15%;" />
    <div class="bar-3" style="bottom:{$bottom}%;transform:rotate({$bottomRotation}deg);" />
  </div>
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
    background-color: var(--ra-blue);
  }

  .bar-2 {
    background-color: var(--ra-green);
  }

  .bar-3 {
    background-color: var(--ra-red);
  }

  @media screen and (min-width: 760px) {
    .bars {
      display: none;
    }
  }
</style>
