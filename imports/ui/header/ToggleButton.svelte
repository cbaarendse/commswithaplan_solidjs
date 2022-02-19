<script lang="ts">
  // packages
  import {tweened, Tweened} from 'svelte/motion';
  import {cubicInOut} from 'svelte/easing';
  import Button from '../../ui/reusable/Button.svelte';
  import {navigationVisible} from '../../../client/stores';

  // variables
  let top: Tweened<number> = tweened(10, {duration: 300, easing: cubicInOut});
  let topRotation: Tweened<number> = tweened(0, {duration: 300, easing: cubicInOut});
  let center: Tweened<number> = tweened(42, {duration: 300, easing: cubicInOut});
  let width: Tweened<number> = tweened(1, {duration: 300, easing: cubicInOut});
  let height: Tweened<number> = tweened(1, {duration: 300, easing: cubicInOut});
  let bottom: Tweened<number> = tweened(10, {duration: 300, easing: cubicInOut});
  let bottomRotation: Tweened<number> = tweened(0, {duration: 300, easing: cubicInOut});

  // functions
  const toggleNavigation = () => {
    $navigationVisible = $navigationVisible === false ? true : false;
  };

  navigationVisible.subscribe((visible) => {
    $top = visible === true ? 42 : 10;
    $topRotation = visible === true ? 45 : 0;
    $width = visible === true ? 0 : 1;
    $bottom = visible === true ? 42 : 10;
    $bottomRotation = visible === true ? 135 : 0;
  });
</script>

<Button
  btn={{
    size: 'fit',
    color: 'transparentnoborder',
    onClick: toggleNavigation
  }}
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
