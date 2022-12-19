<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import DocsLink from './DocsLink.svelte';
  import DocsChapter from './DocsChapter.svelte';
  import {language} from '../../stores/utils';
  import {toolsDocumentationChapters} from '../../stores/tools';

  // variables
  $: translatedToolsDocumentationChapters = $toolsDocumentationChapters.filter(
    (chapter) => chapter.language === $language
  );
</script>

<BreadCrumbs />
<section>
  <div class="docs__grid">
    <div class="chapters__flex">
      <aside>
        <ul>
          {#each translatedToolsDocumentationChapters as chapter}
            <li>
              <DocsLink name={chapter.name} displayName={chapter.displayName} />
            </li>
          {/each}
        </ul>
      </aside>

      <ul>
        {#each translatedToolsDocumentationChapters as chapter}
          <li id={chapter.name}>
            <DocsChapter {chapter} />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  .docs__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
  }
  .docs__grid :global(header) {
    grid-column: 1 / -1;
  }
  .chapters__flex {
    display: flex;
  }

  ul {
    max-height: 800px;
    overflow-y: scroll;
  }

  aside {
    display: none;
    padding: 1rem;
  }

  ul li {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 760px) {
    aside {
      display: block;
      flex: 1 0 25%;
    }
  }
</style>
