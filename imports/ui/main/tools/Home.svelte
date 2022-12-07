<script lang="ts">
  // imports
  import Main from '../../layout/Main.svelte';
  import Section from '../../layout/Section.svelte';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {toolsHomeItems} from '../../stores/tools';
  import {Content, Color, Actionable} from '../../types/types';

  // variables
  $: translatedToolsHomeItems = $toolsHomeItems.filter(
    (item: Content & Color & Actionable) => item.language === $language
  );

  // functions
</script>

<Main>
  <Section>
    <div class="home__flex">
      <BreadCrumbs breadCrumbs={['tools', 'home']} />
      {#each translatedToolsHomeItems as item}
        <Card card={{color: 'blue', title: item.displayName, link: item.link, action: item.action}}>
          {item.description}
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

  :global(.card) {
    flex: 1 1 320px;
  }
</style>
