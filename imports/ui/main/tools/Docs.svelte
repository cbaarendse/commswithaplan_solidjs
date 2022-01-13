<script>
  import Header from './layout/Header.svelte';
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import DocsLink from './DocsLink.svelte';
  import DocsChapter from './DocsChapter.svelte';
  import DocsParagraph from './DocsParagraph.svelte';
  import {language, toolsDocumentationChapters} from '../../../../client/stores';
  import {faParagraph} from '@fortawesome/free-solid-svg-icons';
</script>

<Main>
  <Header>
    <Brand colors={'green'} title={'Reach'}><LogoReachApp size="3rem" /></Brand>
    <h1>Documentation</h1>
  </Header>
  <!-- TODO: emulate svelte or meteor documentation -->
  <Section>
    <Article>
      <aside>
        <ul>
          {#each $toolsDocumentationChapters as chapter}
            <li>
              <DocsLink name={chapter.name} title={chapter[$language].title} />
            </li>
          {/each}
        </ul>
      </aside>

      <ul>
        {#each $toolsDocumentationChapters as chapter}
          <li>
            <DocsChapter {chapter} name={chapter.name} img={chapter.img} />
          </li>
        {/each}
      </ul>
    </Article>
  </Section>
</Main>

<style>
  h1 {
    grid-area: title;
    align-self: center;
    justify-self: self-start;
    font-size: var(--font-size-2xl);
    font-weight: normal;
  }

  ul {
    list-style-type: none;
  }

  aside {
    padding: 1rem;
  }
</style>
