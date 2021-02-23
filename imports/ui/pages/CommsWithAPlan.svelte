<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import Accordion from '../components/reusable/Accordion.svelte';

  // content
  import {processItems} from '../../../client/content';

  // variables
  export let language;
</script>

<main>
  <section>
    <header><h1>Comms With A Plan</h1></header>
    <article>
      {#if language == 'dutch'}
        <p>
          Comms With A Plan is een Media Management consultancy voor adverteerders. Ik initieer, onderhoud en evalueer
          je media strategie, ik manage je bureaus en budget.
        </p>
      {:else}
        <p>Comms With A Plan is a Media Management consultancy for advertisers.</p>
        <p>
          At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.
        </p>
      {/if}
    </article>
    <footer>Read more...</footer>
  </section>

  <section>
    <header><h2>Consultancy</h2></header>
    <article>
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
    </article>
  </section>
  <section>
    <header><h2>Work</h2></header>
    <article>
      {#if language == 'dutch'}
        <h4>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</h4>
      {:else}
        <h4>Things I'll manage along the process (you can pick and mix):</h4>
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
  </section>
  <section>
    <header><h2>About</h2></header>
    <article>
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
          I'm Constantijn Baarendse. I've worked on different continents, for blue chip advertisers, media and
          advertising agencies.
        </p>
        <p>
          But you'll see all that here as well:
          <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
        </p>
      {/if}
    </article>
  </section>
  <section>
    <header><h2>Contact</h2></header>
    >
    <article>
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
</main>

<style>
  p {
    font-size: 1.4rem;
    margin: 1em;
    padding: 2em;
    width: fit-content;
    background-color: white;
  }
  ul {
    list-style-type: none;
  }
</style>
