<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import type {Input} from '../types/types';
  import {language} from '../stores/stores';

  // variables
  export let cbx: Input;
  let dispatch = createEventDispatcher();

  // functions
  function update() {
    dispatch('updateCheckBox', {name: cbx.name, value: cbx.value});
  }
</script>

<form>
  <label for={cbx.name}>{cbx.displayName}</label>
  <input
    class="{`input__checkbox ${cbx.className}`};"
    name={cbx.name}
    id={cbx.id}
    type="checkbox"
    placeholder={cbx.placeholder}
    min={cbx.min}
    max={cbx.max}
    readonly={cbx.readonly}
    checked={cbx.checked}
    disabled={cbx.disabled}
    bind:value={cbx.value}
    on:change={update}
  />
</form>

<style>
  form {
    display: grid;
    grid-template-areas: 'label input';
    gap: var(--ra-s);
    grid-template-rows: auto;
    justify-content: end;
    align-items: center;
    min-height: fit-content;
    min-width: fit-content;
  }
  label {
    grid-area: label;
  }
  input[type='checkbox'] {
    transform: scale(1.4);
  }
  .input__checkbox {
    grid-area: input;
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    padding: var(--ra-xs);
    min-height: var(--ra-3xl);
    font-size: var(--ra-fs-l);
  }

  .input__checkbox:disabled {
    background-color: var(--ra-grey-light);
  }
</style>
