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
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  @media screen and (min-width: 760px) {
  }
</style>
