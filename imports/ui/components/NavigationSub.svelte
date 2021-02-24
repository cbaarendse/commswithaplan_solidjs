<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import LogoReachApp from './reusable/LogoReachApp.svelte';

  // modules
  import {ui_translations} from '../../../client/constants';
  import {onMount} from 'svelte';

  // variables
  export let path;
  export let pathname;
  export let language;
  onMount(async () => console.log('path:', path, 'pathname: ', pathname));

  // functions
  function capitalizeAndSplit(str) {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }
</script>

{#if path === '/' || path === '/commswithaplan'}
  <nav />
{/if}
{#if pathname === '/reach'}
  <nav>
    <a href={'/reach/'} class:active={path === '/reach'} class="logo">
      <LogoReachApp size={'2rem'} colored={path === '/reach'} />
    </a>

    <a href={'/reach/reachapp'} class:active={path === '/reach/reachapp'} class="brand">
      <span>ReachApp</span>
    </a>
    <a href={'/reach/app'} class:active={path === '/reach/app'}>
      {capitalizeAndSplit('app')}
    </a>

    <a href={'/reach/manual'} class:active={path === '/reach/manual'}>
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
