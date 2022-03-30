<script lang="ts">
  import FooterContent from './FooterContent.svelte';
  import CookieConsentBanner from './CookieConsentBanner.svelte';
  import Button from './../reusable/Button.svelte';
  import {onMount} from 'svelte';

  let display: 'none' | 'block';
  $: ls = localStorage;
  onMount(() => typeof localStorage !== undefined);
  function initConsent() {
    console.log('initConsent before if');
    if (ls) {
      console.log('initConsent...');

      ls.cookieConsent = true;
    }
  }
  function toggleDisplayConsentBanner() {
    display = display == 'block' ? 'none' : 'block';
    console.log('display banner', display);
  }
</script>

<footer>
  <FooterContent />
  <CookieConsentBanner {display}
    ><Button
      btn={{
        type: 'button',
        role: 'button',
        className: 'cookieConsentButton',
        backgroundColor: 'red',
        disabled: false
      }}
      on:clickedButton={() => initConsent()}>CC</Button
    ></CookieConsentBanner
  ><Button
    btn={{
      type: 'button',
      role: 'button',
      className: 'cookieConsentButton',
      backgroundColor: 'green',
      disabled: false
    }}
    on:clickedButton={() => toggleDisplayConsentBanner()}>&#127850;</Button
  >
</footer>

<style>
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0.5em;
    background-color: var(--ra-white);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: clamp(var(--font-size-xxs), var(--font-size-weight) * 100vw, var(--font-size-s));
  }
</style>
