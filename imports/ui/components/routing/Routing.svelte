<script lang="ts">
  // imports
  import {Route} from 'tinro';
  import Home from '../home/Home.svelte';
  import User from '../user/User.svelte';
  import Consultancy from '../consultancy/home/Consultancy.svelte';
  import Work from '../consultancy/work/Work.svelte';
  import About from '../consultancy/about/About.svelte';
  import Contact from '../consultancy/contact/Contact.svelte';
  import Tools from '../tools/home/Tools.svelte';
  import Reach from '../tools/reach/Reach.svelte';
  import Strategies from '../tools/reach/Strategies.svelte';
  import Docs from '../tools/docs/Docs.svelte';
  import Legal from '../legal/Legal.svelte';
  import NotFound from '../notfound/NotFound.svelte';

  // variables

  // functions
</script>

<Route path="/*" breadcrumb="home">
  <Route path="/"><Home /></Route>
  <Route path="/consultancy/*" breadcrumb="consultancy">
    <Route path="/"><Consultancy /></Route>
    <Route path="/work" breadcrumb="work"><Work /></Route>
    <Route path="/about" breadcrumb="about"><About /></Route>
    <Route path="/contact" breadcrumb="contact"><Contact /></Route>
  </Route>
  <Route path="/tools/*" breadcrumb="tools">
    <Route path="/"><Tools /></Route>
    <Route path="/reach" breadcrumb="reach">
      <Reach />
    </Route>
    <Route path="/reach/strategies" breadcrumb="strategies"><Strategies /></Route>
    <Route path="/docs" breadcrumb="docs"><Docs /></Route>
  </Route>
  <Route path="/legal/*" breadcrumb="legal"><Legal /></Route>

  <Route path="/user" breadcrumb="loginsignin"><User /></Route>

  <Route fallback breadcrumb="notfound"><NotFound /></Route>
</Route>
