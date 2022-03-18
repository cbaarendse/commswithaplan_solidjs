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
    <div class="work__flex">
      <Header>
        <Brand
          brand={{
            color: 'var(--ra-green)',
            fontSize: 'var(--ra-fs-2xl)',
            title: `Comms With A Plan - ${$language === 'dutch' ? 'Werk' : 'Work'}`
          }}
          ><LogoCommsWithAPlan
            logo={{
              fontSize: 'var(--ra-fs-5xl)',
              width: 'var(--ra-5xl)',
              height: 'var(--ra-fxl)',
              minWidth: 'var(--ra-5xl)',
              minHeight: 'var(--ra-fxl)',
              colored: true
            }}
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
  .work__flex {
    display: flex;
    flex-wrap: wrap;
  }

  :global(header) {
    margin: 1rem;
    flex: 0 1 100%;
  }
  p {
    margin: 1rem;
    flex: 0 1 100%;
  }
  :global(.card) {
    margin: 1rem;
    flex: 1 1 320px;
  }
</style>
