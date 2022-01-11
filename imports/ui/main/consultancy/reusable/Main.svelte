<script>
  // packages

  // components

  // variables
</script>

<main>
  <slot />
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 7rem;
    grid-auto-rows: auto;
    gap: 2rem;
    padding: 0.4rem 0 0 0;
    margin: 0.4rem 0 0 0;
    overflow: auto;
  }

  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 3fr 1fr;
      padding: 2rem 0 0 0;
      margin: 2rem 0 0 0;
    }
  }
</style>
