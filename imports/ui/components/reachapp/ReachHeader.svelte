<script>
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
  <div class="logo">
    <LogoReachApp />
    <span class="brand">ReachApp</span>
  </div>
  <!-- outcome  -->
  <div class="reach-container">
    <div class="total-reach">
      {totalReachDisplayName}:&nbsp;<span>{thisUi.toNumberFormat(totalReach.toFixed(0))}&nbsp;%</span>
    </div>
    <div class="meter">
      <span style="width:{totalReach}%;">{totalReachDisplayName}</span>
    </div>
  </div>
  <div class="locus-container">
    <div class="locus">
      {locusDisplayName}:&nbsp;<span>{thisUi.toNumberFormat(locus.toFixed(1))}&nbsp;%</span>
    </div>
    <div class="meter">
      <span style="width:{locus}%;">{locusDisplayName}</span>
    </div>
  </div>
  <!-- TODO: variables sorting by name etc to be reactive and simple -->
  <div class="controls">
    <button class="red" type="button" on:click={() => dispatch('reset')}
      >{#if allTouchPointValuesAreZero}<Fa icon={faHistory} size="1.4x" /> {:else}<span>0</span>{/if}</button
    >
    <button class="green" type="button" on:click={() => dispatch('sort')}
      >{#if sortingByName}<Fa icon={faSortAlphaUp} size="1.4x" />{:else}<Fa
          icon={faSortNumericDownAlt}
          size="1.4x"
        />{/if}</button
    >
    <button class="green" type="button" on:click={() => dispatch('hide')}
      >{#if showAll}<Fa icon={faMinus} size="1.4x" />{:else}<Fa icon={faHamburger} size="1.4x" />{/if}</button
    >
    <button class="blue" type="button" on:click={() => dispatch('print')}><Fa icon={faPrint} size="1.4x" /></button>
    <button class="blue" type="button" on:click={() => dispatch('pdf')}><Fa icon={faFilePdf} size="1.4x" /></button>
  </div>
</header>

<style>
  header {
    all: unset;
    padding: 1em;
    margin: 2em 0;
    border: 1px dotted orange;
    border-radius: 0.2em;
    display: grid;
    gap: 0.4em;
    grid-template-columns: 3fr 7fr 7fr 5fr;
    align-items: center;
    background-color: var(--ra-teal-off-white);
  }

  @media screen and (max-width: 1200px) {
    header {
    }
  }

  div.logo {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }
  div.logo > span.brand {
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }
  div.reach-container,
  div.locus-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    font-size: 1.4rem;
  }
  div.total-reach,
  div.locus {
    flex-shrink: 0;
  }

  div.meter {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    flex-shrink: 1;
    /* width: 120px; */
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
    grid-template-columns: repeat(5, 1fr);
  }

  button {
    font-size: 1rem;
    width: 3em;
    height: 3em;
    margin: 0 0.2em;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }
  button.red {
    background-color: var(--ra-red);
  }
  button.green {
    background-color: var(--ra-green);
  }
  button.blue {
    background-color: var(--ra-blue);
  }
  button.red:hover {
    background-color: var(--ra-red-light);
  }
  button.green:hover {
    background-color: var(--ra-green-light);
  }
  button.blue:hover {
    background-color: var(--ra-blue-light);
  }
</style>
