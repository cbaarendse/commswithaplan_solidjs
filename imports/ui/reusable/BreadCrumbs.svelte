<script lang="ts">
  // imports
  import {active} from 'tinro';
  import LogoReach from './LogoReach.svelte';
  import {language, translations} from '../stores/utils';
  import {Convert} from '../types/classes';

  // variables
  export let breadCrumbs: string[];

  // functions
</script>

<nav>
  <ol>
    <li>
      <a href={'/'} use:active data-exact class="brand">
        <LogoReach
          logo={{
            sizes: 'var(--ra-fs-desktop)',
            width: 'var(--ra-5xl)',
            height: 'var(--ra-5xl)',
            colored: true
          }}
        />
      </a>
    </li>
    {#each breadCrumbs as breadCrumb}
      <li>
        <a href="/{breadCrumb}/" use:active>
          <span>{Convert.translate(breadCrumb, $translations, $language)}</span>
        </a>
      </li>
    {/each}
  </ol>
</nav>

<style>
  nav {
    margin: 1em 0;
    padding: 2em;
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
