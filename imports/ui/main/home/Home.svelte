<script>
  import Card from '../../reusable/Card.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // content
  import {homePageItems} from '../../../../client/content';

  // variables
  import {language} from '../../../../client/stores';
</script>

<section>
  {#each homePageItems as item, index}
    <Card
      cardTitle={item[$language].displayName}
      imgUrl={item.imgUrl}
      cardLink={item.cardLink}
      callToAction={item[$language].callToAction}
      colors={item.colors}
    >
      <span>{item[$language].description}</span>
    </Card>
  {/each}
</section>

<style>
  section {
    margin: 1em 2em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 30em));
    justify-content: center;
    gap: 2em;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-l));
  }
</style>
