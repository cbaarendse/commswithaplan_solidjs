<script>
  // imports
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Header from './layout/Header.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReach from '../../reusable/LogoReach.svelte';
  import {Route, active} from 'tinro';
  import {language} from '../../stores/utils';
  import TermsAndConditions from '../legal/TermsAndConditions.svelte';
  import PrivacyPolicy from '../legal/PrivacyPolicy.svelte';
  import CookiePolicy from '../legal/CookiePolicy.svelte';
</script>

<Main>
  <Section>
    <div class="docs__grid">
      <Header>
        <Brand
          brand={{
            color: 'var(--ra-blue)',
            fontSize: 'var(--ra-fs-2xl)',
            title: `Tools - ${$language === 'dutch' ? 'Documentatie' : 'Documentation'}`
          }}
          ><LogoReach
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
          /></Brand
        >
      </Header>
      <div class="chapters__flex">
        <aside>
          <nav>
            <ul>
              <li>
                <a href={'/legal/termsandconditions'} use:active>
                  <span class="blue">{$language === 'dutch' ? 'Algemene Voorwaarden' : 'Terms and Conditions'}</span>
                </a>
              </li>
              <li>
                <a href={'/legal/privacypolicy'} use:active>
                  <span class="blue">{$language === 'dutch' ? 'Privacybeleid' : 'Privacy Policy'}</span>
                </a>
              </li>
              <li>
                <a href={'/legal/cookiepolicy'} use:active>
                  <span class="blue">{$language === 'dutch' ? 'Cookiebeleid' : 'Cookie Policy'}</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <div style="background:purple;">
          <Route path="/legal/cookiepolicy"><CookiePolicy /></Route>
          <Route path="/legal/privacypolicy"><PrivacyPolicy /></Route>
          <Route path="/legal/termsandconditions"><TermsAndConditions /></Route>
        </div>
      </div>
    </div>
  </Section>
</Main>
<div class="legal__flex" />

<style>
  .docs__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
  }
  .docs__grid :global(header) {
    grid-column: 1 / -1;
  }
  div.legal__flex {
    display: flex;
    font-size: var(--font-size-l);
  }
  aside {
    font-size: var(--font-size-l);
    padding: 1rem;
    flex: 1 0 25%;
  }

  ul li {
    margin-bottom: 2rem;
  }
</style>
