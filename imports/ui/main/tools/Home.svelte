<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Header from './layout/Header.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReach from '../../reusable/LogoReach.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, toolsHomeItems} from '../../stores/stores';
  $: translatedToolsHomeItems = $toolsHomeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <div class="home__grid">
      <Header>
        <Brand
          brand={{
            color: 'var(--ra-blue)',
            fontSize: 'var(--ra-fs-2xl)',
            title: `Reach - ${$language === 'dutch' ? 'Home' : 'Home'}`
          }}
          ><LogoReach
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
          /></Brand
        >
      </Header>
      {#each translatedToolsHomeItems as item}
        <Card card={{color: 'blue', title: item.displayName}}>
          {item.description}
        </Card>
      {/each}
    </div>
  </Section>
</Main>

<style>
  .home__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
</style>
