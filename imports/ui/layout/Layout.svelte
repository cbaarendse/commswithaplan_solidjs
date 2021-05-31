<script>
  // packages
  import {onMount} from 'svelte';
  import router from 'page';

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

  router.configure({window: window});

  // constants
  const routes = {
    '/': Home,
    '/commswithaplan/home': CommsWithAPlan,
    '/reach/home': Reach,
    '/reach/reachapp': ReachApp,
    '/reach/download': Download,
    '/reach/manual': Manual,
  };
  // variables
  $: language = 'english';
  let page;
  let path;

  onMount(async () => {
    console.log('Layout is mounted');
  });

  for (const route in routes) {
    router(
      route,
      (ctx, next) => {
        path = ctx.path;
        next();
      },
      () => (page = routes[route])
    );
  }

  router('/*', () => (page = NotFound));

  router.start();
</script>

<header>
  <Navigation {path} {language} />
  <!-- <Notifications /> -->
</header>
<svelte:component this={page} {language} />
<footer>
  <Footer {language} />
</footer>
