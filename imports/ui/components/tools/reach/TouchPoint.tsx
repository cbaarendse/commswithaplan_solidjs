import {createSignal, createMemo, Show, onCleanup} from 'solid-js';
import RangeInput from './RangeInput';
import Modal from '../../reusable/Modal';
import NumberInput from './NumberInput';
import {language} from '../../../stores/utils';
import createFormatter from '../../../functions/format';
import {DeployedTouchPoint} from '/imports/both/typings/types';
import {INPUTTYPE} from '../../../../both/constants/constants';

interface TouchPointProps {
  touchPoint: DeployedTouchPoint;
  onChangeInputType: (touchPoint: DeployedTouchPoint) => void;
  onChangeValue: (touchPoint: DeployedTouchPoint) => void;
  onSubmitValue: (touchPoint: DeployedTouchPoint) => void;
}

export default function TouchPoint(props: TouchPointProps) {
  const formatter = createFormatter();
  const [hovered, setHovered] = createSignal(false);
  const [displayManualInput, setDisplayManualInput] = createSignal(false);
  const [displayTouchPointDescription, setDisplayTouchPointDescription] = createSignal(false);

  const definition = createMemo(() =>
    props.touchPoint.definitions.filter((definition) => definition.language === language())[0]
  );

  const dismiss = (event: MouseEvent | KeyboardEvent) => {
    if ((event instanceof KeyboardEvent && event.key === 'Escape') || event instanceof MouseEvent) {
      setDisplayTouchPointDescription(false);
      setDisplayManualInput(false);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => dismiss(e);
  window.addEventListener('keyup', handleKeyUp);
  onCleanup(() => window.removeEventListener('keyup', handleKeyUp));

  return (
    <div class="container" style={{display: props.touchPoint.show ? 'grid' : 'none'}}>
      <div class="left">
        <button
          class="touchpoint"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplayTouchPointDescription(true);
            setDisplayManualInput(false);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            'background-image': `url(/reach/${props.touchPoint.name}.png)`,
            opacity: hovered() || props.touchPoint.value > 0 ? 1 : 0.7
          }}
        />
      </div>
      <div class="center">
        <RangeInput
          touchPoint={props.touchPoint}
          onInputValue={props.onChangeValue}
          onChangeInputType={props.onChangeInputType}
          onChangeValue={props.onChangeValue}
        />
      </div>
      <div class="right">
        <button
          class="input"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplayManualInput(true);
            setDisplayTouchPointDescription(false);
          }}
        >
          <span>
            {props.touchPoint.inputTypeIndex === INPUTTYPE.Grps
              ? formatter.toNumberFormat(props.touchPoint.maxValue ?? 0, 0)
              : props.touchPoint.inputTypeIndex === INPUTTYPE.Reach
              ? formatter.toPercentFormat(props.touchPoint.maxValue ?? 0, 0)
              : props.touchPoint.inputTypeIndex === INPUTTYPE.Contacts ||
                props.touchPoint.inputTypeIndex === INPUTTYPE.Impressions
              ? formatter.toMillionsFormat(props.touchPoint.maxValue ?? 0, 2)
              : ''}
          </span>
          <hr />
          <span>{formatter.toPercentFormat(props.touchPoint.reach ?? 0, 0)}</span>
        </button>
      </div>
      {/* touch point description */}
      <Modal title={definition().displayName} display={displayTouchPointDescription()} onClick={dismiss}>
        {definition().description}
      </Modal>
      {/* manual input */}
      <Modal title={definition().displayName} display={displayManualInput()} onClick={dismiss}>
        <NumberInput touchPoint={props.touchPoint} onSubmitValue={props.onSubmitValue} onDismiss={dismiss} />
      </Modal>
      <style>{`
  .container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2em;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    padding: 0.4em 1em 0.4em 1em;
    border-radius: 0.2em;
  }

  button.touchpoint {
    width: var(--button-size-phone);
    height: var(--button-size-phone);
    padding: 0.7em;
    border: none;
    border-radius: 7px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: var(--ra-teal-off-white);
    cursor: pointer;
  }

  button.input {
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    width: var(--button-size-phone);
    height: var(--button-size-phone);
    padding: 0.7em;
    font-size: 1rem;
    border-radius: 7px;
    border: none;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: var(--ra-white);
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    button.touchpoint {
      width: var(--button-size-tablet);
      height: var(--button-size-tablet);
    }
    button.input {
      width: var(--button-size-tablet);
      height: var(--button-size-tablet);
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 1024px) {
    button.touchpoint {
      width: var(--button-size-desktop);
      height: var(--button-size-desktop);
    }
    button.input {
      width: var(--button-size-desktop);
      height: var(--button-size-desktop);
      font-size: 1.4rem;
    }
  }

  .center,
  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .left {
    justify-content: flex-start;
  }
  .center {
    flex: 1 1 80%;
    justify-content: center;
  }

  .right {
    justify-content: flex-end;
  }
      `}</style>
    </div>
  );
}
