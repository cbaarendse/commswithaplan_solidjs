<script>
  // packages
  import {onMount} from 'svelte';

  // components
  import Layout from '../imports/ui/layout/Layout.svelte';

  onMount(async () => {
    console.log('App is mounted');
  });
</script>

<Layout />
