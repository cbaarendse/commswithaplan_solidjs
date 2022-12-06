<script lang="ts">
  // imports
  import type {Article} from '../../types/types';

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
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
