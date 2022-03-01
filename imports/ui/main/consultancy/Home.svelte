<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import SectionHeader from './layout/SectionHeader.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';

  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, consultancyHomeItems} from '../../stores/stores';

  $: translatedConsultancyHomeItems = $consultancyHomeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <SectionHeader>
      <Brand brand={{title: `Comms With A Plan - ${$language === 'dutch' ? 'Home' : 'Home'}`, color: 'blue', size: 'l'}}
        ><LogoCommsWithAPlan
          logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
        /></Brand
      >
    </SectionHeader>
    <div class="home_grid">
      {#each translatedConsultancyHomeItems as item}
        <Card card={{title: item.displayName, color: 'blue'}}>
          <span>
            {item.description}
          </span>
        </Card>
      {/each}
    </div>
  </Section>
</Main>

<style>
  .home_grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-block: 2rem;
  }
</style>
