<script lang="ts">
  // imports
  import {router, active} from 'tinro';
  import LogoReach from './LogoReach.svelte';
  import {language, translations} from '../stores/utils';
  import {Ui} from '../types/classes';

  // variables
  export let breadCrumbs: string[];

  // functions
</script>

<nav>
  <ol class="nav-list">
    <li>
      <a href={'/'} use:active data-exact class="brand">
        <LogoReach
          logo={{
            sizes: 'var(--ra-fs-5xl)',
            width: 'var(--ra-5xl)',
            height: 'var(--ra-5xl)',
            colored: true
          }}
        />
      </a>
    </li>
    {#each breadCrumbs as breadCrumb}
      <li>></li>
      <li>
        <a href="/{breadCrumb}/" use:active>
          <span class="blue">{Ui.translate(breadCrumb, $translations, $language)}</span>
        </a>
      </li>
    {/each}
  </ol>
</nav>

<style>
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 1rem 0;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  @media screen and (min-width: 760px) {
    nav {
      display: none;
    }
  }
</style>
