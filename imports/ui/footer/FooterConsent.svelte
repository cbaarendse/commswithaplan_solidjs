<script lang="ts">
  //TODO: simplify?
  // imports
  import {slide} from 'svelte/transition';
  import Button from './../reusable/Button.svelte';
  import Checkbox from './../reusable/Checkbox.svelte';
  import {language, consentFooterVisible} from './../stores/utils';
  import {onMount} from 'svelte';
  import {setCookie, getCookie, checkCookie, checkedToConsent, consentToChecked} from '../../both/functions';

  // variables
  const functional_security_storage_checked: boolean = consentToChecked('granted');
  let ad_analytics_personal_storage_checked: boolean;

  // check for all 5 consent cookies
  let cookiesComplete: boolean =
    checkCookie('_commswithaplan_ad_storage', document) &&
    checkCookie('_commswithaplan_analytics_storage', document) &&
    checkCookie('_commswithaplan_functional_storage', document) &&
    checkCookie('_commswithaplan_personalization_storage', document) &&
    checkCookie('_commswithaplan_security_storage', document);

  console.log(`cookiesComplete = ${cookiesComplete}`);

  // if consent cookies are missing, show consent banner as an opportunity to update consent
  $consentFooterVisible = !cookiesComplete;

  // fill checkboxes with the status from the consent cookies
  if (cookiesComplete) {
    ad_analytics_personal_storage_checked =
      consentToChecked(getCookie('_commswithaplan_ad_storage', document)) &&
      consentToChecked(getCookie('_commswithaplan_analytics_storage', document)) &&
      consentToChecked(getCookie('_commswithaplan_personalization_storage', document));
  }

  // reactively update cookies when user checks consent
  onMount(() => {
    setCookie('_commswithaplan_functional_storage', checkedToConsent(functional_security_storage_checked), 7, document);
    setCookie('_commswithaplan_security_storage', checkedToConsent(functional_security_storage_checked), 7, document);
  });

  // functions
  function setConsent(value: 'denied' | 'granted') {
    setCookie('_commswithaplan_ad_storage', value, 7, document);
    setCookie('_commswithaplan_analytics_storage', value, 7, document);
    setCookie('_commswithaplan_personalization_storage', value, 7, document);
    ad_analytics_personal_storage_checked = consentToChecked(value);
    setTimeout(() => {
      $consentFooterVisible = false;
    }, 500);
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
      displayName="{$language == 'dutch' ? 'Advertenties / Analyse / Persoonlijk' : 'Ads / Analysis / Personal'},"
      cbx={{
        name: 'ad_analytics_personal_storage',
        id: 'ad_storage__checkbox',
        className: 'consent__checkbox',
        readOnly: false,
        disabled: false
      }}
      bind:checked={ad_analytics_personal_storage_checked}
    />

    <Checkbox
      displayName="{$language == 'dutch' ? 'Functioneel / Veiligheid' : 'Functional / Security'},"
      cbx={{
        name: 'functional_storage',
        id: 'functional_storage__checkbox',
        className: 'consent__checkbox',
        readOnly: false,
        disabled: functional_security_storage_checked
      }}
      checked={functional_security_storage_checked}
    />

    <Button
      btn={{
        type: 'submit',
        ariaRoleDescription: 'button',
        id: 'set__consent',
        className: 'consent__button',
        disabled: false,
        style: {color: 'var(--ra-white)', backgroundColor: 'var(--ra-red)', padding: '0 1rem', height: 'var(--ra-3xl)'}
      }}
      on:clickedButton={() => setConsent('denied')}
      >{#if $language == 'dutch'}Wijs af{:else}Reject{/if}</Button
    >
    <Button
      btn={{
        type: 'submit',
        ariaRoleDescription: 'button',
        id: 'set__consent',
        className: 'consent__button',
        color: 'var(--ra-white)',
        backgroundColor: 'var(--ra-green)',
        padding: '0 1rem',
        height: 'var(--ra-3xl)',
        disabled: false
      }}
      on:clickedButton={() => setConsent('granted')}
      >{#if $language == 'dutch'}Accepteer{:else}Accept{/if}</Button
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
