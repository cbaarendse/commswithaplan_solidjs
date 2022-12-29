<script lang="ts">
  // imports
  import {slide} from 'svelte/transition';
  import Button from '../reusable/Button.svelte';
  import Checkbox from '../reusable/Checkbox.svelte';
  import {language, consentFooterVisible} from '../stores/utils';
  import {Cookies} from '../types/classes';

  // functions
  const removeConsentSection = function () {
    setTimeout(() => ($consentFooterVisible = false), 700);
  };
  const setPersistentConsent = function (consentChecked: boolean): void {
    let cookieValue = Cookies.checkedToConsent(consentChecked);
    ['_commswithaplan_functional_storage', '_commswithaplan_security_storage'].forEach((item) => {
      Cookies.setCookie(item, cookieValue, 7, document);
    });
  };
  const setDynamicConsent = function (consentChecked: boolean): void {
    let cookieValue = Cookies.checkedToConsent(consentChecked);
    [
      '_commswithaplan_ad_storage',
      '_commswithaplan_analytics_storage',
      '_commswithaplan_personalization_storage'
    ].forEach((item) => {
      Cookies.setCookie(item, cookieValue, 7, document);
    });
    removeConsentSection();
  };

  // variables
  // check for all 5 consent cookies
  $: cookiesComplete =
    Cookies.checkCookie('_commswithaplan_ad_storage', document) &&
    Cookies.checkCookie('_commswithaplan_analytics_storage', document) &&
    Cookies.checkCookie('_commswithaplan_functional_storage', document) &&
    Cookies.checkCookie('_commswithaplan_personalization_storage', document) &&
    Cookies.checkCookie('_commswithaplan_security_storage', document);

  // set check for persistent cookies
  let functional_security_storage_checked: boolean = true;

  $: {
    console.log('cookiesComplete =', cookiesComplete);
    console.log('functional_security_storage_checked =', functional_security_storage_checked);
    console.log('ad_analytics_personal_storage_checked =', ad_analytics_personal_storage_checked);
  }

  // set check for dynamic cookies, based on existing cookie settings. If one or more fail, set to false
  $: ad_analytics_personal_storage_checked = cookiesComplete
    ? Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_ad_storage', document)) &&
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_analytics_storage', document)) &&
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_personalization_storage', document))
    : false;

  // if dynamic consent cookies are missing, or dynamic cookies check is equal to false, show consent banner as an opportunity to update consent
  $consentFooterVisible = !cookiesComplete || ad_analytics_personal_storage_checked === false;
  // anyway renew persistent cookies for another 7 days
  setPersistentConsent(true);
  // update dynamic cookies on change by user
  $: setDynamicConsent(ad_analytics_personal_storage_checked);
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
      displayName={$language == 'dutch' ? 'Functioneel / Veiligheid' : 'Functional / Security'}
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
        on:clickedButton={() => (ad_analytics_personal_storage_checked = false)}
        on:clickedButton={() => removeConsentSection()}
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
        on:clickedButton={() => (ad_analytics_personal_storage_checked = true)}
        on:clickedButton={() => removeConsentSection()}
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
