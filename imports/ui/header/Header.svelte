<script lang="ts">
  // packages

  // components
  import TopBar from './TopBar.svelte';
  import Navigation from './Navigation.svelte';

  // variables

  // functions
</script>

<header>
  <TopBar />
  <Navigation />
</header>

<style>
  /* smaller screens: navigation toggled by input.nav-toggle (checkbox), this requires position: absolute */
  header {
    width: 100%;
    z-index: 999;
    margin-bottom: 4rem;
  }

  @media screen and (min-width: 760px) {
  }
</style>
