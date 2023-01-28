<script lang="ts">
  // imports
  import {slide} from 'svelte/transition';
  import {backInOut} from 'svelte/easing';
  import type {Accordion} from '../../typings/types';

  // variables
  export let acc: Accordion;
  let disabled = false;
  acc.visible = false;

  // functions
</script>

<article class="accordion">
  <header>
    <button
      type="button"
      aria-roledescription="button"
      id="toggle__accordion"
      class="accordion__button"
      {disabled}
      on:click|stopPropagation|preventDefault={() => (acc.visible = !acc.visible)}
    >
      {#if acc.visible}<b>-</b>{:else}<b>+</b>{/if}
    </button>
    <slot name="title" />
  </header>
  {#if acc.visible}
    <div class="accordion-main" transition:slide={{duration: 1000, easing: backInOut}}>
      <slot />
    </div>
  {/if}
  <footer><slot name="footer" /></footer>
</article>

<style>
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
  button {
    height: 4rem;
    margin: 0 0.4em;
    color: var(--ra-white);
    cursor: pointer;
    background-color: var(--ra-green);
    padding: 0rem 1rem;
    border-radius: 5%;
    border: none;
  }
  button:hover {
    opacity: 0.7;
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
