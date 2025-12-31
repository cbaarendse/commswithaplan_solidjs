import type {Logo} from '../../../both/typings/types';

interface LogoScheduleProps {
  logo: Logo;
}

export default function LogoSchedule(props: LogoScheduleProps) {
  return (
    <div
      style={{
        background: props.logo.colored
          ? undefined
          : 'linear-gradient(to bottom, var(--ra-red-grayscale) 33%, var(--ra-green-grayscale) 33% 67%, var(--ra-blue-grayscale) 67%)',
        'font-size': props.logo.fontSize,
        width: props.logo.width,
        height: props.logo.height
      }}
    />
  );
}

const styles = `
  div {
    border-radius: 50%;
  }
`;
