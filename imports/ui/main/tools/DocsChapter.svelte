<script lang="ts">
  // components
  import DocsParagraph from './DocsParagraph.svelte';

  // types
  import {ToolsDocsChapter} from '../../../../types/interfaces';

  // variables
  export let chapter: ToolsDocsChapter;
</script>

<div>
  <h3>&sect;&nbsp;{chapter.displayName}</h3>
  <ul>
    {#each chapter.paragraphs as paragraph}
      <li>
        <DocsParagraph
          subtitle={paragraph.displayName}
          text={paragraph.description}
          elaboration={paragraph.elaboration}
        />
      </li>
    {/each}
  </ul>
  <picture>
    <img src="/documentation{chapter.imgFile}" alt={chapter.displayName} />
  </picture>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  ul {
    list-style-type: none;
  }
  img {
    max-width: 300px;
  }
</style>
