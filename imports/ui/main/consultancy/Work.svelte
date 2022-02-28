<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import SectionHeader from './layout/SectionHeader.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // types
  import {UiProvider} from '../../types/classes';
  import type {SelectItem} from '../../types/interfaces';

  // functions

  // variables
  import {language, translations, workItems} from '../../stores/stores';
  $: translatedWorkItems = $workItems.filter((item) => item.language === $language);
  let selectIndex: SelectItem['index'] | null;
</script>

<Main>
  <Section>
    <SectionHeader>
      <Brand
        brand={{color: 'green', size: 'xl', title: `Comms With A Plan - ${$language === 'dutch' ? 'Werk' : 'Work'}`}}
        ><LogoCommsWithAPlan size={'3rem'} /></Brand
      >
    </SectionHeader>

    {#if $language === 'dutch'}
      <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
    {:else}
      <p>Things I'll manage along the process (you can pick and mix):</p>
    {/if}
    <div class="work_grid">
      {#each translatedWorkItems as item}
        <Card card={{color: item.color, title: item.displayName, imgFile: `/consultancy/${item.name}.png`}}>
          {item.description}
        </Card>
      {/each}
    </div>
  </Section>
</Main>

<style>
  div.work_grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 2rem;
  }
  p {
    flex: 1 0 100%;
  }
  @media screen and (min-width: 760px) {
  }
</style>
