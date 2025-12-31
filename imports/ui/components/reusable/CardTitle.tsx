import type {JSX} from 'solid-js';

export default function CardTitle(props: {children: JSX.Element}) {
  return <h4>{props.children}</h4>;
}

const styles = `
  h4 {
    flex: 0 0 100%;
    margin: 0em 0em;
  }
`;
