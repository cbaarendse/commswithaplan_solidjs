<script>
  // packages

  // components

  // variables
</script>

<section>
  <slot />
</section>

<style>
  section {
    grid-column: 2/3;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  @media screen and (min-width: 760px) {
  }
</style>
