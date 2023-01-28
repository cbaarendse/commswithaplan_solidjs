<script lang="ts">
  // imports
  import type {Article} from '../../typings/types';

  // variables
  export let item: Article;
</script>

<article>
  <h3>{item.displayName}</h3>
  {#each item.paragraphs as paragraph}
    <p>
      <strong>{paragraph.displayName}</strong>
      {paragraph.description}
    </p>
  {/each}
</article>

<style>
  article {
    /* TODO: no flex or row */
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  h3 {
    margin: 0em;
  }
  p {
    margin: 0em;
  }
</style>
