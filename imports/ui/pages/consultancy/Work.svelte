<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import ConsultancyHeader from './ConsultancyHeader.svelte';
  import Card from '../../components/reusable/Card.svelte';
  import FlipCard from '../../components/reusable/FlipCard.svelte';

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

<ConsultancyHeader />

<section>
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
</section>

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
            colors={item.colors}
            on:click={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
            on:mouseenter={() => (selectedIndex === index ? (selectedIndex = '') : (selectedIndex = index))}
            cardTitle={item[language].displayName}
            buttonText={thisUi.translate('read', language)}
          >
            <img
              src="/consultancy/{item.name}.png"
              alt={item[language].displayName}
              style=" filter: opacity(0.6) drop-shadow(0 0 0 {item.colors});"
              slot="image"
            />
            <span slot="description">{item[language].description}</span>
          </FlipCard>
        </li>
      {/each}
    </ul>
  </article>
</section>

<style>
  header {
    display: flex;
    gap: 1.2em;
    align-items: center;
    padding: 1em;
    margin: 0 2%;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  section {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2em;
    list-style-type: none;
  }
</style>
