<script lang="ts">
  // imports
  import Section from '../../reusable/Section.svelte';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {workItems} from '../../stores/consultancy';

  // variables
  $: translatedWorkItems = $workItems.filter((item) => item.language === $language);
</script>

<BreadCrumbs breadCrumbs={['consultancy']} />
<Section>
  <div class="work__flex">
    <p>
      {#if $language === 'dutch'}
        Zaken die ik manage gedurende het proces (je kan kiezen en mixen):
      {:else}
        Things I'll manage along the process (you can pick and mix):
      {/if}
    </p>
    {#each translatedWorkItems as item}
      <Card card={{color: item.color, title: item.displayName, imgFiles: [`/consultancy/${item.name}.jpg`]}}>
        {item.description}
      </Card>
    {/each}
  </div>
</Section>

<style>
  .work__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .work__flex :global(p) {
    flex: 0 1 100%;
  }
  .work__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
