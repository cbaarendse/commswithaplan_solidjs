<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // modules
  import {ui_translations} from '../../../client/constants';

  // variables
  export let activeRoute;

  // functions
  function onAnchorClick(anchor) {
    Session.set('target', anchor);
  }

  function capitalizeAndSplit(str) {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(' ');
    return str;
  }
  function selectLanguage(event) {
    console.log('language event.target.value', event.target.lang);
    useSession('language', event.target.lang);
  }

  $: language = useSession('language');
</script>

<!-- Direction of the mouse from previous mouseover to current mouseleave determines the class -->
<nav>
  <a
    on:click={() => {
      console.log('clicked Home');
      activeRoute = '/';
    }}
    href={'/'}
    class:active={activeRoute === '/'}
  >
    <img src="/CWAP_logo_site.png" alt="Home" />
  </a>

  <a
    on:click={() => (activeRoute = 'commswithaplan')}
    href={'/commswithaplan'}
    class:active={activeRoute === 'commswithaplan'}
    class="brand"
  >
    <span style="color:var(--ra-blue)">Comms</span>&nbsp;<span style="color:var(--ra-green)">With&nbsp;A</span
    >&nbsp;<span style="color:var(--ra-red)">Plan</span>
  </a>

  <a on:click={() => (activeRoute = 'schedule')} href={'/commswithaplan'} class:active={activeRoute === 'schedule'}>
    {capitalizeAndSplit('schedule')}
  </a>
  <a on:click={() => (activeRoute = 'bereik')} href={'/commswithaplan'} class:active={activeRoute === 'bereik'}>
    {capitalizeAndSplit('bereik')}
  </a>
  <div class="dropdown">
    <a href={'#'} class="dropdown-button">
      {ui_translations[$language][$language]}
      <i class="material-icons">arrow_drop_down</i>
    </a>

    <div class="dropdown-select">
      <a class="dropdown-option" href={'#'} lang="english" on:click|preventDefault={selectLanguage}>
        {ui_translations['english'][$language]}
      </a>
      <a class="dropdown-option" href={'#'} lang="dutch" on:click|preventDefault={selectLanguage}>
        {ui_translations['dutch'][$language]}
      </a>
    </div>
  </div>
</nav>

<!-- Direction of the mouse from previous mouseover to current mouseleave determines the class -->
<style>
  img {
    height: 100%;
    width: auto;
  }
  nav {
    margin: 0px;
    padding: 14px;
    position: fixed;
    background-color: var(--ra-white);
    height: 70px;
    width: 100%;
    top: 0;
  }

  nav a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0px 14px;
    text-decoration: none;
    font-size: 21px;
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
    color: var(--ra-grey-light);
  }

  nav a:visited {
    color: var(--ra-grey-light);
  }

  nav a:hover {
    background-color: var(--ra-grey-off-white);
    color: var(--ra-grey);
    background-size: 100% 4px;
  }

  nav a.active {
    color: var(--ra-blue);
  }

  div.dropdown {
    float: right;
    position: relative;
  }
  a.dropdown-button {
    color: var(--ra-blue);
    padding: 0px 14px;
    font-size: 14px;
    width: 100%;
    border: none;
    cursor: pointer;
  }
  div.dropdown:hover a.dropdown-button:hover {
    color: var(--ra-grey-light);
  }

  .dropdown-select {
    display: none;
    position: absolute;
    right: 0;
    background-color: var(--ra-grey-off-white);
    min-width: 105px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-select {
    display: block;
  }

  .dropdown-select {
    width: 100%;
    background-color: var(--ra-white);
  }
  .dropdown-select a {
    display: block;
    color: var(--ra-grey-light);
    padding: 14px;
    width: 100%;
    text-decoration: none;
    align-items: baseline;
    background-color: var(--ra-white);
    border: none;
    cursor: pointer;
  }
  .dropdown-select a:hover {
    background-color: var(--ra-grey-off-white);
    color: var(--ra-grey);
  }
  a.dropdown-option {
    font-size: 14px;
  }
</style>
