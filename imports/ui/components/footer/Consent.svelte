<script lang="ts">
  // imports
  import {onMount} from 'svelte';
  import {slide} from 'svelte/transition';
  import Checkbox from '../reusable/Checkbox.svelte';
  import {language, consentFooterVisible} from '../../stores/utils';
  import createCookieManager from '../../functions/cookies';

  // variables
  let disabled = false;
  let persistentCookies: Array<string> = ['_commswithaplan_functional_storage', '_commswithaplan_security_storage'];
  let dynamicCookies: string[] = [
    '_commswithaplan_ad_storage',
    '_commswithaplan_analytics_storage',
    '_commswithaplan_personalization_storage'
  ];
  const cookieManager = createCookieManager();
  // check for all 2 persistent consent cookies
  $: persistentCookiesComplete = persistentCookies.every((cookie) => {
    cookieManager.checkCookie(cookie, document);
  });

  // check for all 3 dynamic consent cookies
  $: dynamicCookiesComplete = dynamicCookies.every((cookie) => {
    cookieManager.checkCookie(cookie, document);
  });

  // set check for persistent cookies
  $: persistent_cookies_checked = persistentCookiesComplete
    ? persistentCookies.every((cookie) => {
        cookieManager.consentToChecked(cookieManager.getCookie(cookie, document));
      })
    : true;

  // set check for dynamic cookies, based on existing cookie settings. If one or more fail, set to false
  $: dynamic_cookies_checked = dynamicCookiesComplete
    ? dynamicCookies.every((cookie) => {
        cookieManager.consentToChecked(cookieManager.getCookie(cookie, document));
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
  // functions
  function closeConsentSection() {
    setTimeout(() => ($consentFooterVisible = false), 700);
  }
  function setConsent(cookies: string[], consentChecked: boolean): void {
    let cookieValue = cookieManager.checkedToConsent(consentChecked);
    cookies.forEach((cookie) => {
      cookieManager.setCookie(cookie, cookieValue, 7, document);
    });
    closeConsentSection();
  }
</script>

{#if $consentFooterVisible}
  <section transition:slide={{delay: 200, duration: 1000}}>
    <span>
      {$language == 'nl_NL' ? 'Akkoord opslag cookies' : 'Agree storage of cookies'}&nbsp;(
      <nav>
        <a href="/legal/cookiepolicy">
          {#if $language == 'nl_NL'}cookiebeleid{:else}cookie policy{/if}
        </a>
      </nav>
      )
    </span>
    <Checkbox
      displayName={$language == 'nl_NL' ? 'Advertenties / Analyse / Persoonlijk' : 'Ads / Analysis / Personal'}
      cbx={{
        class: 'consent__checkbox',
        id: 'dynamic_cookies__checkbox',
        name: 'dynamic_cookies_consent',
        fontSize: '1em',
        readonly: false,
        disabled: false
      }}
      bind:checked={dynamic_cookies_checked}
    />

    <Checkbox
      displayName={$language == 'nl_NL' ? 'Functioneel / Veiligheid' : 'Functional / Security'}
      cbx={{
        class: 'consent__checkbox',
        id: 'persistent_cookies__checkbox',
        name: 'persistent_cookies_consent',
        fontSize: '1em',
        readonly: false,
        disabled: persistent_cookies_checked
      }}
      checked={persistent_cookies_checked}
    />
    <menu>
      <button
        class="deny"
        type="submit"
        aria-roledescription="button"
        {disabled}
        on:click|stopPropagation|preventDefault={() => (dynamic_cookies_checked = false)}
        on:click|stopPropagation|preventDefault={() => closeConsentSection()}
      >
        {#if $language == 'nl_NL'}Wijs af{:else}Reject{/if}
      </button>
      <button
        class="grant"
        type="submit"
        aria-roledescription="button"
        {disabled}
        on:click|stopPropagation|preventDefault={() => (dynamic_cookies_checked = true)}
        on:click|stopPropagation|preventDefault={() => closeConsentSection()}
      >
        {#if $language == 'nl_NL'}Accepteer{:else}Accept{/if}
      </button>
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
  button {
    margin: 0 0.4em;
    padding: 0.7em 1em;
    cursor: pointer;
    color: var(--ra-white);
    border-radius: 5%;
    border: none;
  }
  button:hover {
    opacity: 0.7;
  }
  button.deny {
    background-color: var(--ra-red);
  }
  button.grant {
    background-color: var(--ra-green);
  }
</style>
