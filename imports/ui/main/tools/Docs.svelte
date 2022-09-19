<script lang="ts">
  // imports
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Header from './layout/Header.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReach from '../../reusable/LogoReach.svelte';
  import DocsLink from './DocsLink.svelte';
  import DocsChapter from './DocsChapter.svelte';
  import {language} from '../../stores/utils';
  import {toolsDocumentationChapters} from '../../stores/tools';

  // variables
  $: translatedToolsDocumentationChapters = $toolsDocumentationChapters.filter(
    (chapter) => chapter.language === $language
  );
</script>

<Main>
  <Section>
    <div class="docs__grid">
      <Header>
        <Brand
          brand={{
            style: {color: 'var(--ra-blue)', fontSize: 'var(--ra-fs-2xl)'},
            title: `Tools - ${$language === 'dutch' ? 'Documentatie' : 'Documentation'}`
          }}
          ><LogoReach
            logo={{
              style: {fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)'},
              colored: true
            }}
          /></Brand
        >
      </Header>
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
  </Section>
</Main>

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
    font-size: var(--font-size-l);
  }

  ul {
    max-height: 800px;
    overflow-y: scroll;
    list-style-type: none;
  }

  aside {
    display: none;
    font-size: var(--font-size-l);
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
