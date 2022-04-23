<script lang="ts">
  // imports
  import {Route} from 'tinro';
  import Home from '../home/Home.svelte';
  import ConsultancyHome from '../consultancy/Home.svelte';
  import Work from '../consultancy/Work.svelte';
  import About from '../consultancy/About.svelte';
  import Contact from '../consultancy/Contact.svelte';
  import ToolsHome from '../tools/Home.svelte';
  import ReachTool from '../tools/ReachTool.svelte';
  import Docs from '../tools/Docs.svelte';
  import CookiePolicy from '../legal/CookiePolicy.svelte';
  import NotFound from '../notfound/NotFound.svelte';

  // variables

  // functions
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
    <Route path="/reach"><ReachTool /></Route>
    <Route path="/documentation"><Docs /></Route>
  </Route>
  <Route path="/legal/cookiepolicy"><CookiePolicy /></Route>
  <Route fallback><NotFound /></Route>
</Route>
