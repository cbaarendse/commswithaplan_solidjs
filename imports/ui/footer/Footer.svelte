<script lang="ts">
  import FooterContent from './FooterContent.svelte';
  import CookieConsentBanner from './CookieConsentBanner.svelte';
  import Button from './../reusable/Button.svelte';
  import {consent} from '../stores/stores';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';

  let bannerVisible: boolean = true;
  // TODO: translate button text; implement consent in GTM
  onMount(() => {});
  // consent is a writable store, it holds the level of consent that the user gives to tracking services
  // it can be accessed all over the application
  // the event that sets the consent, through one of the buttons, triggers triggers the appropriate event in Google Tag Manager
  function setConsent(event: CustomEvent) {
    $consent = event.detail.id;
    bannerVisible = false;
  }
  function toggleDisplayConsentBanner() {
    bannerVisible = !bannerVisible;
  }
  // consent level is also in localStorage so the user can view it
  let consentUnsubscribe: Unsubscriber = consent.subscribe((value) => {
    localStorage.setItem('consent', value);
  });
  onDestroy(consentUnsubscribe);
</script>

<footer>
  <FooterContent on:clickedButton={() => toggleDisplayConsentBanner()} />
  {#if bannerVisible}
    <CookieConsentBanner
      ><Button
        btn={{
          type: 'button',
          role: 'button',
          id: 'necessary',
          className: 'cookieConsentButton',
          color: 'var(--ra-white)',
          backgroundColor: 'var(--ra-red)',
          padding: 'var(--ra-xs)',
          height: 'var(--ra-3xl)',
          disabled: $consent === 'necessary'
        }}
        on:clickedButton={setConsent}>Necessary</Button
      ><Button
        btn={{
          type: 'button',
          role: 'button',
          id: 'necessaryAnalytics',
          className: 'cookieConsentButton',
          backgroundColor: 'var(--ra-green)',
          height: 'var(--ra-3xl)',
          disabled: $consent === 'necessaryAnalytics'
        }}
        on:clickedButton={setConsent}>Necessary + Analytics</Button
      ><Button
        btn={{
          type: 'button',
          role: 'button',
          id: 'necessaryAnalyticsAds',
          className: 'cookieConsentButton',
          backgroundColor: 'var(--ra-green)',
          height: 'var(--ra-3xl)',
          disabled: $consent === 'necessaryAnalyticsAds'
        }}
        on:clickedButton={setConsent}>Necessary + Analytics + Ads</Button
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
