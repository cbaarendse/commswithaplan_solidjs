<script>
  // variables
  export let language;
</script>

<main>
  <section>
    <article>
      <strong>Download now from the app or play store</strong>
    </article>
  </section>
</main>

<style>
  main {
    all: unset;
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 'main-header' 'main-section';
    padding: 1em;
    border: 1px dashed var(--ra-blue);
  }
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
</style>
