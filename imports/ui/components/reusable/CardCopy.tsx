import type {JSX} from 'solid-js';
import Image from './CardImage';
import Title from './CardTitle';
import Body from './CardBody';
import Action from './CardAction';
import Footer from './CardFooter';

interface CardCopyProps {
  backgroundColor: string;
  color: string;
  fontSize: string;
  children: (components: {Image: typeof Image; Title: typeof Title; Body: typeof Body; Action: typeof Action; Footer: typeof Footer}) => JSX.Element;
}

export default function CardCopy(props: CardCopyProps) {
  const C = {Image, Title, Body, Action, Footer};
  
  return (
    <article 
      class="card" 
      style={{
        'background-color': props.backgroundColor,
        'color': props.color,
        'font-size': props.fontSize
      }}
    >
      {props.children(C)}
    </article>
  );
}

const styles = `
  .card {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border-radius: 0.5rem;
    padding: 1.5rem;
  }
`;
