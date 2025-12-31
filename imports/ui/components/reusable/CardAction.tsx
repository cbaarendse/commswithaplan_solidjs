import type {JSX} from 'solid-js';

interface CardActionProps {
  link: string;
  children: JSX.Element;
}

export default function CardAction(props: CardActionProps) {
  return (
    <p>
      <a href={props.link}>{props.children}</a>
    </p>
  );
}

const styles = `
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
`;
