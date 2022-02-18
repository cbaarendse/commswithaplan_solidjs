<script lang="ts">
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, homeItems} from '../../../../client/stores';
  $: translatedHomeItems = $homeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <Article>
      {#each translatedHomeItems as item}
        <Card
          card={{title: item.displayName, colors: 'blue', imgFile: item.imgFile, link: item.link, action: item.action}}
        >
          <span>{item.description}</span>
        </Card>
      {/each}
    </Article>
  </Section>
</Main>

<style>
</style>
