<script lang="ts">
  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // packages

  // variables
  import {language, contactItems} from '../../stores/stores';
  $: translatedContactItems = $contactItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <div class="contact__flex">
      <Header>
        <Brand
          brand={{
            color: 'var(--ra-blue)',
            fontSize: 'var(--ra-fs-2xl)',
            title: `Consultancy - ${$language === 'dutch' ? 'Contact' : 'Contact'}`
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
          />
        </Brand>
      </Header>

      {#each translatedContactItems as item}
        <Card card={{color: 'blue', title: item.displayName}}>
          <address>
            {item.description}
          </address>
        </Card>
      {/each}
      <Card
        card={{title: 'LinkedIn', color: 'blue', link: 'https://www.linkedin.com/in/cbaarendse/', action: 'LinkedIn'}}
      >
        <address>
          <a href="https://www.linkedin.com/in/cbaarendse/"><b>In</b></a>
        </address>
      </Card>
    </div>
    <span
      >{#if $language == 'dutch'}
        Bel me of schrijf.
      {:else}
        Give me a call or write.
      {/if}
    </span>
  </Section>
</Main>

<style>
  span {
    color: var(--ra-red);
  }
  .contact__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .contact__flex :global(header) {
    flex: 0 1 100%;
  }
  .contact__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
