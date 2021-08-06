<script>
  import Card from '../../components/reusable/Card.svelte';

  // variables
  export let language;
</script>

<header><h1>Reach Estimation</h1></header>
<section>
  <Card>Reach in marketing communication</Card>
  <article>Reach in marketing communication</article>
  <article>Reach in marketing communication</article>
  <Card>Reach in marketing communicatione</Card>
  <footer>goodbye</footer>
</section>

<style>
  header {
    grid-area: main-header;
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
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-rows: auto;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    section {
      grid-template-columns: 1fr;
    }
  }
  h1 {
    color: darkorange;
  }
</style>
