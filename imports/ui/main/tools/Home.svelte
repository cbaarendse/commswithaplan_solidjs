<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, toolsHomeItems} from '../../stores/stores';
  $: translatedToolsHomeItems = $toolsHomeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Header>
    <Brand brand={{color: 'blue', size: 'xl_2', title: 'Comms With A Plan'}}>
      <LogoReachApp size="3rem" />
      <div slot="title">ReachApp</div>
    </Brand>
  </Header>

  <Section>
    <Article>
      {#each translatedToolsHomeItems as item}
        <div>
          <Card card={{color: 'blue', title: item.displayName}}>
            <span>
              {item.description}
            </span>
          </Card>
        </div>
      {/each}
    </Article>
  </Section>
</Main>

<style>
  div {
    grid-column: 1/3;
  }
</style>
