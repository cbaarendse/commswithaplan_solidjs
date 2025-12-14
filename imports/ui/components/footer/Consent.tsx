// imports
import { createSignal, createEffect, onMount, Show } from 'solid-js';
import Checkbox from '../reusable/Checkbox';
import { language, consentFooterVisible } from '../../stores/utils';
import createCookieManager from '../../functions/cookies';

export default function Consent() {
  const [disabled] = createSignal(false);
  const [persistentCookiesChecked, setPersistentCookiesChecked] = createSignal(true);
  const [dynamicCookiesChecked, setDynamicCookiesChecked] = createSignal(false);

  const persistentCookies: Array<string> = [
    '_commswithaplan_functional_storage',
    '_commswithaplan_security_storage'
  ];
  const dynamicCookies: string[] = [
    '_commswithaplan_ad_storage',
    '_commswithaplan_analytics_storage',
    '_commswithaplan_personalization_storage'
  ];
  const cookieManager = createCookieManager();

  // Check for all 2 persistent consent cookies
  const persistentCookiesComplete = () => {
    return persistentCookies.every((cookie) => cookieManager.checkCookie(cookie, document));
  };

  // Check for all 3 dynamic consent cookies
  const dynamicCookiesComplete = () => {
    return dynamicCookies.every((cookie) => cookieManager.checkCookie(cookie, document));
  };

  onMount(() => {
    // Set check for persistent cookies
    if (persistentCookiesComplete()) {
      const allChecked = persistentCookies.every((cookie) => {
        return cookieManager.consentToChecked(cookieManager.getCookie(cookie, document));
      });
      setPersistentCookiesChecked(allChecked);
    } else {
      setPersistentCookiesChecked(true);
    }

    // Set check for dynamic cookies
    if (dynamicCookiesComplete()) {
      const allChecked = dynamicCookies.every((cookie) => {
        return cookieManager.consentToChecked(cookieManager.getCookie(cookie, document));
      });
      setDynamicCookiesChecked(allChecked);
    } else {
      setDynamicCookiesChecked(false);
    }

    // Anyway renew persistent cookies for another 7 days
    setConsent(persistentCookies, true);
    
    // If dynamic consent cookies are missing, show consent banner
    consentFooterVisible.set(!dynamicCookiesComplete());
  });

  // Update dynamic cookies on change by user
  createEffect(() => {
    setConsent(dynamicCookies, dynamicCookiesChecked());
  });

  function closeConsentSection() {
    setTimeout(() => consentFooterVisible.set(false), 700);
  }

  function setConsent(cookies: string[], consentChecked: boolean): void {
    const cookieValue = cookieManager.checkedToConsent(consentChecked);
    cookies.forEach((cookie) => {
      cookieManager.setCookie(cookie, cookieValue, 7, document);
    });
    closeConsentSection();
  }

  return (
    <Show when={consentFooterVisible()}>
      <section style="transition: all 1s ease-in-out;">
        <span>
          {language() === 'nl-NL' ? 'Akkoord opslag cookies' : 'Agree storage of cookies'}&nbsp;(
          <nav>
            <a href="/legal/cookiepolicy">
              {language() === 'nl-NL' ? 'cookiebeleid' : 'cookie policy'}
            </a>
          </nav>
          )
        </span>
        <Checkbox
          displayName={
            language() === 'nl-NL' ? 'Advertenties / Analyse / Persoonlijk' : 'Ads / Analysis / Personal'
          }
          cbx={{
            class: 'consent__checkbox',
            id: 'dynamic_cookies__checkbox',
            name: 'dynamic_cookies_consent',
            readonly: false,
            disabled: false
          }}
          checked={dynamicCookiesChecked()}
          onCheckedChange={setDynamicCookiesChecked}
        />

        <Checkbox
          displayName={language() === 'nl-NL' ? 'Functioneel / Veiligheid' : 'Functional / Security'}
          cbx={{
            class: 'consent__checkbox',
            id: 'persistent_cookies__checkbox',
            name: 'persistent_cookies_consent',
            readonly: false,
            disabled: persistentCookiesChecked()
          }}
          checked={persistentCookiesChecked()}
          onCheckedChange={setPersistentCookiesChecked}
        />
        <menu>
          <button
            class="deny"
            type="submit"
            aria-roledescription="button"
            disabled={disabled()}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDynamicCookiesChecked(false);
              closeConsentSection();
            }}
          >
            {language() === 'nl-NL' ? 'Wijs af' : 'Reject'}
          </button>
          <button
            class="grant"
            type="submit"
            aria-roledescription="button"
            disabled={disabled()}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDynamicCookiesChecked(true);
              closeConsentSection();
            }}
          >
            {language() === 'nl-NL' ? 'Accepteer' : 'Accept'}
          </button>
        </menu>
        <style>{`
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
        `}</style>
      </section>
    </Show>
  );
}
