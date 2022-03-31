<script lang="ts">
  import FooterContent from './FooterContent.svelte';
  import CookieConsentBanner from './CookieConsentBanner.svelte';
  import Button from './../reusable/Button.svelte';
  import {cookieConsent} from '../stores/stores';
  import {onMount} from 'svelte';

  let bannerVisible: boolean = true;

  onMount(() => {});
  function initConsent() {
    localStorage.setItem('cookieConsent', 'true');
    bannerVisible = false;
  }
  function denyConsent() {
    localStorage.setItem('cookieConsent', 'false');
    bannerVisible = true;
  }
  function toggleDisplayConsentBanner() {
    bannerVisible = !bannerVisible;
  }
</script>

<footer>
  <FooterContent on:clickedButton={() => toggleDisplayConsentBanner()} />
  {#if bannerVisible}
    <CookieConsentBanner
      ><Button
        btn={{
          type: 'button',
          role: 'button',
          className: 'cookieConsentButton',
          color: 'var(--ra-white)',
          backgroundColor: 'var(--ra-red)',
          padding: 'var(--ra-xs)',
          height: 'var(--ra-3xl)',
          disabled: $cookieConsent === true
        }}
        on:clickedButton={() => denyConsent()}>Necessary</Button
      ><Button
        btn={{
          type: 'button',
          role: 'button',
          className: 'cookieConsentButton',
          backgroundColor: 'var(--ra-green)',
          height: 'var(--ra-3xl)',
          disabled: $cookieConsent === false
        }}
        on:clickedButton={() => initConsent()}>Necessary + Analytics</Button
      ></CookieConsentBanner
    >{/if}
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--ra-white);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: clamp(var(--font-size-xxs), var(--font-size-weight) * 100vw, var(--font-size-s));
  }
</style>
