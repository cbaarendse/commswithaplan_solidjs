<script lang="ts">
  // imports

  // variables
  export let subtitle: string;
  export let text: string;
  export let elaboration: string | undefined;

  // functions
</script>

<h3>&para;&nbsp;{subtitle}</h3>
<p>
  {text}
</p>
<p>
  <i>{elaboration}</i>
</p>

<style>
  h3 {
    font-size: var(--ra-fs-desktop);
  }
  p {
    margin: 1rem 0;
  }
</style>
