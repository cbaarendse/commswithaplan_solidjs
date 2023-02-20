<script lang="ts">
  // imports
  import {getContext} from 'svelte';
  import RangeInput from './RangeInput.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import NumberInput from './NumberInput.svelte';
  import {language} from '../../../stores/utils';
  import createFormatter from '../../../functions/format';
  import {DeployedTouchPoint} from '/imports/both/typings/types';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // variables
  export let index: number;
  let touchPoints: DeployedTouchPoint[] = getContext('deployedTouchPoints');
  const {name, value, show, definitions} = touchPoints[index];
  $: definition = definitions.filter((definition) => definition.language == $language)[0];
  const formatter = createFormatter();
  let hovered: boolean = false;
  let displayManualInput: 'none' | 'flex' = 'none';
  let displayTouchPointDescription: 'none' | 'flex' = 'none';

  // functions
</script>

<div class="container" style="display:{show ? 'grid' : 'none'};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault|stopPropagation={() => {
        displayTouchPointDescription = 'flex';
        displayManualInput = 'none';
      }}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reach/{name}.png); opacity:{hovered || value > 0 ? 1 : 0.7};"
    />
  </div>
  <div class="center">
    <RangeInput {index} />
  </div>
  <div class="right">
    <button
      class="input"
      on:click={() => {
        displayManualInput = 'flex';
        displayTouchPointDescription = 'none';
      }}
    >
      <span>{formatter.toStringFormat(value)}&nbsp;%</span>
    </button>
  </div>
  <Modal
    title={definition.displayName}
    display={displayTouchPointDescription}
    on:destroyModal={() => {
      displayTouchPointDescription = 'none';
    }}
  >
    {definition.description}
  </Modal>
  <Modal
    title={definition.displayName}
    display={displayManualInput}
    on:destroyModal={() => {
      displayManualInput = 'none';
    }}
  >
    <NumberInput
      {index}
      on:destroyModal={() => {
        displayManualInput = 'none';
      }}
    />
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
