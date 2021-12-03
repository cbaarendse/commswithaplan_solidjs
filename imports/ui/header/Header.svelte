<header><slot /></header>

<style>
  /* smaller screens: navigation toggled by input.nav-toggle (checkbox), this requires position: absolute */
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
