<script lang="ts">
  // imports
  import {onMount} from 'svelte';
  import {slide} from 'svelte/transition';
  import Button from '../reusable/Button.svelte';
  import Checkbox from '../reusable/Checkbox.svelte';
  import {language, consentFooterVisible} from '../stores/utils';
  import {Cookies} from '../types/classes';

  // functions
  const closeConsentSection = function () {
    setTimeout(() => ($consentFooterVisible = false), 700);
  };
  const setConsent = function (cookies: string[], consentChecked: boolean): void {
    let cookieValue = Cookies.checkedToConsent(consentChecked);
    cookies.forEach((cookie) => {
      Cookies.setCookie(cookie, cookieValue, 7, document);
    });
    closeConsentSection();
  };

  // variables
  let persistentCookies: Array<string> = ['_commswithaplan_functional_storage', '_commswithaplan_security_storage'];
  let dynamicCookies: string[] = [
    '_commswithaplan_ad_storage',
    '_commswithaplan_analytics_storage',
    '_commswithaplan_personalization_storage'
  ];
  // check for all 2 persistent consent cookies
  $: persistentCookiesComplete = persistentCookies.every((cookie) => {
    Cookies.checkCookie(cookie, document);
  });

  // check for all 3 dynamic consent cookies
  $: dynamicCookiesComplete = dynamicCookies.every((cookie) => {
    Cookies.checkCookie(cookie, document);
  });

  // set check for persistent cookies
  $: persistent_cookies_checked = persistentCookiesComplete
    ? persistentCookies.every((cookie) => {
        Cookies.consentToChecked(Cookies.getCookie(cookie, document));
      })
    : true;

  // set check for dynamic cookies, based on existing cookie settings. If one or more fail, set to false
  $: dynamic_cookies_checked = dynamicCookiesComplete
    ? dynamicCookies.every((cookie) => {
        Cookies.consentToChecked(Cookies.getCookie(cookie, document));
      })
    : false;

  // if dynamic consent cookies are missing, or dynamic cookies check is equal to false, show consent banner as an opportunity to update consent
  onMount(() => {
    // anyway renew persistent cookies for another 7 days
    setConsent(persistentCookies, true);
    $consentFooterVisible = dynamicCookiesComplete === false;
  });

  // update dynamic cookies on change by user
  $: setConsent(dynamicCookies, dynamic_cookies_checked);
</script>

{#if $consentFooterVisible}
  <section transition:slide={{delay: 200, duration: 1000}}>
    <span>
      {$language == 'dutch' ? 'Akkoord opslag cookies' : 'Agree storage of cookies'}&nbsp;(
      <nav>
        <a href="/legal/cookiepolicy">
          {#if $language == 'dutch'}cookiebeleid{:else}cookie policy{/if}
        </a>
      </nav>
      )
    </span>
    <Checkbox
      displayName={$language == 'dutch' ? 'Advertenties / Analyse / Persoonlijk' : 'Ads / Analysis / Personal'}
      cbx={{
        name: 'dynamic_cookies_consent',
        id: 'dynamic_cookies__checkbox',
        class: 'consent__checkbox',
        fontSize: '1em',
        readonly: false,
        disabled: false
      }}
      bind:checked={dynamic_cookies_checked}
    />

    <Checkbox
      displayName={$language == 'dutch' ? 'Functioneel / Veiligheid' : 'Functional / Security'}
      cbx={{
        name: 'persistent_cookies_consent',
        id: 'persistent_cookies__checkbox',
        class: 'consent__checkbox',
        fontSize: '1em',
        readonly: false,
        disabled: persistent_cookies_checked
      }}
      checked={persistent_cookies_checked}
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
        on:clickedButton={() => (dynamic_cookies_checked = false)}
        on:clickedButton={() => closeConsentSection()}
      >
        {#if $language == 'dutch'}Wijs af{:else}Reject{/if}
      </Button>
      <Button
        btn={{
          type: 'submit',
          ariaRoleDescription: 'button',
          id: 'set__consent',
          class: 'consent__button',
          disabled: false,
          color: 'var(--ra-white)',
          backgroundColor: 'var(--ra-green)',
          padding: '0.7em 1em'
        }}
        on:clickedButton={() => (dynamic_cookies_checked = true)}
        on:clickedButton={() => closeConsentSection()}
      >
        {#if $language == 'dutch'}Accepteer{:else}Accept{/if}
      </Button>
    </menu>
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
    background: var(--ra-red-off-white);
  }
  nav {
    display: inline-block;
  }
</style>
