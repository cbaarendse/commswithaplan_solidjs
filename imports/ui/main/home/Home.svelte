<script>
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, homePageItems} from '../../../../client/stores';
</script>

<main>
  <section>
    <article>
      {#each $homePageItems as item, index}
        <Card
          cardTitle={item[$language].displayName}
          imgUrl={item.imgUrl}
          cardLink={item.cardLink}
          callToAction={item[$language].callToAction}
          colors={item.colors}
        >
          <span>{item[$language].description}</span>
        </Card>
      {/each}
    </article>
  </section>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
  }
  section {
    grid-column: 2/3;
    margin: 2rem 0rem;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-l));
  }
  article {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 480px));
    grid-auto-rows: auto;
    justify-content: center;
    gap: 2rem;
  }
</style>
