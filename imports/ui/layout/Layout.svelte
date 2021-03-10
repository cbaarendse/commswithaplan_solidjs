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
    '/commswithaplan': CommsWithAPlan,
    '/reach/reach': Reach,
    '/reach/reachapp': ReachApp,
    '/reach/download': Download,
    '/reach/manual': Manual,
  };
  // variables
  $: language = 'english';
  let page;
  let path;

  onMount(async () => {
    console.log('App is mounted');
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

  // router(
  //   '/',
  //   (ctx, next) => {
  //     path = ctx.path;
  //     next();
  //   },
  //   () => (page = Home)
  // );
  // router(
  //   '/commswithaplan',
  //   (ctx, next) => {
  //     path = ctx.path;
  //     next();
  //   },
  //   () => (page = CommsWithAPlan)
  // );
  // router(
  //   '/reach/',
  //   (ctx, next) => {
  //     path = ctx.path;
  //     next();
  //   },
  //   () => (page = Reach)
  // );
  // router(
  //   '/reach/reach',
  //   (ctx, next) => {
  //     path = ctx.path;
  //     next();
  //   },
  //   () => (page = Reach)
  // );
  // router(
  //   '/reach/reachapp',
  //   (ctx, next) => {
  //     path = ctx.path;
  //     next();
  //   },
  //   () => (page = ReachApp)
  // );
  // router(
  //   '/reach/download',
  //   (ctx, next) => {
  //     path = ctx.path;
  //     next();
  //   },
  //   () => (page = Download)
  // );
  // router(
  //   '/reach/manual',
  //   (ctx, next) => {
  //     path = ctx.path;
  //     next();
  //   },
  //   () => (page = Manual)
  // );
</script>

<header>
  <Navigation {path} {language} />
  <!-- <Notifications /> -->
</header>
<main>
  <svelte:component this={page} {language} />
</main>
<footer>
  <Footer {language} />
</footer>
