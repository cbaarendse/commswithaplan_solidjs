<script>
  // packages
  import {slide} from 'svelte/transition';
  import {quintOut} from 'svelte/easing';

  import Icon from 'svelte-awesome';
  import {faMenu, faHyphen} from '@fortawesome/free-regular-svg-icons';

  // components

  // variables
  let display = 'none';

  // functions
  const toggleDisplay = (event) => {
    console.log('toggleDisplay', display, event.detail);
    display === 'none' ? (display = 'block') : (display = 'none');
  };
</script>

<div class="accordion">
  <div class="accordion-top">
    <button on:click|preventDefault={toggleDisplay}
      >{#if display === 'none'}&#43;
      {:else}&#8213;{/if}
    </button>
    <slot name="title" />
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
    padding: 0.5em 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  div.accordion-bottom {
    background-color: darkseagreen;
    padding: 1em 2em;
  }

  button {
    width: fit-content;
    color: var(--ra-grey-light);
    background-color: transparent;
    font-size: 1.2rem;
    padding: 0.8em 1em;
    margin: 0 1em;
    border-radius: 5%;
    cursor: pointer;
    border: none;
  }
  button:hover {
    color: var(--ra-grey);
  }
</style>
