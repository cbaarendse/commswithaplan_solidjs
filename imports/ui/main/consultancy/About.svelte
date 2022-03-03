<script lang="ts">
  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // providers

  // variables
  import {language, aboutItems} from '../../stores/stores';
  $: translatedAboutItems = $aboutItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <div class="about__grid">
      <Header>
        <Brand
          brand={{
            color: 'blue',
            fontSize: 'var(--ra-fs-xl',
            title: `Comms With A Plan - ${$language === 'dutch' ? 'Over' : 'About'}`
          }}
          ><LogoCommsWithAPlan
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
          /></Brand
        >
      </Header>

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
  .about__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-block: 2rem;
  }
</style>
