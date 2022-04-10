<script lang="ts">
  import {slide} from 'svelte/transition';
  import Button from './../reusable/Button.svelte';
  import Checkbox from './../reusable/Checkbox.svelte';
  import {language} from '../stores/stores';
  import {onMount} from 'svelte';
  import {setCookie, getCookie, checkCookie, deleteCookie} from '../../both/functions';

  export let footerConsentVisible: boolean;

  let ad_storage_choice: boolean = false;
  let analytics_storage_choice: boolean = false;
  let functional_storage_choice: boolean = true;
  let personalization_storage_choice: boolean = true;
  let security_storage_choice: boolean = true;

  console.log('ad_storage_choice log', ad_storage_choice);

  onMount(() => {
    console.log('datalayer', window.dataLayer);
  });
  // setConsent sets or changes consent information stored in cookies
  function setConsent(event: CustomEvent) {
    setCookie('_commswithaplan_ad_storage', 'granted', 7, window.document);
    setCookie(
      '_commswithaplan_analytics_storage',
      analytics_storage_choice === true ? 'granted' : 'denied',
      7,
      window.document
    );
    setCookie(
      '_commswithaplan_functional_storage',
      functional_storage_choice === true ? 'granted' : 'denied',
      7,
      window.document
    );
    setCookie(
      '_commswithaplan_personalization_storage',
      personalization_storage_choice === true ? 'granted' : 'denied',
      7,
      window.document
    );
    setCookie(
      '_commswithaplan_security_storage',
      security_storage_choice === true ? 'granted' : 'denied',
      7,
      window.document
    );
    console.log(
      ad_storage_choice,
      analytics_storage_choice,
      functional_storage_choice,
      personalization_storage_choice,
      security_storage_choice
    );

    footerConsentVisible = false;
  }
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
        readonly: false,
        disabled: false
      }}
      bind:checked={ad_storage_choice}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Analyse' : 'Analysis',
        name: 'analytics_storage',
        id: 'analytics_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: false
      }}
      bind:checked={analytics_storage_choice}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Functioneel' : 'Functional',
        name: 'functional_storage',
        id: 'functional_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: functional_storage_choice
      }}
      bind:checked={functional_storage_choice}
    /><Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Persoonlijk' : 'Personal',
        name: 'personalization_storage',
        id: 'personalization_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: personalization_storage_choice
      }}
      bind:checked={personalization_storage_choice}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Veiligheid' : 'Security',
        name: 'security_storage',
        id: 'security_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: security_storage_choice
      }}
      bind:checked={security_storage_choice}
    />

    <Button
      btn={{
        type: 'submit',
        role: 'button',
        id: 'set__consent',
        className: 'consent__button',
        textColor: 'var(--ra-white)',
        backgroundColor: 'var(--ra-green)',
        padding: '0 1rem',
        height: 'var(--ra-3xl)',
        disabled: false
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
