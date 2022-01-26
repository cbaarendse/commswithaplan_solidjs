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

  // providers
  import UiProvider from '../../../both/uiProvider';

  // constants
  const dispatch = createEventDispatcher();

  // variables
  import {language, translations} from '../../../../client/stores';
  export let totalReach: number;
  export let locus: number;
  export let allTouchPointValuesAreZero: boolean;
  export let sortingByName: boolean;
  export let showAll: boolean;
</script>

<div class="header-content">
  <button type="button" on:click={() => dispatch('reset')}
    >{#if allTouchPointValuesAreZero}<Fa icon={faHistory} size={'1.4x'} /> {:else}0{/if}</button
  >
  <button type="button" on:click={() => dispatch('sort')}
    >{#if sortingByName}<Fa icon={faSortAlphaUp} size={'1.4x'} />{:else}<Fa
        icon={faSortNumericDownAlt}
        size={'1.4x'}
      />{/if}</button
  >
  <button type="button" on:click={() => dispatch('hide')}
    >{#if showAll}<Fa icon={faMinus} size={'1.4x'} />{:else}<Fa icon={faBars} size={'1.4x'} />{/if}</button
  >
  <button type="button" on:click={() => dispatch('print')}><Fa icon={faPrint} size={'1.4x'} /></button>
  <button type="button" on:click={() => dispatch('pdf')}><Fa icon={faFilePdf} size={'1.4x'} /></button>

  <span class="reach-label"
    >{UiProvider.translate('total', $translations, $language)}&nbsp;{UiProvider.translate(
      'reach',
      $translations,
      $language
    )}:&nbsp;</span
  >
  <span class="reach-result">{UiProvider.toNumberFormat(totalReach, 0)}&nbsp;%</span>
  <div class="meter">
    <span style="width:{totalReach}%;" />
  </div>

  <span class="locus-label">{UiProvider.translate('locus', $translations, $language)}:&nbsp;</span>
  <span class="locus-result">{UiProvider.toNumberFormat(locus, 1)}&nbsp;%</span>
  <div class="meter">
    <span style="width:{locus}%;" />
  </div>
</div>

<!-- TODO: all this in flexbox, make groups, meter is % of parent (if parent is header) or vw unit -->
<style>
  .header-content {
    grid-column: 2/3;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
    grid-auto-rows: 3rem;
    grid-template-areas:
      'brand brand brand brand'
      'btn1 . . . '
      'btn2 btn3 . . '
      'btn4 btn5 . . '
      'rl rl rr rr'
      'll ll lr lr ';
    gap: 1.2rem;
    padding: 4%;
    margin: 0 2%;
    border-radius: 0.2rem;
    background-color: var(--ra-teal-off-white);
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

  .header-content > button:nth-of-type(1) {
    grid-area: btn1;
    background-color: var(--ra-red);
  }
  .header-content > button:nth-of-type(2) {
    grid-area: btn2;
    background-color: var(--ra-green);
  }
  .header-content > button:nth-of-type(3) {
    grid-area: btn3;
    background-color: var(--ra-green);
  }
  .header-content > button:nth-of-type(4) {
    grid-area: btn4;
    background-color: var(--ra-blue);
  }
  .header-content > button:nth-of-type(5) {
    grid-area: btn5;
    background-color: var(--ra-blue);
  }
  button:hover {
    opacity: 0.7;
  }

  .reach-label {
    grid-area: rl;
    align-self: center;
  }
  .reach-result {
    grid-area: rr;
    align-self: center;
  }
  .locus-label {
    grid-area: ll;
    align-self: center;
  }
  .locus-result {
    grid-area: lr;
    align-self: center;
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
    .header-content {
      grid-template-areas:
        'brand brand brand brand brand . .'
        'btn1 btn2 btn3 btn4 btn5 . .'
        'rl rl rr . . . . '
        'll ll lr . . . .';
    }
  }

  @media screen and (min-width: 414px) {
    .header-content {
      grid-template-areas:
        'brand brand brand brand brand . .'
        'btn1 btn2 btn3 btn4 btn5 . .'
        'rl rl rr rm rm rm .'
        'll ll lr lm lm lm .';
    }
    .meter,
    .meter > span {
      display: block;
    }
  }

  @media screen and (min-width: 768px) {
    .header-content {
      grid-template-areas:
        'brand brand brand brand brand . . .'
        'btn1 btn2 btn3 btn4 btn5 . . .'
        'rl rl rr rm rm rm  rm .'
        'll ll lr lm lm lm  lm .';
    }
  }

  @media screen and (min-width: 1024px) {
    .header-content {
      grid-template-areas:
        'brand brand brand brand brand . .  btn1 btn2 btn3 btn4 btn5'
        'rl rl rr rm rm rm ll ll lr lm lm lm';
    }
  }
</style>
