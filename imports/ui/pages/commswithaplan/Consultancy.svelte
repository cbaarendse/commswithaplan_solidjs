<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import Accordion from '../../components/reusable/Accordion.svelte';
  import Card from '../../components/reusable/Card.svelte';
  import LogoCommsWithAPlan from '../../components/reusable/LogoCommsWithAPlan.svelte';

  // content
  import {processItems} from '../../../../client/content';

  // functions

  // variables
  export let language;
  let selectedIndex;
</script>

<header>
  <div class="logo">
    <LogoCommsWithAPlan />
    <span class="brand">Comms With A Plan</span>
  </div>
</header>
<section>
  <Card cardTitle="Comms With A Plan">
    {#if language == 'dutch'}
      <p>Comms With A Plan is een Media Management consultancy voor adverteerders.</p>
      <p>Ik initieer, onderhoud en evalueer je media strategie, ik manage je bureaus en budget.</p>
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
        Comms With A Plan is een flexibele partner in die zin dat het werk per project kan zijn, maar ook meer continu.
        Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)
      </p>
    {:else}
      <p>
        Comms With A Plan is a flexible unit in the sense that work can be project based, or more continuous, based on
        demand. (Give me a call to explain.)
      </p>
    {/if}
  </Card>
</section>
<section>
  <article id="work">
    <h2>Work</h2>
    {#if language == 'dutch'}
      <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
    {:else}
      <p>Things I'll manage along the process (you can pick and mix):</p>
    {/if}
    <ul>
      {#each processItems as item, index}
        <li>
          <Accordion
            visible={selectedIndex === index}
            on:click={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
          >
            <h4 slot="title">{item[language].name}</h4>
            {item[language].description}
          </Accordion>
        </li>
      {/each}
    </ul>
  </article>

  <article id="about">
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

  <article id="contact">
    <h2>Contact</h2>
    {#if language == 'dutch'}
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
</section>

<style>
  header {
    max-height: 6em;
    padding: 1em;
    margin: 2em 0;
    border: 1px dotted orange;
    border-radius: 0.2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--ra-teal-off-white);
  }
  div {
    margin: 0.4em;
  }
  div.logo {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  span.brand {
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
    padding: 0 1em;
  }
  section:nth-of-type(1) {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: auto;
    gap: 2em;
  }

  @media (min-width: 119ch) {
    section:nth-of-type(1) {
      grid-auto-flow: column;
    }
  }

  section:nth-of-type(2) {
    display: grid;
    grid-template-areas:
      'work'
      'about'
      'contact';
    gap: 2em;
  }

  @media (min-width: 119ch) {
    section:nth-of-type(2) {
      grid-template-areas:
        'work work'
        'about contact';
    }
  }
  article#work {
    grid-area: work;
  }

  article#about {
    grid-area: about;
  }

  article#contact {
    grid-area: contact;
  }

  article {
    margin: 1em 2em;
  }

  ul {
    list-style-type: none;
  }
  li {
    margin-bottom: 1em;
  }
</style>
