<script>
  // packages

  // components

  // providers

  // variables

  // functions
</script>

<article>
  <slot />
</article>

<style>
  article {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-auto-rows: auto;
    gap: 2rem;
  }

  @media screen and (min-width: 760px) {
  }
</style>
