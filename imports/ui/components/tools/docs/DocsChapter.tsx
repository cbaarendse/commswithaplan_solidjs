import {For, Show} from 'solid-js';
import DocsParagraph from './DocsParagraph';
import type {Chapter} from '../../../../both/typings/types';

interface DocsChapterProps {
  chapter: Chapter;
}

export default function DocsChapter(props: DocsChapterProps) {
  return (
    <article>
      <h2>&sect;&nbsp;{props.chapter.displayName}</h2>
      <ul>
        <Show when={props.chapter.paragraphs}>
          <For each={props.chapter.paragraphs}>
            {(paragraph) => (
              <li>
                <DocsParagraph
                  subtitle={paragraph.displayName}
                  text={paragraph.description}
                  elaboration={paragraph.elaboration}
                />
              </li>
            )}
          </For>
        </Show>
      </ul>
      <Show when={props.chapter.imgFiles}>
        <For each={props.chapter.imgFiles}>
          {(imgFile) => (
            <picture>
              <img src={`/docs${imgFile}`} alt={props.chapter.displayName} />
            </picture>
          )}
        </For>
      </Show>
      <style>{`
  article,
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em;
  }
  h2 {
    margin: 0em 0em;
  }
  img {
    max-width: 30rem;
  }
      `}</style>
    </article>
  );
}
