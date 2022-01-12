<script>
</script>

<header>
  <slot />
</header>

<!-- TODO: emulate svelte or meteor documentation -->
<style>
  header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.2rem;
    grid-template-areas: 'brand title';
    grid-column: 2/4;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }
</style>
