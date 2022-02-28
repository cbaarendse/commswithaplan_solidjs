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
    width: min(100% - 2rem, 50rem);
    margin-inline: auto;
    padding: 2rem 0 0 0;
    overflow: auto;
  }

  @media screen and (min-width: 760px) {
  }
</style>
