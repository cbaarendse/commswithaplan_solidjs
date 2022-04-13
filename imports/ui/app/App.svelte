<script lang="ts">
  import Header from '../header/Header.svelte';
  import Routing from '../main/routing/Routing.svelte';
  import Footer from '../footer/Footer.svelte';
  import FooterConsent from '../footer/FooterConsent.svelte';
  import {consentFooterVisible} from '../stores/stores';

  function toggleFooterConsentVisibility() {
    $consentFooterVisible = $consentFooterVisible === false ? true : false;
  }
</script>

<!-- Everything happens in these 3 components. -->
<!-- Header: TopBar, Navigation -->
<!-- Routing: Main content, based on chosen routes, always wrapped in a <main>-tag   -->
<!-- FooterNav: contact, copyright and consent -->
<Header />
<Routing />
<Footer on:clickedButton={toggleFooterConsentVisibility} />
<FooterConsent />
