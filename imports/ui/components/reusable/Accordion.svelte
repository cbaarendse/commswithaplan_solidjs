<script>
  // packages
  import {slide} from 'svelte/transition';
  import {quintOut} from 'svelte/easing';

  import Icon from 'svelte-awesome';
  import {faWindowMaximize, faWindowMinimize} from '@fortawesome/free-regular-svg-icons';

  // components

  // variables
  let display = 'none';

  // functions
  const toggleDisplay = (event) => {
    console.log('clicked ', event.detail);
    display === 'none' ? (display = 'block') : (display = 'none');
  };
</script>

<div class="accordion">
  <div class="accordion-top">
    <button on:click|preventDefault={toggleDisplay}>Open / Dicht</button>
    <slot name="title" />
    {#if display === 'none'}<Icon data={faWindowMaximize} />
    {:else}<Icon data={faWindowMinimize} />{/if}
  </div>
  <div
    class="accordion-bottom"
    style="display:{display}"
    transition:slide={{delay: 250, duration: 800, easing: quintOut}}
  >
    <slot />
  </div>
</div>

<style>
  div.accordion {
    width: 100%;
  }
  div.accordion-top {
    border: 1px dashed var(--ra-grey);
    border-top-left-radius: 0.2em;
    border-top-right-radius: 0.2em;
    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--ra-grey-offwhite);
    cursor: pointer;
  }
  div.accordion-bottom {
    border-bottom-left-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    background-color: var(--ra-white);
    padding: 1em 2em;
  }
</style>
