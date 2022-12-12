<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {aboutItems} from '../../stores/consultancy';

  // variables;
  $: translatedAboutItems = $aboutItems.filter((item) => item.language === $language);
</script>

<BreadCrumbs breadCrumbs={['consultancy']} />
<section>
  <div class="about__flex">
    {#each translatedAboutItems as item}
      <Card card={{}}>{item.description}</Card>
    {/each}
    <Card card={{}}>
      <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
    </Card>
  </div>
</section>

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
