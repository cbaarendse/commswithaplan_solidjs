<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import SectionHeader from './layout/SectionHeader.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';

  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, consultancyHomeItems} from '../../stores/stores';

  $: translatedConsultancyHomeItems = $consultancyHomeItems.filter((item) => item.language === $language);
</script>

<Main>
  <Section>
    <SectionHeader>
      <Brand brand={{title: 'Comms With A Plan', color: 'blue', size: 'm'}}><LogoCommsWithAPlan size={'3rem'} /></Brand>
    </SectionHeader>
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
