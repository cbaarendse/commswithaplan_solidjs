<script>
  // variables
  export let title;
</script>

<header>
  <div class="brand">
    <slot />
    <span class="brand-label">{title}</span>
  </div>
</header>

<style>
  header {
    padding: 2rem;
    margin: 2em auto;
    width: 60%;
    background-color: honeydew;
    border-radius: 5px;
  }
  .brand {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.7em;
    align-items: center;
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }
</style>
