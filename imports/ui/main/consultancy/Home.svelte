<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
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
    <div class="home__flex">
      <Header>
        <Brand
          brand={{
            title: `Comms With A Plan - ${$language === 'dutch' ? 'Home' : 'Home'}`,
            color: 'var(--ra-blue)',
            fontSize: 'var(--ra-fs-2xl)'
          }}
          ><LogoCommsWithAPlan
            logo={{
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

      {#each translatedConsultancyHomeItems as item}
        <Card card={{title: item.displayName, color: 'blue'}}>
          <span>
            {@html item.description}
          </span>
        </Card>
      {/each}
    </div>
  </Section>
</Main>

<style>
  .home__flex {
    display: flex;
    flex-wrap: wrap;
  }

  .home__flex :global(header) {
    margin: 1rem;
    flex: 0 1 100%;
  }
  .home__flex :global(.card) {
    margin: 1rem;
    flex: 1 1 320px;
  }
</style>
