<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import TermsAndConditions from '../legal/TermsAndConditions.svelte';
  import PrivacyPolicy from '../legal/PrivacyPolicy.svelte';
  import CookiePolicy from '../legal/CookiePolicy.svelte';
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

<BreadCrumbs breadCrumbs={['legal']} />
<section>
  <div class="policies__flex">
    <aside>
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
    </aside>
    <div class="policy__container">
      <Route path="/termsandconditions"><TermsAndConditions /></Route>
      <Route path="/privacypolicy"><PrivacyPolicy /></Route>
      <Route path="/cookiepolicy"><CookiePolicy /></Route>
    </div>
  </div>
</section>

<style>
  div.policies__flex {
    display: flex;
    flex-flow: row wrap;
    gap: 2em;
    justify-content: space-between;
  }
  aside {
    flex: 1 1;
    padding: 1em 0em;
  }

  div.policy__container {
    flex: 1 1 40em;
  }

  ul {
    display: flex;
    gap: 2em;
    margin: 0;
    padding: 0;
    width: 100%;
    flex-wrap: wrap;
  }
  li {
    flex: 1 0 30ch;
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
</style>
