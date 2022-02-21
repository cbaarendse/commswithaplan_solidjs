<script lang="ts">
  // packages
  import {slide} from 'svelte/transition';
  import {backInOut} from 'svelte/easing';
  //import Fa from 'svelte-fa/src/fa.svelte';
  import Fa from 'svelte-fa';
  import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';

  // types
  import type {Accordion} from '../../both/types/interfaces';

  // components
  import Button from './Button.svelte';

  // variables
  export let acc: Accordion;
  acc.visible = false;
</script>

<article class="accordion">
  <header>
    <Button
      btn={{
        color: 'transparentnoborder',
        size: 'fit',
        onClick: () => (acc.visible = !acc.visible)
      }}
      >{#if acc.visible}<Fa icon={faMinus} />{:else}<Fa icon={faPlus} />{/if}</Button
    >
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
  article.accordion {
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
