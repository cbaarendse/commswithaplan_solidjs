<script lang="ts">
  // packages
  import {createEventDispatcher} from 'svelte';

  // components
  import Slider from '../../reusable/Slider.svelte';
  import Modal from '../../reusable/Modal.svelte';

  // providers
  import {UiProvider} from '../../types/classes';

  // variables
  import type {Display, TouchPointInPlan} from '../../types/interfaces';
  import {language, translations} from '../../stores/stores';

  export let display: Display = 'grid';
  let inputPlaceholder: string | null | undefined;
  inputPlaceholder = UiProvider.translate('input', $translations, $language);

  let manualInput: boolean = false;
  let displayModal: Display;
  let hovered: boolean = false;

  export let touchPoint: TouchPointInPlan;

  // this is the value of the slider
  $: sliderValue = touchPoint.value;

  //import {notify} from '../../notifications/NotificationsFunctions';

  // functions
  const dispatch = createEventDispatcher();
  const showModal = () => {
    displayModal = 'flex';
  };
</script>

<div class="touchpoint__grid" style="display:{display};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault={showModal}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reach/{touchPoint.name}.png);opacity:{hovered || touchPoint.value > 0 ? 1 : 0.7};"
    />
  </div>
  <div class="center">
    <fieldset>
      <Slider
        slider={{
          value: sliderValue,
          name: touchPoint.name,
          displayName: touchPoint.displayName,
          min: 1,
          max: 100,
          onChange: () => dispatch('handleChange', {name: touchPoint.name, value: sliderValue}),
          onInput: () => dispatch('handleInput', {name: touchPoint.name, value: sliderValue})
        }}
      />
    </fieldset>
  </div>
  <div class="right">
    {#if manualInput}
      <form class="touchpoint-input-form">
        <div class="form-group">
          <input type="text" class="touchpoint-input" placeholder={inputPlaceholder} aria-describedby="sizing-addon2" />
        </div>
      </form>
    {:else}
      <button class="input"><span> {UiProvider.toStringFormat(touchPoint.value)}&nbsp;%</span></button>
    {/if}
  </div>
  <Modal title={touchPoint.displayName} {displayModal}>{touchPoint.description}</Modal>
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
    font-size: clamp(var(--font-size-xs), var(--font-size-weight) * 100vw, var(--font-size-m));
  }

  .left,
  .right {
    display: flex;
    justify-content: center;
  }
</style>
