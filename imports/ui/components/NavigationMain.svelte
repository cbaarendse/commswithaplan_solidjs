<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';
  import {} from 'os';

  // components
  // import Select from '../components/reusable/Select.svelte';
  import LogoCommsWithAPlan from './reusable/LogoCommsWithAPlan.svelte';

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
    <LogoCommsWithAPlan size={'3.5rem'} colored={activeRoute === '/'} />
  </a>

  <a
    on:click={() => (activeRoute = 'commswithaplan')}
    href={'/commswithaplan'}
    class:active={activeRoute === 'commswithaplan'}
    class="brand"
  >
    <span class="blue">Comms</span>&nbsp;<span class="green">With&nbsp;A</span>&nbsp;<span class="red">Plan</span>
  </a>
  <a on:click={() => (activeRoute = 'bereik')} href={'/commswithaplan'} class:active={activeRoute === 'bereik'}>
    {capitalizeAndSplit('bereik')}
  </a>

  <a on:click={() => (activeRoute = 'schedule')} href={'/commswithaplan'} class:active={activeRoute === 'schedule'}>
    {capitalizeAndSplit('schedule')}
  </a>

  <form>
    <label for="en">Engels</label><input type="radio" id="en" bind:group={language} value="english" />
    <label for="nl">Nederlands</label><input type="radio" id="nl" bind:group={language} value="dutch" />
  </form>
</nav>

<!-- Direction of the mouse from previous mouseover to current mouseleave determines the class -->
<style>
  nav {
    display: flex;
    margin: 0;
    padding: 0 1em;
    background-color: var(--ra-teal-transparant);
    height: var(--ra-nav-main-height);
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
