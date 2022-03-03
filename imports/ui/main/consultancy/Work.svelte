<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
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
    <div class="work__grid">
      <Header>
        <Brand
          brand={{
            color: 'green',
            fontSize: 'var(--ra-fs-xl)',
            title: `Comms With A Plan - ${$language === 'dutch' ? 'Werk' : 'Work'}`
          }}
          ><LogoCommsWithAPlan
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-fxl)', colored: true}}
          /></Brand
        >
      </Header>

      <p>
        {#if $language === 'dutch'}
          Zaken die ik manage gedurende het proces (je kan kiezen en mixen):
        {:else}
          Things I'll manage along the process (you can pick and mix):
        {/if}
      </p>

      {#each translatedWorkItems as item}
        <Card card={{color: item.color, title: item.displayName, imgFile: `/consultancy/${item.name}.jpg`}}>
          {item.description}
        </Card>
      {/each}
    </div>
  </Section>
</Main>

<style>
  div.work__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-block: 2rem;
  }
  p {
    grid-column: 1 / -1;
  }

  @media screen and (min-width: 760px) {
  }
</style>
