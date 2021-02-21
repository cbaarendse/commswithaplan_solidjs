<script>
  // packages
  import {onMount} from 'svelte';
  import router from 'page';

  // components
  import NavigationMain from '../components/NavigationMain.svelte';
  import NavigationSub from '../components/NavigationSub.svelte';
  import Home from '../../ui/pages/Home.svelte';
  import CommsWithAPlan from '../../ui/pages/CommsWithAPlan.svelte';
  import NotFound from '../../ui/pages/NotFound.svelte';
  import Footer from '../components/Footer.svelte';

  // routes
  import routes from '../../../client/routes';

  router.configure({window: window});
  // variables
  let language = 'dutch';
  let page;
  let activeRoute = '/';

  onMount(async () => {
    console.log('App is mounted');
  });

  router('/', () => (page = Home));
  router('/commswithaplan', () => (page = CommsWithAPlan));
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
<svelte:component this={page} {language} />
<footer>
  <Footer {language} />
</footer>
