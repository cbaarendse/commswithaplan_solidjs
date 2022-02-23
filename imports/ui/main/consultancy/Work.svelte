<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import FlipCard from '../../reusable/FlipCard.svelte';

  // types
  import {UiProvider} from '../../types/classes';
  import type {SelectItem} from '../../types/interfaces';

  // variables
  import {language, translations, workItems} from '../../stores/stores';
  $: translatedWorkItems = $workItems.filter((item) => item.language === $language);
  let selectIndex: SelectItem['index'] | null;
</script>

<Main>
  <Header>
    <Brand brand={{color: 'green', size: 'xl', title: 'Comms With A Plan'}}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </Header>

  <Section>
    <h2>Work</h2>
    {#if $language == 'dutch'}
      <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
    {:else}
      <p>Things I'll manage along the process (you can pick and mix):</p>
    {/if}
    <ul>
      {#each translatedWorkItems as item, index}
        <li>
          <FlipCard
            flipped={selectIndex === index}
            colors={item.color}
            on:click={() => (selectIndex === index ? (selectIndex = null) : (selectIndex = index))}
            on:mouseenter={() => (selectIndex === index ? (selectIndex = null) : (selectIndex = index))}
            cardTitle={item.displayName}
            buttonText={UiProvider.translate('read', $translations, $language)}
          >
            <img
              src="/consultancy/{item.name}.png"
              alt={item.displayName}
              style=" filter: opacity(0.6) drop-shadow(0 0 0 {item.color});"
              slot="image"
            />
            <span slot="description">{item.description}</span>
          </FlipCard>
        </li>
      {/each}
    </ul>
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
