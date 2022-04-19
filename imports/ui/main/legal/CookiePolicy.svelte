<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';

  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // variables
  import {language} from '../../stores/stores';
</script>

<Main>
  <Section>
    <div class="cookie_policy__flex">
      <Header>
        <Brand
          brand={{
            title: `${$language === 'dutch' ? 'Cookie Beleid' : 'Cookie Policy'}`,
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
      <article class="cookie_policy">
        <h1>
          {$language === 'dutch' ? 'Advertenties' : 'Ads'}
        </h1>
        <p>
          {#if $language === 'dutch'}'Dutch text'{:else}'English text'{/if}
        </p>
      </article>
      <article class="cookie_policy">
        <h1>{$language === 'dutch' ? 'Analyses' : 'Analytics'}</h1>
        <p>
          {#if $language === 'dutch'}'Dutch text'{:else}'English text'{/if}
        </p>
      </article>
      <article class="cookie_policy">
        <h1>{$language === 'dutch' ? 'Functioneel' : 'Functional'}</h1>
        <p>
          {#if $language === 'dutch'}'Dutch text'{:else}'English text'{/if}
        </p>
      </article>
      <article class="cookie_policy">
        <h1>{$language === 'dutch' ? 'Persoonlijk' : 'Personal'}</h1>
        <p>
          {#if $language === 'dutch'}'Dutch text'{:else}'English text'{/if}
        </p>
      </article>
      <article class="cookie_policy">
        <h1>{$language === 'dutch' ? 'Veiligheid' : 'Security'}</h1>
        <p>
          {#if $language === 'dutch'}'Dutch text'{:else}'English text'{/if}
        </p>
      </article>
    </div>
  </Section>
</Main>

<style>
  .cookie_policy__flex {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .cookie_policy__flex :global(header) {
    flex: 0 1 100%;
  }
  .cookie_policy__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
