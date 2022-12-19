<script lang="ts">
  // imports
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

<BreadCrumbs />
<section>
  <div class="home__flex">
    {#each translatedToolsHomeItems as item}
      <Card card={{color: 'blue', title: item.displayName, link: item.link, action: item.action}}>
        {item.description}
      </Card>
    {/each}
  </div>
</section>

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
