<script>
  // packages

  // components
  import TopBar from './TopBar.svelte';
  import Navigation from './Navigation.svelte';
  import {onMount} from 'svelte';

  // variables
  let displayNavigation;
  let display;

  // functions
  onMount(() => console.log('visible?', $displayNavigation));
</script>

<header>
  <TopBar {displayNavigation} />
  <Navigation display={displayNavigation} />
</header>

<style>
  /* smaller screens: navigation toggled by input.nav-toggle (checkbox), this requires position: absolute */
  /* header {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    z-index: 999;
  }

  @media screen and (min-width: 760px) {
  } */
</style>
