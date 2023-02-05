<script lang="ts">
  // imports
  import OutputMeter from './OutputMeter.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import createConverter from '../../../functions/convert';
  import createFormatter from '../../../functions/format';
  import {language, translations} from '../../../stores/utils';
  import {definitions, strategy} from '../../../stores/tools';
  // import Spinner from '../../reusable/Spinner.svelte';

  // variables
  const converter = createConverter();
  const formatter = createFormatter();
  let displayOutputDescription: 'none' | 'flex' = 'none';
  let outputName: 'total_reach' | 'overlap' = 'total_reach';
  $: title = converter.displayContent(outputName, $definitions, $language);
  $: description = converter.describeContent(outputName, $definitions, $language);

  // functions
</script>

<div class="container">
  <!-- svelte-ignore missing-declaration -->
  <!-- <Spinner /> -->
  <label
    on:click|preventDefault|stopPropagation={() => {
      displayOutputDescription = 'flex';
      outputName = 'total_reach';
    }}
  >
    <span>
      {converter.translate('total', $translations, $language)}&nbsp;{converter.translate(
        'reach',
        $translations,
        $language
      )}:&nbsp;
    </span>
    <output>{formatter.toNumberFormat($strategy.totalReach, 0)}&nbsp;%</output>
  </label>
  <OutputMeter
    outputMeter={{
      id: 'reach',
      value: $strategy.totalReach,
      min: 0,
      max: 100
    }}
  />

  <label
    on:click|preventDefault|stopPropagation={() => {
      displayOutputDescription = 'flex';
      outputName = 'overlap';
    }}
  >
    <span>{converter.translate('overlap', $translations, $language)}:&nbsp;</span>
    <output>{formatter.toNumberFormat($strategy.overlap, 0)}&nbsp;%</output>
  </label>
  <OutputMeter
    outputMeter={{
      id: 'overlap',
      value: $strategy.overlap,
      min: 0,
      max: 100
    }}
  />
</div>

<Modal
  {title}
  display={displayOutputDescription}
  on:destroyModal={() => {
    displayOutputDescription = 'none';
  }}
>
  {description}
</Modal>

<style>
  div.container {
    display: flex;
    flex-flow: row wrap;
    gap: 1.4em;
    justify-content: flex-start;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  label {
    flex: 0 1 30rem;
    display: flex;
    gap: 1em;
    font-size: 1.1em;
    cursor: pointer;
  }
  label:hover {
    opacity: 0.7;
  }
  span {
    flex: 2;
  }

  output {
    flex: 1;
  }

  :global(meter) {
    flex: 1 1 60%;
  }

  :global(div.meter) {
    flex: 1 1 60%;
  }
</style>
