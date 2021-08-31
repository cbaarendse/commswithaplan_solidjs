<script lang="ts">
  // packages
  import {createEventDispatcher} from 'svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faHistory,
    faSortAlphaUp,
    faSortNumericDownAlt,
    faMinus,
    faHamburger,
    faPrint,
    faFilePdf,
  } from '@fortawesome/free-solid-svg-icons';

  // components
  import LogoReachApp from '../reusable/LogoReachApp.svelte';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // constants
  import {translations} from '../../../../client/constants';
  const dispatch = createEventDispatcher();

  // variables
  export let totalReach;
  export let locus;
  export let totalReachDisplayName;
  export let locusDisplayName;
  export let allTouchPointValuesAreZero;
  export let sortingByName;
  export let showAll;

  const thisUi = new UiProvider(translations);
</script>

<header>
  <div class="brand">
    <LogoReachApp />
    <span>ReachApp</span>
  </div>
  <div class="outcome">
    <span>{totalReachDisplayName}:&nbsp;</span>
    <span>{thisUi.toNumberFormat(totalReach.toFixed(0))}&nbsp;%</span>
    <div class="meter">
      <span style="width:{totalReach}%;">{totalReachDisplayName}</span>
    </div>
  </div>
  <div class="outcome">
    <span>{locusDisplayName}:&nbsp;</span>
    <span>{thisUi.toNumberFormat(locus.toFixed(1))}&nbsp;%</span>
    <div class="meter">
      <span style="width:{locus}%;">{locusDisplayName}</span>
    </div>
  </div>
  <div class="controls">
    <button type="button" on:click={() => dispatch('reset')}
      >{#if allTouchPointValuesAreZero}<Fa icon={faHistory} size="1.4x" /> {:else}<span>0</span>{/if}</button
    >
    <button type="button" on:click={() => dispatch('sort')}
      >{#if sortingByName}<Fa icon={faSortAlphaUp} size="1.4x" />{:else}<Fa
          icon={faSortNumericDownAlt}
          size="1.4x"
        />{/if}</button
    >
    <button type="button" on:click={() => dispatch('hide')}
      >{#if showAll}<Fa icon={faMinus} size="1.4x" />{:else}<Fa icon={faHamburger} size="1.4x" />{/if}</button
    >
    <button type="button" on:click={() => dispatch('print')}><Fa icon={faPrint} size="1.4x" /></button>
    <button type="button" on:click={() => dispatch('pdf')}><Fa icon={faFilePdf} size="1.4x" /></button>
  </div>
</header>

<style>
  header {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(4, minmax(min-content, 1fr));
    gap: 0.4em;
    padding: 1em;
    margin: 2em 0;
    border: 1px dotted orange;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }

  @media screen and (min-width: 1200px) {
    header {
      column-gap: 0.4em;
      grid-template-columns: auto auto auto 1fr auto 1fr auto auto auto auto auto;
      align-items: center;
    }
  }

  div.brand {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.5em;
    align-items: center;
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }

  div.outcome {
    display: grid;
    grid-template-columns: 1fr auto 3fr;
    align-items: center;
    column-gap: 1em;
    font-size: 1.4rem;
  }

  div.meter {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    height: 25px;
    display: block;
  }

  div.meter > span {
    height: inherit;
    box-shadow: 0 5px 5px -5px #999 inset;
    background-color: blue;
    background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    display: block;
    text-indent: -9999px;
  }

  div.controls {
    display: grid;
    grid-template-columns: repeat(5, auto) 1fr;
    column-gap: 0.4em;
    align-items: center;
  }

  button {
    font-size: 1rem;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }
  div.controls > button:nth-of-type(1) {
    background-color: var(--ra-red);
  }
  div.controls > button:nth-of-type(2),
  div.controls > button:nth-of-type(3) {
    background-color: var(--ra-green);
  }

  div.controls > button:nth-of-type(4),
  div.controls > button:nth-of-type(5) {
    background-color: var(--ra-blue);
  }

  button:hover {
    opacity: 0.7;
  }
</style>
