<script lang="ts">
  // packages

  // components

  // variables
</script>

<header>
  <slot />
</header>

<style>
  header {
    grid-column: 1 / -1;
    flex: 1 0 100%;
    margin: 2rem 0;
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
