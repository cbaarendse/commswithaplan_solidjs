<script lang="ts">
  // imports
  import type {DeployedTouchPoint} from '../../typings/types';
  import ReachRangeInput from './ReachRangeInput.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import ReachNumberInput from './ReachNumberInput.svelte';
  import {language, translations} from '../../stores/utils';
  import createFormatter from '../../functions/format';
  import createConverter from '../../functions/convert';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // exports
  export let touchPoint: DeployedTouchPoint;

  // variables
  $: basics = touchPoint.basics.find((item) => item.language == $language);
  const formatter = createFormatter();
  const converter = createConverter();
  let hovered: boolean = false;
  let displayManualInput: string;
  let displayTouchPointDescription: 'none' | 'flex' = 'none';

  // functions
</script>

<div class="container" style="display:{touchPoint.show ? 'flex' : 'none'};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault|stopPropagation={() => {
        displayTouchPointDescription = 'flex';
        displayManualInput = 'none';
      }}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reach/{touchPoint.name}.png); opacity:{hovered || touchPoint.value > 0 ? 1 : 0.7};"
    />
  </div>
  <div class="center">
    <ReachRangeInput
      displayName={basics?.displayName}
      rangeInput={{
        name: touchPoint.name,
        id: touchPoint.name,
        value: touchPoint.value.toString(),
        min: '0',
        max: '100',
        step: '1'
      }}
    />
  </div>
  <div class="right">
    <button
      class="input"
      on:click={() => {
        displayManualInput = 'flex';
        displayTouchPointDescription = 'none';
      }}
    >
      <span>{formatter.toStringFormat(touchPoint.value)}&nbsp;%</span>
    </button>
  </div>
  <Modal
    title={basics?.displayName}
    display={displayTouchPointDescription}
    on:destroyModal={() => {
      displayTouchPointDescription = 'none';
    }}
  >
    {basics?.description}
  </Modal>
  <Modal
    title={basics?.displayName}
    display={displayManualInput}
    on:destroyModal={() => {
      displayManualInput = 'none';
    }}
  >
    <ReachNumberInput
      displayName={basics?.displayName}
      {displayManualInput}
      numberInput={{
        name: touchPoint.name,
        id: touchPoint.name,
        value: touchPoint.value,
        min: 0,
        max: 100,
        step: 1,
        fontSize: '1em',
        placeholder: `${converter.translate('input', $translations, $language) + ' 0 - 100'}`,
        readonly: false
      }}
    />
  </Modal>
</div>

<style>
  .container {
    display: flex;
    flex-flow: row nowrap;
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
    width: var(--button-size-phone);
    height: var(--button-size-phone);
    padding: 0.7em;
    font-size: var(--font-size-phone);
    border-radius: 50%;
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
      font-size: var(--font-size-tablet);
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
      font-size: var(--font-size-desktop);
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
</style>
