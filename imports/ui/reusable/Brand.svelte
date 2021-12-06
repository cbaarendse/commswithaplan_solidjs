<script>
  // variables
  export let title;
</script>

<div class="brand">
  <slot />
  <span class="brand-label">{title}</span>
</div>

<style>
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
