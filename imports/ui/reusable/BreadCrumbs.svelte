<script lang="ts">
  // imports
  import {meta, active} from 'tinro';
  import LogoReach from './LogoReach.svelte';
  import {language, translations} from '../stores/utils';
  import {Convert} from '../types/classes';

  // variables
  let route = meta();
  console.log('breadCrumbs =', route.breadcrumbs);

  // functions
</script>

<nav>
  <ol>
    {#each route.breadcrumbs as breadCrumb, index}
      <li>
        <a href={breadCrumb.path} use:active
          >{#if index === 0}<LogoReach
              logo={{
                sizes: '1.4em',
                width: '1.8em',
                height: '1.8em',
                colored: true
              }}
            />{:else}
            <span>{Convert.translate(breadCrumb.name, $translations, $language)}</span>
          {/if}
        </a>
      </li>
    {/each}
  </ol>
</nav>

<style>
  nav {
    margin-bottom: 1em;
    margin-inline: 0;
    padding: 1.6em 2em;
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

  span {
    font-size: 1.4em;
  }

  a:hover,
  a.active {
    color: var(--ra-blue);
  }
</style>
