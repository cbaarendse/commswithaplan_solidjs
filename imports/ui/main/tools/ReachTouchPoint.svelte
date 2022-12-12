<script lang="ts">
  // imports
  import Slider from '../../reusable/Slider.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import Input from '../../reusable/Input.svelte';
  import {Convert, Format} from '../../types/classes';
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
      style="background-image:url(/reach/{touchPoint.name}.png); opacity:{hovered || touchPoint.value > 0 ? 1 : 0.7};"
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
      }}><span> {Format.toStringFormat(touchPoint.value)}&nbsp;%</span></button
    >
  </div>
  <Modal
    title={touchPoint.displayName}
    display={displayTouchPointDescription}
    on:destroyModal={() => {
      displayTouchPointDescription = 'none';
    }}>{touchPoint.description}</Modal
  >
  <Modal
    title={touchPoint.displayName}
    display={displayManualInput}
    on:destroyModal={() => {
      displayManualInput = 'none';
    }}
  >
    <Input
      displayName="touchPoint.displayName,"
      input={{
        name: touchPoint.name,
        id: touchPoint.name,
        value: touchPoint.value.toString(),
        min: '0',
        max: '100',
        class: 'manual__input',
        fontSize: '1.1em',
        placeholder: Convert.translate('input', $translations, $language),
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
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    padding: 0.4em 1em 0.4em 1em;
    border-radius: 0.2em;
  }
  @media screen and (min-width: 375px) {
    .touchpoint__grid {
      grid-template-columns: 1fr 5fr 1fr;
    }
  }

  button.touchpoint {
    width: clamp(3rem, 10vw, 7rem);
    height: clamp(3rem, 10vw, 7rem);
    padding: var(--ra-xxs);
    border: none;
    border-radius: 7px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: var(--ra-teal-off-white);
    cursor: pointer;
  }

  fieldset {
    display: block;
    border: none;
    width: 100%;
  }

  /* @media screen and (min-width: 375px) {
    fieldset {
      display: block;
    }
  } */

  button.input {
    width: clamp(3rem, 10vw, 7rem);
    height: clamp(3rem, 10vw, 7rem);
    padding: 0.7em;
    font-size: 1.1em;
    border-radius: 50%;
    border: none;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: var(--ra-white);
    cursor: pointer;
  }

  .center,
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
