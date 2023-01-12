<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {workItems} from '../../stores/consultancy';

  // variables
  $: translatedWorkItems = $workItems.filter((item) => item.language === $language);
</script>

<BreadCrumbs />
<section>
  <p>
    {#if $language === 'dutch'}
      Zaken die ik manage gedurende het reclameproces (je kan kiezen en mixen):
    {:else}
      Things I'll manage along the advertising process (you can pick and mix):
    {/if}
  </p>
  <div class="work__flex">
    {#each translatedWorkItems as item}
      <Card
        card={{
          color: item.color,
          title: item.displayName,
          fontSize: '0.9em',
          imgFiles: [`/consultancy/${item.name}.jpg`]
        }}
      >
        {item.description}
      </Card>
    {/each}
  </div>
</section>

<style>
  .work__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .work__flex :global(.card) {
    flex: 1 1 32rem;
  }
</style>
