<script lang="ts">
  // imports
  import Section from '../../reusable/Section.svelte';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {aboutItems} from '../../stores/consultancy';

  // variables;
  $: translatedAboutItems = $aboutItems.filter((item) => item.language === $language);
</script>

<BreadCrumbs breadCrumbs={['consultancy']} />
<Section>
  <div class="about__flex">
    {#each translatedAboutItems as item}
      <Card card={{}}>{item.description}</Card>
    {/each}
    <Card card={{}}>
      <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
    </Card>
  </div>
</Section>

<style>
  .about__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .about__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
