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
    padding: 2rem 0 0 0;
    overflow: auto;
  }

  @media screen and (min-width: 320px) {
    main {
      width: min(100% - 2rem, 70rem);
    }
  }
</style>
