<script>
  // packages
  import {onMount} from 'svelte';
  import {slide} from 'svelte/transition';
  import {router, active} from 'tinro';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser, faHome} from '@fortawesome/free-solid-svg-icons';

  // variables
  import {language} from '../../../client/stores';
  import {navigationVisible} from '../../../client/stores';

  $: console.log('navigationVisible', $navigationVisible);

  // functions
  import {useMediaQuery} from '../../../client/stores';
  useMediaQuery('(min-width: 760px)').subscribe((value) => ($navigationVisible = value));
</script>

{#if $navigationVisible == true}
  <nav class="main-nav" role="navigation" transition:slide>
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
    <nav class="sub-nav" role="navigation" transition:slide>
      <ul class="nav-list">
        <li>
          <a href={'/'} use:active>
            <span><Fa icon={faHome} size={'0.8x'} /></span>
          </a>
        </li>
      </ul>
    </nav>
  {:else if $router.path.startsWith('/consultancy')}
    <nav class="sub-nav" role="navigation" transition:slide>
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
    <nav class="sub-nav" role="navigation" transition:slide>
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
            <span
              >{#if $language == 'dutch'}Documentatie{:else}Documentation{/if}</span
            >
          </a>
        </li>
      </ul>
    </nav>
  {/if}
{/if}

<!-- <Notifications /> -->
<style>
  nav {
    font-family: 'Trebuchet MS';
    display: grid;
    grid-template-columns: 1fr;
    grid-column: 1/3;
    font-size: 1.4rem;
  }

  .main-nav {
    padding: 1rem 1.4rem 1rem 1.4rem;
    background-color: var(--ra-teal);
  }

  .sub-nav {
    padding: 1rem 1.4rem 1rem 1.4rem;
    background-color: var(--ra-teal-light);
  }

  ul {
    grid-column: 1/1;
    list-style-type: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .main-nav ul li:nth-of-type(1) {
    flex: 1 1 3rem;
  }

  a {
    text-decoration: none;
  }

  /* links, :visited */
  .main-nav a,
  .sub-nav a,
  .main-nav a:visited,
  .sub-nav a:visited {
    color: var(--ra-white);
  }

  /* :hover */
  .main-nav a:hover,
  .sub-nav a:hover {
    color: var(--ra-blue);
  }
  .main-nav a:hover span.blue {
    color: var(--ra-blue);
  }

  .main-nav a:hover span.green {
    color: var(--ra-green);
  }

  .main-nav a:hover span.red {
    color: var(--ra-red);
  }
  /* .active */
  .main-nav a.brand span.blue,
  .main-nav a.active span.blue,
  .sub-nav a.active span {
    color: var(--ra-blue);
  }

  .main-nav a span.green {
    color: var(--ra-green);
  }

  .main-nav a span.red {
    color: var(--ra-red);
  }

  /* for tablet, laptop and desktop screens */
  @media screen and (min-width: 760px) {
    nav {
      grid-template-columns: 1fr 4fr 1fr;
    }
    .main-nav {
      padding: 2rem 1rem 2rem 1rem;
    }
    .sub-nav {
      padding: 1rem 1rem 1rem 1rem;
    }
    ul {
      grid-column: 2/3;
      flex-direction: row;
      align-items: flex-start;
      gap: 2rem;
    }
    .main-nav ul {
      justify-content: space-evenly;
    }

    .main-nav ul li:nth-of-type(1) {
      flex: 1 1 auto;
    }

    .sub-nav ul {
      justify-content: center;
    }
  }
</style>
