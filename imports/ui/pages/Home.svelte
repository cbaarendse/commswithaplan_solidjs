<script>
  import Card from '../components/reusable/Card.svelte';

  // variables
  export let language;
</script>

<main>
  <section>
    <header><h4>Comms With A Plan</h4></header>
    <Card>Media hulp bij marketing communicatie</Card>
    <article>Media hulp bij marketing communicatie</article>
    <article>Media hulp bij marketing communicatie</article>
    <Card>Media hulp bij marketing communicatie</Card>
    <Card>Media hulp bij marketing communicatie</Card>
  </section>
  <section>
    <Card
      backgroundColor={'DarkSeaGreen'}
      color={'LightGreen'}
      cardTitle={'Comms With A Plan'}
      cardLink={'/commswithaplan'}
      cardLinkText={'Read more...'}>Comms With A Plan provides Media Management consultancy.</Card
    >

    <Card
      backgroundColor={'DarkSalmon'}
      color={'var(--ra-red)'}
      cardTitle={'Bereik'}
      cardLink={'/reach'}
      cardLinkText={'Read more...'}>A handy tool to estimate your total reach.</Card
    >

    <Card
      backgroundColor={'LightBlue'}
      color={'White'}
      cardTitle={'Schema'}
      cardLink={'/schedule'}
      cardLinkText={'Read more...'}>All your campaigns in one place with Schedule.</Card
    >
  </section>
  <section />
</main>

<style>
</style>
