<script>
  // packages

  // components
  import Header from '../imports/ui/header/Header.svelte';
  import Navigation from '../imports/ui/header/Navigation.svelte';
  import Main from '../imports/ui/main/Main.svelte';
  import Routing from '../imports/ui/routing/Routing.svelte';
  import Footer from '../imports/ui/footer/Footer.svelte';
  import FooterContent from '../imports/ui/footer/FooterContent.svelte';

  // variables
  import {language} from './stores';

  // components
</script>

<Header>
  <Navigation />
</Header>
<Main>
  <Routing />
</Main>
<Footer>
  <FooterContent />
</Footer>
