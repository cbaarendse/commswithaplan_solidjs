<script lang="ts">
  // packages

  // components

  // variables
  export let class:string;
</script>

<article>
  <slot />
</article>

<style>
  main {
    display: grid;
    grid-template-columns: 0 4fr 0;
    grid-auto-rows: auto;
    /* gap: 2rem; */
  }
  section {
    grid-column: 2/3;
    margin: 2rem 0rem;
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-l));
  }
  article {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 480px));
    grid-auto-rows: auto;
    justify-content: center;
    gap: 2rem;
  }

  @media screen and (min-width: 760px) {
    main {
      grid-template-columns: 1fr 4fr 1fr;
    }
  }
</style>
