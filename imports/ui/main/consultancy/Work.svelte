<script>
  // packages

  // components
  import PageHeader from '../../reusable/PageHeader.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';
  import FlipCard from '../../reusable/FlipCard.svelte';

  import {translations} from '../../../../client/constants';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // content
  import {workItems} from '../../../../client/content';

  // variables
  import {language} from '../../../../client/stores';
  const thisUi = new UiProvider(translations);
  let selectedIndex;
</script>

<PageHeader title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></PageHeader>

<section>
  <article class="work">
    <h2>Work</h2>
    {#if $language == 'dutch'}
      <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
    {:else}
      <p>Things I'll manage along the process (you can pick and mix):</p>
    {/if}
    <ul>
      {#each workItems as item, index}
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

<style>
  section {
    margin: 2em auto;
    width: clamp(320px, 60%, 1400px);
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }
  article {
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
