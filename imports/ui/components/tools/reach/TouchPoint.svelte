<script lang="ts">
  // imports
  import RangeInput from './RangeInput.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import NumberInput from './NumberInput.svelte';
  import {deployment} from '../../../stores/reach';
  import {language} from '../../../stores/utils';
  import createFormatter from '../../../functions/format';
  import {DeployedTouchPoint, InputType} from '/imports/both/typings/types';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // variables
  export let index: number;
  export let name: DeployedTouchPoint['name'];
  export let value: DeployedTouchPoint['value'];
  export let show: DeployedTouchPoint['show'];
  export let definitions: DeployedTouchPoint['definitions'];
  $: definition = definitions.filter((definition) => definition.language == $language)[0];
  const formatter = createFormatter();
  let hovered: boolean = false;
  let displayManualInput: boolean;
  let displayTouchPointDescription: boolean;

  // functions
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
<div class="container" style="display:{show ? 'grid' : 'none'};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault|stopPropagation={() => {
        displayTouchPointDescription = true;
        displayManualInput = false;
      }}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reach/{name}.png); opacity:{hovered || value > 0 ? 1 : 0.7};"
    />
  </div>
  <div class="center">
    <!-- TODO: display name in RangeInput not reactive -->
    <RangeInput {index} on:change />
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
        {#if $deployment[index].inputTypeIndex == InputType.Grps}{formatter.toNumberFormat(value, 0)}
        {:else if $deployment[index].inputTypeIndex == InputType.Reach}{formatter.toPercentFormat(
            value,
            0
          )}{:else if $deployment[index].inputTypeIndex == InputType.Contacts || $deployment[index].inputTypeIndex == InputType.Impressions}{formatter.toMillionsFormat(
            value,
            2
          )}{/if}
      </span>
    </button>
  </div>
  <Modal title={definition.displayName} display={displayTouchPointDescription} on:click={dismiss}>
    {definition.description}
  </Modal>
  <Modal title={definition.displayName} display={displayManualInput} on:click={dismiss}>
    <NumberInput {index} on:submit on:click={dismiss} />
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
    width: var(--button-size-phone);
    height: var(--button-size-phone);
    padding: 0.7em;
    font-size: 1rem;
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
