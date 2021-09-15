<script>
  import Card from '../../components/reusable/Card.svelte';
  import LogoCommsWithAPlan from '../../components/reusable/LogoCommsWithAPlan.svelte';

  // variables
  export let language;
</script>

<section>
  <Card
    cardTitle={'Comms With A Plan'}
    imgUrl={'/consultant.jpeg'}
    cardLink={'/commswithaplan'}
    cardLinkText={'Read more'}
    colors={'blue'}>Comms With A Plan provides Media Management consultancy.</Card
  >

  <Card
    cardTitle={'Bereik'}
    imgUrl={'/night_crowd.jpg'}
    cardLink={'/reachapp'}
    cardLinkText={'Read more'}
    colors={'green'}>A handy tool to estimate your total reach.</Card
  >

  <Card cardTitle={'Schema'} imgUrl={'/coins.jpg'} cardLink={'/schedule'} cardLinkText={'Read more'} colors={'grey'}
    >All your campaigns in one place with Schedule.</Card
  >
</section>

<style>
  section {
    /* padding: 1em; */
    margin-bottom: 0.5em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25em, 30em));
    justify-content: center;
    gap: 2em;
  }
</style>
