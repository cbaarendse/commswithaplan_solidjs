<script lang="ts">
  // packages

  // components

  // providers

  // variables

  // functions
</script>

<section>
  <slot />
</section>

<style>
  section {
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-l));
    gap: 1em;
    margin: 2rem 0 0 0;
    min-width: 320px;
  }
</style>
