// imports
import type { Logo } from '../../../both/typings/types';

type LogoReachProps = {
  logo: Logo;
};

export default function LogoReach(props: LogoReachProps) {
  return (
    <div
      class="logo"
      style={`font-size:${props.logo.fontSize};width:${props.logo.width};height:${props.logo.height}`}
    >
      <div
        class="circle1"
        style={`background-color:${props.logo.colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)'}`}
      />
      <div
        class="circle2"
        style={`background-color:${props.logo.colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)'}`}
      />
      <div
        class="circle3"
        style={`background-color:${props.logo.colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)'}`}
      />
      <style>{`
  div.logo {
    position: relative;
    background-color: transparent;
  }
  div.circle1,
  div.circle2,
  div.circle3 {
    position: absolute;
    width: 75%;
    height: 75%;
    border-radius: 50%;
  }

  div.circle1 {
    top: 14%;
    right: 0%;
    z-index: 50;
  }

  div.circle2 {
    top: 5%;
    left: 7.5%;
    z-index: 40;
  }

  div.circle3 {
    left: 0%;
    bottom: 5%;
    z-index: 30;
  }
      `}</style>
    </div>
  );
}
