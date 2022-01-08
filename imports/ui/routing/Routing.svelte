<script>
  // packages
  import {Route} from 'tinro';

  // components
  import Home from '../../ui/main/home/Home.svelte';
  import ConsultancyHome from '../../ui/main/consultancy/Home.svelte';
  import Work from '../../ui/main/consultancy/Work.svelte';
  import About from '../../ui/main/consultancy/About.svelte';
  import Contact from '../../ui/main/consultancy/Contact.svelte';
  import ToolsHome from '../../ui/main/tools/Home.svelte';
  import Reach from '../../ui/main/tools/Reach.svelte';
  import Docs from '../main/tools/Docs.svelte';
  import NotFound from '../../ui/main/notfound/NotFound.svelte';
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
    <Route path="/documentation"><Docs /></Route>
  </Route>
  <Route fallback><NotFound /></Route>
</Route>
