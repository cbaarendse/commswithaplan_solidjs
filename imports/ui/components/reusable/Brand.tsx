// imports
import { JSX } from 'solid-js';
import type { Brand as BrandType } from '../../../both/typings/types';

type BrandProps = {
  brand: BrandType;
  children?: JSX.Element;
};

export default function Brand(props: BrandProps) {
  return (
    <div class="brand">
      {props.children}
      <span style={`font-size:${props.brand.fontSize}; font-color:${props.brand.color}`}>
        {props.brand.title}
      </span>
      <style>{`
  .brand {
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.7em;
    align-items: center;
    font-family: 'Trebuchet MS';
  }
      `}</style>
    </div>
  );
}
