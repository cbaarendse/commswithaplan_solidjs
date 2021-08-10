<script>
  import Card from '../../components/reusable/Card.svelte';

  // variables
  export let language;
</script>

<header><h1>Comms With A Plan</h1></header>
<section>
  <Card>Media hulp bij marketing communicatie</Card>
  <Card>Media hulp bij marketing communicatie</Card>
  <Card>Media hulp bij marketing communicatie</Card>
  <Card
    backgroundColor={'HoneyDew'}
    color={'var(--ra-blue)'}
    cardTitle={'Comms With A Plan'}
    cardLink={'/commswithaplan'}
    cardLinkText={'Read more...'}>Comms With A Plan provides Media Management consultancy.</Card
  >

  <Card
    backgroundColor={'LavenderBlush'}
    color={'var(--ra-blue)'}
    cardTitle={'Bereik'}
    imgUrl={'/castle.jpg'}
    cardLink={'/reach/'}
    cardLinkText={'Read more...'}>A handy tool to estimate your total reach.</Card
  >

  <Card
    backgroundColor={'AliceBlue'}
    color={'var(--ra-blue)'}
    cardTitle={'Schema'}
    cardLink={'/schedule'}
    cardLinkText={'Read more...'}>All your campaigns in one place with Schedule.</Card
  >
</section>

<style>
  /* TODO: this will go, styling per page */

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
    border: 1px dashed var(--ra-green);
    padding: 1em;
    margin-bottom: 0.5em;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
</style>
