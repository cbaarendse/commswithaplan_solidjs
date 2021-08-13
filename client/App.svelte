<script>
  // packages
  import {Route, router, active} from 'tinro';
  import {Person} from 'svelte-material-icons/';

  // components
  import Home from '../imports/ui/pages/home/Home.svelte';
  import CommsWithAPlan from '../imports/ui/pages/commswithaplan/CommsWithAPlan.svelte';
  import ReachApp from '../imports/ui/pages/reach/ReachApp.svelte';
  import NotFound from '../imports/ui/pages/notfound/NotFound.svelte';
  import Footer from '../imports/ui/components/Footer.svelte';
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
  <nav>
    <div>
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
    <i class="material-icons">person</i>
  </nav>
  <nav>
    <a href={'/'} on:mouseover={() => (hovered = true)} on:mouseleave={() => (hovered = false)} use:active>
      <LogoCommsWithAPlan size={'3.5rem'} colored={$router.url === '/' || hovered} />
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
  <!-- <Notifications /> -->
</header>

<main>
  <Route path="/"><Home {language} /></Route>
  <Route path="/commswithaplan"><CommsWithAPlan {language} /></Route>
  <Route path="/reachapp"><ReachApp {language} /></Route>
  <Route fallback><NotFound {language} /></Route>
</main>

<footer>
  <Footer {language} />
</footer>

<!-- TODO: reselect a-links -->
<style>
  nav {
    display: flex;
    margin: 0;
    padding: 0 1em;
    width: 100%;
    font-family: 'Trebuchet MS';
    font-size: 1.4rem;
    z-index: 999;
  }

  nav:nth-child(1) {
    justify-content: flex-end;
    align-items: center;
    background-color: var(--ra-grey-off-white);
    height: var(--ra-nav-top-height);
  }

  nav:nth-child(2) {
    justify-content: flex-start;
    background-color: var(--ra-teal-transparant);
    height: var(--ra-nav-main-height);
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
  nav:nth-child(1) > a:hover {
    color: var(--ra-grey-light);
  }

  /* :active */
  nav a.active {
    color: var(--ra-blue);
  }

  nav:nth-child(2) > a:hover span.blue,
  nav:nth-child(2) > a:hover span.brand,
  nav:nth-child(2) > a:active span.blue,
  nav:nth-child(2) > a.active span.brand {
    color: var(--ra-blue);
  }
  nav:nth-child(2) > a:hover span.green,
  nav:nth-child(2) > a.active span.green {
    color: var(--ra-green);
  }
  nav:nth-child(2) > a:hover span.red,
  nav:nth-child(2) > a.active span.red {
    color: var(--ra-red);
  }

  nav > span {
    padding: 0 1em;
  }
  div {
    align-self: center;
    display: flex;
    align-items: center;
  }

  div > a,
  div > a:visited {
    font-size: 0.8rem;
    color: var(--ra-grey-light);
  }

  div > a:hover {
    color: var(--ra-blue-bright);
  }

  div > a.active {
    background-color: transparent;
  }
  div > span {
    font-size: 0.8rem;
    color: var(--ra-grey-light);
  }

  main {
    all: unset;
    overflow: auto;
    display: grid;
    padding: 1em;
    border: 1px dashed var(--ra-blue);
  }

  footer {
    display: flex;
    justify-content: center;
    padding: 0.5em;
    background-color: var(--ra-white);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
