<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import PageHeader from '../../components/reusable/PageHeader.svelte';
  import LogoCommsWithAPlan from '../../components/reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../components/reusable/Card.svelte';
  import FlipCard from '../../components/reusable/FlipCard.svelte';

  import {translations} from '../../../../client/constants';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // content
  import {consultancyItems} from '../../../../client/content';

  // variables
  const thisUi = new UiProvider(translations);
  export let language;
  let selectedIndex;
</script>

<PageHeader title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></PageHeader>

<section>
  <article class="work">
    <h2>Work</h2>
    {#if language == 'dutch'}
      <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
    {:else}
      <p>Things I'll manage along the process (you can pick and mix):</p>
    {/if}
    <ul>
      {#each consultancyItems as item, index}
        <li>
          <FlipCard
            flipped={selectedIndex === index}
            colors={item.colors}
            on:click={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
            on:mouseenter={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
            cardTitle={item[language].displayName}
            buttonText={thisUi.translate('read', language)}
          >
            <img
              src="/consultancy/{item.name}.png"
              alt={item[language].displayName}
              style=" filter: opacity(0.6) drop-shadow(0 0 0 {item.colors});"
              slot="image"
            />
            <span slot="description">{item[language].description}</span>
          </FlipCard>
        </li>
      {/each}
    </ul>
  </article>
</section>

<style>
  section {
    margin: 2rem;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }
  article {
    padding: 1rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-auto-rows: 1fr;
    gap: 2em;
    list-style-type: none;
  }
</style>
