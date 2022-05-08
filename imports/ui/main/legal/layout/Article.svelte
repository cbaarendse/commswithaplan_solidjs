<script>
  // imports
  import Article from '../layout/Article.svelte';

  // variables
  export let item;
</script>

<article>
  <h2>{item.displayName}</h2>
  {#each item.paragraphs as paragraph}
    <p>
      <strong>{paragraph.description}</strong>
      {paragraph.elaboration}
    </p>
  {/each}
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
</style>
