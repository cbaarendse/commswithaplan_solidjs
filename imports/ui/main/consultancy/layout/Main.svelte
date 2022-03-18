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
    width: min(100% - 0.2rem, 70rem);
    margin: 0 auto;
    padding-bottom: 2rem;
    overflow: auto;
  }

  @media screen and (min-width: 320px) {
    main {
      width: min(100% - 2rem, 70rem);
    }
  }
</style>
