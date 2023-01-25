<script lang="ts">
  // imports
  import {meta, TinroRouteMeta, active} from 'tinro';
  import LogoReach from './LogoReach.svelte';
  import {language, translations} from '../stores/utils';
  import createConverter from '../functions/convert';

  // variables
  let route: TinroRouteMeta = meta();
  const converter = createConverter();

  // functions
</script>

{#if route.breadcrumbs}
  <nav>
    <ol>
      {#each route.breadcrumbs as breadcrumb, index}
        {#if index == 0 && route.breadcrumbs.length == 1}
          <li>
            <LogoReach
              logo={{
                fontSize: '1em',
                width: '1.2em',
                height: '1.2em',
                colored: true
              }}
            />
          </li>
        {:else if index == 0 && route.breadcrumbs.length > 1}
          <li>
            <a href="/">
              <LogoReach
                logo={{
                  fontSize: '1em',
                  width: '1.2em',
                  height: '1.2em',
                  colored: true
                }}
              />
            </a>
          </li>
        {:else if index > 0}
          <li><span>&gt;</span></li>
          <li>
            <a href={breadcrumb.path} data-exact use:active>
              <span>{converter.translate(breadcrumb.name, $translations, $language)}</span>
            </a>
          </li>
        {:else}
          <li>
            <a href="/">
              <LogoReach
                logo={{
                  fontSize: '1em',
                  width: '1.2em',
                  height: '1.2em',
                  colored: true
                }}
              />
            </a>
          </li>
        {/if}
      {/each}
    </ol>
  </nav>
{/if}

<style>
  nav {
    display: flex;
    margin-bottom: 1em;
    margin-inline: 0;
    padding: 0.8em 1.2em;
    font-size: 1em;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) {
    nav {
      display: none;
    }
  }
  nav ol {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 1.2em;
  }

  nav ol li a:hover span {
    color: var(--ra-green);
  }
  nav ol li a.active span {
    color: var(--ra-red);
  }
</style>
