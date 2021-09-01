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
    <Fa icon={faUser} size="0.6x" />
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
        <span class="brand">Consultancy</span>
      </a>
    </nav>
  {:else}
    <nav />
  {/if}

  <!-- <Notifications /> -->
</header>

<main>
  <Route path="/"><Home {language} /></Route>
  <Route path="/commswithaplan/*">
    <Route path="/"><Consultancy {language} /></Route>
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
  nav {
    display: flex;
    margin: 0;
    padding: 0 1em;
    width: 100%;
    font-family: 'Trebuchet MS';
    font-size: 1.4rem;
    z-index: 999;
  }

  nav:nth-of-type(1) {
    justify-content: flex-end;
    align-items: center;
    background-color: var(--ra-grey-off-white);
    height: var(--ra-nav-top-height);
  }

  nav:nth-of-type(2) {
    justify-content: flex-start;
    background-color: var(--ra-teal-transparant);
    height: var(--ra-nav-main-height);
  }

  nav:nth-of-type(3) {
    justify-content: center;
    background-color: var(--ra-teal-light);
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
