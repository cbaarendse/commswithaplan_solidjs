interface CardImageProps {
  imgFiles: string[];
  title: string;
}

export default function CardImage(props: CardImageProps) {
  return <img src={props.imgFiles[0]} alt={props.title} />;
}

const styles = `
  img {
    flex: 0 0 100%;
    object-fit: cover;
    height: 60%;
    max-height: 28rem;
  }
`;
