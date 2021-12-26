<script>
  // packages
  import {router, active} from 'tinro';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser, faHome} from '@fortawesome/free-solid-svg-icons';

  // variables
  import {language} from '../../../client/stores';
</script>

<nav class="nav-1" role="navigation">
  <ul class="nav-list">
    <li>
      <a href={'/'} use:active exact class="brand">
        <span class="blue">Comms</span>&nbsp;<span class="green">With&nbsp;A</span>&nbsp;<span class="red">Plan</span>
      </a>
    </li>
    <li>
      <a href={'/consultancy/'} use:active>
        <span class="blue">Consultancy</span>
      </a>
    </li>
    <li>
      <a href={'/tools/'} use:active>
        <span class="blue">Tools</span>
      </a>
    </li>
  </ul>
</nav>
{#if $router.path === '/'}
  <nav class="nav-2" role="navigation">
    <ul class="nav-list">
      <li>
        <a href={'/'} use:active>
          <span><Fa icon={faHome} size={'0.8x'} /></span>
        </a>
      </li>
    </ul>
  </nav>
{:else if $router.path.startsWith('/consultancy')}
  <nav class="nav-2" role="navigation">
    <ul class="nav-list">
      <li>
        <a href={'/consultancy/'} use:active exact>
          <span><Fa icon={faHome} size={'0.8x'} /></span>
        </a>
      </li>
      <li>
        <a href={'/consultancy/work'} use:active>
          <span>Work</span>
        </a>
      </li>
      <li>
        <a href={'/consultancy/about'} use:active>
          <span>About</span>
        </a>
      </li>
      <li>
        <a href={'/consultancy/contact'} use:active>
          <span>Contact</span>
        </a>
      </li>
    </ul>
  </nav>
{:else if $router.path.startsWith('/tools')}
  <nav class="nav-2" role="navigation">
    <ul class="nav-list">
      <li>
        <a href={'/tools/'} use:active exact>
          <span><Fa icon={faHome} size={'0.8x'} /></span>
        </a>
      </li>
      <li>
        <a href={'/tools/reach'} use:active>
          <span>Reach</span>
        </a>
      </li>
      <li>
        <a href={'/tools/documentation'} use:active>
          <span>Documentation</span>
        </a>
      </li>
    </ul>
  </nav>
{/if}

<!-- <Notifications /> -->
<style>
  nav {
    font-family: 'Trebuchet MS';
  }

  ul {
    list-style-type: none;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  nav {
    grid-column: 1/3;
    transform: scale(1, 0);
    transform-origin: top;
    font-size: 1.4rem;
    padding: 3rem 0;
    background-color: var(--ra-teal);
  }

  .nav-1 {
    transition: transform 150ms linear 150ms;
    padding: 3rem 0;
    background-color: var(--ra-teal);
  }
  nav ul {
    display: flex;
    gap: 1.4rem;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .nav-2 {
    transition: transform 150ms ease-out 0ms;
    padding: 0.8em 0;
    background-color: var(--ra-teal-light);
  }

  .nav-1 a,
  .nav-2 a,
  .nav-1 a:visited,
  .nav-2 a:visited {
    color: var(--ra-white);
  }

  /* :hover */

  .nav-1 a:hover,
  .nav-2 a:hover {
    color: var(--ra-blue);
  }
  .nav-1 a:hover span.blue {
    color: var(--ra-blue);
  }

  .nav-1 a:hover span.green {
    color: var(--ra-green);
  }

  .nav-1 a:hover span.red {
    color: var(--ra-red);
  }
  /* .active */
  .nav-1 a.brand span.blue,
  .nav-1 a.active span.blue,
  .nav-2 a.active span {
    color: var(--ra-blue);
  }

  .nav-1 a span.green {
    color: var(--ra-green);
  }

  .nav-1 a span.red {
    color: var(--ra-red);
  }

  /* for tablet, laptop and desktop screens */

  @media screen and (min-width: 760px) {
    .nav-1,
    .nav-2 {
      transform: none;
    }
    .nav-1 {
      justify-content: space-evenly;
      gap: 2rem;
      padding: 3rem;
    }

    .nav-1 ul li:nth-of-type(1) {
      flex: 1 1 auto;
    }

    .nav-2 {
      justify-content: center;
    }
  }
</style>
