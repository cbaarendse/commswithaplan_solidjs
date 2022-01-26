<script lang="ts">
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
    grid-template-columns: 0 4fr 0;
    grid-auto-rows: auto;
    /* gap: 2rem; */
  }

  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 4fr 1fr;
    }
  }
</style>
