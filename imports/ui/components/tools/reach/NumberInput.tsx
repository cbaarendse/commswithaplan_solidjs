import {createMemo} from 'solid-js';
import type {DeployedTouchPoint} from '../../../../both/typings/types';
import {translations, language} from '../../../stores/utils';
import createConverter from '/imports/ui/functions/convert';

interface NumberInputProps {
  touchPoint: DeployedTouchPoint;
  onSubmitValue: (touchPoint: DeployedTouchPoint) => void;
  onDismiss: () => void;
}

export default function NumberInput(props: NumberInputProps) {
  const converter = createConverter();
  const min = 0;
  
  const step = createMemo(() => ((props.touchPoint.maxValue ?? 100) - min) / 100);
  const definition = createMemo(() =>
    props.touchPoint.definitions.filter((def) => def.language === language())[0]
  );

  const isValid = (v: number | undefined, m: number, mx: number): boolean => {
    if (typeof v !== 'number') return false;
    return v >= m && v <= mx;
  };

  const disabled = createMemo(() =>
    !isValid(props.touchPoint.value, min, props.touchPoint.maxValue ?? 100)
  );

  const onSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmitValue(props.touchPoint);
  };

  return (
    <form autocomplete="off" onSubmit={onSubmit}>
      <label for={props.touchPoint.name}>
        {language() === 'nl-NL' ? 'Invoer voor ' : 'Input for '}
        {definition().displayName}
      </label>
      <input
        class="input__field"
        name={props.touchPoint.name}
        id={props.touchPoint.name}
        type="number"
        min={min}
        max={props.touchPoint.maxValue}
        step={step()}
        placeholder={`${converter.translate('input', translations(), language())} 0 - 100`}
        readonly={false}
        value={props.touchPoint.value}
        onInput={(e) => {
          props.touchPoint.value = Number(e.currentTarget.value);
        }}
      />
      <input
        class="submit__button"
        type="submit"
        value={language() === 'nl-NL' ? 'Verstuur' : 'Submit'}
        disabled={disabled()}
      />
      <input
        class="cancel__button"
        type="button"
        value={language() === 'nl-NL' ? 'Annuleer' : 'Cancel'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.onDismiss();
        }}
      />
      <style>{`
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    grid-template-rows: auto;
    min-height: fit-content;
    min-width: fit-content;
  }
  label {
    grid-column: span 2;
  }
  .input__field {
    grid-column: span 2;
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    padding: 0.8rem;
    width: 100%;
    min-height: 4rem;
  }
  .submit__button {
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
    background-color: var(--ra-red);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
      `}</style>
    </form>
  );
}
