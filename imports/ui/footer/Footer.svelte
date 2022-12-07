<script lang="ts">
  // imports
  import Button from '../reusable/Button.svelte';
  import {language} from '../stores/utils';

  // variables
  let buttonFontSize: string = 'var(--ra-fs-m)';
  //functions
</script>

<footer>
  <span>© 2013-2023 Comms With A Plan</span>
  <nav>
    <a href="/consultancy/contact">Contact</a><a href="/legal/termsandconditions"
      >{$language === 'dutch' ? 'Juridisch' : 'Legal'}</a
    >
  </nav>
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
</footer>

<style>
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  a {
    color: var(--ra-blue);
    text-decoration: none;
    margin: 0 1rem;
  }
  span.button__text {
    font-size: var(--buttonFontSize);
  }
</style>
