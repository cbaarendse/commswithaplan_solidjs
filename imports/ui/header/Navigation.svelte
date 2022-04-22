<script lang="ts">
  // imports
  import {slide} from 'svelte/transition';
  import {router, active} from 'tinro';
  import {language, isSmallScreen, navigationInVisible} from '../stores/utils';

  // variables
  isSmallScreen.subscribe((small) => {
    $navigationInVisible = small === false ? true : false;
  });
</script>

{#if $navigationInVisible === true}
  <nav class="main-nav" transition:slide={{duration: 300}}>
    <ul class="nav-list">
      <li>
        <a href={'/'} use:active data-exact class="brand">
          <span class="blue">Comms</span>&nbsp;<span class="green">With&nbsp;A</span>&nbsp;<span class="red">Plan</span>
        </a>
      </li>
      <li>
        <a href={'/consultancy/'} use:active>
          <span class="blue">{$language === 'dutch' ? 'Consultancy' : 'Consultancy'}</span>
        </a>
      </li>
      <li>
        <a href={'/tools/'} use:active>
          <span class="blue">{$language === 'dutch' ? 'Tools' : 'Tools'}</span>
        </a>
      </li>
    </ul>
  </nav>
  {#if $router.path === '/'}
    <nav class="sub-nav" in:slide={{duration: 300}} out:slide={{duration: 300}}>
      <ul class="nav-list">
        <li>
          <a href={'/'} use:active>
            <span>Home</span>
          </a>
        </li>
      </ul>
    </nav>
  {:else if $router.path.startsWith('/consultancy')}
    <nav class="sub-nav" in:slide={{duration: 300}} out:slide={{duration: 300}}>
      <ul class="nav-list">
        <li>
          <a href={'/consultancy/'} use:active data-exact>
            <span>{$language === 'dutch' ? 'Home' : 'Home'}</span>
          </a>
        </li>
        <li>
          <a href={'/consultancy/work'} use:active>
            <span>{$language === 'dutch' ? 'Werk' : 'Work'}</span>
          </a>
        </li>
        <li>
          <a href={'/consultancy/about'} use:active>
            <span>{$language === 'dutch' ? 'Over' : 'About'}</span>
          </a>
        </li>
        <li>
          <a href={'/consultancy/contact'} use:active>
            <span>{$language === 'dutch' ? 'Contact' : 'Contact'}</span>
          </a>
        </li>
      </ul>
    </nav>
  {:else if $router.path.startsWith('/tools')}
    <nav class="sub-nav" in:slide={{duration: 300}} out:slide={{duration: 300}}>
      <ul class="nav-list">
        <li>
          <a href={'/tools/'} use:active data-exact>
            <span>{$language === 'dutch' ? 'Home' : 'Home'}</span>
          </a>
        </li>
        <li>
          <a href={'/tools/reach'} use:active>
            <span>{$language === 'dutch' ? 'Bereik' : 'Reach'}</span>
          </a>
        </li>
        <li>
          <a href={'/tools/documentation'} use:active>
            <span>{$language === 'dutch' ? 'Documentatie' : 'Docs'}</span>
          </a>
        </li>
      </ul>
    </nav>
  {/if}
{/if}

<style>
  nav {
    display: grid;
    grid-template-columns: 1fr;
    grid-column: 1/3;
    font-size: 1.4rem;
  }

  .main-nav {
    padding: 1rem 1.4rem 1rem 1.4rem;
    background-color: var(--ra-teal-light);
  }

  .sub-nav {
    padding: 1rem 1.4rem 1rem 1.4rem;
    background-color: var(--ra-black-off-white);
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

  .main-nav ul li:first-of-type {
    flex: 1 1 3rem;
    font-family: 'Trebuchet MS';
  }

  a {
    text-decoration: none;
  }

  /* links, :visited */
  .main-nav a,
  .main-nav a:visited {
    color: var(--ra-grey-off-white);
  }

  .sub-nav a,
  .sub-nav a:visited {
    color: var(--ra-grey-light);
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
