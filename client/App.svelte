<script>
  // packages
  import {Route, router, active} from 'tinro';
  //import Fa from 'svelte-fa';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser, faBars, faMinus, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

  // components
  import Home from '../imports/ui/pages/home/Home.svelte';
  import Consultancy from '../imports/ui/pages/commswithaplan/Consultancy.svelte';
  import ReachAppApp from '../imports/ui/pages/reachapp/ReachAppApp.svelte';
  import Download from '../imports/ui/pages/reachapp/Download.svelte';
  import Manual from '../imports/ui/pages/reachapp/Manual.svelte';
  import NotFound from '../imports/ui/pages/notfound/NotFound.svelte';
  import Contact from '../imports/ui/pages/contact/Contact.svelte';
  import Footer from '../imports/ui/components/footer/Footer.svelte';
  import LogoCommsWithAPlan from '../imports/ui/components/reusable/LogoCommsWithAPlan.svelte';

  // modules
  import UiProvider from '../imports/both/uiProvider';

  // constants
  import {translations} from '../client/constants';

  // variables
  $: language = 'english';
  let thisUi = new UiProvider(translations, language);
  let hovered = false;

  // components
</script>

<header>
  <input type="checkbox" id="nav-toggle" class="nav-toggle" />
  <label for="nav-toggle">
    <div class="expand"><Fa icon={faBars} size="1.6x" /></div>
    <div class="collapse"><Fa icon={faPlus} size="1.6x" /></div>
  </label>

  <nav>
    <div class="nav-1-wrapper">
      <a
        href={'javascript:void(0)'}
        class:active={language === 'english'}
        on:click={() => (language = 'english')}
        tinro-ignore>Engels</a
      >
      <span>|</span>
      <a
        href={'javascript:void(0)'}
        class:active={language === 'dutch'}
        on:click={() => (language = 'dutch')}
        tinro-ignore>Nederlands</a
      >
    </div>
    <Fa icon={faUser} size="0.6x" />
  </nav>

  <nav>
    <a href={'/'} on:mouseover={() => (hovered = true)} on:mouseleave={() => (hovered = false)} use:active>
      <LogoCommsWithAPlan size={'3.5rem'} colored={$router.url === '/commswithaplan/' || hovered} />
    </a>

    <a href={'/commswithaplan'} use:active>
      <span class="brand blue">Comms</span>&nbsp;<span class="brand green">With&nbsp;A</span>&nbsp;<span
        class="brand red">Plan</span
      >
    </a>
    <a href={'/reachapp'} use:active>
      <span class="brand">ReachApp</span>
    </a>
  </nav>
  {#if $router.path.startsWith('/reachapp')}
    <nav>
      <a href={'/reachapp'} use:active exact>
        <span class="brand">App</span>
      </a>
      <a href={'/reachapp/download'} use:active>
        <span class="brand">Download</span>
      </a>
      <a href={'/reachapp/manual'} use:active>
        <span class="brand">Manual</span>
      </a>
    </nav>
  {:else if $router.path.startsWith('/commswithaplan')}
    <nav>
      <a href={'/commswithaplan'} use:active exact>
        <span class="brand">Comms With A Plan</span>
      </a>
      <a href={'/commswithaplan/consultancy'} use:active exact>
        <span class="brand">Consultancy</span>
      </a>
    </nav>
  {/if}

  <!-- <Notifications /> -->
</header>

<main>
  <Route path="/" redirect="/commswithaplan/" />
  <Route path="/commswithaplan/*">
    <Route path="/"><Home {language} /></Route>
    <Route path="/consultancy"><Consultancy {language} /></Route>
  </Route>
  <Route path="/reachapp/*">
    <Route path="/"><ReachAppApp {language} /></Route>
    <Route path="/download"><Download {language} /></Route>
    <Route path="/manual"><Manual {language} /></Route>
  </Route>
  <Route path="/contact"><Contact {language} /></Route>
  <Route fallback><NotFound {language} /></Route>
</main>

<footer>
  <Footer {language} />
</footer>

<!-- TODO: reselect a-links -->
<style>
  header {
    position: absolute;
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    z-index: 999;
  }
  input {
    display: none;
    grid-column: 1/2;
  }
  label {
    grid-column: 1/2;
    padding: 1em;
    background-color: transparent;
    border: none;
    width: fit-content;
  }

  input ~ label {
    transform: rotate(0deg);
    transition: transform 400ms ease-in-out 0ms;
  }

  input ~ label > div.expand {
    display: inline-block;
  }

  input ~ label > div.collapse {
    display: none;
  }

  input:checked ~ label {
    transform: rotate(-45deg);
    transition: transform 400ms ease-in-out 0ms;
  }

  input:checked ~ label > div.expand {
    display: none;
  }

  input:checked ~ label > div.collapse {
    display: inline-block;
  }

  nav {
    display: none;
    margin: 0;
    width: 100%;
    font-family: 'Trebuchet MS';
    font-size: 1.4rem;
  }

  nav:nth-of-type(1) {
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  }

  nav:nth-of-type(2) {
    background-color: var(--ra-teal);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms linear 150ms;
  }

  nav:nth-of-type(3) {
    background-color: var(--ra-teal-light);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }
  input:checked ~ nav:nth-of-type(1) {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }
  input:checked ~ nav:nth-of-type(2) {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms linear 150ms;
  }
  input:checked ~ nav:nth-of-type(3) {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  }

  @media screen and (min-width: 476px) {
    input,
    label {
      display: none;
    }
    nav {
      display: grid;
      grid-column: auto;
    }
    nav:nth-of-type(1) {
      grid-column: 2/3;
      display: grid;
      grid-template-columns: 1fr auto auto;
      grid-template-rows: auto;
      justify-items: end;
      align-items: center;
      transform: none;
    }
    nav:nth-of-type(2) {
      grid-column: 1/3;
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto;
      justify-items: start;
      align-items: center;
      row-gap: 0.3em;
      transform: none;
    }
    nav:nth-of-type(3) {
      grid-column: 1/3;
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto;
      justify-items: start;
      align-items: center;
      row-gap: 0.3em;
      transform: none;
    }
    header {
      position: relative;
    }
  }

  nav a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 1em;
    text-decoration: none;
  }

  /* :link, :visited */
  nav > a:link,
  nav > a:visited {
    color: var(--ra-white);
  }

  /* :hover */
  nav:nth-of-type(1) > a:hover {
    color: var(--ra-grey-light);
  }

  /* :active */
  nav a.active {
    color: var(--ra-blue);
  }

  nav:nth-of-type(2) > a:hover span.blue,
  nav:nth-of-type(2) > a:hover span.brand,
  nav:nth-of-type(2) > a:active span.blue,
  nav:nth-of-type(2) > a.active span.brand {
    color: var(--ra-blue);
  }
  nav:nth-of-type(2) > a:hover span.green,
  nav:nth-of-type(2) > a.active span.green {
    color: var(--ra-green);
  }
  nav:nth-of-type(2) > a:hover span.red,
  nav:nth-of-type(2) > a.active span.red {
    color: var(--ra-red);
  }

  nav:nth-of-type(3) > a:hover span.brand {
    color: var(--ra-blue);
  }
  div.nav-1-wrapper {
    align-self: center;
    display: flex;
    align-items: center;
  }

  div.nav-1-wrapper > a,
  div.nav-1-wrapper > a:visited {
    font-size: 0.8rem;
    color: var(--ra-grey-light);
  }

  div.nav-1-wrapper > a:hover {
    color: var(--ra-blue-bright);
  }

  div.nav-1-wrapper > a.active {
    background-color: transparent;
  }
  div.nav-1-wrapper > span {
    font-size: 0.8rem;
    color: var(--ra-grey-light);
  }

  main {
    all: unset;
    overflow: auto;
    padding: 1em;
  }

  footer {
    display: flex;
    justify-content: center;
    padding: 0.5em;
    background-color: var(--ra-white);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
