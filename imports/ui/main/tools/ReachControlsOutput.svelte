<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import {language, translations} from '../../stores/utils';
  import {definitions} from '../../stores/tools';
  import type {Content} from '../../types/types';
  import Modal from '../../reusable/Modal.svelte';
  import {Ui} from '../../types/classes';

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

  <span class="reach-label" on:click|preventDefault|stopPropagation={() => showOutputDescription('total_reach')}
    >{Ui.translate('total', $translations, $language)}&nbsp;{Ui.translate(
      'reach',
      $translations,
      $language
    )}:&nbsp;</span
  >
  <span class="reach-result">{Ui.toNumberFormat(totalReach, 0)}&nbsp;%</span>
  <div class="meter">
    <span style="width:{totalReach}%;" />
  </div>

  <span class="locus-label" on:click|preventDefault|stopPropagation={() => showOutputDescription('locus')}
    >{Ui.translate('locus', $translations, $language)}:&nbsp;</span
  >
  <span class="locus-result">{Ui.toNumberFormat(locus, 1)}&nbsp;%</span>
  <div class="meter">
    <span style="width:{locus}%;" />
  </div>
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
    grid-auto-rows: 3rem;
    grid-template-areas:
      'menu'
      'rl rl . rr'
      'll ll . lr ';
    gap: 1.2rem;
    padding: 4%;
    border-radius: 0.2rem;
    background-color: var(--ra-teal-off-white);
    font-size: 1em;
  }
  menu {
    grid-area: menu;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    color: var(--ra-white);
    font-size: var(--ra-fs-2xl);
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
  .reach-result {
    grid-area: rr;
    align-self: center;
    font-size: 1.4em;
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
  .locus-result {
    grid-area: lr;
    align-self: center;
    font-size: 1.4em;
  }
  .meter {
    align-self: center;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    height: 1.5rem;
    display: none;
  }
  .reach-result + .meter {
    grid-area: rm;
  }
  .locus-result + .meter {
    grid-area: lm;
  }
  .meter > span,
  .meter > span {
    height: inherit;
    box-shadow: 0 5px 5px -5px #999 inset;
    background-color: blue;
    background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    display: none;
    text-indent: -9999px;
  }
  @media screen and (min-width: 375px) {
    .container {
      grid-template-areas:
        'brand brand brand brand brand . .'
        'menu'
        'rl rl . . . . rr '
        'll ll . . . . lr';
    }
  }

  @media screen and (min-width: 414px) {
    .container {
      grid-template-areas:
        'menu'
        'rl rl rr rm rm rm'
        'll ll lr lm lm lm';
    }
    .meter,
    .meter > span {
      display: block;
    }
  }

  @media screen and (min-width: 768px) {
    .container {
      grid-template-areas:
        'menu'
        'rl rl rr rm rm rm  rm'
        'll ll lr lm lm lm  lm';
    }
  }

  @media screen and (min-width: 1024px) {
    .container {
      grid-template-areas:
        'menu'
        'rl rl rr rm rm rm ll ll lr lm lm lm';
    }
  }
</style>
