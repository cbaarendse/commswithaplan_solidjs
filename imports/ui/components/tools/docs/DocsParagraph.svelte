<script lang="ts">
  // imports

  // variables
  export let subtitle: string;
  export let text: string;
  export let elaboration: string | undefined;

  // functions
</script>

<article>
  <h3>&para;&nbsp;{subtitle}</h3>
  <p>
    {text}
  </p>
  {#if elaboration}
    <p>
      <i>{elaboration}</i>
    </p>
  {/if}
</article>

<style>
  article {
    /* TODO: flex needed? */
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em;
  }
  h3 {
    margin: 0em 0em;
  }
  p {
    margin: 0em 0em;
    padding: 0em 0em;
  }
</style>
