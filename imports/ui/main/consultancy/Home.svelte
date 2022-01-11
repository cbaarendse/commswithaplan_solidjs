<script>
  // packages

  // components
  import Main from './Main.svelte';
  import Header from './Header.svelte';
  import Section from './Section.svelte';
  import Article from './Article.svelte';
  import Brand from '../../reusable/Brand.svelte';

  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, consultancyHomeItems} from '../../../../client/stores';
</script>

<Main>
  <Header>
    <Brand title={'Comms With A Plan'} colors={'blue'}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </Header>

  <Section>
    <Article>
      {#each $consultancyHomeItems as item, index}
        <Card cardTitle={item[$language].displayName}>
          <span>
            {item[$language].description}
          </span>
        </Card>
      {/each}
    </Article>
  </Section>
</Main>

<style>
</style>
