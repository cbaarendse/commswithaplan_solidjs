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

  // functions

  // variables
  import {language, workItems} from '../../stores/stores';
  $: translatedWorkItems = $workItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <SectionHeader>
      <Brand
        brand={{color: 'green', size: 'xl', title: `Comms With A Plan - ${$language === 'dutch' ? 'Werk' : 'Work'}`}}
        ><LogoCommsWithAPlan
          logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-fxl)', colored: true}}
        /></Brand
      >
    </SectionHeader>

    <p>
      {#if $language === 'dutch'}
        Zaken die ik manage gedurende het proces (je kan kiezen en mixen):
      {:else}
        Things I'll manage along the process (you can pick and mix):
      {/if}
    </p>
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
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  @media screen and (min-width: 760px) {
  }
</style>
