<script lang="ts">
  // imports
  import createConverter from '../../../functions/convert';
  import {translations, language} from '../../../stores/utils';
  import {strategy} from '../../../stores/tools';

  // variables
  const converter = createConverter();
  export let checked: boolean;
  let disabled = false;
  $: displayName = $strategy.marketData
    ? converter.translate('using_data', $translations, $language)
    : converter.translate('using_formula', $translations, $language);
</script>

<input class="marketdata__checkbox" name="marketdata" type="checkbox" {disabled} bind:checked on:change />
<label for="market-data">{displayName}</label>

<style>
  form {
    display: grid;
    grid-template-columns: 2rem auto;
    grid-template-rows: auto;
    grid-template-areas: 'checkbox label';
    gap: 0.7em;
    padding: 0.2rem 0.6rem;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    border-radius: 3px;
  }
  label {
    grid-area: label;
    background-color: none;
    padding: 0.2em 0.4em;
  }

  input[type='checkbox'] {
    grid-area: checkbox;
    appearance: none;
    font: inherit;
    height: 2rem;
    border: 1px solid var(--ra-teal-light);
    border-radius: 2px;
    color: var(--ra-blue);
    cursor: pointer;
  }
  input[type='checkbox']:checked {
    background-color: var(--ra-red);
  }

  .marketdata__checkbox:disabled {
    background-color: var(--ra-grey-light);
  }
</style>
