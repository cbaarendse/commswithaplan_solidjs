<script lang="ts">
  // imports
  import createConverter from '../../../functions/convert';
  import {translations, language} from '../../../stores/utils';
  import {marketData, strategy} from '../../../stores/tools';
  import createReachTool from '/imports/ui/functions/reach';

  // variables
  const reachTool = createReachTool();
  const converter = createConverter();
  let checked = false;
  $: disabled = !$marketData;

  $: $strategy.useMarketData = checked;
  $: message =
    $strategy.useMarketData && $strategy.marketData
      ? converter.translate('using_data', $translations, $language)
      : !$strategy.useMarketData && $strategy.marketData
      ? converter.translate('using_formula', $translations, $language)
      : converter.translate('no_data', $translations, $language);

  // functions
  function handleChangeUseMarketData() {
    if ($strategy.marketData && $strategy.useMarketData) {
      $strategy = reachTool.setNewStrategyWithData($strategy.marketName);
    } else {
      $strategy = reachTool.setNewStrategyWithFormula($strategy.marketName);
      checked = false;
    }
  }
</script>

<input
  class="marketdata__checkbox"
  name="marketdata"
  type="checkbox"
  {disabled}
  bind:checked
  on:change={handleChangeUseMarketData}
/>
<label for="market-data">{message}</label>

<style>
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

  .marketdata__checkbox:disabled {
    background-color: var(--ra-grey-light);
  }
</style>
