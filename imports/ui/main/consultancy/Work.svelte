<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import FlipCard from '../../reusable/FlipCard.svelte';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // variables
  import {language, workItems, Translation} from '../../../../client/stores';
  let selectedIndex: number | null;
</script>

<Main>
  <Header>
    <Brand title={'Comms With A Plan'} colors={'green'}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </Header>

  <Section>
    <Article class="work">
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
              on:click={() => (selectedIndex === index ? (selectedIndex = null) : (selectedIndex = index))}
              on:mouseenter={() => (selectedIndex === index ? (selectedIndex = null) : (selectedIndex = index))}
              cardTitle={item[$language].displayName}
              buttonText={UiProvider.translate('read', $language)}
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
    </Article>
  </Section>
</Main>

<style>
  @media screen and (min-width: 760px) {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 480px));
      grid-auto-rows: 1fr;
      gap: 2em;
      list-style-type: none;
    }
  }
</style>
