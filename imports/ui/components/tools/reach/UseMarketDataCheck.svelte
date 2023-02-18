<script lang="ts">
  // imports
  import createConverter from '../../../functions/convert';
  import {translations, language} from '../../../stores/utils';
  import {marketData, briefing} from '../../../stores/reach';
  import {onDestroy} from 'svelte';
  import {Strategy} from '/imports/both/typings/types';

  // variables
  const converter = createConverter();
  let useMarketData: Strategy['useMarketData'];
  const unsubscribe = briefing.subscribe((data) => {
    useMarketData = data.useMarketData;
  });
  $: disabled = !$marketData;
  $: briefing.update((data) => {
    data.useMarketData = useMarketData;
    return data;
  });

  $: message =
    $marketData && useMarketData
      ? converter.translate('using_data', $translations, $language)
      : $marketData && !useMarketData
      ? converter.translate('using_formula', $translations, $language)
      : converter.translate('no_data', $translations, $language);

  // functions

  onDestroy(() => unsubscribe());
</script>

<fieldset>
  <input
    class="checkbox"
    id="marketdata__checkbox"
    name="marketdata"
    type="checkbox"
    {disabled}
    bind:checked={useMarketData}
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
