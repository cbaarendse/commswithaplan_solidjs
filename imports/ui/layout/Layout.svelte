<script>
  // packages
  import {onMount} from 'svelte';
  import router from 'page';

  // components
  import Navigation from '../components/Navigation.svelte';
  import Home from '../pages/home/Home.svelte';
  import CommsWithAPlan from '../pages/commswithaplan/CommsWithAPlan.svelte';
  import Reach from '../pages/reach/Reach.svelte';
  import App from '../pages/reach/App.svelte';
  import Download from '../pages/reach/Download.svelte';
  import Manual from '../pages/reach/Manual.svelte';
  import NotFound from '../pages/notfound/NotFound.svelte';
  import Footer from '../components/Footer.svelte';

  router.configure({window: window});
  // variables
  $: language = 'english';
  let page;
  let path;

  onMount(async () => {
    console.log('App is mounted');
  });

  router(
    '/',
    (ctx, next) => {
      path = ctx.path;
      next();
    },
    () => (page = Home)
  );
  router(
    '/commswithaplan',
    (ctx, next) => {
      path = ctx.path;
      next();
    },
    () => (page = CommsWithAPlan)
  );
  router(
    '/reach/reach',
    (ctx, next) => {
      path = ctx.path;
      next();
    },
    () => (page = Reach)
  );
  router(
    '/reach/app',
    (ctx, next) => {
      path = ctx.path;
      next();
    },
    () => (page = App)
  );
  router(
    '/reach/download',
    (ctx, next) => {
      path = ctx.path;
      next();
    },
    () => (page = Download)
  );
  router(
    '/reach/manual',
    (ctx, next) => {
      path = ctx.path;
      next();
    },
    () => (page = Manual)
  );
  router('/*', () => (page = NotFound));

  router.start();
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
