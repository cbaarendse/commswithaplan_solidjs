<script lang="ts">
  export let display: 'none' | 'block' = 'block';
</script>

<div style={display}><slot /></div>

<style>
  div {
    background: magenta;
    flex: 1 1 100%;
  }
</style>
