<script>
  // packages

  // components
  import ToggleButton from './ToggleButton.svelte';
  import TopBar from './TopBar.svelte';
  import Navigation from './Navigation.svelte';

  // variables
</script>

<header>
  <ToggleButton /><TopBar />
  <Navigation display="none" />
</header>

<style>
  /* smaller screens: navigation toggled by input.nav-toggle (checkbox), this requires position: absolute */
  header {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    z-index: 999;
  }

  @media screen and (min-width: 760px) {
  }

  input:checked ~ .top-bar {
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }
</style>
