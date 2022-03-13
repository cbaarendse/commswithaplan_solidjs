<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import Slider from '../../reusable/Slider.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import Input from '../../reusable/Input.svelte';
  import {Ui} from '../../types/classes';
  import type {TouchPointInPlan} from '.../../types/types;
  import {language, translations} from '../../stores/stores';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // variables
  export let touchPoint: TouchPointInPlan;
  let inputPlaceholder: string | null | undefined = Ui.translate('input', $translations, $language);
  let displayManualInput: string = 'none';
  let displayDescription: string = 'none';
  let hovered: boolean = false;
  let dispatch = createEventDispatcher();
  let inputValue: number;

  function submitValue() {
    dispatch('inputValueForName', {value: inputValue, name: touchPoint.name});
  }

  // functions
</script>

<div class="touchpoint__grid" style="display:{touchPoint.display};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault|stopPropagation={() => {
        displayDescription = 'flex';
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
        bind:value={touchPoint.value}
        displayName={touchPoint.displayName}
        name={touchPoint.name}
        id={touchPoint.name}
        min={0}
        max={100}
        step={1}
        on:changeValueForName
        on:inputValueForName
      />
    </fieldset>
  </div>
  <div class="right">
    <!-- TODO: finalize manual input: change back to button when clicking outside -->
    <!-- TODO: Input in modal? (Better for mobile) -->
    <!-- TODO: three buttons under input submit, reset and cancel -->
    <button
      class="input"
      on:click={() => {
        displayManualInput = 'flex';
        displayDescription = 'none';
      }}><span> {Ui.toStringFormat(touchPoint.value)}&nbsp;%</span></button
    >
  </div>
  <Modal title={touchPoint.displayName} display={displayDescription}>{touchPoint.description}</Modal>
  <Modal title={touchPoint.displayName} display={displayManualInput}>
    <form class="touchpoint-input-form" on:submit={submitValue}>
      <div class="form-group">
        <input
          type="text"
          class="touchpoint-input"
          placeholder={inputPlaceholder}
          bind:value={inputValue}
          aria-describedby="sizing-addon2"
        />
      </div>
    </form></Modal
  >
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
    height: 5em;
    width: 5em;
    padding: 0.5em;
    border-radius: 7%;
    border: none;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: var(--ra-teal-off-white);
    cursor: pointer;
  }
  fieldset {
    border: 1px solid lightgray;
  }
  button.input {
    height: 5em;
    min-width: 5em;
    width: fit-content;
    padding: 0.5em;
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
  }
</style>
