<script lang="ts">
  // imports
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import {language} from '../../stores/utils';
  import {aboutItems} from '../../stores/consultancy';
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
            style: {color: 'var(--ra-green)', fontSize: 'var(--ra-fs-2xl)'},
            title: `Consultancy - ${$language === 'dutch' ? 'Over' : 'About'}`
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
  .about__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .about__flex :global(header) {
    margin: 1rem 0;
    flex: 0 1 100%;
  }
  .about__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
