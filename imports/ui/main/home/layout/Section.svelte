<script lang="ts">
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
    margin: 2rem 0rem;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-l));
  }
</style>
