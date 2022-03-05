<script lang="ts">
  // imports
  import Slider from '../../reusable/Slider.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import {UiProvider} from '../../types/classes';
  import type {Display, TouchPointInPlan} from '../../types/interfaces';
  import {language, translations} from '../../stores/stores';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // variables
  export let display: Display = 'grid';
  export let touchPoint: TouchPointInPlan;

  let inputPlaceholder: string | null | undefined = UiProvider.translate('input', $translations, $language);
  let manualInput: boolean = false;
  let displayModal: Display;
  let hovered: boolean = false;

  let value: number = 0;
  touchPoint.value = value;

  // functions
</script>

<div class="touchpoint__grid" style="display:{display};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault={() => {
        displayModal = 'flex';
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
        name={touchPoint.name}
        id={touchPoint.name}
        value={touchPoint.value}
        min={0}
        max={100}
        step={1}
        on:value
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
