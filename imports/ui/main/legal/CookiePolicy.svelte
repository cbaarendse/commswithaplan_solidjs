<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import {language} from '../../stores/utils';
  import {cookiePolicy} from '../../stores/legal';

  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // variables
  $: translatedCookiePolicy = $cookiePolicy.filter((item) => item.language === $language);
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
      {#each translatedCookiePolicy as cookiePolicyItem}
        <article>
          <h1>{cookiePolicyItem.displayName}</h1>
          {#each cookiePolicyItem.paragraphs as cookiePolicyParagraph}
            <p>
              <strong>{cookiePolicyParagraph.description}</strong>
              {cookiePolicyParagraph.elaboration}
            </p>
          {/each}
        </article>
      {/each}
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
  .cookie_policy__flex :global(article) {
    flex: 1 1 0;
  }
  article {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
</style>
