<script lang="ts">
  // packages
  import {createEventDispatcher} from 'svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faHistory,
    faSortAlphaUp,
    faSortNumericDownAlt,
    faMinus,
    faBars,
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
    <LogoReachApp size="2.1em" />
    <span class="brand-label">ReachApp</span>
  </div>
  <div class="outcome">
    <span class="outcome-label">{totalReachDisplayName}:&nbsp;</span>
    <span class="outcome-outcome">{thisUi.toNumberFormat(totalReach.toFixed(0))}&nbsp;%</span>
    <div class="outcome-meter">
      <span style="width:{totalReach}%;" />
    </div>
  </div>
  <div class="outcome">
    <span class="outcome-label">{locusDisplayName}:&nbsp;</span>
    <span class="outcome-result">{thisUi.toNumberFormat(locus.toFixed(1))}&nbsp;%</span>
    <div class="outcome-meter">
      <span style="width:{locus}%;" />
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
      >{#if showAll}<Fa icon={faMinus} size="1.4x" />{:else}<Fa icon={faBars} size="1.4x" />{/if}</button
    >
    <button type="button" on:click={() => dispatch('print')}><Fa icon={faPrint} size="1.4x" /></button>
    <button type="button" on:click={() => dispatch('pdf')}><Fa icon={faFilePdf} size="1.4x" /></button>
  </div>
</header>

<style>
  header {
    display: grid;
    grid-template-columns: minmax(14em, 1fr);
    grid-auto-rows: minmax(3em, 1fr);
    gap: 0.7em;
    align-items: center;
    padding: 1em;
    margin: 0 2%;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }

  .brand {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.7em;
    align-items: center;
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }

  .brand-label {
    font-size: 1.6rem;
  }

  .outcome {
    display: grid;
    grid-template-columns: 6em 2em minmax(6em, 2fr) 1fr;
    gap: 0.7em;
    font-size: 1.2rem;
    padding: 0 0.4em;
  }

  .outcome-meter {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    height: 25px;
    display: block;
  }

  .outcome-meter > span {
    height: inherit;
    box-shadow: 0 5px 5px -5px #999 inset;
    background-color: blue;
    background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    display: block;
    text-indent: -9999px;
  }

  .controls {
    display: flex;
    justify-content: flex-start;
    gap: 2em;
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
  .controls > button:nth-of-type(1) {
    background-color: var(--ra-red);
  }
  .controls > button:nth-of-type(2),
  .controls > button:nth-of-type(3) {
    background-color: var(--ra-green);
  }
  .controls > button:nth-of-type(4),
  .controls > button:nth-of-type(5) {
    background-color: var(--ra-blue);
  }
  button:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 900px) {
    .outcome {
      display: grid;
      grid-template-columns: 6em 2em minmax(6em, 1fr) 1fr;
    }
  }

  @media screen and (min-width: 1100px) {
    header {
      grid-template-columns: 1fr 1fr;
    }
    .brand {
      grid-column: span 2;
    }
    .outcome {
      grid-column: span 1;
      display: grid;
      grid-template-columns: 6em 2em minmax(6em, 3fr) 1fr;
    }
    .controls {
      grid-column: span 2;
    }
  }
  /* TODO: correct */
  @media screen and (min-width: 1400px) {
    header {
      grid-template-columns: auto auto auto auto;
    }
    .brand {
    }
    .outcome {
      display: grid;
      grid-template-columns: 6em 2em minmax(6em, 1fr);
    }
    .controls {
    }
  }
</style>
