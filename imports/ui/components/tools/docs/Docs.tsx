import {For, createMemo} from 'solid-js';
import BreadCrumbs from '../../reusable/BreadCrumbs';
import DocsChapter from './DocsChapter';
import {language} from '../../../stores/utils';
import {toolsDocumentationChapters} from '../../../stores/tools';

export default function Docs() {
  const translatedToolsDocumentationChapters = createMemo(() =>
    toolsDocumentationChapters().filter((chapter) => chapter.language === language())
  );

  return (
    <>
      <BreadCrumbs />
      <section>
        <div class="container">
          <nav>
            <ul>
              <For each={translatedToolsDocumentationChapters()}>
                {(chapter) => (
                  <li>
                    <a href={`#${chapter.name}`} data-tinro-ignore>
                      {chapter.displayName}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </nav>
          <div class="chapters">
            <ul>
              <For each={translatedToolsDocumentationChapters()}>
                {(chapter) => (
                  <li id={chapter.name}>
                    <DocsChapter chapter={chapter} />
                  </li>
                )}
              </For>
            </ul>
          </div>
          <style>{`
  .container {
    display: flex;
    margin: 0em auto;
  }

  nav {
    display: none;
  }

  div.chapters {
    padding: 0em 0em;
  }

  div.chapters ul {
    padding: 0em 0em;
  }

  div.chapters ul li {
    margin-bottom: 4em;
  }

  @media screen and (min-width: 768px) {
    .container {
      gap: 2em;
    }
    nav {
      display: block;
      flex: 1 1 25ch;
    }
    nav ul {
      display: flex;
      flex-direction: column;
      gap: 1em;
      position: sticky;
      top: 1rem;
    }
    div.chapters {
      flex: 1 1 auto;
    }
  }
          `}</style>
        </div>
      </section>
    </>
  );
}
