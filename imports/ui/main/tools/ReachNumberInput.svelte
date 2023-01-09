<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import {language} from '../../stores/utils';
  import type {Input} from '../../types/types';

  // exports
  export let numberInput: Input;
  export let displayName: string;

  // variables
  let dispatch = createEventDispatcher();
  $: disabled = isValid(numberInput) ? false : true;

  // functions
  function isValid(i: Input): boolean {
    if (typeof i.value != 'number') {
      return false;
    }
    if (typeof i.min != 'number') {
      i.min = 0;
    }
    if (typeof i.max != 'number') {
      i.max = 100;
    }
    return i.value >= i.min && i.value <= i.max;
  }
  function submitValue() {
    dispatch('submitValueForName', {name: numberInput.name, value: numberInput.value});
  }
  function submitCancel() {
    dispatch('submitCancel');
  }
</script>

<form autocomplete="off">
  <label for={numberInput.name}>{$language === 'dutch' ? 'Invoer voor ' : 'Input for '}{displayName}</label>
  <input
    class="input__field"
    name={numberInput.name}
    id={numberInput.id}
    type="number"
    placeholder={numberInput.placeholder}
    min={numberInput.min}
    max={numberInput.max}
    step={numberInput.step}
    readonly={numberInput.readonly}
    bind:value={numberInput.value}
  />
  <input
    class="submit__button"
    type="submit"
    value={$language === 'dutch' ? 'Verstuur' : 'Submit'}
    {disabled}
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
    gap: 1rem;
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
    padding: 0.8rem;
    width: 100%;
    min-height: 4rem;
  }
  .submit__button {
    grid-area: submit;
    background-color: var(--ra-blue);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
  .submit__button:disabled {
    background-color: var(--ra-grey-light);
  }
  .cancel__button {
    grid-area: cancel;
    background-color: var(--ra-red);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
</style>
