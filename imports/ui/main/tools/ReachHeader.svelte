<script>
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
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Brand from '../../reusable/Brand.svelte';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // constants
  const dispatch = createEventDispatcher();

  // variables
  import {translations} from '../../../../client/stores';
  export let totalReach;
  export let locus;
  export let totalReachDisplayName;
  export let locusDisplayName;
  export let allTouchPointValuesAreZero;
  export let sortingByName;
  export let showAll;

  const thisUi = new UiProvider($translations);
</script>

<header>
  <Brand title={'Reach'}>
    <LogoReachApp size="3rem" />
  </Brand>

  <div class="controls">
    <div class="controls-group">
      <button type="button" on:click={() => dispatch('reset')}
        >{#if allTouchPointValuesAreZero}<Fa icon={faHistory} size={'1.4x'} /> {:else}<span>0</span>{/if}</button
      >
    </div>

    <div class="controls-group">
      <button type="button" on:click={() => dispatch('sort')}
        >{#if sortingByName}<Fa icon={faSortAlphaUp} size={'1.4x'} />{:else}<Fa
            icon={faSortNumericDownAlt}
            size={'1.4x'}
          />{/if}</button
      >
      <button type="button" on:click={() => dispatch('hide')}
        >{#if showAll}<Fa icon={faMinus} size={'1.4x'} />{:else}<Fa icon={faBars} size={'1.4x'} />{/if}</button
      >
    </div>

    <div class="controls-group">
      <button type="button" on:click={() => dispatch('print')}><Fa icon={faPrint} size={'1.4x'} /></button>
      <button type="button" on:click={() => dispatch('pdf')}><Fa icon={faFilePdf} size={'1.4x'} /></button>
    </div>
  </div>

  <span class="outcome-label">{totalReachDisplayName}:&nbsp;</span>
  <span class="outcome-result">{thisUi.toNumberFormat(totalReach.toFixed(0))}&nbsp;%</span>
  <div class="outcome-meter">
    <span style="width:{totalReach}%;" />
  </div>

  <span class="outcome-label">{locusDisplayName}:&nbsp;</span>
  <span class="outcome-result">{thisUi.toNumberFormat(locus.toFixed(1))}&nbsp;%</span>
  <div class="outcome-meter">
    <span style="width:{locus}%;" />
  </div>
</header>

<style>
  header {
    grid-column: 2/3;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.2rem;
    padding: 2rem;
    margin: 0 2rem;
    border-radius: 0.2rem;
    background-color: var(--ra-teal-off-white);
  }

  .controls {
    grid-column: 1/7;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 1.2rem;
    align-items: center;
  }
  .controls-group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    gap: 1.2rem;
    align-items: center;
  }
  button {
    font-size: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }
  .controls > .controls-group:nth-of-type(1) > button {
    background-color: var(--ra-red);
  }
  .controls > .controls-group:nth-of-type(2) > button {
    background-color: var(--ra-green);
  }
  .controls > .controls-group:nth-of-type(3) > button {
    background-color: var(--ra-blue);
  }
  button:hover {
    opacity: 0.7;
  }

  .outcome-label {
    grid-column: 1/2;
    align-self: center;
  }
  .outcome-result {
    grid-column: 2/3;
    align-self: center;
  }
  .outcome-meter {
    grid-column: 3/7;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    height: 25px;
    display: none;
  }
  .outcome-meter > span {
    height: inherit;
    box-shadow: 0 5px 5px -5px #999 inset;
    background-color: blue;
    background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    display: none;
    text-indent: -9999px;
  }
  @media screen and (min-width: 480px) {
    .outcome-meter,
    .outcome-meter > span {
      display: block;
    }
  }
  @media screen and (min-width: 760px) {
    header {
      grid-template-columns: repeat(4, 1fr);
    }
    .controls {
      grid-column: 2/5;
      justify-self: end;
    }
  }

  @media screen and (min-width: 1400px) {
    header {
    }
  }
</style>
