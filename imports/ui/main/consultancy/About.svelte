<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {aboutItems} from '../../stores/consultancy';

  // variables;
  $: translatedAboutItems = $aboutItems.filter((item) => item.language === $language);
</script>

<header>
  <BreadCrumbs />
</header>
<section>
  <div class="about__flex">
    {#each translatedAboutItems as item}
      <Card card={{fontSize: '0.9em'}}>{item.description}</Card>
    {/each}
    <Card card={{fontSize: '0.9em'}}>
      <a href="https://www.linkedin.com/in/cbaarendse/">https://www.linkedin.com/in/cbaarendse/</a>
    </Card>
  </div>
</section>

<style>
  .about__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .about__flex :global(.card) {
    flex: 1 1 32rem;
  }
</style>
