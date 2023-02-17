<script lang="ts">
  // imports
  import OutputMeter from './OutputMeter.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import createConverter from '../../../functions/convert';
  import createFormatter from '../../../functions/format';
  import {language, translations} from '../../../stores/utils';
  import {definitions} from '../../../stores/tools';
  import {totalReach, overlap, briefing, deployment} from '../../../stores/reach';
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
  <OutputMeter
    outputMeter={{
      id: 'reach',
      value: $totalReach,
      min: 0,
      max: 100
    }}
  />

  <label
    on:click|preventDefault|stopPropagation={() => {
      displayOutputDescription = 'flex';
      outputName = 'overlap';
    }}
    on:keydown
    on:keyup
    on:keypress
  >
    <span>{converter.translate('overlap', $translations, $language)}:&nbsp;</span>
    <output>{formatter.toNumberFormat($overlap, 0)}&nbsp;%</output>
  </label>
  <OutputMeter
    outputMeter={{
      id: 'overlap',
      value: $overlap,
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  label {
    display: flex;
    gap: 1em;
    font-size: 1.1em;
    cursor: pointer;
  }
  label:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) {
    div.container {
      grid-template-columns: auto 1fr;
    }
  }
  @media screen and (min-width: 1024px) {
    div.container {
      grid-template-columns: auto 1fr;
    }
  }
</style>
