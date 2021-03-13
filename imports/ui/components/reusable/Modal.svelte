<script>
  // packages
  import {fade} from 'svelte/transition';
  import Button from './Button.svelte';

  // variables
  export let title;
  export let displayModal = 'none';

  // functions
  const closeModal = () => (displayModal = 'none');
</script>

<div class="modal-container" style="display:{displayModal}" transition:fade={{delay: 0, duration: 400}}>
  <div class="modal">
    <div class="modal-button">
      <Button size={'xlarge'} backgroundColor={'transparantnoborder'} type={'button'} on:click={closeModal}>
        <span aria-hidden="true">&times;</span>
      </Button>
    </div>
    <div class="modal-header">
      <h4 class="modal-title">{title}</h4>
    </div>
    <div class="modal-body"><slot /></div>

    <div class="modal-footer">
      <slot name="footer" />
    </div>
  </div>
</div>

<style>
  div.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  div.modal {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 40%;
    margin: auto;
    padding: 0 2em;
    background-color: var(--ra-white);
    border-radius: 0.6em;
  }
  div.modal-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  div.modal-header {
    display: flex;
    padding: 1em 2em;
  }
  div.modal-body {
    display: flex;
    padding: 1em 2em;
  }
  div.modal-footer {
    display: flex;
    padding: 1em 2em;
  }
</style>
