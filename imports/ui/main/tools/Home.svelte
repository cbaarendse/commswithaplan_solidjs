<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {toolsHomeItems} from '../../stores/tools';
  import {Content, Color, Actionable} from '../../typings/types';

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
      <Card card={{color: 'blue', title: item.displayName, link: item.link, action: item.action, fontSize: '0.9em'}}>
        {item.description}
      </Card>
    {/each}
  </div>
</section>

<style>
  .home__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  :global(.card) {
    flex: 1 1 32rem;
  }
</style>
