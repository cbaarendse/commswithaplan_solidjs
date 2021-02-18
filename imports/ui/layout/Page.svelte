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

<div>
  <svelte:component this={page} />
</div>

<style>
  div {
    padding: 126px 7px 0px 7px;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: var(--ra-grey-off-white);
  }
</style>
