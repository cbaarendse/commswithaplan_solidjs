<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import Accordion from '../../components/reusable/Accordion.svelte';
  import Card from '../../components/reusable/Card.svelte';

  // content
  import {processItems} from '../../../../client/content';

  // variables
  export let language;
</script>

<header><h1>Comms With A Plan</h1></header>
<section>
  <Card cardTitle="Comms With A Plan" cardLink="/commswithaplan" cardLinkText="Read more...">
    {#if language == 'dutch'}
      <p>
        Comms With A Plan is een Media Management consultancy voor adverteerders. Ik initieer, onderhoud en evalueer je
        media strategie, ik manage je bureaus en budget.
      </p>
    {:else}
      <p>Comms With A Plan is a Media Management consultancy for advertisers.</p>
      <p>
        At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.
      </p>
    {/if}
  </Card>

  <Card cardTitle="Consultancy">
    {#if language == 'dutch'}
      <p>
        Comms With A Plan is een flexibele partner in die zin dat het werk project gebaseerd kan zijn, maar ook meer
        continu. Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)
      </p>
    {:else}
      <p>
        Comms With A Plan is a flexible unit in the sense that work can be project base, or more continuous, based on
        demand. (Give me a call to explain.)
      </p>
    {/if}
  </Card>
</section>
<section>
  <article>
    <h2>Work</h2>
    {#if language == 'dutch'}
      <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
    {:else}
      <p>Things I'll manage along the process (you can pick and mix):</p>
    {/if}
    <ul>
      {#each processItems as item, index}
        <li>
          <Accordion>
            <h4 slot="title">{item[language].name}</h4>
            {item[language].description}
          </Accordion>
        </li>
      {/each}
    </ul>
  </article>

  <article>
    <h2>About</h2>
    {#if language == 'dutch'}
      <p>
        Ik ben Constantijn Baarendse. Ik heb gewerkt op verschillende continenten, voor 'blue chip' adverteerders,
        media- en reclamebureaus.
      </p>
      <p>
        Maar dat kun je hier ook allemaal zien:
        <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
      </p>
    {:else}
      <p>
        I'm Constantijn Baarendse. I've worked on different continents, for blue chip advertisers, media and advertising
        agencies.
      </p>
      <p>
        But you'll see all that here as well:
        <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
      </p>
    {/if}
  </article>

  <article>
    <h2>Contact</h2>
    {#if language == 'dutch'}
      <address>
        <p>e-mail: cbaarendse@commswithaplan.com</p>
        <input type="textarea" />
        <p>telefoon: nul zes een twee drie negen acht zeven drie vier</p>
      </address>
    {:else}
      <address>
        <p>e-mail: cbaarendse@commswithaplan.com</p>
        <p>telephone: plus three one six one two three nine eight seven three four</p>
      </address>
    {/if}
  </article>
</section>

<style>
  header {
    padding: 1em;
    margin: 2em 1em;
    border: 1px dotted orange;
    border-radius: 0.2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background-color: var(--ra-teal-off-white);
  }
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  article {
    flex-grow: 1;
    margin: 0 2em;
  }

  ul {
    list-style-type: none;
  }
  li {
    margin-bottom: 1em;
  }
</style>
