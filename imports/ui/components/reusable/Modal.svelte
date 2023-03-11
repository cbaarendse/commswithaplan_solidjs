<script lang="ts">
  // imports
  import {fade} from 'svelte/transition';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faXmark} from '@fortawesome/free-solid-svg-icons';

  // variables
  export let title: string = 'modal_title';
  export let display: boolean = false;
  let disabled = false;

  // functions
</script>

{#if display}
  <div
    class="backdrop"
    style="display:{display ? 'flex' : 'none'}"
    transition:fade={{delay: 0, duration: 400}}
    on:click|preventDefault|stopPropagation
    on:keydown
    on:keyup
    on:keypress
  >
    <div class="modal">
      <menu>
        <button type="button" aria-roledescription="button" {disabled} on:click|preventDefault|stopPropagation>
          <Fa icon={faXmark} />
        </button>
      </menu>
      <header>
        <h3 class="modal__title">{title}</h3>
      </header>
      <div class="modal__body">
        <slot />
      </div>
      <footer>
        <slot name="modal__footer" />
      </footer>
    </div>
  </div>
{/if}

<style>
  div.backdrop {
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0em;
    left: 0em;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .modal {
    flex: 0 1 40rem;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-evenly;
    align-items: center;
    margin: 1.4em;
    padding: 1.2em 1em 2em;
    font-size: 1em;
    background-color: var(--ra-white);
    border-radius: 0.6em;
  }
  menu {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  button {
    background-color: transparent;
    border-color: transparent;
    font-size: 1.5em;
    margin: 0 0.4em;
    cursor: pointer;
    border-radius: 5%;
    border: none;
  }

  button:hover {
    opacity: 0.7;
  }
  header {
    display: flex;
    justify-content: center;
    margin: 1em 0;
  }
  div.modal__body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em 0;
  }
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1em 0;
  }
</style>
