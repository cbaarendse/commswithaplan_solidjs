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
  import {language, consultancyHomeItems} from '../../../../client/stores';
</script>

<Main>
  <Header>
    <Brand brand={{title: 'Comms With A Plan', color: 'blue', sizes: 'xl_2'}}
      ><LogoCommsWithAPlan size={'3rem'} /></Brand
    >
  </Header>

  <Section>
    {#each $consultancyHomeItems as item}
      <Card card={{title: item[$language].displayName, color: 'blue'}}>
        <span>
          {item[$language].description}
        </span>
      </Card>
    {/each}
  </Section>
</Main>

<style>
</style>
