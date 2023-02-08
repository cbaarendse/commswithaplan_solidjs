<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../../stores/utils';
  import {definitions, toolsHomeItems} from '../../../stores/tools';
  import createConverter from '/imports/ui/functions/convert';

  // variables
  const converter = createConverter();
  $: expandedToolsHomeItems = converter.expandItems<
    typeof $toolsHomeItems[number],
    typeof $toolsHomeItems[number]['definitions'][0]
  >($toolsHomeItems, $language);

  // functions
</script>

<BreadCrumbs />
<section>
  <div class="home__flex">
    {#each expandedToolsHomeItems as item}
      <Card
        card={{
          color: item.color,
          title: item.displayName,
          link: item.link,
          action: item.action,
          fontSize: '0.9em'
        }}
      >
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
