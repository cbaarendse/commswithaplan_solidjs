<script lang="ts">
  // imports

  // variables

  // functions
</script>

<main>
  <slot />
</main>

<style>
  main {
    width: min(100% - 0.2em, 70em);
    margin: 0 auto;
    padding-bottom: 2em;
    overflow: auto;
  }

  @media screen and (min-width: 32em) {
    main {
      width: min(100% - 2em, 70em);
    }
  }
  @media screen and (min-width: 102.4em) {
    main {
      width: min(100% - 4em, 70em);
    }
  }
  @media screen and (min-width: 136.6em) {
    main {
      width: min(100% - 8em, 70em);
    }
  }
</style>
