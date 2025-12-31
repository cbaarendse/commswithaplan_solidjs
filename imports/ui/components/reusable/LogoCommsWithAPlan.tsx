import type {Logo} from '../../../both/typings/types';

interface LogoCommsWithAPlanProps {
  logo: Logo;
}

export default function LogoCommsWithAPlan(props: LogoCommsWithAPlanProps) {
  return (
    <div
      style={{
        background: props.logo.colored
          ? 'linear-gradient(to bottom, var(--ra-red) 33%, var(--ra-green) 33% 67%, var(--ra-blue) 67%)'
          : 'linear-gradient(to bottom, var(--ra-red-grayscale) 33%, var(--ra-green-grayscale) 33% 67%, var(--ra-blue-grayscale) 67%)',
        'font-size': props.logo.fontSize,
        width: props.logo.width,
        height: props.logo.height,
        'min-width': props.logo.minWidth,
        'min-height': props.logo.minHeight
      }}
    >
      <span>P</span>
    </div>
  );
}

const styles = `
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  span {
    color: var(--ra-white);
    font-family: 'Stencil Std' 'Trebuchet MS', 'American Typewriter', serif;
    font-size: 0.9em;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';
  }
`;
