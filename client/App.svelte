<script>
  // packages
  import {Route, router, active} from 'tinro';
  //import Fa from 'svelte-fa';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser} from '@fortawesome/free-solid-svg-icons';

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
    <div class="bars-background" />
    <span class="bar-1" />
    <span class="bar-2" />
    <span class="bar-3" />
  </label>

  <nav class="nav-1">
    <a
      href={'javascript:void(0)'}
      class:active={language === 'dutch'}
      on:click={() => (language = 'dutch')}
      tinro-ignore><span>NL</span></a
    >
    <span class="divider">|</span>
    <a
      href={'javascript:void(0)'}
      class:active={language === 'english'}
      on:click={() => (language = 'english')}
      tinro-ignore><span>EN</span></a
    >

    <div class="user"><Fa icon={faUser} size="0.8x" /></div>
  </nav>

  <nav class="nav-2">
    <a
      href={'/'}
      class="logo-link"
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      use:active
    >
      <LogoCommsWithAPlan
        size={'3.5rem'}
        colored={$router.url === '/commswithaplan/' || $router.url === '/commswithaplan' || hovered}
      />
    </a>
    <a href={'/commswithaplan'} use:active>
      <span class="blue">Comms</span>&nbsp;<span class="green">With&nbsp;A</span>&nbsp;<span class="red">Plan</span>
    </a>
    <a href={'/reachapp'} use:active>
      <span>ReachApp</span>
    </a>
  </nav>
  {#if $router.path.startsWith('/reachapp')}
    <nav class="nav-3">
      <a href={'/reachapp'} use:active exact>
        <span>App</span>
      </a>
      <a href={'/reachapp/download'} use:active>
        <span>Download</span>
      </a>
      <a href={'/reachapp/manual'} use:active>
        <span>Manual</span>
      </a>
    </nav>
  {:else if $router.path.startsWith('/commswithaplan')}
    <nav class="nav-3">
      <a href={'/commswithaplan'} use:active exact>
        <span>Comms With A Plan</span>
      </a>
      <a href={'/commswithaplan/consultancy'} use:active exact>
        <span>Consultancy</span>
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

<Footer />

<!-- TODO: reselect a-links -->
<style>
  header {
    position: absolute;
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    z-index: 999;
  }
  .nav-toggle {
    display: none;
    grid-column: 1/2;
  }
  .nav-toggle ~ label {
    grid-column: 1/2;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 3em;
  }
  .nav-toggle ~ label .bars-background {
    width: 100%;
    height: 100%;
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  }
  .nav-toggle ~ label .bar-1,
  .nav-toggle ~ label .bar-2,
  .nav-toggle ~ label .bar-3 {
    display: block;
    position: absolute;
    height: 10%;
    width: 70%;
    border-radius: 3px;
  }

  .nav-toggle ~ label .bar-1 {
    background-color: var(--ra-blue);
    top: 21%;
    transform: rotate(0deg);
    transition: all 450ms ease-in-out 0ms;
  }

  .nav-toggle ~ label .bar-2 {
    background-color: var(--ra-green);
    top: 45%;
    transform: scale(1, 1);
    transform-origin: right 15%;
    transition: transform 350ms ease-in-out 300ms;
  }

  .nav-toggle ~ label .bar-3 {
    background-color: var(--ra-red);
    bottom: 21%;
    transform: rotate(0deg);
    transition: all 450ms ease-in-out 0ms;
  }

  nav {
    padding: 0.8em 1em;
    font-family: 'Trebuchet MS';
  }

  .nav-1 {
    grid-column: 2/3;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
    font-size: 0.8rem;
  }

  .nav-2 {
    grid-column: 1/3;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--ra-teal);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms linear 150ms;
    font-size: 1.4rem;
  }

  .nav-3 {
    grid-column: 1/3;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    background-color: var(--ra-teal-light);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
    font-size: 1.4rem;
  }

  nav a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }

  .logo-link {
    display: none;
  }

  .nav-1 .divider {
    margin: 0 0.7em;
  }
  .nav-1 .user {
    margin-left: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-2 a {
    margin: 0.1em 0.7em;
  }
  .nav-3 a {
    margin: 0.1em 0.7em;
  }

  /* :link, :visited */
  .nav-1 a,
  .nav-1 a:visited,
  .nav-1 span.divider {
    color: var(--ra-grey-light);
  }

  .nav-2 a,
  .nav-3 a,
  .nav-2 a:visited,
  .nav-3 a:visited {
    color: var(--ra-white);
  }

  /* :hover */
  .nav-1 a:hover {
    color: var(--ra-blue-bright);
  }
  .nav-2 a:hover,
  .nav-3 a:hover {
    color: var(--ra-blue);
  }
  .nav-2 a:hover span.blue {
    color: var(--ra-blue);
  }

  .nav-2 a:hover span.green {
    color: var(--ra-green);
  }

  .nav-2 a:hover span.red {
    color: var(--ra-red);
  }
  /* .active */
  .nav-1 a.active span,
  .nav-2 a.active span,
  .nav-3 a.active span {
    color: var(--ra-blue);
  }

  .nav-2 a.active span.green {
    color: var(--ra-green);
  }

  .nav-2 a.active span.red {
    color: var(--ra-red);
  }

  /* ===========================
     only for mobile: 
     when label is checked, 
     menu will appear with 
     transition 
     =========================== */

  .nav-toggle:checked ~ label .bars-background {
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }

  .nav-toggle:checked ~ label .bar-1 {
    top: 45%;
    transform: rotate(45deg);
    transition: all 450ms ease-in-out 300ms;
  }

  .nav-toggle:checked ~ label .bar-2 {
    transform: scale(0, 1);
    transform-origin: right 15%;
    transition: transform 350ms ease-in-out 0ms;
  }

  .nav-toggle:checked ~ label .bar-3 {
    bottom: 45%;
    transform: rotate(135deg);
    transition: all 450ms ease-in-out 300ms;
  }

  input:checked ~ .nav-1 {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }
  input:checked ~ .nav-2 {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms linear 150ms;
  }

  input:checked ~ .nav-3 {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  }

  /* for tablet, laptop and desktop screens */

  @media screen and (min-width: 760px) {
    header {
      position: static;
    }
    .nav-toggle {
      all: unset;
      display: none;
      grid-column: 1/2;
    }
    .nav-toggle ~ label .bars-background {
      transform: none;
    }

    .nav-toggle ~ label .bar-1,
    .nav-toggle ~ label .bar-2,
    .nav-toggle ~ label .bar-3 {
      display: none;
    }

    nav {
      display: flex;
    }
    .nav-1 {
      transform: none;
    }
    .nav-2 {
      transform: none;
    }
    .nav-3 {
      justify-content: center;
      align-items: center;
      transform: none;
    }

    .logo-link {
      display: flex;
    }
  }

  main {
    overflow: auto;
  }
</style>
