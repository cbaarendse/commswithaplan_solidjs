<script lang="ts">
  // imports
  import BreadCrumbs from '../reusable/BreadCrumbs.svelte';
  import TermsAndConditions from './termsandconditions/TermsAndConditions.svelte';
  import PrivacyPolicy from './privacy/Privacy.svelte';
  import CookiePolicy from './cookie/Cookie.svelte';
  import {Route, active, router} from 'tinro';
  import {language} from '../../stores/utils';

  function policy(path: string, lang: string): string {
    if (path.startsWith('/legal/termsandconditions')) {
      return lang === 'dutch' ? 'Algemene Voorwaarden' : 'Terms and Conditions';
    }
    if (path.startsWith('/legal/privacypolicy')) {
      return lang === 'dutch' ? 'Privacybeleid' : 'Privacy Policy';
    }
    if (path.startsWith('/legal/cookiepolicy')) {
      return lang === 'dutch' ? 'Cookiebeleid' : 'Cookie Policy';
    }
    return 'Policy';
  }
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <nav>
      <ul>
        <li>
          <a href={'/legal/termsandconditions'} class:active={$router.path === '/legal/termsandconditions'}>
            <span>{policy('/legal/termsandconditions', $language)}</span>
          </a>
        </li>
        <li>
          <a href={'/legal/privacypolicy'} use:active>
            <span>{policy('/legal/privacypolicy', $language)}</span>
          </a>
        </li>
        <li>
          <a href={'/legal/cookiepolicy'} use:active>
            <span>{policy('/legal/cookiepolicy', $language)}</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="policies">
      <Route path="/termsandconditions"><TermsAndConditions /></Route>
      <Route path="/privacypolicy"><PrivacyPolicy /></Route>
      <Route path="/cookiepolicy"><CookiePolicy /></Route>
    </div>
  </div>
</section>

<style>
  div.container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.4em;
    justify-content: space-between;
  }
  nav {
    all: unset;
    flex-basis: 30%;
    flex-grow: 1;
    flex-shrink: 0;
    /* width: 100%; */
    max-width: 75ch;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.4em;
    /* width: 100%; */
  }

  li {
    flex-basis: 100%;
  }
  div.policies {
    display: flex;
    flex-wrap: wrap;
    gap: 1.4em;
    max-width: 75ch;
  }

  .active {
    color: var(--ra-red);
    text-decoration-color: var(--ra-red);
  }

  a {
    text-decoration-color: var(--ra-blue);
  }
  a:hover {
    color: var(--ra-green);
    text-decoration-color: var(--ra-green);
  }

  @media screen and (min-width: 768px) {
    ul {
      flex-wrap: nowrap;
    }
  }

  @media screen and (min-width: 1024px) {
    div.container {
      flex-wrap: nowrap;
    }
    ul {
      flex-wrap: wrap;
      position: fixed;
    }
  }
</style>
