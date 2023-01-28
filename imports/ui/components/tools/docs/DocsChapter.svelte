<script lang="ts">
  // imports
  import DocsParagraph from './DocsParagraph.svelte';
  import type {Chapter} from '../../../typings/types';

  // exports
  export let chapter: Chapter;
</script>

<article>
  <h2>&sect;&nbsp;{chapter.displayName}</h2>
  <ul>
    {#if chapter.paragraphs}
      {#each chapter.paragraphs as paragraph}
        <li>
          <DocsParagraph
            subtitle={paragraph.displayName}
            text={paragraph.description}
            elaboration={paragraph.elaboration}
          />
        </li>
      {/each}
    {/if}
  </ul>
  {#if chapter.imgFiles}
    {#each chapter.imgFiles as imgFile}
      <picture>
        <img src="/docs{imgFile}" alt={chapter.displayName} />
      </picture>
    {/each}
  {/if}
</article>

<style>
  article,
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em;
  }
  h2 {
    margin: 0em 0em;
  }
  img {
    max-width: 30rem;
  }
</style>
