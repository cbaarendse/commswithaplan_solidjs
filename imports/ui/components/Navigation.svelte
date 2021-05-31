<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  // import Select from '../components/reusable/Select.svelte';
  import LogoCommsWithAPlan from './reusable/LogoCommsWithAPlan.svelte';
  import LogoReachApp from './reusable/LogoReachApp.svelte';

  // modules
  import UiProvider from '../../both/uiProvider';

  // constants
  import {translations} from '../../../client/constants';

  // variables
  export let path;
  export let language;
  const commsWithAPlanPaths = ['/commswithaplan/home'];
  const reachPaths = ['/reach/home', '/reach/reachapp', '/reach/download', '/reach/manual'];
  let thisUi = new UiProvider(translations, language);
</script>

<nav class="main-nav">
  <ul>
    <li>
      <a href={'/'} class:active={path === '/'}>
        <LogoCommsWithAPlan size={'3.5rem'} colored={path === '/'} />
      </a>
    </li>
    <li>
      <a href={'/commswithaplan/home'} class:active={commsWithAPlanPaths.some((item) => item === path)}>
        <span class="brand blue">Comms</span>&nbsp;<span class="brand green">With&nbsp;A</span>&nbsp;<span
          class="brand red">Plan</span
        >
      </a>
    </li>
    <li>
      <a href={'/reach/home'} class:active={reachPaths.some((item) => item === path)}>
        {thisUi.capitalizeAndSplit('reach')}
      </a>
    </li>
  </ul>

  <form>
    <label for="en">Engels</label><input type="radio" id="en" bind:group={language} value="english" />
    <label for="nl">Nederlands</label><input type="radio" id="nl" bind:group={language} value="dutch" />
  </form>
</nav>
{#if path === '/'}
  <nav class="sub-nav" />
{/if}
{#if commsWithAPlanPaths.some((item) => item === path)}
  <nav class="sub-nav">
    <ul>
      <li>
        <a href={'/commswithaplan/home'} class:active={path === '/commswithaplan/home'}>
          <LogoCommsWithAPlan size={'2rem'} colored={path === '/commswithaplan/home'} />
        </a>
      </li>
    </ul>
  </nav>
{/if}
{#if reachPaths.some((item) => item === path)}
  <nav class="sub-nav">
    <ul>
      <li>
        <a href={'/reach/home'} class:active={path === '/reach/home'}>
          <LogoReachApp size={'2rem'} colored={path === '/reach/home'} />
        </a>
      </li>

      <li>
        <a href={'/reach/reachapp'} class:active={path === '/reach/reachapp'}>
          <span class="brand">ReachApp</span>
        </a>
      </li>
      <li>
        <a href={'/reach/download'} class:active={path === '/reach/download'}>
          {thisUi.capitalizeAndSplit('download')}
        </a>
      </li>
      <li>
        <a href={'/reach/manual'} class:active={path === '/reach/manual'}>
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
