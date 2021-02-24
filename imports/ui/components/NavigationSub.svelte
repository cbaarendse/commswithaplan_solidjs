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
  export let params;
  export let language;

  // functions
  function capitalizeAndSplit(str) {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }
</script>

{#if activeRoute === '/' || activeRoute === '/commswithaplan'}
  <nav />
{/if}
{#if activeRoute === '/reach'}
  <nav>
    <a
      on:click={() => {
        console.log('clicked Home');
        activeRoute = '/reach/';
      }}
      href={'/reach/'}
      class:active={() => activeRoute === '/reach/'}
      class="logo"
    >
      <LogoReachApp size={'2rem'} colored={activeRoute === '/reach/'} />
    </a>

    <a
      on:click={() => (activeRoute = 'reach/reachapp')}
      href={'/reach/reachapp'}
      class:active={activeRoute === 'reach/reachapp'}
      class="brand"
    >
      <span>ReachApp</span>
    </a>
    <a on:click={() => (activeRoute = 'reach/app')} href={'/reach/app'} class:active={activeRoute === 'reach/app'}>
      {capitalizeAndSplit('app')}
    </a>

    <a
      on:click={() => (activeRoute = 'reach/manual')}
      href={'/reach/manual'}
      class:active={activeRoute === 'reach/manual'}
    >
      {capitalizeAndSplit('manual')}
    </a>
  </nav>
{/if}

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
