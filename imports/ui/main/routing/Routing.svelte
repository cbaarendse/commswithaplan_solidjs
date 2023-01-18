<script lang="ts">
  // imports
  import {Route} from 'tinro';
  import Home from '../home/Home.svelte';
  import User from '../user/User.svelte';
  import ConsultancyHome from '../consultancy/Home.svelte';
  import Work from '../consultancy/Work.svelte';
  import About from '../consultancy/About.svelte';
  import Contact from '../consultancy/Contact.svelte';
  import ToolsHome from '../tools/Home.svelte';
  import ReachTool from '../tools/ReachTool.svelte';
  import Docs from '../tools/Docs.svelte';
  import Legal from '../legal/Legal.svelte';
  import NotFound from '../notfound/NotFound.svelte';

  // variables

  // functions
</script>

<Route path="/*" breadcrumb="home">
  <Route path="/"><Home /></Route>
  <Route path="/consultancy/*" breadcrumb="consultancy">
    <Route path="/"><ConsultancyHome /></Route>
    <Route path="/work" breadcrumb="work"><Work /></Route>
    <Route path="/about" breadcrumb="about"><About /></Route>
    <Route path="/contact" breadcrumb="contact"><Contact /></Route>
  </Route>
  <Route path="/tools/*" breadcrumb="tools">
    <Route path="/"><ToolsHome /></Route>
    <Route path="/reach" breadcrumb="reach"><ReachTool /></Route>
    <Route path="/docs" breadcrumb="docs"><Docs /></Route>
  </Route>
  <Route path="/legal/*" breadcrumb="legal"><Legal /></Route>

  <Route path="/user" breadcrumb="loginsignin"><User /></Route>

  <Route fallback breadcrumb="notfound"><NotFound /></Route>
</Route>
