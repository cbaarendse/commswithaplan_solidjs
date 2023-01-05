<script lang="ts">
  // imports
  import {cubicInOut} from 'svelte/easing';
  import {fade} from 'svelte/transition';
  import {Tweened, tweened} from 'svelte/motion';
  import {navigationVisible, isSmallScreen} from '../stores/utils';

  // variables
  let disabled = false;
  const coefficient: Tweened<number> = tweened(0, {easing: cubicInOut});
  navigationVisible.subscribe((visible) => {
    if (!visible) {
      coefficient.set(0);
    }
  });
  // functions
</script>

<!-- This button animates when used for toggling navigation, but also if screen size is changed beyond threshold. -->
<button
  class="navigation__toggle"
  type="button"
  aria-roledescription="button"
  {disabled}
  on:click|preventDefault|stopPropagation={() => ($navigationVisible = !$navigationVisible)}
  on:click|preventDefault|stopPropagation={() =>
    $navigationVisible === true ? coefficient.set(1) : coefficient.set(0)}
>
  {#if $isSmallScreen}
    <div class="bars" transition:fade={{duration: 900, easing: cubicInOut}}>
      <div class="bar-1" style="transform: translateY({$coefficient * 200}%) rotate({$coefficient * 45}deg)" />
      <div class="bar-2" style="transform: translateX({$coefficient * 50}%) scale({1 - $coefficient})" />
      <div class="bar-3" style="transform: translateY({$coefficient * -200}%) rotate({$coefficient * -45}deg)" />
    </div>
  {/if}
</button>

<style>
  button {
    width: 3.7rem;
    height: 3.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
  .bars {
    position: relative;
    width: 90%;
    height: 90%;
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
