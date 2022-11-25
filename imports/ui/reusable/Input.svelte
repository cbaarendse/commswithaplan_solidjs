<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import {language} from '../stores/utils';
  import {Input} from '../types/types';

  // exports
  export let input: Input;
  export let displayName: string;

  // variables
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
  <label for={input.name}>{$language === 'dutch' ? 'Invoer voor ' : 'Input for '}{displayName}</label>
  <input
    class="{`input__field ${input.class}`};"
    name={input.name}
    id={input.id}
    type="number"
    placeholder={input.placeholder}
    min={input.min}
    max={input.max}
    readonly={input.readonly}
    bind:value={input.value}
  />
  <input
    class="submit__button"
    type="submit"
    value={$language === 'dutch' ? 'Verstuur' : 'Submit'}
    disabled={parseFloat(input.value) < parseInt(input.min) || parseFloat(input.value) > parseInt(input.max)}
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
    padding: var(--ra-xs);
    min-height: var(--ra-3xl);
    font-size: var(--ra-fs-l);
  }
  .submit__button {
    grid-area: submit;
    background-color: var(--ra-blue);
    color: var(--ra-white);
    border: none;
    padding: var(--ra-xs);
    min-height: var(--ra-3xl);
    font-size: var(--ra-fs-m);
  }
  .submit__button:disabled {
    background-color: var(--ra-grey-light);
  }
  .cancel__button {
    grid-area: cancel;
    background-color: var(--ra-red);
    color: var(--ra-white);
    border: none;
    padding: var(--ra-xs);
    min-height: var(--ra-3xl);
    font-size: var(--ra-fs-m);
  }
</style>
