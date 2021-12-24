<script>
  // packages
  import {router, active} from 'tinro';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser, faHome} from '@fortawesome/free-solid-svg-icons';

  // variables
  import {language} from '../../../client/stores';
</script>

<input type="checkbox" id="bars-toggle" class="bars-toggle" />
<label for="bars-toggle">
  <div class="bars-background" />
  <span class="bar-1" />
  <span class="bar-2" />
  <span class="bar-3" />
</label>

<div class="top-bar" role="menu">
  <ul class="top-bar-list">
    <li>
      <a
        href={'javascript:void(0)'}
        class:active={$language === 'dutch'}
        on:click={() => ($language = 'dutch')}
        tinro-ignore><span>NL</span></a
      >
    </li>
    <span class="divider">|</span>
    <li>
      <a
        href={'javascript:void(0)'}
        class:active={$language === 'english'}
        on:click={() => ($language = 'english')}
        tinro-ignore><span>EN</span></a
      >
    </li>
    <li>
      <div class="user"><Fa icon={faUser} size={'0.8x'} /></div>
    </li>
  </ul>
</div>

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
  .bars-toggle {
    display: none;
    grid-column: 1/2;
  }
  .bars-toggle ~ label {
    grid-column: 1/2;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 3em;
  }
  .bars-toggle ~ label .bars-background {
    width: 100%;
    height: 100%;
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  }
  .bars-toggle ~ label .bar-1,
  .bars-toggle ~ label .bar-2,
  .bars-toggle ~ label .bar-3 {
    display: block;
    position: absolute;
    height: 10%;
    width: 70%;
    border-radius: 3px;
  }

  .bars-toggle ~ label .bar-1 {
    background-color: var(--ra-blue);
    top: 21%;
    transform: rotate(0deg);
    transition: all 450ms ease-in-out 0ms;
  }

  .bars-toggle ~ label .bar-2 {
    background-color: var(--ra-green);
    top: 45%;
    transform: scale(1, 1);
    transform-origin: right 15%;
    transition: transform 350ms ease-in-out 300ms;
  }

  .bars-toggle ~ label .bar-3 {
    background-color: var(--ra-red);
    bottom: 21%;
    transform: rotate(0deg);
    transition: all 450ms ease-in-out 0ms;
  }

  nav {
    font-family: 'Trebuchet MS';
  }

  ul {
    list-style-type: none;
  }

  .top-bar {
    grid-column: 2/3;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
    font-size: 0.8rem;
  }

  .top-bar ul {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 0.2rem;
    list-style-type: none;
    padding: 0.6rem 0.8rem;
    background-color: var(--ra-grey-off-white);
  }

  .top-bar ul li:after {
    content: '/';
    color: var(--ra-grey-light);
    position: absolute;
    right: 0;
    top: 34%;
  }

  .top-bar ul li:last-of-type:after {
    content: none;
  }

  .nav-1 {
    grid-column: 1/3;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms linear 150ms;
    font-size: 1.4rem;
    padding: 3rem 1rem;
    background-color: var(--ra-teal);
  }
  .nav-1 ul {
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .nav-2 {
    grid-column: 1/3;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
    font-size: 1.4rem;
    padding: 0.8em 1em;
    background-color: var(--ra-teal-light);
  }
  .nav-2 ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }

  nav a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin: 0.1em 0.7em;
  }

  .top-bar .user {
    margin-left: 1.2em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* :link, :visited */
  .top-bar a,
  .top-bar a:visited {
    color: var(--ra-grey-light);
  }

  .nav-1 a,
  .nav-2 a,
  .nav-1 a:visited,
  .nav-2 a:visited {
    color: var(--ra-white);
  }

  /* :hover */
  .top-bar a:hover {
    color: var(--ra-blue-bright);
  }
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
  .top-bar a.active span,
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

  /* ===========================
       only for mobile: 
       when label is checked, 
       menu will appear with 
       transition 
       =========================== */

  .bars-toggle:checked ~ label .bars-background {
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }

  .bars-toggle:checked ~ label .bar-1 {
    top: 45%;
    transform: rotate(45deg);
    transition: all 450ms ease-in-out 300ms;
  }

  .bars-toggle:checked ~ label .bar-2 {
    transform: scale(0, 1);
    transform-origin: right 15%;
    transition: transform 350ms ease-in-out 0ms;
  }

  .bars-toggle:checked ~ label .bar-3 {
    bottom: 45%;
    transform: rotate(135deg);
    transition: all 450ms ease-in-out 300ms;
  }

  input:checked ~ .top-bar {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }
  input:checked ~ .nav-1 {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms linear 150ms;
  }

  input:checked ~ .nav-2 {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  }

  /* for tablet, laptop and desktop screens */

  @media screen and (min-width: 760px) {
    .bars-toggle {
      all: unset;
      display: none;
      grid-column: 1/2;
    }
    .bars-toggle ~ label .bars-background {
      transform: none;
    }

    .bars-toggle ~ label .bar-1,
    .bars-toggle ~ label .bar-2,
    .bars-toggle ~ label .bar-3 {
      display: none;
    }

    nav {
      display: flex;
    }
    .top-bar {
      transform: none;
    }
    .nav-1 {
      transform: none;
      justify-content: space-evenly;
      gap: 2rem;
      padding: 3rem;
    }
    .nav-1 a:nth-of-type(2) {
      margin-left: auto;
    }

    .nav-2 {
      justify-content: center;
      align-items: center;
      transform: none;
    }
  }
</style>
