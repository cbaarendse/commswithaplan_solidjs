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
    <div class="home_grid">
      {#each translatedHomeItems as item}
        <Card
          card={{title: item.displayName, color: 'blue', imgFile: item.imgFile, link: item.link, action: item.action}}
        >
          <span>{item.description}</span>
        </Card>
      {/each}
    </div>
  </Section>
</Main>

<style>
  .home_grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-block: 2rem;
  }
</style>
