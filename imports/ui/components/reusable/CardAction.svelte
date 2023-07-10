<script lang="ts">
  // types

  // variables
  export let link: string;
</script>

<p>
  <a href={link}><slot /></a>
</p>

<style>
  a {
    font-size: 0.9em;
  }
  a:hover {
    opacity: 0.7;
  }
</style>
