<script lang="ts">
  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // packages
  // import Fa from 'svelte-fa/src/fa.svelte';
  import Fa from 'svelte-fa';
  import {faLinkedin} from '@fortawesome/free-brands-svg-icons';

  // variables
  import {language, contactItems} from '../../../../client/stores';
  $: translatedContactItems = $contactItems.filter((item) => item.language === $language);
</script>

<Main>
  <Header>
    <Brand brand={{color: 'blue', size: 'xl', title: 'Comms With A Plan'}}><LogoCommsWithAPlan size={'3rem'} /></Brand>
  </Header>

  <Section>
    <h2>Contact</h2>
    {#each translatedContactItems as item}
      <Card card={{color: 'blue', title: item.displayName}}>
        <address>
          {item.description}
        </address>
      </Card>
    {/each}
    <Card
      card={{title: 'LinkedIn', color: 'blue', link: 'https://www.linkedin.com/in/cbaarendse/', action: 'LinkedIn'}}
    >
      <address>
        <a href="https://www.linkedin.com/in/cbaarendse/"> <Fa icon={faLinkedin} size={'2x'} color={'#003366'} /></a>
      </address>
    </Card>
    <span
      >{#if $language == 'dutch'}
        Bel me of schrijf.
      {:else}
        Give me a call or write.
      {/if}
    </span>
  </Section>
</Main>

<style>
  span {
    color: var(--ra-red);
  }
</style>
