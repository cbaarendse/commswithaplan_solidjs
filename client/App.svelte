<script>
  // packages
  import {Meteor} from 'meteor/meteor';
  import {onMount} from 'svelte';
  import router from 'page';

  // routes
  import routes from './routes';

  // components
  import Navigation from '../imports/ui/layout/Navigation.svelte';
  import Page from '../imports/ui/layout/Page.svelte';
  import Home from '../imports/ui/pages/Home.svelte';
  import CommsWithAPlan from '../imports/ui/pages/CommsWithAPlan.svelte';
  import NotFound from '../imports/ui/pages/NotFound.svelte';
  import Footer from '../imports/ui/layout/Footer.svelte';

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

<Navigation {activeRoute} {language} />
<!-- <Notifications /> -->
<Page {page} {language} />
<Footer {language} />
