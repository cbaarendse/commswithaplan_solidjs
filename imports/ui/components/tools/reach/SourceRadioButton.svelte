<script lang="ts">
  // imports
  import createRenew from '../../../procedures/renew';
  import createConverter from '../../../functions/convert';
  import {translations, language} from '../../../stores/utils';
  import {marketData, results, useForResults} from '../../../stores/reach';

  // variables
  const converter = createConverter();
  const renew = createRenew();
  $: disabled = $marketData == false;
  $: message = converter.translate('use', $translations, $language);

  // functions
  function onChange() {
    if ($marketData && $useForResults == 'data') {
      renew.forData();
    } else {
      renew.forFormula();
    }
    $results = [0, 0];
  }
</script>

<fieldset>
  <legend>{message}</legend>
  <input
    class="radio__button"
    id="useformula_radio"
    type="radio"
    name="use_market_data"
    value="formula"
    checked={$useForResults == 'formula'}
    {disabled}
    bind:group={$useForResults}
    on:change={onChange}
  />
  <label for="useformula__radio">{converter.translate('formula', $translations, $language)}</label>
  <input
    class="radio__button"
    id="usedata__radio"
    type="radio"
    name="use_market_data"
    value="data"
    checked={$useForResults == 'data'}
    {disabled}
    bind:group={$useForResults}
    on:change={onChange}
  />
  <label for="usedata__radio">{converter.translate('data', $translations, $language)}</label>
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

  input[type='radio'] {
    appearance: none;
    font: inherit;
    height: 1.8rem;
    width: 1.8rem;
    border: 1px solid var(--ra-teal-light);
    border-radius: 50%;
    color: var(--ra-blue);
    cursor: pointer;
  }
  input.radio__button:checked {
    background-color: var(--ra-red);
  }

  input.radio__button:disabled {
    background-color: var(--ra-grey-light);
  }
</style>
