<script lang="ts">
  import FooterContent from './FooterContent.svelte';
  import CookieConsentBanner from './CookieConsentBanner.svelte';
  import Button from './../reusable/Button.svelte';
  import {language, consent} from '../stores/stores';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';

  let bannerVisible: boolean = true;

  onMount(() => {
    console.log('datalayer', window.dataLayer);

    if (localStorage.consent) {
      $consent = localStorage.consent;
    }
  });
  // consent is a writable store, it holds the level of consent that the user gives to tracking services
  // it can be accessed all over the application
  // the event that sets the consent, through one of the buttons, triggers the appropriate event in Google Tag Manager
  function setConsent(event: CustomEvent) {
    $consent = event.detail.id;
    bannerVisible = false;
  }

  function toggleDisplayConsentBanner() {
    bannerVisible = !bannerVisible;
  }
  // consent level is also in localStorage so the user can view it
  let consentUnsubscribe: Unsubscriber = consent.subscribe((value) => {
    // string in localstorage.consent is built in this order:
    // ad_storage, analytics_storage, functional_storage, personalization_storage, security_storage
    // necessary & functional === '00111'
    // necessary & functional & analytics & ads === '11111'
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
          id: '00111',
          className: 'set__consent',
          color: 'var(--ra-white)',
          backgroundColor: 'var(--ra-red)',
          padding: 'var(--ra-xs)',
          height: 'var(--ra-3xl)',
          disabled: $consent === '00111'
        }}
        on:clickedButton={setConsent}
        >{$language === 'dutch' ? 'Noodzakelijk & Functioneel' : 'Necessary & Functional'}</Button
      ><Button
        btn={{
          type: 'button',
          role: 'button',
          id: '11111',
          className: 'set__consent',
          backgroundColor: 'var(--ra-green)',
          height: 'var(--ra-3xl)',
          disabled: $consent === '11111'
        }}
        on:clickedButton={setConsent}>{$language === 'dutch' ? '& Analyse & Ads' : '& Analytics & Ads'}</Button
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
