<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';
  import {} from 'os';

  // components
  import LogoReachApp from './reusable/LogoReachApp.svelte';

  // modules
  import {ui_translations} from '../../../client/constants';

  // variables
  export let activeRoute;
  export let language;

  // functions
  function capitalizeAndSplit(str) {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }
</script>

<nav>
  <a
    on:click={() => {
      console.log('clicked Home');
      activeRoute = '/';
    }}
    href={'/'}
    class:active={() => activeRoute === '/'}
    class="logo"
  >
    <LogoReachApp size={'2rem'} colored={activeRoute === '/'} />
  </a>

  <a
    on:click={() => (activeRoute = 'reachapp')}
    href={'/reachapp'}
    class:active={activeRoute === 'reachapp'}
    class="brand"
  >
    <span>ReachApp</span>
  </a>
  <a on:click={() => (activeRoute = 'bereik')} href={'/commswithaplan'} class:active={activeRoute === 'bereik'}>
    {capitalizeAndSplit('app')}
  </a>

  <a on:click={() => (activeRoute = 'schedule')} href={'/commswithaplan'} class:active={activeRoute === 'schedule'}>
    {capitalizeAndSplit('manual')}
  </a>
</nav>

<!-- Direction of the mouse from previous mouseover to current mouseleave determines the class -->
<style>
  nav {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0 1em;
    background-color: var(--ra-teal-light-transparant);
    height: var(--ra-nav-sub-height);
    width: 100%;
    font-size: 1.4rem;
    z-index: 999;
  }

  nav a {
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
    background-color: var(--ra-white);
    color: var(--ra-grey);
  }

  nav a.active {
    background-color: var(--ra-white);
    color: var(--ra-blue);
  }

  nav a.logo.active {
    background-color: transparent;
    color: var(--ra-blue);
  }
</style>
