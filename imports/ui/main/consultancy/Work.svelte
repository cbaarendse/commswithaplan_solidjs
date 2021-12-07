<script>
  // packages

  // components
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';
  import FlipCard from '../../reusable/FlipCard.svelte';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // variables
  import {language, workItems, translations} from '../../../../client/stores';
  const thisUi = new UiProvider($translations);
  let selectedIndex;
</script>

<main>
  <header>
    <Brand title={'Comms With A Plan'} colors={'green'}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </header>

  <section>
    <article class="work">
      <h2>Work</h2>
      {#if $language == 'dutch'}
        <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
      {:else}
        <p>Things I'll manage along the process (you can pick and mix):</p>
      {/if}
      <ul>
        {#each $workItems as item, index}
          <li>
            <FlipCard
              flipped={selectedIndex === index}
              colors={item.colors}
              on:click={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
              on:mouseenter={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
              cardTitle={item[$language].displayName}
              buttonText={thisUi.translate('read', $language)}
            >
              <img
                src="/consultancy/{item.name}.png"
                alt={item[$language].displayName}
                style=" filter: opacity(0.6) drop-shadow(0 0 0 {item.colors});"
                slot="image"
              />
              <span slot="description">{item[$language].description}</span>
            </FlipCard>
          </li>
        {/each}
      </ul>
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

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 480px));
    grid-auto-rows: 1fr;
    gap: 2em;
    list-style-type: none;
  }
</style>
