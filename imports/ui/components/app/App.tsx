// imports
import Top from '../header/Top';
import Navigation from '../header/Navigation';
import Routing from '../routing/Routing';
import Colofon from '../footer/Colofon';
import Consent from '../footer/Consent';
import { consentFooterVisible } from '../../stores/utils';

// Routing: Main content, based on chosen routes
export default function App() {
  // functions
  function toggleFooterConsentVisibility() {
    consentFooterVisible.set(!consentFooterVisible());
  }

  return (
    <>
      <header>
        <Top />
        <Navigation />
      </header>
      <main>
        <Routing />
      </main>
      <footer>
        <Colofon onClick={toggleFooterConsentVisibility} />
        <Consent />
      </footer>
    </>
  );
}
