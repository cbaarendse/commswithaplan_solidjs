<script lang="ts">
  // imports
  import RangeInput from './RangeInput.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import NumberInput from './NumberInput.svelte';
  import {language} from '../../../stores/utils';
  import {marketData, useForResults} from '../../../stores/reach';
  import createResult from '/imports/ui/procedures/results';
  import createFormatter from '../../../functions/format';
  import {DeployedTouchPoint} from '/imports/both/typings/types';
  import {INPUTTYPE} from '../../../../both/constants/constants';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // variables
  const calculateResult = createResult();
  const formatter = createFormatter();
  export let touchPoint: DeployedTouchPoint;
  export let index: number;
  $: definition = touchPoint.definitions.filter((definition) => definition.language == $language)[0];
  let hovered: boolean = false;
  let displayManualInput: boolean;
  let displayTouchPointDescription: boolean;

  // functions
  function onInput() {
    if ($marketData && $useForResults == 'data') {
      calculateResult.forTouchPoint(touchPoint);
    }
  }

  function dismiss(event: MouseEvent | CustomEvent | KeyboardEvent): void {
    if (
      (event instanceof KeyboardEvent && event.key === 'Escape') ||
      event instanceof CustomEvent ||
      event instanceof MouseEvent
    ) {
      displayTouchPointDescription = false;
      displayManualInput = false;
    }
  }
</script>

<svelte:window on:keyup={dismiss} />
<div class="container" style="display:{touchPoint.show ? 'grid' : 'none'};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault|stopPropagation={() => {
        displayTouchPointDescription = true;
        displayManualInput = false;
      }}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reach/{name}.png); opacity:{hovered || touchPoint.value > 0 ? 1 : 0.7};"
    />
  </div>
  <div class="center">
    <RangeInput
      {touchPoint}
      bind:value={touchPoint.value}
      bind:inputTypeIndex={touchPoint.inputTypeIndex}
      on:input={onInput}
      on:change
    />
  </div>
  <div class="right">
    <button
      class="input"
      on:click|preventDefault|stopPropagation={() => {
        displayManualInput = true;
        displayTouchPointDescription = false;
      }}
    >
      <span>
        {#if touchPoint.inputTypeIndex == INPUTTYPE.Grps}{formatter.toNumberFormat(touchPoint.value, 0)}
        {:else if touchPoint.inputTypeIndex == INPUTTYPE.Reach}{formatter.toPercentFormat(
            touchPoint.value,
            0
          )}{:else if touchPoint.inputTypeIndex == INPUTTYPE.Contacts || touchPoint.inputTypeIndex == INPUTTYPE.Impressions}{formatter.toMillionsFormat(
            touchPoint.value,
            2
          )}{/if}
      </span>
      <hr />
      <span>
        {formatter.toPercentFormat(touchPoint.reach, 0)}
      </span>
    </button>
  </div>
  <!-- touch point description -->
  <Modal title={definition.displayName} display={displayTouchPointDescription} on:click={dismiss}>
    {definition.description}
  </Modal>
  <!-- manual input -->
  <Modal title={definition.displayName} display={displayManualInput} on:click={dismiss}>
    <NumberInput {index} {touchPoint} on:submit on:click={dismiss} />
  </Modal>
</div>

<style>
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
</style>
