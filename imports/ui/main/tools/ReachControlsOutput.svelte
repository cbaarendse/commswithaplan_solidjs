<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import {language, translations} from '../../stores/utils';
  import {definitions} from '../../stores/tools';
  import type {Content} from '../../types/types';
  import type {Strategy} from '/imports/api/strategies/strategies';
  import ReachOutputMeter from './ReachOutputMeter.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import {Convert, Format} from '../../types/classes';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faArrowRotateLeft,
    fa0,
    faArrowDownAZ,
    faArrowDownWideShort,
    faBars,
    faMinus
  } from '@fortawesome/free-solid-svg-icons';

  // variables
  const dispatch = createEventDispatcher();
  let displayOutputDescription: 'none' | 'flex' = 'none';
  let output: Content = $definitions[0];
  let iconSize = '100%';
  export let strategy: Strategy;
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
      {#if allTouchPointsValueIsZero}<Fa icon={faArrowRotateLeft} size={iconSize} />{:else}<Fa
          icon={fa0}
          size={iconSize}
        />{/if}
    </button>
    <button type="button" on:click={() => dispatch('sort')}>
      {#if sortedByName}<Fa
          icon={faArrowDownWideShort}
          size={iconSize}
        />{:else if !sortedByName && allTouchPointsValueIsZero && showAll}<Fa
          icon={faArrowDownAZ}
          size={iconSize}
        />{:else}<Fa icon={faArrowDownAZ} size={iconSize} />
      {/if}
    </button>
    <button type="button" on:click={() => dispatch('hide')}>
      {#if showAll}<Fa icon={faMinus} size={iconSize} />{:else}<Fa icon={faBars} size={iconSize} />{/if}
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
    <output>{Format.toNumberFormat(strategy.totalReach, 0)}&nbsp;%</output>
  </label>
  <ReachOutputMeter
    outputMeter={{
      id: 'reach',
      value: strategy.totalReach,
      min: 0,
      max: 100
    }}
  />

  <label on:click|preventDefault|stopPropagation={() => showOutputDescription('overlap')}>
    <span>{Convert.translate('overlap', $translations, $language)}:&nbsp;</span>
    <output>{Format.toNumberFormat(strategy.overlap, 0)}&nbsp;%</output>
  </label>
  <ReachOutputMeter
    outputMeter={{
      id: 'overlap',
      value: strategy.overlap,
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
    gap: 1.4em;
    justify-content: flex-start;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  menu {
    flex: 100%;
    display: flex;
    gap: 7%;
    justify-content: flex-start;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.6em;
    height: 3.6em;
    font-size: 1em;
    border-radius: 50%;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
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

  @media screen and (min-width: 768px) {
    button {
      font-size: 1em;
    }
  }

  @media screen and (min-width: 1024px) {
    button {
      font-size: 1em;
    }
  }
</style>
