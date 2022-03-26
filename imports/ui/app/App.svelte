<script lang="ts">
  // packages

  // components
  import Header from '../header/Header.svelte';
  import Routing from '../main/routing/Routing.svelte';
  import Footer from '../footer/Footer.svelte';
</script>

<!-- Everything happens in these 3 components. -->
<!-- Header: TopBar, Navigation -->
<!-- Routing: Main content, based on chosen routes, always wrapped in a <main>-tag   -->
<!-- Footer: static content -->
<Header />
<Routing />
<Footer />
