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
  import Footer from '../imports/ui/layout/Footer.svelte';
  import NotFound from '../imports/ui/components/NotFound.svelte';

  router.configure({window: window});
  // variables
  let page;
  let activeRoute = '/';

  onMount(async () => {
    console.log('App is mounted');
  });

  router(routes[0].to, (context) => {
    page = routes[0].page;
    activeRoute = routes[0].to;
  });

  router(routes[1].to, (context) => {
    page = routes[1].page;
    activeRoute = routes[1].to;
  });
</script>

<Navigation {activeRoute} />
<!-- <Notifications /> -->
<Page {page} />
<Footer />
