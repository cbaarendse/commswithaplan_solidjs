<script lang="ts">
  // imports
  import Main from '../../layout/Main.svelte';
  import Section from '../../layout/Section.svelte';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {consultancyHomeItems} from '../../stores/consultancy';
  import {Content, Color, Actionable} from '../../types/types';

  // variables
  $: translatedConsultancyHomeItems = $consultancyHomeItems.filter(
    (item: Content & Color & Actionable) => item.language === $language
  );
</script>

<Main>
  <BreadCrumbs breadCrumbs={['consultancy']} />
  <Section>
    <div class="home__flex">
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
