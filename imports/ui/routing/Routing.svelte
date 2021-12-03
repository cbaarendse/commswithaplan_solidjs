<script>
  // packages
  import {Route} from 'tinro';

  // components
  import Home from '../main/home/Home.svelte';
  import ConsultancyHome from '../main/consultancy/ConsultancyHome.svelte';
  import Work from '../main/consultancy/Work.svelte';
  import About from '../main/consultancy/About.svelte';
  import Contact from '../main/consultancy/Contact.svelte';
  import ToolsIntroduction from '../main/tools/ToolsIntroduction.svelte';
  import Reach from '../main/tools/Reach.svelte';
  import Documentation from '../main/tools/Documentation.svelte';
  import NotFound from '../main/notfound/NotFound.svelte';

  // variables
  import {language} from '../../../client/stores';
</script>

<Route path="/*">
  <Route path="/"><Home {$language} /></Route>
  <Route path="/consultancy/*">
    <Route path="/"><ConsultancyHome {$language} /></Route>
    <Route path="/work"><Work {$language} /></Route>
    <Route path="/about"><About {$language} /></Route>
    <Route path="/contact"><Contact {$language} /></Route>
  </Route>
  <Route path="/tools/*">
    <Route path="/"><ToolsIntroduction {$language} /></Route>
    <Route path="/reach"><Reach {$language} /></Route>
    <Route path="/documentation"><Documentation {$language} /></Route>
  </Route>
  <Route fallback><NotFound {$language} /></Route>
</Route>
