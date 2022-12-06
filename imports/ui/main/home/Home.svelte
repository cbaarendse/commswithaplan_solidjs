<script lang="ts">
  // imports
  import Main from '../../layout/Main.svelte';
  import Section from '../../layout/Section.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {homeItems} from '../../stores/home';
  import {Content, Color, Illustrated, Actionable} from '../../types/types';

  // variables
  $: translatedHomeItems = $homeItems.filter(
    (item: Content & Color & Illustrated & Actionable) => item.language === $language
  );
</script>

<Main>
  <Section>
    <div class="home__grid">
      {#each translatedHomeItems as item}
        <Card
          card={{
            title: item.displayName,
            color: 'blue',
            imgFiles: item.imgFiles,
            link: item.link,
            action: item.action
          }}
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
