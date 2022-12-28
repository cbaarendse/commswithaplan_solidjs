<script lang="ts">
  // imports
  import {slide} from 'svelte/transition';
  import Button from '../reusable/Button.svelte';
  import Checkbox from '../reusable/Checkbox.svelte';
  import {language, consentFooterVisible} from '../stores/utils';
  import {Cookies} from '../types/classes';

  // check for all 5 consent cookies
  $: cookiesComplete =
    Cookies.checkCookie('_commswithaplan_ad_storage', document) &&
    Cookies.checkCookie('_commswithaplan_analytics_storage', document) &&
    Cookies.checkCookie('_commswithaplan_functional_storage', document) &&
    Cookies.checkCookie('_commswithaplan_personalization_storage', document) &&
    Cookies.checkCookie('_commswithaplan_security_storage', document);

  // if consent cookies are missing, show consent banner as an opportunity to update consent
  $consentFooterVisible = !cookiesComplete;

  // variables
  $: functional_security_storage_checked = cookiesComplete
    ? Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_functional_storage', document)) &&
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_security_storage', document))
    : true;

  $: ad_analytics_personal_storage_checked = cookiesComplete
    ? Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_ad_storage', document)) &&
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_analytics_storage', document)) &&
      Cookies.consentToChecked(Cookies.getCookie('_commswithaplan_personalization_storage', document))
    : Cookies.setCookie(
        '_commswithaplan_ad_storage',
        Cookies.checkedToConsent(ad_analytics_personal_storage_checked),
        7,
        document
      );
  Cookies.setCookie(
    '_commswithaplan_analytics_storage',
    Cookies.checkedToConsent(ad_analytics_personal_storage_checked),
    7,
    document
  );
  Cookies.setCookie(
    '_commswithaplan_personalization_storage',
    Cookies.checkedToConsent(ad_analytics_personal_storage_checked),
    7,
    document
  );

  // functions
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
        on:clickedButton={() => setConsent('denied')}
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
        on:clickedButton={() => setConsent('granted')}
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
