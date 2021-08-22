<script>
  // Packages
  import Card from '../../components/reusable/Card.svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faLinkedin, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';

  // Variables
  export let language;
</script>

<section>
  <Card cardTitle={'Online'}
    >cbaarendse[at]commswithaplan.com<br /> +31 6 123 987 34<br />
    <a href="https://www.linkedin.com/in/cbaarendse/"> <Fa icon={faLinkedin} size="1.4em" /></a></Card
  >
  <Card cardTitle={'Offline'}>Erich Salomonstraat 507<br /> 1087 GT Amsterdam <br /> The Netherlands</Card>

  <Card>
    <span
      >{#if language == 'english'}Give me a call or write.{:else if language == 'dutch'} Bel me of schrijf.{/if}
    </span>
  </Card>
</section>

<style>
  section {
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 28ch;
    gap: 2em;
  }

  @media (min-width: 119ch) {
    section {
      grid-auto-flow: column;
    }
  }

  span {
    color: goldenrod;
  }
</style>
