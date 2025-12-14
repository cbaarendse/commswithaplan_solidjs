// imports
import type { Checkbox as CheckboxType } from '../../../both/typings/types';

type CheckboxProps = {
  cbx: CheckboxType;
  checked: boolean;
  displayName: string;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: Event) => void;
};

export default function Checkbox(props: CheckboxProps) {
  return (
    <form>
      <label for={props.cbx.name} style={`font-size: ${props.cbx.size}`}>
        {props.displayName}
      </label>
      <input
        class={`input__checkbox ${props.cbx.class}`}
        name={props.cbx.name}
        id={props.cbx.id}
        style="font-size: 1em"
        type="checkbox"
        placeholder={props.cbx.placeholder}
        min={props.cbx.min}
        max={props.cbx.max}
        readonly={props.cbx.readonly}
        disabled={props.cbx.disabled}
        checked={props.checked}
        onChange={(e) => {
          props.onCheckedChange?.(e.currentTarget.checked);
          props.onChange?.(e);
        }}
      />
      <style>{`
  form {
    display: grid;
    grid-template-areas: 'input label';
    gap: 0.7em;
    grid-template-rows: auto;
    justify-content: end;
    align-items: center;
    min-height: fit-content;
    min-width: fit-content;
  }
  label {
    grid-area: label;
  }
  input[type='checkbox'] {
    transform: scale(1.4);
  }
  .input__checkbox {
    grid-area: input;
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    padding: 0.7em;
    min-height: 1.4em;
  }

  .input__checkbox:disabled {
    background-color: var(--ra-grey-light);
  }
      `}</style>
    </form>
  );
}
