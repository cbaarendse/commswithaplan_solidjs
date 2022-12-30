<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import {language, translations} from '../../stores/utils';
  import {definitions} from '../../stores/tools';
  import type {Content} from '../../types/types';
  import Meter from '../../reusable/Meter.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import {Convert, Format} from '../../types/classes';

  // variables
  const dispatch = createEventDispatcher();
  let displayOutputDescription: 'none' | 'flex' = 'none';
  let output: Content = $definitions[0];
  export let totalReach: number;
  export let locus: number;
  export let allTouchPointsValueIsZero: boolean;
  export let sortedByName: boolean;
  export let showAll: boolean;

  // functions
  function showOutputDescription(outputName: string) {
    displayOutputDescription = 'flex';
    output = $definitions.filter((definition) => definition.name === outputName)[0];
  }
</script>

<div class="container">
  <menu>
    <button type="button" on:click={() => dispatch('reset')}>
      {#if allTouchPointsValueIsZero}&#8676;{:else}&#8617;{/if}
    </button>
    <button type="button" on:click={() => dispatch('sort')}>
      {#if sortedByName}&#8744;{:else}&#8743;{/if}
    </button>
    <button type="button" on:click={() => dispatch('hide')}>
      {#if showAll}&#8722;{:else}&#8801;{/if}
    </button>
  </menu>
  <label on:click|preventDefault|stopPropagation={() => showOutputDescription('total_reach')}>
    <span>
      {Convert.translate('total', $translations, $language)}&nbsp;{Convert.translate(
        'reach',
        $translations,
        $language
      )}:&nbsp;
    </span>
    <output>{Format.toNumberFormat(totalReach, 0)}&nbsp;%</output>
  </label>
  <Meter
    meter={{
      id: 'reach',
      value: totalReach,
      min: 0,
      max: 100
    }}
  />

  <label on:click|preventDefault|stopPropagation={() => showOutputDescription('locus')}>
    <span>{Convert.translate('locus', $translations, $language)}:&nbsp;</span>
    <output>{Format.toNumberFormat(locus, 0)}&nbsp;%</output>
  </label>
  <Meter
    meter={{
      id: 'locus',
      value: locus,
      min: 0,
      max: 100
    }}
  />
</div>

<Modal
  title={output.displayName}
  display={displayOutputDescription}
  on:destroyModal={() => {
    displayOutputDescription = 'none';
  }}
>
  {output.description}
</Modal>

<style>
  div.container {
    display: flex;
    flex-flow: row wrap;
    gap: 2em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  menu {
    display: flex;
    flex: 100%;
    justify-content: space-around;
    gap: 3em;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--button-size-phone);
    height: var(--button-size-phone);
    border-radius: 50%;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }

  menu > button:nth-of-type(1) {
    background-color: var(--ra-red);
  }
  menu > button:nth-of-type(2) {
    background-color: var(--ra-green);
  }
  menu > button:nth-of-type(3) {
    background-color: var(--ra-blue);
  }

  button:hover {
    opacity: 0.7;
  }

  label {
    display: flex;
    flex: 0 0 15em;
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

  div.container > :global(meter) {
    flex: 1 1 60%;
  }
  @media screen and (min-width: 768px) {
    button {
      width: var(--button-size-tablet);
      height: var(--button-size-tablet);
    }
  }

  @media screen and (min-width: 1024px) {
    button {
      width: var(--button-size-desktop);
      height: var(--button-size-desktop);
    }
  }
</style>
