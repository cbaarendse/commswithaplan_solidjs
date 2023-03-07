<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import {language} from '../../stores/utils';
  import type {Input} from '../../../both/typings/types';

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
  function submitLogin() {
    dispatch('submitLogin', {name: numberInput.name, value: numberInput.value});
  }
  function submitSignin() {
    dispatch('submitSignin', {name: numberInput.name, value: numberInput.value});
  }
  function submitCancel() {
    dispatch('submitCancel');
  }
</script>

<section>
  <div class="container">
    <form autocomplete="off">
      <label for={numberInput.name}>{$language === 'nl_NL' ? 'Invoer voor ' : 'Input for '}{displayName}</label>
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
        value={$language === 'nl_NL' ? 'Verstuur' : 'Submit'}
        {disabled}
        on:click|preventDefault|stopPropagation={submitLogin}
      />
      <input
        class="cancel__button"
        type="submit"
        value={$language === 'nl_NL' ? 'Annuleer' : 'Cancel'}
        on:click|preventDefault|stopPropagation={submitCancel}
      />
    </form>
  </div>
</section>

<style>
  div.container {
    width: min(100% - 1em, 60ch);
    margin: 0 auto;
  }
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
