<script>
  import Brand from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
</script>

<main>
  <header>
    <Brand colors={'green'} title={'Reach'}><LogoReachApp size="3rem" /></Brand>
    <h1>Documentation</h1>
  </header>
  <!-- TODO: emulate svelte or meteor documentation -->

  <aside><ul><li><a href="#" /></li></ul></aside>
  <section>
    <article id="stap_1">
      <!-- TODO: content in store -->
      <h2>Stap 1</h2>
      <p>
        <span />
      </p>
      <p>
        <span>See how it works</span>
      </p>
      <code />
      <picture />
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
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.2rem;
    grid-template-areas: 'brand title';
    grid-column: 2/4;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  h1 {
    grid-area: title;
    align-self: center;
    justify-self: self-start;
    font-size: var(--font-size-2xl);
    font-weight: normal;
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
