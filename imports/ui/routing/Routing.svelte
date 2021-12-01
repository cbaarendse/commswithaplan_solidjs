<script>
  // packages
  import {Route} from 'tinro';

  // components
  import Home from '../imports/ui/page/pageContent/home/Home.svelte';
  import ConsultancyIntroduction from '../imports/ui/page/pageContent/consultancy/ConsultancyIntroduction.svelte';
  import Work from '../imports/ui/page/pageContent/consultancy/Work.svelte';
  import About from '../imports/ui/page/pageContent/consultancy/About.svelte';
  import Contact from '../imports/ui/page/pageContent/consultancy/Contact.svelte';
  import ToolsIntroduction from '../imports/ui/page/pageContent/tools/ToolsIntroduction.svelte';
  import Reach from '../imports/ui/page/pageContent/tools/Reach.svelte';
  import Documentation from '../imports/ui/page/pageContent/tools/Documentation.svelte';
  import NotFound from '../imports/ui/page/pageContent/notfound/NotFound.svelte';

  // modules
  import UiProvider from '../imports/both/uiProvider';

  // constants
  import {translations} from '../client/constants';

  // variables
  $: language = 'english';
  let thisUi = new UiProvider(translations, language);

  // components
</script>

<Route path="/*">
  <Route path="/"><Home {language} /></Route>
  <Route path="/consultancy/*">
    <Route path="/"><ConsultancyIntroduction {language} /></Route>
    <Route path="/work"><Work {language} /></Route>
    <Route path="/about"><About {language} /></Route>
    <Route path="/contact"><Contact {language} /></Route>
  </Route>
  <Route path="/tools/*">
    <Route path="/"><ToolsIntroduction {language} /></Route>
    <Route path="/reach"><Reach {language} /></Route>
    <Route path="/documentation"><Documentation {language} /></Route>
  </Route>
  <Route fallback><NotFound {language} /></Route>
</Route>
