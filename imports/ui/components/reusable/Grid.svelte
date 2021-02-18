<script>
  export let minWidth;
</script>

<div style="min-width:{minWidth}"><slot /></div>

<style>
  div {
    display: grid;
  }
</style>
