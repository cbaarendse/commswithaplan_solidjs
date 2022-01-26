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
    grid-column: 2/3;
    padding: 2rem;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  @media screen and (min-width: 760px) {
    header {
      grid-column: 2/3;
    }
  }
</style>
