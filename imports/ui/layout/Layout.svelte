<script>
  // packages
  import {onMount} from 'svelte';
  import router from 'page';

  // components
  import NavigationMain from '../components/NavigationMain.svelte';
  import NavigationSub from '../components/NavigationSub.svelte';
  import Home from '../pages/home/Home.svelte';
  import CommsWithAPlan from '../pages/commswithaplan/CommsWithAPlan.svelte';
  import ReachHome from '../pages/reach/Reach.svelte';
  import ReachApp from '../pages/reach/ReachApp.svelte';
  import Download from '../pages/reach/Download.svelte';
  import Manual from '../pages/reach/Manual.svelte';
  import NotFound from '../pages/notfound/NotFound.svelte';
  import Footer from '../components/Footer.svelte';

  // routes
  import routes from '../../../client/routes';

  router.configure({window: window});
  // variables
  let language = 'dutch';
  let path;
  let page;

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
    '/reach/',
    (ctx, next) => {
      path = ctx.path;
      next();
    },
    () => (page = ReachHome)
  );
  router(
    '/reach/reachapp',
    (ctx, next) => {
      path = ctx.path;
      params = ctx.params;
      next();
    },
    () => (page = ReachApp)
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

  // router(routes[0].to, (context) => {
  //   page = routes[0].page;
  //   activeRoute = routes[0].to;
  // });

  // router(routes[1].to, (context) => {
  //   page = routes[1].page;
  //   activeRoute = routes[1].to;
  // });
</script>

<header>
  <NavigationMain {path} {language} />
  <!-- <NavigationSub {path} /> -->
  <!-- <Notifications /> -->
</header>
<main>
  <svelte:component this={page} {language} />
</main>
<footer>
  <Footer {language} />
</footer>
