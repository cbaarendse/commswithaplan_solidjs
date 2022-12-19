<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {homeItems} from '../../stores/home';
  import {Content, Color, Illustrated, Actionable} from '../../types/types';

  // variables
  $: translatedHomeItems = $homeItems.filter(
    (item: Content & Color & Illustrated & Actionable) => item.language === $language
  );
</script>

<BreadCrumbs breadCrumbs={['/']} />
<section>
  <div class="home__grid">
    {#each translatedHomeItems as item}
      <Card
        card={{
          title: item.displayName,
          color: 'blue',
          imgFiles: item.imgFiles,
          link: item.link,
          action: item.action,
          sizes: '1em'
        }}
        >{item.description}
      </Card>
    {/each}
  </div>
</section>

<style>
  .home__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    gap: 2em;
  }
</style>
