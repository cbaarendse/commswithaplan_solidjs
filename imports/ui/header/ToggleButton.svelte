<script lang="ts">
  // imports
  import {cubicInOut} from 'svelte/easing';
  import {fade} from 'svelte/transition';
  import {Tweened, tweened} from 'svelte/motion';
  import Button from '../../ui/reusable/Button.svelte';
  import {navigationVisible, isSmallScreen} from '../stores/utils';

  // variables
  const coefficient: Tweened<number> = tweened(0, {easing: cubicInOut});

  // functions
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
  on:clickedButton={() => ($navigationVisible === true ? coefficient.set(1) : coefficient.set(0))}
>
  {#if $isSmallScreen}
    <div class="bars" transition:fade={{duration: 900, easing: cubicInOut}}>
      <div class="bar-1" style="transform: translateY({$coefficient * 200}%) rotate({$coefficient * 45}deg)" />
      <div class="bar-2" style="transform: translateX({$coefficient * 50}%) scale({1 - $coefficient})" />
      <div class="bar-3" style="transform: translateY({$coefficient * -200}%) rotate({$coefficient * -45}deg)" />
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
