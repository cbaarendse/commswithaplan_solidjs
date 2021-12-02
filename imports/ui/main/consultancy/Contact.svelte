<script>
  // components
  import PageHeader from '../../reusable/PageHeader.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language} from '../../../../client/stores';
</script>

<PageHeader title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></PageHeader>

<section>
  <article class="contact">
    <h2>Contact</h2>
    {#if $language == 'dutch'}
      <address>
        <p>e-mail: cbaarendse[at]commswithaplan.com</p>
        <p>telefoon: nul zes een twee drie negen acht zeven drie vier</p>
      </address>
    {:else}
      <address>
        <p>e-mail: cbaarendse[at]commswithaplan.com</p>
        <p>telephone: plus three one six one two three nine eight seven three four</p>
      </address>
    {/if}
  </article>

  <article>
    <Card cardTitle={'Online'}
      ><address>
        cbaarendse[at]commswithaplan.com<br /> +31 6 123 987 34<br />
        <a href="https://www.linkedin.com/in/cbaarendse/"> <Fa icon={faLinkedin} size="1.4em" color="#003366" /></a>
      </address></Card
    >
    <Card cardTitle={'Offline'}
      ><address>Erich Salomonstraat 507<br /> 1087 GT Amsterdam <br /> The Netherlands</address></Card
    >

    <Card>
      <span
        >{#if $language == 'dutch'}
          Bel me of schrijf.
        {:else}
          Give me a call or write.
        {/if}
      </span>
    </Card>
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
