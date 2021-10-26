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

  <span class="reach-label">{totalReachDisplayName}:&nbsp;</span>
  <span class="reach">{thisUi.toNumberFormat(totalReach.toFixed(0))}&nbsp;%</span>
  <div class="meter reach-meter">
    <span style="width:{totalReach}%;" />
  </div>

  <span class="locus-label">{locusDisplayName}:&nbsp;</span>
  <span class="locus">{thisUi.toNumberFormat(locus.toFixed(1))}&nbsp;%</span>
  <div class="meter locus-meter">
    <span style="width:{locus}%;" />
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
    grid-template-columns: repeat(min-content, 1fr);
    grid-template-rows: min-content;
    gap: 0.4em;
    align-items: center;
    padding: 1em;
    margin: 0 2em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }

  .brand {
    grid-column: 1/6;
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

  .reach-label {
    grid-column: 1/2;
    font-size: 1.2rem;
    padding: 0 0.4em;
  }

  .reach {
    grid-column: 2/3;
    font-size: 1.2rem;
    padding: 0 0.4em;
  }
  .locus-label {
    grid-column: 1/2;
    font-size: 1.2rem;
    padding: 0 0.4em;
  }

  .locus {
    grid-column: 2/3;
    font-size: 1.2rem;
    padding: 0 0.4em;
  }
  .meter {
    grid-column: 1/3;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    height: 25px;
    display: block;
  }
  .reach-meter {
  }
  .locus-meter {
  }

  .meter > span {
    height: inherit;
    box-shadow: 0 5px 5px -5px #999 inset;
    background-color: blue;
    background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    display: block;
    text-indent: -9999px;
  }

  .controls {
    grid-column: 1 / 6;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    column-gap: 0.7em;
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
    header {
      grid-column: 1/5;
      grid-template-columns: minmax(5em, auto) minmax(3em, auto) minmax(5em, 2fr) 1fr;
      grid-template-rows: auto;
      row-gap: 0.5em;
      margin: 0;
    }
    .brand {
      grid-column: 1 / 3;
    }
    .reach-label {
      grid-column: 1 / 2;
    }
    .reach {
      grid-column: 2 / 3;
    }
    .reach-meter {
      grid-column: 1 / 3;
    }
    .locus-label {
      grid-column: 1 / 2;
    }
    .locus {
      grid-column: 2 / 3;
    }
    .locus-meter {
      grid-column: 1 / 3;
    }
    .controls {
      grid-column: 1 / 5;
    }
  }
</style>
