<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
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
  <div class="chapters__flex">
    <aside>
      <ul>
        {#each translatedToolsDocumentationChapters as chapter}
          <li>
            <a href="#{chapter.name}" data-tinro-ignore>{chapter.displayName}</a>
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
</section>

<style>
  .chapters__flex {
    display: flex;
    margin: 0em auto;
    font-size: 1.2em;
  }

  ul {
    overflow-y: scroll;
  }

  aside {
    display: none;
    padding: 1em;
  }

  ul li {
    margin-bottom: 2em;
  }

  @media screen and (min-width: 76rem) {
    aside {
      display: block;
      flex: 1 0 25%;
    }
  }
</style>
