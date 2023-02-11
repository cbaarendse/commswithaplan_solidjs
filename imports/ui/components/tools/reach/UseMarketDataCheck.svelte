<script lang="ts">
  // imports
  import createConverter from '../../../functions/convert';
  import {translations, language} from '../../../stores/utils';
  import reachTool from '/imports/ui/functions/reach';

  // variables
  const converter = createConverter();
  let strategy = reachTool.getStrategy();
  let useMarketData: boolean;
  $: disabled = !strategy.marketData;

  $: message =
    strategy.marketData && strategy.useMarketData
      ? converter.translate('using_data', $translations, $language)
      : strategy.marketData && !strategy.useMarketData
      ? converter.translate('using_formula', $translations, $language)
      : converter.translate('no_data', $translations, $language);

  $: {
    strategy.useMarketData = useMarketData;
    reachTool.setStrategy(strategy);
  }

  // functions
</script>

<input class="marketdata__checkbox" name="marketdata" type="checkbox" {disabled} bind:checked={useMarketData} />
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
