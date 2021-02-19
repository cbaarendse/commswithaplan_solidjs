<script>
  // packages

  // components
  import Button from '../components/reusable/Button.svelte';
  // variables
  export let item;
  export let language = 'dutch';
  let visibilityValue = 'hidden';
</script>

<Button
  size={'large'}
  backgroundColor={'blue'}
  type={'button'}
  on:mouseenter={() => (visibilityValue = 'visible')}
  on:mouseleave={() => (visibilityValue = 'hidden')}
  on:click={() => console.log('Buttton geklikt')}
>
  {item[language].name}
</Button>
<p style="visibility:{visibilityValue};">
  <span>
    {item[language].description}
  </span>
</p>

<style>
  p {
    background-color: var(--ra-grey-off-white);
  }
  span {
    font-size: 1.4rem;
  }
</style>
