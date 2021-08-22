<script>
  import Card from '../../components/reusable/Card.svelte';
  import LogoCommsWithAPlan from '../../components/reusable/LogoCommsWithAPlan.svelte';

  // variables
  export let language;
</script>

<header>
  <div class="logo">
    <LogoCommsWithAPlan />
    <span class="brand">Comms With A Plan</span>
  </div>
</header>
<section>
  <Card
    backgroundColor={'HoneyDew'}
    color={'var(--ra-blue)'}
    cardTitle={'Comms With A Plan'}
    imgUrl={'/castle.jpg'}
    cardLink={'/commswithaplan'}
    cardLinkText={'Read more...'}>Comms With A Plan provides Media Management consultancy.</Card
  >

  <Card
    backgroundColor={'LavenderBlush'}
    color={'var(--ra-blue)'}
    cardTitle={'Bereik'}
    imgUrl={'/organ.jpg'}
    cardLink={'/reachapp'}
    cardLinkText={'Read more...'}>A handy tool to estimate your total reach.</Card
  >

  <Card
    backgroundColor={'AliceBlue'}
    color={'var(--ra-blue)'}
    cardTitle={'Schema'}
    imgUrl={'/gates.jpg'}
    cardLink={'/schedule'}
    cardLinkText={'Read more...'}>All your campaigns in one place with Schedule.</Card
  >
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

  section {
    padding: 1em;
    margin-bottom: 0.5em;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 49ch;
    gap: 2em;
  }

  @media (min-width: 119ch) {
    section {
      grid-auto-flow: column;
    }
  }
</style>
