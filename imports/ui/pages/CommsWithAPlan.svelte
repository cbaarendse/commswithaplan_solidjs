<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import Main from '../components/reusable/Main.svelte';
  import Section from '../components/reusable/Section.svelte';
  import Article from '../components/reusable/Article.svelte';
  import ProjectItem from '../components/ProjectItem.svelte';

  // content
  import {processItems} from '../../../client/content';

  // variables
  export let language;
</script>

<Main>
  <Section sectionTitle={'Comms With A Plan'}>
    <Article>
      {#if language == 'dutch'}
        <p>Comms With A Plan is een Media Management consultancy voor adverteerders.</p>
        <p>Ik initieer, onderhoud en evalueer je media strategie, ik manage je bureaus en budget.</p>
      {:else}
        <p>Comms With A Plan is a Media Management consultancy for advertisers.</p>
        <p>
          At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.
        </p>
      {/if}
    </Article>
  </Section>
  <Section sectionTitle={'Consultancy'}>
    <Article>
      <h3>Consultancy</h3>
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
    </Article>
    <Article>
      <h3>Work</h3>
      <ul>
        {#if language == 'dutch'}
          <h5>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</h5>
        {:else}
          <h5>Things I'll manage along the process (you can pick and mix):</h5>
        {/if}
        {#each processItems as item, index}
          <li><ProjectItem {item} {index} /></li>
        {/each}
      </ul>
    </Article>
  </Section>
  <Section sectionTitle={'About'}>
    <Article>
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
    </Article>
  </Section>
  <Section sectionTitle={'Contact'}>
    <Article>
      {#if language == 'dutch'}
        <p>e-mail: cbaarendse@commswithaplan.com</p>
        <p>telefoon: nul zes een twee drie negen acht zeven drie vier</p>
      {:else}
        <p>e-mail: cbaarendse@commswithaplan.com</p>
        <p>telephone: plus three one six one two three nine eight seven three four</p>
      {/if}
    </Article>
  </Section>
</Main>

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
