<script>
  import {onMount} from 'svelte';

  // pages
  import Home from '../pages/CommsWithAPlan.svelte';
  import CommsWithAPlan from '../pages/CommsWithAPlan.svelte';
  // variables
  export let page;
  onMount(() => {
    console.log('page =', page);
  });
</script>

<svelte:component this={page} />
