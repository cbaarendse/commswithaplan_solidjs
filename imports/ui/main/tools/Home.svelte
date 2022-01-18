<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, toolsHomeItems} from '../../../../client/stores';
</script>

<Main>
  <Header>
    <Brand>
      <LogoReachApp size="3rem" />
      <div slot="title">ReachApp</div>
    </Brand>
  </Header>

  <Section>
    <Article>
      {#each $toolsHomeItems as item, index}
        <div>
          <Card cardTitle={item[$language].displayName}>
            <span>
              {item[$language].description}
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
