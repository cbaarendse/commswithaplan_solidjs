<script lang="ts">
  // imports
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {consultancyHomeItems} from '../../stores/consultancy';

  // variables
  $: translatedConsultancyHomeItems = $consultancyHomeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <div class="home__flex">
      <Header>
        <Brand
          brand={{
            title: `Consultancy - ${$language === 'dutch' ? 'Home' : 'Home'}`,
            style: {color: 'var(--ra-blue)', fontSize: 'var(--ra-fs-2xl)'}
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
        <Card card={{title: item.displayName, color: 'blue', link: item.link, action: item.action}}>
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
    gap: 2rem;
  }

  .home__flex :global(header) {
    flex: 0 1 100%;
  }
  .home__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
