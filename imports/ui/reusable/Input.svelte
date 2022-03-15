<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import type {Input} from '../types/types';
  import {language} from '../stores/stores';
  import {CssVariables} from '../../both/functions';

  // variables
  export let input: Input;
  let dispatch = createEventDispatcher();

  // functions
  function submitValue() {
    dispatch('submitValueForName', {name: input.name, value: input.value});
  }
  function submitCancel() {
    dispatch('submitCancel');
  }
</script>

<form>
  <label for={input.name}>{$language === 'dutch' ? 'Invoer voor ' : 'Input for '}{input.displayName}</label>
  <input
    class="{`input__field ${input.className}`};"
    name={input.name}
    id={input.id}
    type="text"
    placeholder={input.placeholder}
    readonly={input.readonly}
    bind:value={input.value}
  />
  <input
    class="submit__button"
    type="submit"
    value={$language === 'dutch' ? 'Verstuur' : 'Submit'}
    on:click|preventDefault|stopPropagation={submitValue}
  />
  <input
    class="cancel__button"
    type="submit"
    value={$language === 'dutch' ? 'Annuleer' : 'Cancel'}
    on:click|preventDefault|stopPropagation={submitCancel}
  />
</form>

<style>
  form {
    display: grid;
    grid-template-areas:
      'label label'
      'input input'
      'submit cancel';
    gap: var(--ra-s);
    grid-template-rows: auto;
    min-height: fit-content;
    min-width: fit-content;
  }
  label {
    grid-area: label;
  }
  .input__field {
    grid-area: input;
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    min-height: var(--ra-3xl);
  }
  .submit__button {
    grid-area: submit;
    background-color: var(--ra-blue);
    color: var(--ra-white);
    border: none;
    min-height: var(--ra-3xl);
  }
  .cancel__button {
    grid-area: cancel;
    background-color: var(--ra-red);
    color: var(--ra-white);
    border: none;
    min-height: var(--ra-3xl);
  }
</style>
