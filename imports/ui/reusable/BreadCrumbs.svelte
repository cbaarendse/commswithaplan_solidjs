<script lang="ts">
  // imports
  import {active} from 'tinro';
  import LogoReach from './LogoReach.svelte';
  import {language, translations} from '../stores/utils';
  import {Convert} from '../types/classes';

  // variables
  export let breadCrumbs: string[];
  const link = function (pages: string[]): string {
    if (pages.length === 1) {
      return '';
    } else {
      return pages.reduce((page, fullRoute): string => {
        return fullRoute.concat('/', page);
      }, '');
    }
  };

  // functions
</script>

<nav>
  <ol>
    {#each breadCrumbs as breadCrumb, index}
      <li>
        <a href={link(breadCrumbs.slice(0, index))} use:active
          >{#if breadCrumb == '/'}<LogoReach
              logo={{
                sizes: '1.4em',
                width: '1.8em',
                height: '1.8em',
                colored: true
              }}
            />{:else}
            <span>{Convert.translate(breadCrumb, $translations, $language)}</span>
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
