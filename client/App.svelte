<script>
  // packages
  import {onMount} from 'svelte';
  import router from 'page';

  // routes
  import routes from '../client/routes';

  // components
  import Layout from '../imports/ui/layout/Layout.svelte';

  onMount(async () => {
    console.log('App is mounted');
  });
</script>

<Layout />
