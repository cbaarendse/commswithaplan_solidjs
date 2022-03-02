<script lang="ts">
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Header from './layout/Header.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import DocsLink from './DocsLink.svelte';
  import DocsChapter from './DocsChapter.svelte';

  // variables*
  import {language, toolsDocumentationChapters} from '../../stores/stores';
  $: translatedToolsDocumentationChapters = $toolsDocumentationChapters.filter(
    (chapter) => chapter.language === $language
  );
</script>

<Main>
  <Section>
    <div class="docs__grid">
      <Header>
        <Brand brand={{color: 'var(--ra-blue)', fontSize: 'var(--ra-fs-5xl)', title: 'Reach'}}
          ><LogoReachApp
            logo={{fontSize: 'var(--ra-fs-5xl)', width: 'var(--ra-5xl)', height: 'var(--ra-5xl)', colored: true}}
          /></Brand
        >
        <!-- TODO: engels en nederlands in contentstore -->
        <h2>{$language === 'dutch' ? 'Documentatie' : 'Documentation'}</h2>
      </Header>
      <div class="chapters__grid">
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
  h2 {
    grid-area: title;
    align-self: center;
    justify-self: self-start;
    font-size: var(--font-size-2xl);
    font-weight: normal;
  }

  .docs__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
  }
  .chapters__grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
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

  aside ul li {
    margin-bottom: 1rem;
  }

  @media screen and (min-width: 760px) {
    .chapters__grid {
      grid-template-columns: 1fr 4fr;
    }
    aside {
      display: block;
    }
  }
</style>
