<script lang="ts">
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, homePageItems} from '../../../../client/stores';
</script>

<Main>
  <Section>
    <Article>
      {#each $homePageItems as item}
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
    </Article>
  </Section>
</Main>

<style>
</style>
