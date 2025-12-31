import type {JSX} from 'solid-js';

export default function CardBody(props: {children: JSX.Element}) {
  return (
    <p>
      {props.children}
    </p>
  );
}

const styles = `
  p {
    flex: 0 0 100%;
    line-height: 1.7em;
    margin: 0em 0em;
  }
`;
