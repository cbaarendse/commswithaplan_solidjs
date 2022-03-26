<script lang="ts">
  // packages

  // components
  import TopBar from './TopBar.svelte';
  import Navigation from './Navigation.svelte';

  // variables

  // functions
</script>

<header>
  <!-- TopBar contains general functionality, like language, user login -->
  <!-- Navigation -->
  <!-- There is an option to insert a Notifications area in the header -->
  <TopBar />
  <Navigation />
</header>

<style>
  header {
    width: 100%;
    z-index: 999;
    margin-bottom: 4rem;
  }
</style>
