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
  <div class="container">
    <nav>
      <ul>
        {#each translatedToolsDocumentationChapters as chapter}
          <li>
            <a href="#{chapter.name}" data-tinro-ignore>{chapter.displayName}</a>
          </li>
        {/each}
      </ul>
    </nav>
    <div class="chapters">
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
  .container {
    display: flex;
    margin: 0em auto;
  }

  ul {
    overflow-y: scroll;
  }

  nav {
    display: none;
    padding: 1em;
  }
  div.chapters {
    display: flex;
    padding: 1em;
  }

  ul li {
    margin-bottom: 2em;
  }

  @media screen and (min-width: 768px) {
    nav {
      display: block;
      flex: 1 1 25%;
      min-width: 30ch;
      max-width: 60ch;
    }
    div.chapters {
      flex: 1 1 75%;
    }
  }
</style>
