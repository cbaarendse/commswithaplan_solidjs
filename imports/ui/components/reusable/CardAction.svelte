<script lang="ts">
  // types

  // variables
  export let link: string;
</script>

<p>
  <a href={link}><slot /></a>
</p>

<style>
  p {
    flex: 0 0 100%;
    line-height: 1.7em;
    margin: 0em 0em;
  }
  a {
    font-size: 0.9em;
  }
  a:hover {
    opacity: 0.7;
  }
</style>
