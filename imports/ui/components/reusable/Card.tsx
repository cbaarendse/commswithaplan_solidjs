// types
import { JSX } from 'solid-js';
import type { Card as CardType } from '../../../both/typings/types';

type CardProps = {
  card: CardType;
  children?: JSX.Element;
  cardFooterText?: JSX.Element;
};

export default function Card(props: CardProps) {
  return (
    <article
      class="card"
      style={`background-color:${props.card.backgroundColor}; font-color:${props.card.color}; font-size:${props.card.fontSize}`}
    >
      {props.card.imgFiles && <img src={props.card.imgFiles[0]} alt={props.card.title} />}
      {props.card.title && <h4>{props.card.title}</h4>}
      <p>{props.children}</p>
      {props.cardFooterText && <p>{props.cardFooterText}</p>}
      {props.card.action && (
        <p>
          <a href={props.card.link}>{props.card.action}</a>
        </p>
      )}
      <style>{`
  article.card {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em;
    padding: 0.7em;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }

  img {
    flex: 0 0 100%;
    object-fit: cover;
    height: 60%;
    max-height: 28rem;
  }
  h4 {
    flex: 0 0 100%;
    margin: 0em 0em;
  }

  p {
    flex: 0 0 100%;
    line-height: 1.7em;
    margin: 0em 0em;
  }
  a {
    font-size: 0.9em;
  }
  a:hover {
    opacity: 0.7;
  }
      `}</style>
    </article>
  );
}
