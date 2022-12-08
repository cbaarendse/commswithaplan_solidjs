<script lang="ts">
  // imports
  import {active} from 'tinro';
  import LogoReach from './LogoReach.svelte';
  import {language, translations} from '../stores/utils';
  import {Ui} from '../types/classes';

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
      <li>&gt;</li>
      <li>
        <a href="/{breadCrumb}/" use:active>
          <span>{Ui.translate(breadCrumb, $translations, $language)}</span>
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
    font-size: 1.4em;
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
    gap: 2rem;
    list-style-type: none;
  }
  a {
    text-decoration: none;
  }

  li,
  a,
  a:hover,
  a:visited,
  a.active {
    color: var(--ra-blue);
  }
</style>
