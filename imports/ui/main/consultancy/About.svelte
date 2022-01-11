<script>
  // components
  import Main from './reusable/Main.svelte';
  import Header from './reusable/Header.svelte';
  import Section from './reusable/Section.svelte';
  import Article from './reusable/Article.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // variables
  import {language, about} from '../../../../client/stores';
</script>

<main>
  <header>
    <Brand title={'Comms With A Plan'} colors={'blue'}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </header>

  <section>
    <article>
      <h2>{$about[$language].displayName}</h2>
      <p>{$about[$language].description}</p>
      <p>
        <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
      </p>
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
  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 3fr 1fr;
      padding: 2rem 0 0 0;
      margin: 2rem 0 0 0;
    }
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
    padding: 1rem;
  }
</style>
