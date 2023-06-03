<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import type {DeployedTouchPoint} from '../../../../both/typings/types';
  import {translations, language} from '../../../stores/utils';
  import createConverter from '/imports/ui/functions/convert';

  // variables
  const dispatch = createEventDispatcher();
  const converter = createConverter();
  export let touchPoint: DeployedTouchPoint;
  const min = 0;
  $: step = (touchPoint.maxValue ?? 100 - min) / 100;
  $: definition = touchPoint.definitions.filter((definition) => definition.language == $language)[0];
  // TODO: disabled
  $: disabled = isValid(touchPoint.value, min, touchPoint.maxValue ?? 100) ? false : true;

  // functions
  function isValid(v: DeployedTouchPoint['value'], m: number, mx: number): boolean {
    if (typeof v != 'number') {
      return false;
    }
    return v >= m && v <= mx;
  }
  function onSubmit() {
    dispatch('submitValue', touchPoint);
  }
</script>

<form autocomplete="off" on:submit={onSubmit}>
  <label for={touchPoint.name}>{$language === 'nl-NL' ? 'Invoer voor ' : 'Input for '}{definition.displayName}</label>
  <input
    class="input__field"
    name={touchPoint.name}
    id={touchPoint.name}
    type="number"
    {min}
    max={touchPoint.maxValue}
    {step}
    placeholder="{`${converter.translate('input', $translations, $language) + ' 0 - 100'}`},"
    readonly={false}
    bind:value={touchPoint.value}
  />
  <input class="submit__button" type="submit" value={$language === 'nl-NL' ? 'Verstuur' : 'Submit'} {disabled} />
  <input
    class="cancel__button"
    type="button"
    value={$language === 'nl-NL' ? 'Annuleer' : 'Cancel'}
    on:click|preventDefault|stopPropagation
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
