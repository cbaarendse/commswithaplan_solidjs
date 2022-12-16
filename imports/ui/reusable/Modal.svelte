<script lang="ts">
  // imports
  import {fade} from 'svelte/transition';
  import Button from './Button.svelte';
  import {createEventDispatcher} from 'svelte';

  // variables
  export let title: string;
  export let display: string = 'none';

  // functions
  let dispatch = createEventDispatcher();

  function dismiss(event: MouseEvent | CustomEvent | KeyboardEvent): void {
    if (
      (event instanceof KeyboardEvent && event.key === 'Escape') ||
      event instanceof CustomEvent ||
      event instanceof MouseEvent
    ) {
      display = 'none';
      // 'destroyModal' gives opportunity to be specific if there are multiple modals
      dispatch('destroyModal');
    }
  }
</script>

<svelte:window on:keyup={dismiss} />
{#if display == 'flex'}
  <div
    class="backdrop"
    style="display:{display}"
    transition:fade={{delay: 0, duration: 400}}
    on:click|preventDefault|stopPropagation|self={dismiss}
  >
    <div class="modal">
      <menu>
        <Button
          btn={{
            type: 'button',
            ariaRoleDescription: 'button',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            fontSize: '1.5em',
            disabled: false
          }}
          on:clickedButton={dismiss}
          >&times;
        </Button>
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
    flex: 0 1 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 1em;
    padding: 1.2em 1em 2em;
    font-size: 1.2em;
    background-color: var(--ra-white);
    border-radius: 0.6em;
  }
  menu {
    display: flex;
    justify-content: flex-end;
    width: 100%;
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
