<script lang="ts">
  // imports
  import type {DeployedTouchPoint, Input} from '../../../../both/typings/types';
  import {translations, language} from '../../../stores/utils';
  import {deployment} from '../../../stores/reach';
  import createConverter from '/imports/ui/functions/convert';
  import {createEventDispatcher} from 'svelte';

  // variables
  export let index: number;
  let dispatch = createEventDispatcher();
  const min = 0;
  const max = 100;
  const step = 1;
  const {name, definitions} = $deployment[index];
  let value: DeployedTouchPoint['value'];
  $: definition = definitions.filter((definition) => definition.language == $language)[0];
  const converter = createConverter();

  $: disabled = isValid(value, min, max) ? false : true;

  // functions
  function isValid(v: DeployedTouchPoint['value'], m: number, mx: number): boolean {
    if (typeof v != 'number') {
      return false;
    }
    return v >= m && v <= mx;
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
  <label for={name}>{$language === 'dutch' ? 'Invoer voor ' : 'Input for '}{definition.displayName}</label>
  <input
    class="input__field"
    {name}
    id={name}
    type="number"
    {min}
    {max}
    {step}
    placeholder="{`${converter.translate('input', $translations, $language) + ' 0 - 100'}`},"
    readonly={false}
    bind:value={$deployment[index].value}
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
