<script>
  // components
  import PageHeader from '../../reusable/PageHeader.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // variables
  import {language, about} from '../../../../client/stores';
</script>

<PageHeader title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></PageHeader>

<section>
  <article>
    <h2>{$about[$language].displayName}</h2>
    <p>{$about[$language].description}</p>
    <p>
      <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
    </p>
  </article>
</section>

<style>
  section {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }
</style>
