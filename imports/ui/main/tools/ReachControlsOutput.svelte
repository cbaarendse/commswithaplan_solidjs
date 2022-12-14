<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import {language, translations} from '../../stores/utils';
  import {definitions} from '../../stores/tools';
  import type {Content} from '../../types/types';
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
    <button type="button" on:click={() => dispatch('reset')}
      >{#if allTouchPointsValueIsZero}&#8676;{:else}&#8617;{/if}</button
    >
    <button type="button" on:click={() => dispatch('sort')}
      >{#if sortedByName}&#8744;{:else}&#8743;{/if}</button
    >
    <button type="button" on:click={() => dispatch('hide')}
      >{#if showAll}&#8722;{:else}&#8801;{/if}</button
    ></menu
  >

  <label
    for="reach"
    class="reach-label"
    on:click|preventDefault|stopPropagation={() => showOutputDescription('total_reach')}
    >{Convert.translate('total', $translations, $language)}&nbsp;{Convert.translate(
      'reach',
      $translations,
      $language
    )}:&nbsp;</label
  >
  <output class="reach-output">{Format.toNumberFormat(totalReach, 0)}&nbsp;%</output>
  <!-- TODO: <meter> -->
  <meter id="reach" value={totalReach} min="0" max="100">Reach</meter>

  <label for="locus" class="locus-label" on:click|preventDefault|stopPropagation={() => showOutputDescription('locus')}
    >{Convert.translate('locus', $translations, $language)}:&nbsp;</label
  >
  <output class="locus-output">{Format.toNumberFormat(locus, 1)}&nbsp;%</output>
  <!-- TODO: <meter> -->
  <meter id="locus" value={locus} min="0" max="100">Locus</meter>
</div>

<Modal
  title={output.displayName}
  display={displayOutputDescription}
  on:destroyModal={() => {
    displayOutputDescription = 'none';
  }}>{output.description}</Modal
>

<!-- TODO: all this in flexbox, make groups, meter is % of parent (if parent is header) or vw unit -->
<style>
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
    grid-auto-rows: auto;
    grid-template-areas:
      'menu menu menu menu'
      'rl rl . rr'
      'll ll . lr ';
    gap: 2em;
    padding: 4%;
    border-radius: 0.2rem;
    background-color: var(--ra-teal-off-white);
  }
  menu {
    display: flex;
    justify-content: flex-start;
    gap: 3em;
    grid-area: menu;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
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

  .reach-label {
    grid-area: rl;
    align-self: center;
    font-size: 1.4em;
    cursor: pointer;
  }
  .reach-label:hover {
    opacity: 0.7;
  }
  output {
    align-self: center;
    font-size: 1.4em;
  }
  output.reach-output {
    grid-area: rr;
  }
  output.locus-output {
    grid-area: lr;
  }

  .locus-label {
    grid-area: ll;
    align-self: center;
    font-size: 1.4em;
    cursor: pointer;
  }
  .locus-label:hover {
    opacity: 0.7;
  }

  /*for meter track*/
  meter,
  meter::-webkit-meter-bar {
    display: none;
    align-self: center;
    /*to remove the default background property */
    background: none;
    height: 1.5em;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
    overflow: hidden;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
  }
  /* background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    text-indent: -9999px; */
  /*for meter bar*/
  meter::-webkit-meter-optimum-value {
    background: none;
    background-color: var(--ra-red);
  }
  :-moz-meter-optimum::-moz-meter-bar {
    background: none;
    background-color: var(--ra-blue);
  }

  meter::-webkit-meter-suboptimum-value {
    background: none;
    background-color: var(--ra-blue);
  }
  :-moz-meter-sub-optimum::-moz-meter-bar {
    background: none;
    background-color: var(--ra-blue);
  }

  meter::-webkit-meter-even-less-good-value {
    background: none;
    background-color: var(--ra-blue);
  }
  :-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: none;
    background-color: var(--ra-blue);
  }

  output.reach-output + meter {
    grid-area: rm;
  }
  output.locus-output + meter {
    grid-area: lm;
  }

  @media screen and (min-width: 375px) {
    .container {
      grid-template-areas:
        'brand brand brand brand brand . .'
        'menu menu menu menu menu menu menu'
        'rl rl . . . . rr '
        'll ll . . . . lr';
    }
  }

  @media screen and (min-width: 414px) {
    .container {
      grid-template-areas:
        'menu menu menu menu menu menu'
        'rl rl rr rm rm rm'
        'll ll lr lm lm lm';
    }
    meter {
      display: block;
    }
  }

  @media screen and (min-width: 768px) {
    .container {
      grid-template-areas:
        'menu menu menu menu menu menu menu'
        'rl rl rr rm rm rm  rm'
        'll ll lr lm lm lm  lm';
    }
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-areas:
        'menu menu menu menu menu menu menu menu menu menu menu menu'
        'rl rl rr rm rm rm ll ll lr lm lm lm';
    }
  }
</style>
