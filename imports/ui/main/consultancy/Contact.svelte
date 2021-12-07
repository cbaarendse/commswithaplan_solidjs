<script>
  // components
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // packages
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faLinkedin} from '@fortawesome/free-solid-svg-icons';

  // variables
  import {language, contactItems} from '../../../../client/stores';
</script>

<main>
  <header>
    <Brand title={'Comms With A Plan'} colors={'blue'}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </header>

  <section>
    <article>
      <h2>Contact</h2>
      {#each $contactItems as item, index}
        <Card cardTitle={item[$language].displayName} colors={'blue'}>
          <address>
            {item[$language].description}
          </address>
        </Card>
      {/each}
      <Card
        cardTitle={'LinkedIn'}
        colors={'blue'}
        cardLink={'https://www.linkedin.com/in/cbaarendse/'}
        callToAction={'LinkedIn'}
      >
        <address>
          <a href="https://www.linkedin.com/in/cbaarendse/">
            <Fa icon={faLinkedin} size={'1.4em'} color={'#003366'} /></a
          >
        </address>
      </Card>
    </article>

    <article>
      <span
        >{#if $language == 'dutch'}
          Bel me of schrijf.
        {:else}
          Give me a call or write.
        {/if}
      </span>
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
  section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2em;
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

  span {
    color: var(--ra-red);
  }
</style>
