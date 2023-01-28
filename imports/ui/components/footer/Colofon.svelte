<script lang="ts">
  // imports
  import {language, translations} from '../../stores/utils';
  import createConverter from '../../functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faCookie, faCookieBite} from '@fortawesome/free-solid-svg-icons';

  // variables
  let disabled = false;
  let buttonFontSize: string = '1.2em';
  const converter = createConverter();
  let wholeCookie: boolean = true;
  //functions
  const biteCookie = function () {
    wholeCookie = false;
  };
  const repairCookie = function () {
    wholeCookie = true;
  };
</script>

<section>
  <span>© 2013-2023 Comms With A Plan</span>
  <nav>
    <a href="/consultancy/contact">Contact</a>
    <a href="/legal/termsandconditions">{converter.translate('legal', $translations, $language)}</a>
  </nav>
  <menu>
    <button
      class="consent__visibility"
      type="button"
      aria-roledescription="button"
      {disabled}
      on:click|stopPropagation|preventDefault
      on:mouseenter|stopPropagation|preventDefault={biteCookie}
      on:mouseleave|stopPropagation|preventDefault={repairCookie}
    >
      <span class="button__text" style="--buttonFontSize: {buttonFontSize};">
        {#if wholeCookie}
          <Fa icon={faCookie} color={'goldenrod'} />
        {:else}
          <Fa icon={faCookieBite} color={'goldenrod'} />
        {/if}
      </span>
    </button>
  </menu>
</section>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }
  button {
    height: fit-content;
    background-color: transparent;
    margin: 0 0.4em;
    cursor: pointer;
    border-radius: 5%;
    border: none;
  }
  a {
    margin: 0 1em;
  }

  span.button__text {
    font-size: var(--buttonFontSize);
  }
</style>
