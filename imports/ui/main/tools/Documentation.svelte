<script>
  import Brand from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
</script>

<main>
  <header>
    <Brand title={'Reach'} colors={'green'}><LogoReachApp size="3rem" /></Brand>
  </header>
  <aside>menu</aside>
  <section>
    <article>
      <span>See how it works</span>
    </article>
  </section>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1rem 1fr 3fr 1rem;
    grid-template-rows: 7rem;
    grid-auto-rows: auto;
    gap: 2rem;
    padding: 0.4rem 0 0 0;
    margin: 0.4rem 0 0 0;
    overflow: auto;
  }
  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 3fr 6fr 1fr;
      padding: 2rem 0 0 0;
      margin: 2rem 0 0 0;
    }
  }

  header {
    grid-column: 2/4;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  aside {
    grid-column: 2/3;
    padding: 1rem;
  }

  section {
    grid-column: 3/4;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
    padding: 1rem;
  }
  section {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article {
  }
</style>
