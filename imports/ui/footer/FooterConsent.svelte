<script lang="ts">
  import {slide} from 'svelte/transition';
  import Button from './../reusable/Button.svelte';
  import Checkbox from './../reusable/Checkbox.svelte';
  import {language, consent} from '../stores/stores';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import {setCookie, getCookie, checkCookie, deleteCookie} from '../../both/functions';

  export let footerConsentVisible: boolean;

  let ad_storage_consent: boolean;
  let analytics_storage_consent: boolean;
  let functional_storage_consent: boolean;
  let personal_storage_consent: boolean;
  let security_storage_consent: boolean;

  onMount(() => {
    console.log('datalayer', window.dataLayer);
  });
  // consent is a writable store, it holds the level of consent that the user gives to tracking services
  // it can be accessed all over the application
  // the event that sets the consent, through one of the buttons, triggers the appropriate event in Google Tag Manager
  function setConsent(event: CustomEvent) {
    setCookie('_commswithaplan_ad_storage', ad_storage_consent === true ? 'granted' : 'denied', 30, window.document);
    setCookie(
      '_commswithaplan_analytics_storage',
      analytics_storage_consent === true ? 'granted' : 'denied',
      30,
      window.document
    );
    setCookie(
      '_commswithaplan_functional_storage',
      functional_storage_consent === true ? 'granted' : 'denied',
      30,
      window.document
    );
    setCookie(
      '_commswithaplan_personal_storage',
      personal_storage_consent === true ? 'granted' : 'denied',
      30,
      window.document
    );
    setCookie(
      '_commswithaplan_security_storage',
      security_storage_consent === true ? 'granted' : 'denied',
      30,
      window.document
    );
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
    <span>{$language == 'dutch' ? 'Akkoord opslag cookies:' : 'Agree storage of cookies:'}</span>
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Advertenties' : 'Ads',
        name: 'ad_storage',
        id: 'ad_storage__checkbox',
        className: 'consent__checkbox',
        value: '0',
        readonly: false,
        disabled: false
      }}
      bind:checked={ad_storage_consent}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Analyse' : 'Analysis',
        name: 'analytics_storage',
        id: 'analytics_storage__checkbox',
        className: 'consent__checkbox',
        value: '0',
        readonly: false,
        disabled: false
      }}
      bind:checked={analytics_storage_consent}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Functioneel' : 'Functional',
        name: 'functional_storage',
        id: 'functional_storage__checkbox',
        className: 'consent__checkbox',
        value: '1',
        readonly: false,
        disabled: true
      }}
    /><Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Persoonlijk' : 'Personal',
        name: 'personal_storage',
        id: 'personal_storage__checkbox',
        className: 'consent__checkbox',
        value: '1',
        readonly: false,
        disabled: true
      }}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Veiligheid' : 'Security',
        name: 'security_storage',
        id: 'security_storage__checkbox',
        className: 'consent__checkbox',
        value: '1',
        readonly: false,
        disabled: true
      }}
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
      on:clickedButton={setConsent}>OK</Button
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
