<script lang="ts">
  // components
  import DocsParagraph from './DocsParagraph.svelte';

  // types
  import type {ToolsDocsChapter} from '../../types/types';
  export let chapter: ToolsDocsChapter;
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
        <img src="/documentation{imgFile}" alt={chapter.displayName} />
      </picture>
    {/each}
  {/if}
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  h2 {
    font-size: var(--ra-fs-2xl);
  }
  ul {
    list-style-type: none;
  }
  img {
    max-width: 300px;
  }
</style>
