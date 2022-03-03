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
    <div class="contact__grid">
      <Header>
        <Brand
          brand={{
            color: 'blue',
            fontSize: 'var(--ra-fs-xl)',
            title: `Comms With A Plan - ${$language === 'dutch' ? 'Contact' : 'Contact'}`
          }}
          ><LogoCommsWithAPlan
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
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
  .contact__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-block: 2rem;
  }
</style>
