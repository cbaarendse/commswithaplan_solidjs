<script lang="ts">
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
    width: min(100% - 0.2rem, 70rem);
    margin-inline: auto;
    padding-block: 2rem;
    overflow: auto;
  }

  @media screen and (min-width: 320px) {
    main {
      width: min(100% - 2rem, 70rem);
    }
  }
</style>
