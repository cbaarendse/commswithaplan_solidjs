// imports
import { For } from 'solid-js';
import createConverter from '../../functions/convert';
import type { Select as SelectType } from '../../../both/typings/types';
import { language, translations } from '../../stores/utils';

type SelectProps = {
  select: SelectType;
  selectList: SelectType[];
  displayName: string;
  onSelectOption?: (value: string) => void;
};

export default function Select(props: SelectProps) {
  const converter = createConverter();

  const handleBlur = (e: FocusEvent) => {
    e.preventDefault();
    e.stopPropagation();
    props.onSelectOption?.(props.select.value || '');
  };

  return (
    <form>
      <label for={props.select.name}>
        {language() === 'nl-NL' ? 'Kies ' : 'Choose '}
        {props.displayName}
      </label>
      <select
        class={props.select.class}
        id={props.select.id}
        name={props.select.name}
        value={props.select.value}
        onChange={(e) => {
          if (props.select) {
            props.select.value = e.currentTarget.value;
          }
        }}
        onBlur={handleBlur}
      >
        <For each={props.selectList}>
          {(option) => (
            <option value={option.name}>
              {converter.translate(option.name, translations(), language()) || option.value}
            </option>
          )}
        </For>
      </select>
      <style>{`
  select {
    width: 100%;
    margin: 7px;
    border: none;
    background-color: --ra-grey-bright;
  }
      `}</style>
    </form>
  );
}
