<script lang="ts">
  // imports
  import {slide} from 'svelte/transition';
  import {router, active} from 'tinro';
  import {language, isSmallScreen, navigationVisible, useMediaQuery} from '../stores/utils';

  // variables

  useMediaQuery('(max-width: 768px)').subscribe((value: boolean | null): void => {
    $isSmallScreen = value;
  });

  isSmallScreen.subscribe((small) => {
    $navigationVisible = small === true ? false : true;
  });
</script>

{#if $navigationVisible === true}
  <nav class="key" transition:slide={{duration: 300}}>
    <ul>
      <li>
        <a
          href={'/'}
          use:active
          data-exact
          class="brand"
          on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
        >
          <span class="blue">Comms</span>&nbsp;<span class="green">With&nbsp;A</span>&nbsp;<span class="red">Plan</span>
        </a>
      </li>
      <li>
        <a href={'/consultancy'} use:active>
          <span class="blue">{$language === 'dutch' ? 'Consultancy' : 'Consultancy'}</span>
        </a>
      </li>
      <li>
        <a href={'/tools'} use:active>
          <span class="blue">{$language === 'dutch' ? 'Tools' : 'Tools'}</span>
        </a>
      </li>
    </ul>
  </nav>
{/if}
{#if $router.path === '/'}
  {#if $navigationVisible === true}
    <nav class="sub" transition:slide|local={{duration: 300}}>
      <ul>
        <li>
          <a
            href={'/'}
            use:active
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
            <span>Home</span>
          </a>
        </li>
      </ul>
    </nav>
  {/if}{/if}
{#if $router.path.startsWith('/consultancy')}
  {#if $navigationVisible === true}
    <nav class="sub" transition:slide|local={{duration: 300}}>
      <ul>
        <li>
          <a
            href={'/consultancy'}
            use:active
            data-exact
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
            <span>{$language === 'dutch' ? 'Home' : 'Home'}</span>
          </a>
        </li>
        <li>
          <a
            href={'/consultancy/work'}
            use:active
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
            <span>{$language === 'dutch' ? 'Werk' : 'Work'}</span>
          </a>
        </li>
        <li>
          <a
            href={'/consultancy/about'}
            use:active
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
            <span>{$language === 'dutch' ? 'Over' : 'About'}</span>
          </a>
        </li>
        <li>
          <a
            href={'/consultancy/contact'}
            use:active
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
            <span>{$language === 'dutch' ? 'Contact' : 'Contact'}</span>
          </a>
        </li>
      </ul>
    </nav>
  {/if}{/if}
{#if $router.path.startsWith('/tools')}
  {#if $navigationVisible === true}
    <nav class="sub" transition:slide|local={{duration: 300}}>
      <ul>
        <li>
          <a
            href={'/tools'}
            use:active
            data-exact
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
            <span>{$language === 'dutch' ? 'Home' : 'Home'}</span>
          </a>
        </li>
        <li>
          <a
            href={'/tools/reach'}
            use:active
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
            <span>{$language === 'dutch' ? 'Bereik' : 'Reach'}</span>
          </a>
        </li>
        <li>
          <a
            href={'/tools/docs'}
            use:active
            on:click={() => ($isSmallScreen ? ($navigationVisible = false) : ($navigationVisible = true))}
          >
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
  }

  nav.key {
    padding: 1em 1.4em 1em 1.4em;
    background-color: var(--ra-teal-light);
  }

  nav.sub {
    padding: 1em 1.4em 1em 1.4em;
    background-color: var(--ra-black-off-white);
  }

  ul {
    grid-column: 1/1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: clamp(0.4rem, 1vw, 1rem);
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .main-nav ul li:first-of-type {
    flex: 1 1 3rem;
    font-family: 'Trebuchet MS';
  }

  /* links, :visited */
  /* main */
  nav.key a.brand span.blue {
    color: var(--ra-white);
  }
  nav.key a span.green {
    color: var(--ra-white);
  }
  nav.key a span.red {
    color: var(--ra-white);
  }
  nav.key a,
  nav.key a:visited {
    color: var(--ra-grey-off-white);
  }
  /* sub */
  nav.sub a,
  nav.sub a:visited {
    color: var(--ra-grey-light);
  }
  /* :hover */
  nav.key a:hover,
  nav.sub a:hover {
    color: var(--ra-blue);
  }
  nav.key a:hover span.blue {
    color: var(--ra-blue);
  }
  nav.key a:hover span.green {
    color: var(--ra-green);
  }
  nav.key a:hover span.red {
    color: var(--ra-red);
  }
  /* .active */
  /* main */
  nav.key a.active span.blue {
    color: var(--ra-blue);
  }
  nav.key a.active span.green {
    color: var(--ra-green);
  }
  nav.key a.active span.red {
    color: var(--ra-red);
  }
  /* sub */
  nav.sub a.active span {
    color: var(--ra-blue);
  }

  /* for tablet, laptop and desktop screens */
  @media screen and (min-width: 760px) {
    nav {
      grid-template-columns: 1fr 4fr 1fr;
    }
    nav.key {
      padding: 2rem 1rem 2rem 1rem;
    }
    nav.sub {
      padding: 1rem 1rem 1rem 1rem;
    }
    ul {
      grid-column: 2/3;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(0.4rem, 4vw, 9.6rem);
    }
    nav.key ul {
      justify-content: space-evenly;
    }

    nav.key ul li:nth-of-type(1) {
      flex: 1 1 auto;
    }

    nav.sub ul {
      justify-content: center;
    }
  }
</style>
