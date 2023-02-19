<script lang="ts">
  // imports
  import type {Input} from '../../../../both/typings/types';
  import {language} from '../../../stores/utils';
  import {deployment} from '../../../stores/reach';
  import {createEventDispatcher} from 'svelte';

  // variables
  export let numberInput: Input;
  export let displayName: string = 'touchpoint_name';
  export let index: number;
  let dispatch = createEventDispatcher();
  const {id, name, min, max, step, readonly, placeholder} = numberInput;
  let {value} = numberInput;

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
    console.log('submit');
    if (name && typeof value == 'number') {
      deployment.update((data) => {
        let updatedTouchPoint = Object.assign(data[index], {value: value});
        console.log('updated TouchPoint, index, in submitValue (numberInput)', updatedTouchPoint, index);
        data.splice(index, 1, updatedTouchPoint);
        return data;
      });
    }
    dispatch('destroyModal');
  }

  function submitCancel() {
    console.log('cancel');
    dispatch('destroyModal');
  }
</script>

<form autocomplete="off">
  <label for={name}>{$language === 'dutch' ? 'Invoer voor ' : 'Input for '}{displayName}</label>
  <input class="input__field" {name} {id} type="number" {placeholder} {min} {max} {step} {readonly} bind:value />
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
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    grid-template-rows: auto;
    min-height: fit-content;
    min-width: fit-content;
  }
  label {
    grid-column: span 2;
  }
  .input__field {
    grid-column: span 2;
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    padding: 0.8rem;
    width: 100%;
    min-height: 4rem;
  }
  .submit__button {
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
    background-color: var(--ra-red);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
</style>
