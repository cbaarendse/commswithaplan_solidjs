<script lang="ts">
  // imports
  import TopBar from './TopBar.svelte';
  import Navigation from './Navigation.svelte';
  import {isSmallScreen, useMediaQuery} from '../stores/utils';

  // variables

  // functions
  useMediaQuery('(max-width: 759px)').subscribe((value: boolean | null): void => {
    $isSmallScreen = value;
  });
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
