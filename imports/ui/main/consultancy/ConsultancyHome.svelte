<script>
  // packages

  // components
  import PageHeader from '../../reusable/PageHeader.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, consultancyHomeItems} from '../../../../client/stores';
</script>

<PageHeader title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></PageHeader>

<section>
  <article>
    {#each $consultancyHomeItems as item, index}
      <Card cardTitle={item[$language].displayName}>
        <span>
          {item[$language].description}
        </span>
      </Card>
    {/each}
  </article>
</section>

<style>
  section {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article {
  }
</style>
