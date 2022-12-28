<script lang="ts">
  // imports
  import Top from '../header/Top.svelte';
  import Navigation from '../header/Navigation.svelte';
  import Routing from '../main/routing/Routing.svelte';
  import Colofon from '../footer/Colofon.svelte';
  import Consent from '../footer/Consent.svelte';
  import {consentFooterVisible} from '../stores/utils';

  // variables

  // functions
  function toggleFooterConsentVisibility() {
    $consentFooterVisible = $consentFooterVisible === false ? true : $consentFooterVisible === true ? false : true;
  }
</script>

<!-- Routing: Main content, based on chosen routes   -->
<header>
  <Top />
  <Navigation />
</header>
<main>
  <Routing />
</main>
<footer>
  <Colofon on:clickedButton={toggleFooterConsentVisibility} />
  <Consent />
</footer>
