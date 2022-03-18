<script lang="ts">
  // imports
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import {language, aboutItems} from '../../stores/stores';
  import Card from '../../reusable/Card.svelte';

  // variables;
  $: translatedAboutItems = $aboutItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <div class="about__flex">
      <Header>
        <Brand
          brand={{
            color: 'var(--ra-green)',
            fontSize: 'var(--ra-fs-xl',
            title: `Comms With A Plan - ${$language === 'dutch' ? 'Over' : 'About'}`
          }}
          ><LogoCommsWithAPlan
            logo={{
              textColor: 'var(--ra-blue)',
              fontSize: 'var(--ra-fs-5xl)',
              width: 'var(--ra-5xl)',
              height: 'var(--ra-5xl)',
              minWidth: 'var(--ra-5xl)',
              minHeight: 'var(--ra-fxl)',
              colored: true
            }}
          /></Brand
        >
      </Header>

      {#each translatedAboutItems as item}
        <Card card={{}}>{item.description}</Card>
      {/each}
      <Card card={{}}>
        <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
      </Card>
    </div>
  </Section>
</Main>

<style>
  /* .about__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  } */

  .about__flex {
    display: flex;
    flex-wrap: wrap;
  }

  :global(header) {
    margin: 1rem;
    flex: 0 1 100%;
  }
  :global(.card) {
    margin: 1rem;
    flex: 1 1 320px;
  }
</style>
