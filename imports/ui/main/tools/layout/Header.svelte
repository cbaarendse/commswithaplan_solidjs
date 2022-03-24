<script lang="ts">
</script>

<header>
  <slot />
</header>

<style>
  header {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 1rem 0;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  @media screen and (min-width: 760px) {
    header {
      display: none;
    }
  }
</style>
