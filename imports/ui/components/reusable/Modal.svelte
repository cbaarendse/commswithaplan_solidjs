<script>
  // packages
  import {Meteor} from 'meteor/meteor';
  import {fade} from 'svelte/transition';
  import Button from './Button.svelte';

  // variables
  export let title;
  export let display = 'none';

  // functions
  const closeModal = () => (display = 'none');
</script>

<div class="modal-container" style={display} transition:fade={{delay: 0, duration: 400}}>
  <div class="modal">
    <div class="modal-header">
      <h4 class="modal-title">{title}</h4>
      <Button size="small" color="transparantnoborder" type="button" on:click={closeModal}>
        <span aria-hidden="true">&times;</span>
      </Button>
    </div>
    <div class="modal-body"><slot /></div>
    {#if $$slots.footer}
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    {/if}
  </div>
</div>

<style>
  div.modal-header {
    display: flex;
  }
  div.modal-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  div.modal {
    width: 40%;
    margin: auto;
    padding: 21px;
    background-color: var(--ra-grey-bright);
  }
</style>
