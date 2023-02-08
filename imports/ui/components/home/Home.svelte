<script lang="ts">
  // imports
  import BreadCrumbs from '../reusable/BreadCrumbs.svelte';
  import Card from '../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {homeItems} from '../../stores/home';
  import createConverter from '../../functions/convert';

  // variables
  const converter = createConverter();

  $: expandedHomeItems = converter.expandItems<typeof $homeItems[number], typeof $homeItems[number]['definitions'][0]>(
    $homeItems,
    $language
  );
</script>

<BreadCrumbs />
<section>
  <div class="home__flex">
    {#each expandedHomeItems as item}
      <Card
        card={{
          title: item.displayName,
          color: 'blue',
          imgFiles: item.imgFiles,
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

  .home__flex :global(.card) {
    flex: 1 1 32rem;
  }
</style>
