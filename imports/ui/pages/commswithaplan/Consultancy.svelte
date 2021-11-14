<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import Card from '../../components/reusable/Card.svelte';
  import FlipCard from '../../components/reusable/FlipCard.svelte';
  import LogoCommsWithAPlan from '../../components/reusable/LogoCommsWithAPlan.svelte';

  import {translations} from '../../../../client/constants';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // content
  import {consultancyItems} from '../../../../client/content';

  // variables
  const thisUi = new UiProvider(translations);
  export let language;
  let selectedIndex;
</script>

<header>
  <Card cardTitle="Comms With A Plan">
    <span slot="description">
      {#if language == 'dutch'}
        Comms With A Plan is een Media Management consultancy voor adverteerders.<br />
        Ik initieer, onderhoud en evalueer je media strategie, ik manage je bureaus en budget.
      {:else}
        Comms With A Plan is a Media Management consultancy for advertisers.<br />
        At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.
      {/if}
    </span>
  </Card>

  <Card cardTitle="Consultancy">
    <span slot="description">
      {#if language == 'dutch'}
        Comms With A Plan is een flexibele partner in die zin dat het werk per project kan zijn, maar ook meer continu.
        Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)
      {:else}
        Comms With A Plan is a flexible unit in the sense that work can be project based, or more continuous, based on
        demand. (Give me a call to explain.)
      {/if}
    </span>
  </Card>
</header>

<section>
  <article class="work">
    <h2>Work</h2>
    {#if language == 'dutch'}
      <p>Zaken die ik manage gedurende het proces (je kan kiezen en mixen):</p>
    {:else}
      <p>Things I'll manage along the process (you can pick and mix):</p>
    {/if}
    <ul>
      {#each consultancyItems as item, index}
        <li>
          <FlipCard
            flipped={selectedIndex === index}
            colors={item[language].colors}
            on:click={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
            on:mouseenter={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
            cardTitle={item[language].name}
            buttonText={thisUi.translate('read', language)}
          >
            <img
              src="/consultancy/{thisUi.latinizeAndJoin(item[language].name)}.png"
              alt={item[language].name}
              style=" filter: opacity(0.6) drop-shadow(0 0 0 {item[language].colors});"
              slot="image"
            />
            <span slot="description">{item[language].description}</span>
          </FlipCard>
        </li>
      {/each}
    </ul>
  </article>

  <article class="about">
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

  <article class="contact">
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
  /* phone screens */
  header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2em;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  section {
    display: grid;
    grid-template-areas:
      'work'
      'about'
      'contact';
    gap: 2em;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article.work {
    grid-area: work;
  }

  article.about {
    grid-area: about;
  }

  article.contact {
    grid-area: contact;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2em;
    list-style-type: none;
  }
  /* ipad screens and larger */
  @media (min-width: 760px) {
    header,
    section,
    article {
      margin: 1em 2em;
    }
    section {
      grid-template-areas:
        'work work'
        'about contact';
    }
  }
</style>
