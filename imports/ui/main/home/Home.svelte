<script lang="ts">
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, homeItems} from '../../stores/stores';
  $: translatedHomeItems = $homeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <div class="home__grid">
      {#each translatedHomeItems as item}
        <Card
          card={{title: item.displayName, color: 'blue', imgFile: item.imgFile, link: item.link, action: item.action}}
          >{item.description}
        </Card>
      {/each}
    </div>
  </Section>
</Main>

<style>
  .home__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
</style>
