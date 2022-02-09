<script lang="ts">
  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // providers
  import {UiProvider} from '../../../../types/classes';

  // variables
  import {language, aboutItems} from '../../../../client/stores';
</script>

<Main>
  <Header>
    <Brand><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </Header>

  <Section>
    <h2>{UiProvider.displayContent('about', $aboutItems, $language)}</h2>
    <p>{UiProvider.describeContent('about', $aboutItems, $language)}</p>
    <p>
      <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
    </p>
  </Section>
</Main>

<style>
</style>
