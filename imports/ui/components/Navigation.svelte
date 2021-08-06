<script>
  // packages
  import {Route, active, router} from 'tinro';

  // components
  // import Select from '../components/reusable/Select.svelte';
  import LogoCommsWithAPlan from './reusable/LogoCommsWithAPlan.svelte';
  import LogoReachApp from './reusable/LogoReachApp.svelte';

  // modules
  import UiProvider from '../../both/uiProvider';

  // constants
  import {translations} from '../../../client/constants';
  import {home} from 'svelte-awesome/icons';

  // variables
  export let language;
  let thisUi = new UiProvider(translations, language);
</script>

<nav class="main-nav">
  <ul>
    <li>
      <a href={'/'} use:active>
        <LogoCommsWithAPlan size={'3.5rem'} colored={$router.url === '/'} />
      </a>
    </li>
    <li>
      <a href={'/plan/home'} use:active>
        <span class="brand blue">Comms</span>&nbsp;<span class="brand green">With&nbsp;A</span>&nbsp;<span
          class="brand red">Plan</span
        >
      </a>
    </li>
    <li>
      <a href={'/reach/home'} use:active>
        {thisUi.capitalizeAndSplit('reach')}
      </a>
    </li>
  </ul>
</nav>
{#if $router.url === '/'}
  <nav class="sub-nav" />
{/if}
{#if $router.url === path}
  <nav class="sub-nav">
    <ul>
      <li>
        <a href={'/commswithaplan/home'} use:active>
          <LogoCommsWithAPlan size={'2rem'} colored={$router.url === '/commswithaplan/home'} />
        </a>
      </li>
    </ul>
  </nav>
{/if}
{#if $router.url === path}
  <nav class="sub-nav">
    <ul>
      <li>
        <a href={'/reach/home'} use:active>
          <LogoReachApp size={'2rem'} colored={$router.url === '/reach/home'} />
        </a>
      </li>

      <li>
        <a href={'/reach/reachapp'} use:active>
          <span class="brand">ReachApp</span>
        </a>
      </li>
      <li>
        <a href={'/reach/download'} use:active>
          {thisUi.capitalizeAndSplit('download')}
        </a>
      </li>
      <li>
        <a href={'/reach/manual'} use:active>
          {thisUi.capitalizeAndSplit('manual')}
        </a>
      </li>
    </ul>
  </nav>
{/if}

<style>
  nav {
    display: flex;
    margin: 0;
    padding: 0 1em;
    width: 100%;
    font-size: 1.4rem;
    z-index: 999;
  }
  nav.main-nav {
    justify-content: space-between;
    background-color: var(--ra-teal-transparant);
    height: var(--ra-nav-main-height);
  }
  nav.sub-nav {
    justify-content: center;
    background-color: var(--ra-teal-light-transparant);
    height: var(--ra-nav-sub-height);
  }
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  @media only screen and (max-width: 768px) {
    ul {
      flex-direction: column;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 1em;
    text-decoration: none;
  }

  /* :link */
  a:link {
    color: var(--ra-white);
  }
  /* :visited */
  a:visited {
    color: var(--ra-white);
  }
  /* :hover */
  a:hover {
    color: var(--ra-grey);
  }
  nav.main-nav a:hover {
    background-color: var(--ra-teal-light-transparant);
  }

  nav.sub-nav a:hover {
    background-color: var(--ra-white);
  }

  /* :active */
  a.active {
    color: var(--ra-blue);
  }
  ul:first-child a.active {
    background-color: transparent;
  }
  nav.main-nav a.active {
    background-color: var(--ra-teal-light-transparant);
  }
  nav.sub-nav a.active {
    background-color: var(--ra-white);
  }
  /* brand */
  span.brand {
    font-family: 'Trebuchet MS';
  }
  a.active span.blue {
    color: var(--ra-blue);
  }
  a.active span.green {
    color: var(--ra-green);
  }
  a.active span.red {
    color: var(--ra-red);
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: 1em;
  }
  label {
    color: var(--ra-white);
    padding: 0em 0.5em;
  }
</style>
