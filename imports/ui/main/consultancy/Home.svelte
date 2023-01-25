<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {consultancyHomeItems} from '../../stores/consultancy';
  import {Content, Color, Actionable} from '../../typings/types';

  // variables
  $: translatedConsultancyHomeItems = $consultancyHomeItems.filter(
    (item: Content & Color & Actionable) => item.language === $language
  );
</script>

<BreadCrumbs />
<section>
  <div class="home__flex">
    {#each translatedConsultancyHomeItems as item}
      <Card card={{title: item.displayName, color: 'blue', link: item.link, action: item.action, fontSize: '0.9em'}}>
        <!-- @html because of <mark></mark> tags in text -->
        {@html item.description}
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
