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
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }
</style>
