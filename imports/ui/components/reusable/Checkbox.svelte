<script lang="ts">
  // imports
  import {Checkbox} from '../../../both/typings/types';

  // variables
  export let cbx: Checkbox;
  export let checked: boolean = false;
  export let displayName: string;
</script>

<form>
  <label for={cbx.name} style="font-size: {cbx.fontSize}">{displayName}</label>
  <input
    class="{`input__checkbox ${cbx.class}`};"
    name={cbx.name}
    id={cbx.id}
    style="font-size: {cbx.fontSize}"
    type="checkbox"
    placeholder={cbx.placeholder}
    min={cbx.min}
    max={cbx.max}
    readonly={cbx.readonly}
    disabled={cbx.disabled}
    bind:checked
    on:change
  />
</form>

<style>
  form {
    display: grid;
    grid-template-areas: 'input label';
    gap: 0.7em;
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
    padding: 0.7em;
    min-height: 1.4em;
  }

  .input__checkbox:disabled {
    background-color: var(--ra-grey-light);
  }
</style>
