<script lang="ts">
  import {slide} from 'svelte/transition';
</script>

<div transition:slide={{delay: 200, duration: 1000}}><slot /></div>

<style>
  div {
    flex: 1 1 100%;
    display: flex;
    justify-content: end;
    gap: 1rem 2rem;
    background: magenta;
  }
</style>
