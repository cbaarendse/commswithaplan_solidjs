<script lang="ts">
  //TODO: simplify?
  // imports
  import {slide} from 'svelte/transition';
  import Button from '../reusable/Button.svelte';
  import Checkbox from '../reusable/Checkbox.svelte';
  import {language, consentFooterVisible} from '../stores/utils';
  import {onMount} from 'svelte';
  import {Cookies} from '../types/classes';

  // variables
  const functional_security_storage_checked: boolean = Cookies.consentToChecked('granted');
  let ad_analytics_personal_storage_checked: boolean;

  // check for all 5 consent cookies
  let cookiesComplete: boolean =
    Cookies.checkCookie('_commswithaplan_ad_storage', document) &&
    Cookies.checkCookie('_commswithaplan_analytics_storage', document) &&
    Cookies.checkCookie('_commswithaplan_functional_storage', document) &&
    Cookies.checkCookie('_commswithaplan_personalization_storage', document) &&
    Cookies.checkCookie('_commswithaplan_security_storage', document);

  console.log(`cookiesComplete = ${cookiesComplete}`);

  // if consent cookies are missing, show consent banner as an opportunity to update consent
  $consentFooterVisible = !cookiesComplete;

  // fill checkboxes with the status from the consent cookies
  if (cookiesComplete) {
    ad_analytics_personal_storage_checked =
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_ad_storage', document)) &&
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_analytics_storage', document)) &&
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_personalization_storage', document));
  }

  // reactively update cookies when user checks consent
  onMount(() => {
    Cookies.setCookie(
      '_commswithaplan_functional_storage',
      Cookies.checkedToConsent(functional_security_storage_checked),
      7,
      document
    );
    Cookies.setCookie(
      '_commswithaplan_security_storage',
      Cookies.checkedToConsent(functional_security_storage_checked),
      7,
      document
    );
  });

  // functions
  function setConsent(value: 'denied' | 'granted') {
    Cookies.setCookie('_commswithaplan_ad_storage', value, 7, document);
    Cookies.setCookie('_commswithaplan_analytics_storage', value, 7, document);
    Cookies.setCookie('_commswithaplan_personalization_storage', value, 7, document);
    ad_analytics_personal_storage_checked = Cookies.consentToChecked(value);
    setTimeout(() => {
      $consentFooterVisible = false;
    }, 500);
  }
</script>

{#if $consentFooterVisible}
  <section transition:slide={{delay: 200, duration: 1000}}>
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
        class: 'consent__checkbox',
        fontSize: '1em',
        readonly: false,
        disabled: false
      }}
      bind:checked={ad_analytics_personal_storage_checked}
    />

    <Checkbox
      displayName="{$language == 'dutch' ? 'Functioneel / Veiligheid' : 'Functional / Security'},"
      cbx={{
        name: 'functional_storage',
        id: 'functional_storage__checkbox',
        class: 'consent__checkbox',
        fontSize: '1em',
        readonly: false,
        disabled: functional_security_storage_checked
      }}
      checked={functional_security_storage_checked}
    />
    <menu>
      <Button
        btn={{
          type: 'submit',
          ariaRoleDescription: 'button',
          id: 'set__consent',
          class: 'consent__button',
          disabled: false,
          color: 'var(--ra-white)',
          backgroundColor: 'var(--ra-red)',
          padding: '0.7em 1em'
        }}
        on:clickedButton={() => setConsent('denied')}
        >{#if $language == 'dutch'}Wijs af{:else}Reject{/if}</Button
      >
      <Button
        btn={{
          type: 'submit',
          ariaRoleDescription: 'button',
          id: 'set__consent',
          class: 'consent__button',
          disabled: false,
          color: 'var(--ra-white)',
          backgroundColor: 'var(--ra-green)',
          padding: '0.7em 1em',
          height: '4rem'
        }}
        on:clickedButton={() => setConsent('granted')}
        >{#if $language == 'dutch'}Accepteer{:else}Accept{/if}</Button
      ></menu
    >
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }
  nav {
    display: inline-block;
  }
</style>
