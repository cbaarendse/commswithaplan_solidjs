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
    <h2>Documentation</h2>
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
          <li id={chapter.name}>
            <DocsChapter {chapter} name={chapter.name} img={chapter.img} />
          </li>
        {/each}
      </ul>
    </Article>
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
    aside {
      display: block;
    }
  }
</style>
