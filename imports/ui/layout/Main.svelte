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
    width: min(100% - 0.2rem, 70rem);
    font-size: clamp(var(--ra-fs-s), 2vw, var(--ra-fs-m));
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
