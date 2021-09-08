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
    <a
      href={'javascript:void(0)'}
      class:active={language === 'english'}
      on:click={() => (language = 'english')}
      tinro-ignore>EN</a
    >
    <span>|</span>
    <a
      href={'javascript:void(0)'}
      class:active={language === 'dutch'}
      on:click={() => (language = 'dutch')}
      tinro-ignore>NL</a
    >
    <Fa icon={faUser} size="0.7x" />
  </nav>

  <nav>
    <a href={'/'} on:mouseover={() => (hovered = true)} on:mouseleave={() => (hovered = false)} use:active>
      <LogoCommsWithAPlan
        size={'3.5rem'}
        colored={$router.url === '/commswithaplan/' || $router.url === '/commswithaplan' || hovered}
      />
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
    background-color: var(--ra-grey-off-white);
    border: none;
    width: fit-content;
  }

  input ~ label {
    transform: rotate(0deg);
    transition: transform 400ms ease-in-out 0ms;
  }

  input ~ label > div.expand {
    display: block;
  }

  input ~ label > div.collapse {
    display: none;
  }

  nav {
    padding: 0.8em 1em;
    font-family: 'Trebuchet MS';
  }

  nav:nth-of-type(1) {
    grid-column: 2/3;
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    grid-template-rows: auto;
    column-gap: 1em;
    justify-items: end;
    align-items: center;
    background-color: var(--ra-grey-off-white);
    /* transform: scale(1, 0); */
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
    font-size: 0.8rem;
  }

  nav:nth-of-type(2) {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: start;
    align-items: center;
    background-color: var(--ra-teal);
    /* transform: scale(1, 0); */
    transform-origin: top;
    transition: transform 150ms linear 150ms;
    font-size: 1.4rem;
  }

  nav:nth-of-type(3) {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: start;
    align-items: center;
    background-color: var(--ra-teal-light);
    /* transform: scale(1, 0); */
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
    font-size: 1.4rem;
  }

  header nav a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-decoration: none;
  }

  header nav:nth-of-type(2) > a:nth-of-type(1) {
    display: none;
  }

  /* :link, :visited */
  header nav > a:link,
  header nav > a:visited {
    color: var(--ra-white);
  }

  /* :hover */
  header nav:nth-of-type(1) > a:hover {
    color: var(--ra-grey-light);
  }

  /* .active */
  /* TODO: change order, so this also counts for nav:nth-type-of(1) */
  header nav a.active {
    color: var(--ra-blue);
  }

  header nav:nth-of-type(1) > a,
  header nav:nth-of-type(1) > a:visited {
    color: var(--ra-grey-light);
  }

  header nav:nth-of-type(1) > a:hover {
    color: var(--ra-blue-bright);
  }

  header nav:nth-of-type(1) > span {
    color: var(--ra-grey-light);
  }

  header nav:nth-of-type(2) > a:hover span.blue,
  header nav:nth-of-type(2) > a:hover span.brand,
  header nav:nth-of-type(2) > a.active span.blue,
  header nav:nth-of-type(2) > a.active span.brand {
    color: var(--ra-blue);
  }

  header nav:nth-of-type(2) > a:hover span.green,
  header nav:nth-of-type(2) > a.active span.green {
    color: var(--ra-green);
  }

  header nav:nth-of-type(2) > a:hover span.red,
  header nav:nth-of-type(2) > a.active span.red {
    color: var(--ra-red);
  }

  header nav:nth-of-type(3) > a:hover span.brand {
    color: var(--ra-blue);
  }

  main {
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

  @media screen and (min-width: 476px) {
    header {
      position: static;
    }
    input {
      all: unset;
      display: none;
      grid-column: 1/2;
    }
    label {
      display: none;
    }
    nav {
      display: grid;
    }
    nav:nth-of-type(1) {
      transform: none;
    }
    nav:nth-of-type(2) {
      grid-template-columns: auto auto 1fr;
      column-gap: 1em;
      transform: none;
    }
    nav:nth-of-type(3) {
      display: grid;
      grid-template-columns: 1fr auto auto 1fr;
      grid-template-rows: auto;
      align-items: center;
      column-gap: 1em;
      transform: none;
    }
    header nav:nth-of-type(2) a:nth-of-type(1) {
      display: flex;
    }
    header nav:nth-of-type(3) > a:nth-of-type(1) {
      grid-column: 2/3;
    }
    header nav:nth-of-type(3) > a:nth-of-type(2) {
      grid-column: 3/4;
    }
  }

  /* 
  input:checked ~ label {
    transform: rotate(-45deg);
    transition: transform 400ms ease-in-out 0ms;
  }
  input:checked ~ label > div.expand {
    display: none;
  }
  input:checked ~ label > div.collapse {
    display: block;
  }
  input:checked ~ nav:nth-of-type(1) {
    display: grid;
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }
  input:checked ~ nav:nth-of-type(2) {
    display: grid;
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms linear 150ms;
  }

  input:checked ~ nav:nth-of-type(3) {
    display: grid;
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  } */
</style>
