<script>
  // packages

  // components

  // providers

  // variables

  // functions
</script>

<main>
  <slot />
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 48fr 1fr;
    grid-template-rows: auto, auto;
    grid-auto-rows: auto;
    padding: 0.4rem 0 0 0;
    margin: 0.4rem 0 0 0;
    overflow: auto;
  }
  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 10fr 1fr;
      padding: 2rem 0 0 0;
    }
  }
</style>
