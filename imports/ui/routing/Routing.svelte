<script>
  // packages
  import {Route} from 'tinro';

  // components
  import Home from '../main/home/Home.svelte';
  import ConsultancyHome from '../main/consultancy/Home.svelte';
  import Work from '../main/consultancy/Work.svelte';
  import About from '../main/consultancy/About.svelte';
  import Contact from '../main/consultancy/Contact.svelte';
  import ToolsHome from '../main/tools/Home.svelte';
  import Reach from '../main/tools/Reach.svelte';
  import Documentation from '../main/tools/Documentation.svelte';
  import NotFound from '../main/notfound/NotFound.svelte';
</script>

<Route path="/*">
  <Route path="/"><Home /></Route>
  <Route path="/consultancy/*">
    <Route path="/"><ConsultancyHome /></Route>
    <Route path="/work"><Work /></Route>
    <Route path="/about"><About /></Route>
    <Route path="/contact"><Contact /></Route>
  </Route>
  <Route path="/tools/*">
    <Route path="/"><ToolsHome /></Route>
    <Route path="/reach"><Reach /></Route>
    <Route path="/documentation"><Documentation /></Route>
  </Route>
  <Route fallback><NotFound /></Route>
</Route>
