<script>
  import Header from './layout/Header.svelte';
  import Main from './layout/Main.svelte';
  import Section from './layout/Section.svelte';
  import Article from './layout/Article.svelte';
  import Brand from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import DocsItem from './DocsItem.svelte';
  import {language, toolsDocumentationItems} from '../../../../client/stores';
</script>

<Main>
  <Header>
    <Brand colors={'green'} title={'Reach'}><LogoReachApp size="3rem" /></Brand>
    <h1>Documentation</h1>
  </Header>
  <!-- TODO: emulate svelte or meteor documentation -->
  <Section>
    <aside>
      <ul>
        {#each $toolsDocumentationItems as article}
          <li>
            <ul>
              {#each article[$language].paragraphs as paragraph}
                <li><a href="#{paragraph.name}">{paragraph[$language].title}</a></li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </aside>

    <Article>
      <!-- TODO: content in store -->
      <ul>
        {#each $toolsDocumentationItems as article}
          <li>
            <ul>
              {#each article[$language].paragraphs as paragraph}
                <li>
                  <DocsItem />
                </li>
              {/each}
            </ul>
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

  aside {
    grid-column: 2/3;
    padding: 1rem;
  }
</style>
