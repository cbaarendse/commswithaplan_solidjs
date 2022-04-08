<script lang="ts">
  import {slide} from 'svelte/transition';
  import Button from './../reusable/Button.svelte';
  import Checkbox from './../reusable/Checkbox.svelte';
  import {language, consent} from '../stores/stores';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';

  export let footerConsentVisible: boolean;

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
    footerConsentVisible = false;
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

{#if footerConsentVisible}
  <footer transition:slide={{delay: 200, duration: 1000}}>
    <span>Cookies:</span>
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Akkoord Functioneel & Noodzakelijk' : 'Agree Functional & Necessary',
        name: 'consentFunctionalNecessary',
        id: 'functionalNecessary',
        className: 'consent__checkbox',
        value: '00111',
        checked: true,
        readonly: false,
        disabled: true
      }}
      on:updateCheckBox
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Akkoord Analyse & Ads' : 'Agree Analysis & Ads',
        name: 'consentFunctionalNecessaryAdsAnalytics',
        id: 'functionalNecessaryAdsAnalytics',
        className: 'consent__checkbox',
        value: '11111',
        checked: true,
        readonly: false,
        disabled: false
      }}
      on:updateCheckBox
    />
    <Button
      btn={{
        type: 'submit',
        role: 'button',
        id: '11111',
        className: 'set__consent',
        textColor: 'var(--ra-white)',
        backgroundColor: 'var(--ra-green)',
        padding: '0 1rem',
        height: 'var(--ra-3xl)',
        disabled: $consent === '11111'
      }}
      on:clickedButton={setConsent}>{$language === 'dutch' ? 'Verstuur' : 'Submit'}</Button
    >
  </footer>
{/if}

<style>
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.2rem 0;
    font-size: clamp(var(--font-size-xxs), var(--font-size-weight) * 100vw, var(--font-size-s));
    background: var(--ra-red-off-white);
  }
</style>
