<script lang="ts">
  // packages

  // components

  // variables
</script>

<article>
  <slot />
</article>

<style>
  article {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 480px));
    grid-auto-rows: auto;
    justify-content: center;
    gap: 2rem;
  }
</style>
