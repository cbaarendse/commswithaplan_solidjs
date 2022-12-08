<script lang="ts">
  // imports
  import Header from '../layout/Header.svelte';
  import Top from '../header/Top.svelte';
  import Navigation from '../header/Navigation.svelte';
  import Main from '../layout/Main.svelte';
  import Routing from '../main/routing/Routing.svelte';
  import Footer from '../layout/Footer.svelte';
  import Colofon from '../footer/Colofon.svelte';
  import Consent from '../footer/Consent.svelte';
  import {consentFooterVisible} from '../stores/utils';

  // variables

  // functions
  function toggleFooterConsentVisibility() {
    $consentFooterVisible = $consentFooterVisible === false ? true : false;
  }
</script>

<!-- Routing: Main content, based on chosen routes, always wrapped in a <main>-tag   -->
<Header>
  <Top />
  <Navigation />
</Header>
<Main>
  <Routing />
</Main>
<Footer>
  <Colofon on:clickedButton={toggleFooterConsentVisibility} />
  <Consent />
</Footer>
