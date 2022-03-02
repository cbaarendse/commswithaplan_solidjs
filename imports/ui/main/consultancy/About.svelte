<script lang="ts">
  // components
  import Main from './layout/Main.svelte';
  import SectionHeader from './layout/SectionHeader.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // providers
  import {UiProvider} from '../../types/classes';

  // variables
  import {language, aboutItems} from '../../stores/stores';
  $: translatedAboutItems = $aboutItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <SectionHeader>
      <Brand
        brand={{color: 'blue', size: 'xl', title: `Comms With A Plan - ${$language === 'dutch' ? 'Over' : 'About'}`}}
        ><LogoCommsWithAPlan
          logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
        /></Brand
      >
    </SectionHeader>
    <div class="about_grid">
      {#each translatedAboutItems as item}
        <p>{item.description}</p>
      {/each}
      <p>
        <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
      </p>
    </div>
  </Section>
</Main>

<style>
  .about_grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-block: 2rem;
  }
</style>
