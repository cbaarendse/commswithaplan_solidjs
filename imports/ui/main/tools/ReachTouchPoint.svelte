<script lang="ts">
  // imports
  import Slider from '../../reusable/Slider.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import Input from '../../reusable/Input.svelte';
  import {Ui} from '../../types/classes';
  import type {TouchPointInPlan} from '../../types/types';
  import {language, translations} from '../../stores/utils';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // exports
  export let touchPoint: TouchPointInPlan;

  // variables
  let hovered: boolean = false;
  let displayManualInput: 'none' | 'flex' = 'none';
  let displayTouchPointDescription: 'none' | 'flex' = 'none';

  // functions
</script>

<div class="touchpoint__grid" style="display:{touchPoint.display};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault|stopPropagation={() => {
        displayTouchPointDescription = 'flex';
        displayManualInput = 'none';
      }}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reach/{touchPoint.name}.png);opacity:{hovered || touchPoint.value > 0 ? 1 : 0.7};"
    />
  </div>
  <div class="center">
    <fieldset>
      <Slider
        displayName={touchPoint.displayName}
        slider={{
          name: touchPoint.name,
          id: touchPoint.name,
          value: touchPoint.value.toString(),
          min: '0',
          max: '100',
          step: '1'
        }}
        on:changeValueForName
        on:inputValueForName
      />
    </fieldset>
  </div>
  <div class="right">
    <!-- TODO: finalize manual input: change back to button when clicking outside -->
    <button
      class="input"
      on:click={() => {
        displayManualInput = 'flex';
        displayTouchPointDescription = 'none';
      }}><span> {Ui.toStringFormat(touchPoint.value)}&nbsp;%</span></button
    >
  </div>
  <Modal title={touchPoint.displayName} display={displayTouchPointDescription}>{touchPoint.description}</Modal>
  <Modal title={touchPoint.displayName} display={displayManualInput}>
    <Input
      displayName="touchPoint.displayName,"
      input={{
        name: touchPoint.name,
        id: touchPoint.name,
        value: touchPoint.value.toString(),
        min: '0',
        max: '100',
        class: 'manual__input',
        placeholder: Ui.translate('input', $translations, $language),
        readonly: false
      }}
      on:submitValueForName
      on:submitValueForName={() => (displayManualInput = 'none')}
      on:submitCancel={() => (displayManualInput = 'none')}
    />
  </Modal>
</div>

<style>
  .touchpoint__grid {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    padding: 0.4em 1em 0.4em 1em;
    border-radius: 0.2em;
  }
  @media screen and (min-width: 760px) {
    .touchpoint__grid {
      grid-template-columns: 1fr 5fr 1fr;
    }
  }

  button.touchpoint {
    height: var(--ra-7xl);
    width: var(--ra-7xl);
    padding: var(--ra-xxs);
    border-radius: 7%;
    border: none;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: var(--ra-teal-off-white);
    cursor: pointer;
  }
  fieldset {
    border: none;
  }
  button.input {
    height: var(--ra-7xl);
    min-width: var(--ra-7xl);
    width: fit-content;
    padding: var(--ra-xxs);
    border-radius: 50%;
    border: none;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: var(--ra-white);
    cursor: pointer;
  }

  span {
    font-size: clamp(var(--ra-fs-xs), var(--ra-fs-weight) * 100vw, var(--ra-fs-m));
  }

  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
