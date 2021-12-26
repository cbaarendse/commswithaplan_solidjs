<script>
  // packages

  // components
  import Header from '../imports/ui/header/Header.svelte';
  import NavigationToggle from '../imports/ui/header/ToggleButton.svelte';
  import TopBar from '../imports/ui/header/TopBar.svelte';
  import Navigation from '../imports/ui/header/Navigation.svelte';
  import Routing from '../imports/ui/routing/Routing.svelte';
  import Footer from '../imports/ui/footer/Footer.svelte';
  import FooterContent from '../imports/ui/footer/FooterContent.svelte';

  // variables
  import {language} from './stores';

  // components
</script>

<Header>
  <NavigationToggle /><TopBar />
  <Navigation />
</Header>
<Routing />
<Footer>
  <FooterContent />
</Footer>
