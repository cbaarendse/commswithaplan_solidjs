<script>
  // packages

  // components
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, consultancyHomeItems} from '../../../../client/stores';
</script>

<main>
  <header>
    <Brand title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </header>

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
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1rem 1fr 1rem;
    grid-template-rows: 7rem;
    grid-auto-rows: auto;
    gap: 2rem;
    padding: 0.4rem 0 0 0;
    margin: 0.4rem 0 0 0;
    overflow: auto;
  }
  header {
    grid-column: 2/3;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }
  section {
    grid-column: 2/3;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
  }

  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 3fr 1fr;
      padding: 2rem 0 0 0;
      margin: 2rem 0 0 0;
    }
  }
</style>
