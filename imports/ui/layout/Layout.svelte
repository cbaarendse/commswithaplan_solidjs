<script>
  // packages
  import {onMount} from 'svelte';
  import {Route, active, router} from 'tinro';

  // components
  import Navigation from '../components/Navigation.svelte';
  import Home from '../pages/home/Home.svelte';
  import CommsWithAPlan from '../pages/commswithaplan/CommsWithAPlan.svelte';
  import Reach from '../pages/reach/Reach.svelte';
  import ReachApp from '../pages/reach/ReachApp.svelte';
  import Download from '../pages/reach/Download.svelte';
  import Manual from '../pages/reach/Manual.svelte';
  import NotFound from '../pages/notfound/NotFound.svelte';
  import Footer from '../components/Footer.svelte';
  import LogoCommsWithAPlan from '../components/reusable/LogoCommsWithAPlan.svelte';
  import LogoReachApp from '../components/reusable/LogoReachApp.svelte';
  import Button from '../components/reusable/Button.svelte';
  // constants

  // variables
  $: language = 'english';
  let thisUi = new UiProvider(translations, language);

  onMount(async () => {
    console.log('Layout is mounted');
  });
</script>

<header>
  <nav>
    <a href={'/'} use:active>
      <LogoCommsWithAPlan size={'3.5rem'} colored={$router.url === '/'} />
    </a>
    <a href={'/plan/home'} use:active>
      <span class="brand blue">Comms</span>&nbsp;<span class="brand green">With&nbsp;A</span>&nbsp;<span
        class="brand red">Plan</span
      >
    </a>
    <a href={'/reach/home'} use:active>
      {thisUi.capitalizeAndSplit('reach')}
    </a>
  </nav>

  <Button value="english">Engels</Button> | <Button value="dutch">Nederlands</Button>
</header>

<main>
  <!-- <Notifications /> -->
  <Route>
    <Route path="/"><Home {language} /></Route>
    <Route path="/commswithaplan/*">
      <Route path="/"><nav><a href={'/home'}>CommsWithAPlan</a></nav></Route>
      <Route path="/home"><CommsWithAPlan {language} /></Route>
    </Route>
    <Route path="reach/*">
      <Route path="/home"><Reach {language} /></Route>
      <Route path="/reachapp"><ReachApp {language} /></Route>
      <Route path="/download"><Download {language} /></Route>
      <Route path="/manual"><Manual {language} /></Route>
    </Route>
    <Route fallback><NotFound {language} /></Route>
  </Route>
</main>

<footer>
  <Footer {language} />
</footer>

<style>
  header > nav {
    /* main nav */
  }

  main > nav {
    /* sub nav */
  }
</style>
