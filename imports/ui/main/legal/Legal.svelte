<script lang="ts">
  // imports
  import Main from '../../layout/Main.svelte';
  import Section from '../../layout/Section.svelte';
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

<Main>
  <BreadCrumbs breadCrumbs={['legal']} />
  <Section>
    <div class="legal__grid">
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
    </div>
  </Section>
</Main>

<style>
  .legal__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
  }
  .legal__grid :global(header) {
    grid-column: 1 / -1;
  }
  div.policies__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-around;
    font-size: var(--font-size-l);
  }
  aside {
    font-size: var(--font-size-l);
    padding: 0;
    flex: 1 1 190px;
    border: 1px solid orangered;
  }
  .policy__container {
    flex: 1 1 570px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: 1px solid orange;
  }

  ul {
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
    width: 100%;
    flex-wrap: wrap;
    list-style-type: none;
    border: 1px dashed grey;
  }
  li {
    flex: 1 0 190px;
  }
  .active {
    color: var(--ra-red);
    text-decoration-color: var(--ra-red);
  }

  a {
    color: var(--ra-blue);
    text-decoration-color: var(--ra-blue);
  }
  a:hover {
    color: var(--ra-green);
    text-decoration-color: var(--ra-green);
  }
</style>
