<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';

  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, consultancyHomeItems} from '../../stores/stores';

  $: translatedConsultancyHomeItems = $consultancyHomeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Header>
    <Brand brand={{title: 'Comms With A Plan', color: 'blue', size: 'xl_2'}}><LogoCommsWithAPlan size={'3rem'} /></Brand
    >
  </Header>

  <Section>
    {#each translatedConsultancyHomeItems as item}
      <Card card={{title: item.displayName, color: 'blue'}}>
        <span>
          {item.description}
        </span>
      </Card>
    {/each}
  </Section>
</Main>

<style>
</style>
