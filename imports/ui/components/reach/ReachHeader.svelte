<script>
  // packages
  import {createEventDispatcher} from 'svelte';
  import Icon from 'svelte-awesome';
  import {history, circleO, sortAmountDesc, sortAlphaAsc, bars, minus, print, filePdfO} from 'svelte-awesome/icons';
  // components
  import LogoReachApp from '../reusable/LogoReachApp.svelte';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // constants
  import {translations} from '../../../../client/constants';
  const dispatch = createEventDispatcher();

  // variables
  export let language;
  export let totalReach;
  export let locus;
  export let totalReachDisplayName;
  export let locusDisplayName;
  export let allTouchPointValuesAreZero;
  export let sortingByName;
  export let showAll;

  const thisUi = new UiProvider(translations, language);
</script>

<!-- header -->

<div class="logo">
  <LogoReachApp />
  <span class="brand">ReachApp</span>
</div>
<!-- outcome  -->
<div class="outcome">
  <div class="total-reach">
    {totalReachDisplayName}:&nbsp;<span>{thisUi.toNumberFormat(totalReach.toFixed(0))}&nbsp;%</span>
  </div>
  <div class="meter">
    <span style="width:{totalReach}%;">Disk Usage - 55.93GB out of 120GB</span>
  </div>
</div>
<div class="outcome">
  <div class="locus">{locusDisplayName}:&nbsp;<span>{thisUi.toNumberFormat(locus.toFixed(1))}&nbsp;%</span></div>
  <div class="meter">
    <span style="width:{locus}%;">Disk Usage - 55.93GB out of 120GB</span>
  </div>
</div>

<div class="controls">
  <button class="red" type="button" on:click={() => dispatch('reset')}
    >{#if allTouchPointValuesAreZero}<Icon data={history} /> {:else}<span>0</span>{/if}</button
  >
  <button class="green" type="button" on:click={() => dispatch('sort')}
    >{#if sortingByName}<Icon data={sortAlphaAsc} />{:else}<Icon data={sortAmountDesc} />{/if}</button
  >
  <button class="green" type="button" on:click={() => dispatch('hide')}
    >{#if showAll}<Icon data={minus} />{:else}<Icon data={bars} />{/if}</button
  >
  <button class="blue" type="button" on:click={() => dispatch('print')}><Icon data={print} /></button>
  <button class="blue" type="button" on:click={() => dispatch('pdf')}><Icon data={filePdfO} /></button>
</div>

<style>
  div {
    margin: 0.4em;
  }
  div.logo {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  span.brand {
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }
  div.outcome {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1.4rem;
  }
  div.total-reach,
  div.locus {
    margin: 0.2em;
  }
  div.meter {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    width: 120px;
    height: 25px;
    display: block;
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

  div.controls {
    display: flex;
    justify-content: space-around;
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
