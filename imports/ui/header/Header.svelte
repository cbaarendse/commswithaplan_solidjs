<header><slot /></header>

<style>
  header {
    position: absolute;
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    z-index: 999;
  }

  @media screen and (min-width: 760px) {
    header {
      position: static;
    }
  }
</style>
