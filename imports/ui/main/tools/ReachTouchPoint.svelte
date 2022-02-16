<script lang="ts">
  // packages
  import {createEventDispatcher} from 'svelte';

  // components
  import Slider from '../../reusable/Slider.svelte';
  import Modal from '../../reusable/Modal.svelte';

  // providers
  import {UiProvider} from '../../../../types/classes';

  // variables
  import {Display} from '../../../../types/interfaces';
  import {language, translations} from '../../../../client/stores';

  export let display: Display;
  let inputPlaceholder: string | null | undefined;
  inputPlaceholder = UiProvider.translate('input', $translations, $language);

  let manualInput: boolean = false;
  let displayModal: Display;
  let hovered: boolean = false;

  export let touchPoint;

  // this is the value of the slider
  $: sliderValue = touchPoint.value;

  //import {notify} from '../../notifications/NotificationsFunctions';

  // functions
  const dispatch = createEventDispatcher();
  const showModal = () => {
    displayModal = 'flex';
  };
</script>

<div class="grid_container" style:display>
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
      <legend>{touchPoint.displayName}</legend>
      <Slider
        slider={{value: sliderValue, name: touchPoint.name, displayName: touchPoint.displayName, min: 1, max: 100}}
        on:change={() => dispatch('handleChange', {name: touchPoint.name, value: sliderValue})}
        on:input={() => dispatch('handleInput', {name: touchPoint.name, value: sliderValue})}
      />
    </fieldset>
  </div>
  <div class="right">
    {#if manualInput}
      <form class="touchpoint-input-form float-right">
        <div class="form-group">
          <input
            type="text"
            class="form-control text-right touchpoint-input"
            placeholder={inputPlaceholder}
            aria-describedby="sizing-addon2"
          />
        </div>
      </form>
    {:else}
      <button class="input"><span> {UiProvider.toStringFormat(touchPoint.value)}&nbsp;%</span></button>
    {/if}
  </div>
  <Modal title={touchPoint.displayName} {displayModal}>{touchPoint.description}</Modal>
</div>

<style>
  div {
    --track-bg: #ebebeb;
    --progress-bg: #8abdff;
    --thumb-bg: #5784fd;
  }

  div.grid_container {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    padding: 0.4em 1em 0.4em 1em;
    margin: 0 2%;
    border-radius: 0.2em;
  }
  @media screen and (min-width: 760px) {
    div.grid_container {
      grid-column: 2/3;
      grid-template-columns: 1fr 5fr 1fr;
      margin: 0 7%;
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

  div.left,
  div.right {
    display: flex;
    justify-content: center;
  }
</style>
