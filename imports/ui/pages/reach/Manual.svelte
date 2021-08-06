<script>
  // variables
  export let language;
</script>

<section>
  <article>
    <strong>This is how ReachApp and the App work</strong>
  </article>
</section>

<style>
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
