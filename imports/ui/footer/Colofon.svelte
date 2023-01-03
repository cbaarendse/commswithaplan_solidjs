<script lang="ts">
  // imports
  import Button from '../reusable/Button.svelte';
  import {language, translations} from '../stores/utils';
  import {Convert} from '../types/classes';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faCookie, faCookieBite} from '@fortawesome/free-solid-svg-icons';

  // variables
  let buttonFontSize: string = '1.2em';
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
    <a href="/legal/termsandconditions">{Convert.translate('legal', $translations, $language)}</a>
  </nav>
  <menu>
    <Button
      btn={{
        type: 'button',
        class: 'consent__visibility',
        backgroundColor: 'transparent',
        height: 'fit-content',
        disabled: false
      }}
      on:clickedButton
      on:mouseEntered={biteCookie}
      on:mouseLeft={repairCookie}
    >
      <span class="button__text" style="--buttonFontSize: {buttonFontSize};">
        {#if wholeCookie}
          <Fa icon={faCookie} color={'goldenrod'} />
        {:else}
          <Fa icon={faCookieBite} color={'goldenrod'} />
        {/if}
      </span>
    </Button>
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

  a {
    margin: 0 1em;
  }

  span.button__text {
    font-size: var(--buttonFontSize);
  }
</style>
