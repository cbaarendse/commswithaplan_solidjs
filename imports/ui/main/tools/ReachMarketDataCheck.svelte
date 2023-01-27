<script lang="ts">
  // imports
  import {strategy} from '../../stores/tools';
  import {translations, language} from '../../stores/utils';
  import createConverter from '../../functions/convert';

  // variables
  const converter = createConverter();
  let disabled = false;
  let displayName: string = $strategy.marketData
    ? converter.translate('using_data', $translations, $language)
    : converter.translate('using_formula', $translations, $language);
</script>

<form>
  <input
    class="marketdata__checkbox"
    name="marketdata"
    type="checkbox"
    {disabled}
    bind:checked={$strategy.marketData}
    on:change
  />
  <label for="market-data">{displayName}</label>
</form>

<style>
  form {
    display: flex;
    gap: 0.7em;
    grid-template-rows: auto;
    justify-content: end;
    align-items: center;
    min-height: fit-content;
    min-width: fit-content;
  }
  label {
  }

  input[type='checkbox'] {
    width: 3em;
    border: none;
    border-radius: 0.2em;
    background: var(--ra-teal-light);
    accent-color: var(--ra-red);
    color: var(--ra-blue);
    padding: 0.7em;
    min-height: 1.4em;
    cursor: pointer;
  }

  .marketdata__checkbox:disabled {
    background-color: var(--ra-grey-light);
  }
</style>
