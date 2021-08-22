<script>
  // packages
  import {slide} from 'svelte/transition';
  import {linear, quintInOut, expoInOut, backInOut} from 'svelte/easing';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

  // components
  import Button from './Button.svelte';

  // variables
  export let visible = false;
  export let selectedIndex;
</script>

<div class="accordion">
  <header>
    <Button backgroundColor={'transparantnoborder'} on:click
      >{#if visible}<Fa icon={faMinus} />{:else}<Fa icon={faPlus} />{/if}</Button
    >
    <slot name="title" />
  </header>
  {#if visible}
    <div class="accordion-main" transition:slide={{duration: 1000, easing: backInOut}}>
      <slot />
    </div>
  {/if}
  <footer><slot name="footer" /></footer>
</div>

<style>
  div.accordion {
    width: 100%;
  }
  header {
    min-height: 4em;
    border: none;
    border-top-left-radius: 0.2em;
    border-top-right-radius: 0.2em;
    padding: 0.5em 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    cursor: pointer;
  }
  div.accordion-main {
    background-color: var(--ra-white);
    padding: 1em 2em;
  }
  footer {
    min-height: 3em;
    background-color: var(--ra-grey-off-white);
    border: none;
    border-bottom-left-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    padding: 0.5em 1em;
  }
</style>
