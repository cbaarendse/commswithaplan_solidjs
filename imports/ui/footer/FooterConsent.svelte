<script lang="ts">
  import {slide} from 'svelte/transition';
  import Button from './../reusable/Button.svelte';
  import Checkbox from './../reusable/Checkbox.svelte';
  import {language, consentFooterVisible} from '../stores/stores';
  import {onMount} from 'svelte';
  import {
    setCookie,
    getCookie,
    checkCookie,
    deleteCookie,
    checkedToConsent,
    consentToChecked
  } from '../../both/functions';
  //TODO: consent footer should be visible if cookies not complete. Cookies should not be set automatically at start
  // initiate variables
  // always granted in GDPR
  const functional_storage_checked: boolean = consentToChecked('granted');
  const security_storage_checked: boolean = consentToChecked('granted');
  // up to user preference
  let ad_storage_checked: boolean;
  let analytics_storage_checked: boolean;
  let personalization_storage_checked: boolean;

  // check for all 5 consent cookies
  let cookiesComplete: boolean =
    checkCookie('_commswithaplan_ad_storage', document) &&
    checkCookie('_commswithaplan_analytics_storage', document) &&
    checkCookie('_commswithaplan_functional_storage', document) &&
    checkCookie('_commswithaplan_personalization_storage', document) &&
    checkCookie('_commswithaplan_security_storage', document);

  console.log(`cookiesComplete =${cookiesComplete}`);

  // if consent cookies are missing, show consent banner as an opportunity to update consent
  $consentFooterVisible = !cookiesComplete;

  // fill checkboxes with the status from the consent cookies
  if (cookiesComplete) {
    ad_storage_checked = consentToChecked(getCookie('_commswithaplan_ad_storage', document));
    analytics_storage_checked = consentToChecked(getCookie('_commswithaplan_analytics_storage', document));
    personalization_storage_checked = consentToChecked(getCookie('_commswithaplan_personalization_storage', document));
  }

  // reactively update cookies when user checks consent
  $: setCookie('_commswithaplan_ad_storage', checkedToConsent(ad_storage_checked), 7, document);
  $: setCookie('_commswithaplan_analytics_storage', checkedToConsent(analytics_storage_checked), 7, document);
  $: setCookie(
    '_commswithaplan_personalization_storage',
    checkedToConsent(personalization_storage_checked),
    7,
    document
  );

  onMount(() => {
    setCookie('_commswithaplan_functional_storage', checkedToConsent(functional_storage_checked), 7, document);
    setCookie('_commswithaplan_security_storage', checkedToConsent(security_storage_checked), 7, document);
  });

  // setConsent sets or changes consent information stored in cookies
  // Google Tag Manager reacts to this event, so it needs to stay.
  function setConsent(event: CustomEvent) {
    $consentFooterVisible = false;
  }
</script>

{#if $consentFooterVisible}
  <footer transition:slide={{delay: 200, duration: 1000}}>
    <span
      >{$language == 'dutch' ? 'Akkoord opslag cookies' : 'Agree storage of cookies'}&nbsp;(
      <nav>
        <a href="/legal/cookiepolicy"
          >{#if $language == 'dutch'}cookiebeleid{:else}cookie policy{/if}</a
        >
      </nav>
      )</span
    >
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Advertenties' : 'Ads',
        name: 'ad_storage',
        id: 'ad_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: false
      }}
      bind:checked={ad_storage_checked}
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
      bind:checked={analytics_storage_checked}
    /><Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Persoonlijk' : 'Personal',
        name: 'personalization_storage',
        id: 'personalization_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: false
      }}
      bind:checked={personalization_storage_checked}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Functioneel' : 'Functional',
        name: 'functional_storage',
        id: 'functional_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: functional_storage_checked
      }}
      checked={functional_storage_checked}
    />
    <Checkbox
      cbx={{
        displayName: $language == 'dutch' ? 'Veiligheid' : 'Security',
        name: 'security_storage',
        id: 'security_storage__checkbox',
        className: 'consent__checkbox',
        readonly: false,
        disabled: security_storage_checked
      }}
      checked={security_storage_checked}
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
  nav {
    display: inline-block;
  }
</style>
