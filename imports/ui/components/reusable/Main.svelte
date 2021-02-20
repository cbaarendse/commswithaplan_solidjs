<main>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: 100%;
    margin: calc(3 * var(--ra-bar-height)) auto 0 auto;
    padding: 1em;
    border: 1px dashed var(--ra-blue);
  }
</style>
