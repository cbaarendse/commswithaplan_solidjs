<script>
  // packages
  import {onMount} from 'svelte';
  import {Route, active, router} from 'tinro';

  // components
  import Home from '../pages/home/Home.svelte';
  import CommsWithAPlan from '../pages/commswithaplan/CommsWithAPlan.svelte';
  import Reach from '../pages/reach/Reach.svelte';
  import ReachApp from '../pages/reach/ReachApp.svelte';
  import Download from '../pages/reach/Download.svelte';
  import Manual from '../pages/reach/Manual.svelte';
  import NotFound from '../pages/notfound/NotFound.svelte';
  import Footer from '../components/Footer.svelte';
  import LogoCommsWithAPlan from '../components/reusable/LogoCommsWithAPlan.svelte';
  import LogoReachApp from '../components/reusable/LogoReachApp.svelte';

  // modules
  import UiProvider from '../../both/uiProvider';

  // constants
  import {translations} from '../../../client/constants';
  import {home} from 'svelte-awesome/icons';

  // variables
  $: language = 'english';
  let thisUi = new UiProvider(translations, language);

  onMount(async () => {
    console.log('Layout is mounted');
  });
</script>

<header>
  <nav>
    <a href={'/home'} use:active>
      <LogoCommsWithAPlan size={'3.5rem'} colored={$router.url === '/home'} />
    </a>

    <a href={'/commswithaplan'} use:active>
      <span class="brand blue">Comms</span>&nbsp;<span class="brand green">With&nbsp;A</span>&nbsp;<span
        class="brand red">Plan</span
      >
    </a>
    <a href={'/reach'} use:active>
      <LogoReachApp size={'2rem'} colored={$router.url === '/reach'} />
    </a>
    <a href={'/reachapp'} use:active>
      <span class="brand">ReachApp</span>
    </a>
    <div>
      <a href={'#'} class:active={language === 'english'} on:click={() => (language = 'english')} tinro-ignore>Engels</a
      >
      <span>|</span>
      <a href={'#'} class:active={language === 'dutch'} on:click={() => (language = 'dutch')} tinro-ignore>Nederlands</a
      >
    </div>
  </nav>
  <nav>
    <span>Sub-Nav</span>
  </nav>
</header>

<main>
  <!-- <Notifications /> -->
  <Route path="/home"><Home {language} /></Route>
  <Route path="/commswithaplan"><CommsWithAPlan {language} /></Route>
  <Route path="/reach"><Reach {language} /></Route>
  <Route path="/reachapp"><ReachApp {language} /></Route>
  <Route path="/download"><Download {language} /></Route>
  <Route path="/manual"><Manual {language} /></Route>
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
    font-size: 1.4rem;
    z-index: 999;
  }
  nav:nth-child(1) {
    justify-content: flex-start;
    background-color: var(--ra-teal-transparant);
    height: var(--ra-nav-main-height);
  }

  nav:nth-child(2) {
    justify-content: center;
    background-color: var(--ra-teal-light-transparant);
    height: var(--ra-nav-sub-height);
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
  nav a:link,
  nav a:visited {
    color: var(--ra-white);
  }

  /* :hover */
  nav:nth-child(1) > a:hover {
    color: var(--ra-grey-light);
    background-color: var(--ra-teal-light-transparant);
  }

  nav:nth-child(2) > a:hover {
    color: var(--ra-grey-light);
    background-color: var(--ra-white);
  }

  /* :active */
  nav a.active {
    color: var(--ra-blue);
  }

  nav:nth-child(1) > a.active {
    background-color: var(--ra-teal-light-transparant);
  }
  nav:nth-child(1) > a.active span.blue {
    color: var(--ra-blue);
  }
  nav:nth-child(1) > a.active span.green {
    color: var(--ra-green);
  }
  nav:nth-child(1) > a.active span.red {
    color: var(--ra-red);
  }
  nav:nth-child(2) > a.active {
    background-color: var(--ra-white);
  }
  /* brand */
  a > brand {
    font-family: 'Trebuchet MS';
  }

  div {
    margin-left: auto;
    align-self: center;
    display: flex;
    align-items: center;
  }

  div > a {
    font-size: 0.8rem;
  }

  div > a:hover {
    color: var(--ra-blue-bright);
  }

  div > a.active {
    background-color: transparent;
  }
  div > span {
    color: var(--ra-white);
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
