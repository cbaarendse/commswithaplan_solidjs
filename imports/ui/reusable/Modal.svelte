<script lang="ts">
  // packages
  import {fade} from 'svelte/transition';
  import Button from './Button.svelte';

  // variables
  export let title: string;
  export let display: string = 'none';

  // functions
</script>

<div class="modal__container" style="display:{display}" transition:fade={{delay: 0, duration: 400}}>
  <div class="modal">
    <div class="modal__button__container">
      <Button
        btn={{
          className: '',
          role: 'button',
          backgroundColor: 'transparent',
          borderWidth: '',
          borderStyle: '',
          borderColor: 'transparent',
          fontSize: 'var(--ra-xl)',
          type: 'button',
          disabled: false
        }}
        on:clickedButton={() => (display = 'none')}
      >
        <span aria-hidden="true">&times;</span>
      </Button>
    </div>
    <div class="modal__header">
      <h4 class="modal__title">{title}</h4>
    </div>
    <div class="modal__body"><slot /></div>

    <div class="modal__footer">
      <slot name="footer" />
    </div>
  </div>
</div>

<style>
  .modal__container {
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
    background-color: rgba(0, 0, 0, 0.6);
  }
  .modal {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: min(40%, fit-content);
    min-height: fit-content;
    margin: auto;
    padding: var(--ra-xl) var(--ra-m) var(--ra-3xl);
    background-color: var(--ra-white);
    border-radius: 0.6em;
  }
  .modal__button__container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .modal__header {
    display: flex;
    justify-content: flex-start;
    padding: var(--ra-m) 0;
  }
  div.modal__body {
    display: flex;
  }
  div.modal__footer {
    display: flex;
  }
</style>
