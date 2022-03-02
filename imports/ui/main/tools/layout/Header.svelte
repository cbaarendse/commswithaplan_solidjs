<script lang="ts">
</script>

<header>
  <slot />
</header>

<style>
  header {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }
</style>
