<script>
  // components
  import PageHeader from '../../reusable/PageHeader.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // packages
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faLinkedin} from '@fortawesome/free-solid-svg-icons';

  // variables
  import {language, contactItems} from '../../../../client/stores';
</script>

<PageHeader title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></PageHeader>

<section>
  <article class="contact">
    <h2>Contact</h2>
    {#each $contactItems as item, index}
      <Card cardTitle={item[$language].displayName}>
        <address>
          {item[$language].description}
        </address>
      </Card>
    {/each}
    <Card cardTitle="LinkedIn">
      <address>
        <a href="https://www.linkedin.com/in/cbaarendse/"> <Fa icon={faLinkedin} size="1.4em" color="#003366" /></a>
      </address>
    </Card>
  </article>

  <article>
    <span
      >{#if $language == 'dutch'}
        Bel me of schrijf.
      {:else}
        Give me a call or write.
      {/if}
    </span>
  </article>
</section>

<style>
  section {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 28ch;
    gap: 2em;
  }

  @media (min-width: 760px) {
    section {
      grid-auto-flow: column;
    }
  }

  span {
    color: var(--ra-red);
  }
</style>
