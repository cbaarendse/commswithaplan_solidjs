import type {JSX} from 'solid-js';

interface DocsParagraphProps {
  subtitle: string;
  text: string;
  elaboration?: string;
}

export default function DocsParagraph(props: DocsParagraphProps) {
  return (
    <article>
      <h3>&para;&nbsp;{props.subtitle}</h3>
      <p>{props.text}</p>
      {props.elaboration && (
        <p>
          <i>{props.elaboration}</i>
        </p>
      )}
      <style>{`
  article {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em;
  }
  h3 {
    margin: 0em 0em;
  }
  p {
    margin: 0em 0em;
    padding: 0em 0em;
  }
      `}</style>
    </article>
  );
}
