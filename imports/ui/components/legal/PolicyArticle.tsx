// imports
import { For, JSX } from 'solid-js';
import type { Article } from '../../../both/typings/types';

type PolicyArticleProps = {
  item: Article;
};

export default function PolicyArticle(props: PolicyArticleProps) {
  return (
    <article>
      <h3>{props.item.displayName}</h3>
      <For each={props.item.paragraphs}>
        {(paragraph) => (
          <p>
            <strong>{paragraph.displayName}</strong>
            {paragraph.description}
          </p>
        )}
      </For>
      <style>{`
  article {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  h3 {
    margin: 0em;
  }
  p {
    margin: 0em;
  }
      `}</style>
    </article>
  );
}
