<script lang="ts">
  // imports
  import Button from '../reusable/Button.svelte';
  import {language, translations} from '../stores/utils';
  import {Convert} from '../types/classes';

  // variables
  let buttonFontSize: string = '1.2em';
  //functions
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
      on:clickedButton><span class="button__text" style="--buttonFontSize: {buttonFontSize};">&#127850;</span></Button
    >
  </menu>
</section>

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2em;
  }

  a {
    margin: 0 1em;
  }

  span.button__text {
    font-size: 0.8rem;
  }
</style>
