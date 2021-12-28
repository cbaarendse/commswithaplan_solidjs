<script>
  // packages

  // components
  import TopBar from './TopBar.svelte';
  import Navigation from './Navigation.svelte';

  // variables
  let display = 'none';

  // functions
  const toggleNavigation = () => {
    display ? 'none' : 'block', 'none';
  };
</script>

<header>
  <TopBar on:click={toggleNavigation} />
  <Navigation {display} />
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
