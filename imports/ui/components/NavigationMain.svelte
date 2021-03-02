<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  // import Select from '../components/reusable/Select.svelte';
  import LogoCommsWithAPlan from './reusable/LogoCommsWithAPlan.svelte';
  import LogoReachApp from './reusable/LogoReachApp.svelte';

  // modules
  import UiProvider from '../../both/uiProvider';

  // variables
  export let path;
  export let language;
  let uiProvider = new UiProvider(language);

  // functions
</script>

<nav>
  <ul>
    <li class="logo">
      <a href={'/'} class:active={path === '/'}>
        <LogoCommsWithAPlan size={'3.5rem'} colored={path === '/'} />
      </a>
    </li>

    <li class="brand">
      <a href={'/commswithaplan'} class:active={path === '/commswithaplan'}>
        <span class="blue">Comms</span>&nbsp;<span class="green">With&nbsp;A</span>&nbsp;<span class="red">Plan</span>
      </a>
    </li>
    <li>
      <a
        href={'/reach/'}
        class:active={path === '/reach/' ||
          path === '/reach/reachapp' ||
          path === '/reach/download' ||
          path === '/reach/manual'}
      >
        {uiProvider.capitalizeAndSplit('reach')}
      </a>
      <ul>
        <li class="logo">
          <a href={'/reach/'} class:active={path === '/reach/'}>
            <LogoReachApp size={'2rem'} colored={path === '/reach/'} />
          </a>
        </li>

        <li>
          <a href={'/reach/reachapp'} class:active={path === '/reach/reachapp'}>
            <span class="brand">ReachApp</span>
          </a>
        </li>
        <li>
          <a href={'/reach/download'} class:active={path === '/reach/download'}>
            {uiProvider.capitalizeAndSplit('download')}
          </a>
        </li>
        <li>
          <a href={'/reach/manual'} class:active={path === '/reach/manual'}>
            {uiProvider.capitalizeAndSplit('manual')}
          </a>
        </li>
      </ul>
    </li>
  </ul>

  <form>
    <label for="en">Engels</label><input type="radio" id="en" bind:group={language} value="english" />
    <label for="nl">Nederlands</label><input type="radio" id="nl" bind:group={language} value="dutch" />
  </form>
</nav>

<!-- Direction of the mouse from previous mouseover to current mouseleave determines the class -->
<style>
  nav {
    display: grid;
    justify-content: space-between;
    margin: 0;
    padding: 0 1em;
    background-color: var(--ra-teal-transparant);
    height: var(--ra-nav-main-height);
    width: 100%;
    font-size: 1.4rem;
    z-index: 999;
  }

  nav li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1em;
    text-decoration: none;
  }
  @media only screen and (max-width: 768px) {
    nav a {
      display: none;
    }
  }

  nav a.brand {
    font-family: 'Trebuchet MS';
  }
  nav a:link {
    color: var(--ra-white);
  }

  nav a:visited {
    color: var(--ra-white);
  }

  nav a:hover {
    background-color: var(--ra-teal-light-transparant);
    color: var(--ra-grey);
  }

  nav a.active {
    background-color: var(--ra-teal-light-transparant);
    color: var(--ra-blue);
  }

  nav a.logo.active {
    background-color: transparent;
    color: var(--ra-blue);
  }
  nav a.active span.blue {
    color: var(--ra-blue);
  }
  nav a.active span.green {
    color: var(--ra-green);
  }
  nav a.active span.red {
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
