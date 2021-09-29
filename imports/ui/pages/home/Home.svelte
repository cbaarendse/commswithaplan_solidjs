<script>
  import Card from '../../components/reusable/Card.svelte';
  import LogoCommsWithAPlan from '../../components/reusable/LogoCommsWithAPlan.svelte';

  // variables
  export let language;
</script>

<section>
  <Card
    cardTitle={'Comms With A Plan'}
    imgUrl={'/home/consultant.jpeg'}
    cardLink={'/commswithaplan'}
    cardLinkText={'Read more'}
    colors={'blue'}
  >
    <span slot="description">Comms With A Plan provides Media Management consultancy.</span></Card
  >

  <Card
    cardTitle={'Bereik'}
    imgUrl={'/home/night_crowd.jpg'}
    cardLink={'/reachapp'}
    cardLinkText={'Read more'}
    colors={'green'}
  >
    <span slot="description">A handy tool to estimate your total reach.</span></Card
  >

  <Card
    cardTitle={'Schema'}
    imgUrl={'/home/coins.jpg'}
    cardLink={'/schedule'}
    cardLinkText={'Read more'}
    colors={'grey'}
  >
    <span slot="description">All your campaigns in one place with Schedule.</span>
  </Card>
</section>

<style>
  section {
    margin: 1em 2em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25em, 30em));
    justify-content: center;
    gap: 2em;
  }
</style>
