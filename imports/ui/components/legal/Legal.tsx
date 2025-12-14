// imports
import { Routes, Route, A, useLocation } from '@solidjs/router';
import BreadCrumbs from '../reusable/BreadCrumbs';
import TermsAndConditions from './termsandconditions/TermsAndConditions';
import PrivacyPolicy from './privacy/Privacy';
import CookiePolicy from './cookie/Cookie';
import { language } from '../../stores/utils';

function policy(path: string, lang: string): string {
  if (path.startsWith('/legal/termsandconditions')) {
    return lang === 'nl-NL' ? 'Algemene Voorwaarden' : 'Terms and Conditions';
  }
  if (path.startsWith('/legal/privacypolicy')) {
    return lang === 'nl-NL' ? 'Privacybeleid' : 'Privacy Policy';
  }
  if (path.startsWith('/legal/cookiepolicy')) {
    return lang === 'nl-NL' ? 'Cookiebeleid' : 'Cookie Policy';
  }
  return 'Policy';
}

export default function Legal() {
  const location = useLocation();

  return (
    <>
      <BreadCrumbs />
      <section>
        <div class="container">
          <nav>
            <ul>
              <li>
                <A
                  href="/legal/termsandconditions"
                  activeClass="active"
                >
                  <span>{policy('/legal/termsandconditions', language())}</span>
                </A>
              </li>
              <li>
                <A href="/legal/privacypolicy" activeClass="active">
                  <span>{policy('/legal/privacypolicy', language())}</span>
                </A>
              </li>
              <li>
                <A href="/legal/cookiepolicy" activeClass="active">
                  <span>{policy('/legal/cookiepolicy', language())}</span>
                </A>
              </li>
            </ul>
          </nav>

          <div class="policies">
            <Routes>
              <Route path="/termsandconditions" component={TermsAndConditions} />
              <Route path="/privacypolicy" component={PrivacyPolicy} />
              <Route path="/cookiepolicy" component={CookiePolicy} />
            </Routes>
          </div>
        </div>
        <style>{`
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
    max-width: 75ch;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.4em;
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
        `}</style>
      </section>
    </>
  );
}
