<script lang="ts">
  // imports
  import {meta, TinroRouteMeta} from 'tinro';
  import LogoReach from './LogoReach.svelte';
  import {language, translations} from '../stores/utils';
  import {Convert} from '../types/classes';

  // variables
  let route: TinroRouteMeta = meta();
  console.log('breadcrumbs =', route.breadcrumbs);

  // functions
</script>

{#if route.breadcrumbs}
  <nav>
    <ol>
      {#each route.breadcrumbs as breadcrumb}
        {#if breadcrumb.name !== 'home'}
          <li>
            <a href={breadcrumb.path}>
              <span>{Convert.translate(breadcrumb.name, $translations, $language)}</span>
            </a>
          </li>
        {:else}
          <li>
            <a href="/">
              <LogoReach
                logo={{
                  sizes: '1.4em',
                  width: '1.8em',
                  height: '1.8em',
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
    padding: 1em 1.4em;
    font-size: 1.2em;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) {
    nav {
      display: none;
    }
  }
  ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2em;
  }

  a:hover,
  a.active {
    color: var(--ra-blue);
  }
</style>
