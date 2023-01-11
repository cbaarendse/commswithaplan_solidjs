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

  nav {
    display: none;
  }
  div.chapters {
    padding: 1em;
  }

  div.chapters ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1.8em;
    overflow-y: scroll;
  }

  @media screen and (min-width: 768px) {
    nav {
      display: block;
      flex: 0 0 25%;
      padding: 1em;
    }
    nav ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1.6em;
    }

    nav ul li {
      flex-basis: 100%;
    }
    div.chapters {
      flex: 1 1 75%;
    }
  }
</style>
