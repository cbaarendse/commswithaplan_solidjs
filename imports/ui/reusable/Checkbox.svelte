<script lang="ts">
  // imports
  import {Checkbox} from '../types/types';
  // variables
  export let cbx: Checkbox;
  export let checked: boolean = true;
  export let displayName: string;
</script>

<form>
  <label for={cbx.name}>{displayName}</label>
  <input
    class="{`input__checkbox ${cbx.className}`};"
    name={cbx.name}
    id={cbx.id}
    type="checkbox"
    placeholder={cbx.placeholder}
    min={cbx.min}
    max={cbx.max}
    readOnly={cbx.readOnly}
    disabled={cbx.disabled}
    {checked}
    on:change={() => (checked = !checked)}
  />
</form>

<style>
  form {
    display: grid;
    grid-template-areas: 'input label';
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
