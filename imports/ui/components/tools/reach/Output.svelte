<script lang="ts">
  // imports
  import OutputMeter from './OutputMeter.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import createConverter from '../../../functions/convert';
  import createFormatter from '../../../functions/format';
  import {language, translations} from '../../../stores/utils';
  import {definitions} from '../../../stores/tools';
  import {
    marketName,
    overlap,
    population,
    populationForStrategy,
    respondentsCountForMarket,
    totalReach,
    useMarketData
  } from '../../../stores/reach';
  // import Spinner from '../../reusable/Spinner.svelte';

  // variables
  const converter = createConverter();
  const formatter = createFormatter();
  let displayOutputDescription: boolean = false;
  let outputName: 'total_reach' | 'overlap' = 'total_reach';
  $: title = converter.displayContent(outputName, $definitions, $language);
  $: description = converter.describeContent(outputName, $definitions, $language);

  // functions
  function dismiss(event: MouseEvent | CustomEvent | KeyboardEvent): void {
    if (
      (event instanceof KeyboardEvent && event.key === 'Escape') ||
      event instanceof CustomEvent ||
      event instanceof MouseEvent
    ) {
      displayOutputDescription = false;
    }
  }
</script>

<div class="container">
  {#if $useMarketData}
    <div class="amounts__container">
      <span>respondents:</span>
      <output>{formatter.toNumberFormat($respondentsCountForMarket, 0)}</output>
      <span>population in range:</span>
      <output>{formatter.toMillionsFormat($populationForStrategy, 2)}</output>
      <span>population for {$marketName}:</span>
      <output>{formatter.toMillionsFormat($population, 1)}</output>
    </div>{/if}
  <div class="meter__container">
    <!-- svelte-ignore missing-declaration -->
    <!-- <Spinner /> -->
    <label
      for="reach"
      on:click|preventDefault|stopPropagation={() => {
        displayOutputDescription = true;
        outputName = 'total_reach';
      }}
      on:keydown
      on:keyup
      on:keypress
    >
      <span>
        {converter.translate('total', $translations, $language)}&nbsp;{converter.translate(
          'reach',
          $translations,
          $language
        )}:&nbsp;
      </span>
      <output>{formatter.toNumberFormat($totalReach, 0)}&nbsp;%</output>
    </label>
    <OutputMeter id={'reach'} value={$totalReach} min={0} max={100} />

    <label
      for="overlap"
      on:click|preventDefault|stopPropagation={() => {
        displayOutputDescription = true;
        outputName = 'overlap';
      }}
      on:keydown
      on:keyup
      on:keypress
    >
      <span>{converter.translate('overlap', $translations, $language)}:&nbsp;</span>
      <output>{formatter.toNumberFormat($overlap, 0)}&nbsp;%</output>
    </label>
    <OutputMeter id={'overlap'} value={$overlap} min={0} max={100} />
  </div>
</div>

<Modal {title} display={displayOutputDescription} on:click={dismiss}>
  {description}
</Modal>

<style>
  div.amounts__container {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
    font-size: 0.8em;
    color: var(--ra-grey-light);
  }
  div.meter__container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  label {
    display: flex;
    justify-content: start;
    gap: 1em;
    font-size: 1.1em;
    cursor: pointer;
  }
  label:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) {
    div.amounts__container {
      grid-template-columns: repeat(3, auto auto);
    }
    div.meter__container {
      grid-template-columns: auto 1fr;
    }
    label {
      justify-content: space-between;
    }
  }
  @media screen and (min-width: 1024px) {
    div.amounts__container {
      grid-template-columns: repeat(3, auto auto);
    }

    div.meter__container {
      grid-template-columns: auto 1fr;
    }
    label {
      justify-content: space-between;
    }
  }
</style>
