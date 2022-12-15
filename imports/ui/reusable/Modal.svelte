<script lang="ts">
  // imports
  import type {Dialog} from '../types/types';
  import {fade} from 'svelte/transition';
  import Button from './Button.svelte';
  import {createEventDispatcher, onMount} from 'svelte';

  // variables
  export let title: string;
  export let display: string = 'none';
  export let dialog: Dialog | null; // Reference to the dialog tag
  onMount(() => {
    dialog = document.getElementById('modal-dialog') as Dialog | null;
    dialog?.close();
  });

  // functions
  let dispatch = createEventDispatcher();
  function destroyModal() {
    dispatch('destroyModal');
  }
</script>

<dialog id="modal-dialog" style="display: none" transition:fade={{delay: 0, duration: 400}}>
  <div class="modal">
    <menu>
      <Button
        btn={{
          type: 'button',
          ariaRoleDescription: 'button',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          fontSize: 'var(--ra-2xl)',
          disabled: false
        }}
        on:clickedButton={() => (display = 'none')}
        on:clickedButton={destroyModal}
      >
        <span aria-hidden="true">&times;</span>
      </Button>
    </menu>
    <header>
      <h4 class="modal__title">{title}</h4>
    </header>
    <div class="modal__body"><slot /></div>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</dialog>

<style>
  dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    top: 0px;
    left: 0px;
  }
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal {
    flex: 0 1 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* width: min(40%, fit-content); */
    min-height: fit-content;
    /* margin: 0 1rem; */
    padding: 1.2em 1em 2em;
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
    justify-content: flex-start;
    padding: 1em 0;
  }
  div.modal__body {
    display: flex;
  }
  footer {
    display: flex;
  }
</style>
