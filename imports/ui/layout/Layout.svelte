<script>
  // packages
  import {onMount} from 'svelte';
  import router from 'page';

  // components
  import NavigationMain from '../components/NavigationMain.svelte';
  import NavigationSub from '../components/NavigationSub.svelte';
  import Home from '../pages/Home.svelte';
  import CommsWithAPlan from '../pages/CommsWithAPlan.svelte';
  import Reach from '../pages/Reach.svelte';
  import NotFound from '../pages/NotFound.svelte';
  import Footer from '../components/Footer.svelte';

  // routes
  import routes from '../../../client/routes';
  import {claim_text} from 'svelte/internal';

  router.configure({window: window});
  // variables
  let language = 'dutch';
  let page;
  let params;
  let activeRoute = '/';

  onMount(async () => {
    console.log('App is mounted');
  });

  router('/', () => (page = Home));
  router('/commswithaplan', () => (page = CommsWithAPlan));
  router(
    '/reach/',
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => (page = Reach)
  );
  router(
    '/reach/reachapp',
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => (page = ReachApp)
  );
  router(
    '/reach/app',
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => (page = App)
  );
  router(
    '/reach/manual',
    (ctx, next) => {
      params = ctx.params;
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
  <NavigationMain {activeRoute} {language} />
  <NavigationSub {activeRoute} />
  <!-- <Notifications /> -->
</header>
<svelte:component this={page} {params} {language} />
<footer>
  <Footer {language} />
</footer>
