import {createSignal, createMemo} from 'solid-js';
import {language} from '../../stores/utils';
import type {Input} from '../../../both/typings/types';

interface InputProps {
  numberInput: Input;
  displayName: string;
  onSubmitLogin: (data: {name: string; value: number}) => void;
  onSubmitSignin: (data: {name: string; value: number}) => void;
  onSubmitCancel: () => void;
}

export default function InputComponent(props: InputProps) {
  const [inputValue, setInputValue] = createSignal(props.numberInput.value);

  const isValid = (i: Input, value: number | undefined): boolean => {
    if (typeof value !== 'number') {
      return false;
    }
    const min = typeof i.min === 'number' ? i.min : 0;
    const max = typeof i.max === 'number' ? i.max : 100;
    return value >= min && value <= max;
  };

  const disabled = createMemo(() => !isValid(props.numberInput, inputValue()));

  const submitLogin = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const value = inputValue();
    if (value !== undefined) {
      props.onSubmitLogin({name: props.numberInput.name, value});
    }
  };

  const submitSignin = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const value = inputValue();
    if (value !== undefined) {
      props.onSubmitSignin({name: props.numberInput.name, value});
    }
  };

  const submitCancel = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    props.onSubmitCancel();
  };

  return (
    <section>
      <div class="container">
        <form autocomplete="off">
          <label for={props.numberInput.name}>
            {language() === 'nl-NL' ? 'Invoer voor ' : 'Input for '}
            {props.displayName}
          </label>
          <input
            class="input__field"
            name={props.numberInput.name}
            id={props.numberInput.id}
            type="number"
            placeholder={props.numberInput.placeholder}
            min={props.numberInput.min}
            max={props.numberInput.max}
            step={props.numberInput.step}
            readonly={props.numberInput.readonly}
            value={inputValue()}
            onInput={(e) => setInputValue(Number(e.currentTarget.value))}
          />
          <input
            class="submit__button"
            type="submit"
            value={language() === 'nl-NL' ? 'Verstuur' : 'Submit'}
            disabled={disabled()}
            onClick={submitLogin}
          />
          <input
            class="cancel__button"
            type="submit"
            value={language() === 'nl-NL' ? 'Annuleer' : 'Cancel'}
            onClick={submitCancel}
          />
        </form>
        <style>{`
  div.container {
    width: min(100% - 1em, 60ch);
    margin: 0 auto;
  }
  form {
    display: grid;
    grid-template-areas:
      'label label'
      'input input'
      'submit cancel';
    gap: 1rem;
    grid-template-rows: auto;
    min-height: fit-content;
    min-width: fit-content;
  }
  label {
    grid-area: label;
  }
  .input__field {
    grid-area: input;
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    padding: 0.8rem;
    width: 100%;
    min-height: 4rem;
  }
  .submit__button {
    grid-area: submit;
    background-color: var(--ra-blue);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
  .submit__button:disabled {
    background-color: var(--ra-grey-light);
  }
  .cancel__button {
    grid-area: cancel;
    background-color: var(--ra-red);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
        `}</style>
      </div>
    </section>
  );
}
