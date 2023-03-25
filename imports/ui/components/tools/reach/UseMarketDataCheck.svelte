<script lang="ts">
  // imports
  import createConverter from '../../../functions/convert';
  import {translations, language} from '../../../stores/utils';
  import {marketData, useMarketData, results} from '../../../stores/reach';
  import renew from '../../../methods/renew';
  import adaptMaxValues from '/imports/ui/methods/maxValues';

  // variables
  const converter = createConverter();
  $: disabled = !$marketData;
  $: message =
    $marketData && $useMarketData
      ? converter.translate('using_data', $translations, $language)
      : $marketData && !$useMarketData
      ? converter.translate('using_formula', $translations, $language)
      : converter.translate('no_data', $translations, $language);

  // functions
  function reset() {
    renew();
    $results = [0, 0];
  }
</script>

<fieldset>
  <input
    class="checkbox"
    id="marketdata__checkbox"
    name="marketdata"
    type="checkbox"
    {disabled}
    bind:checked={$useMarketData}
    on:change={reset}
    on:change={adaptMaxValues}
  />
  <label for="marketdata__checkbox">{message}</label>
</fieldset>

<style>
  fieldset {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: auto 1fr;
    height: 100%;
    padding: 0.4rem 0.6rem;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  label {
    background-color: none;
    padding: 0.2em 0.4em;
  }

  input[type='checkbox'] {
    appearance: none;
    font: inherit;
    height: 1.8rem;
    width: 1.8rem;
    border: 1px solid var(--ra-teal-light);
    border-radius: 2px;
    color: var(--ra-blue);
    cursor: pointer;
  }
  input[type='checkbox']:checked {
    background-color: var(--ra-red);
  }

  input.checkbox:disabled {
    background-color: var(--ra-grey-light);
  }
</style>
