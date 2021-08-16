<script>
  // packages
  import {createEventDispatcher} from 'svelte';
  // components
  import Slider from '../reusable/Slider.svelte';
  import Modal from '../reusable/Modal.svelte';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // constants
  import {translations} from '../../../../client/constants';
  const dispatch = createEventDispatcher();

  // variables
  export let displayTouchPoint;
  export let language;
  // these two are extracted through {...touchPoint} in the parent component
  export let name;
  export let value;
  /* translation and appearance are being done in the parent component, through the reachAppProvider object instance.
This way it only has to be instantiated once */
  // TODO: export let touchPoint;
  // TODO: $: touchPointDisplayName = displayTouchPoint(touchPoint, language);
  // TODO: $: touchPointDescription = describeTouchPoint(touchPoint, language);
  export let touchPointDisplayName;
  export let touchPointDescription;
  export let inputPlaceholder;

  // this is the value from the slider
  $: sliderValue = value;
  let manualInput = false;
  let displayModal;

  const thisUi = new UiProvider(translations, language);

  //import {notify} from '../../notifications/NotificationsFunctions';

  // functions
  const showModal = () => {
    displayModal = 'flex';
  };
</script>

<div class="container" style="display:{displayTouchPoint};">
  <div class="left">
    <button on:click|preventDefault={showModal}>
      <img
        alt="{name}-Icon"
        src="/{name}.png"
        style="background-color:{value > 0 ? 'var(--ra-green)' : 'var(--ra-teal-light)'};"
      />
    </button>
  </div>
  <div class="center">
    <Slider
      bind:sliderValue
      displayName={touchPointDisplayName}
      on:change={() => dispatch('handleChange', {name: name, value: sliderValue})}
      on:input={() => dispatch('handleInput', {name: name, value: sliderValue})}
    />
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
      <button class="button-input"><span> {thisUi.toStringFormat(value)}&nbsp;%</span></button>
    {/if}
  </div>
  <Modal title={touchPointDisplayName} {displayModal}>{touchPointDescription}</Modal>
</div>

<style>
  div.container {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr 5fr 1fr;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    margin: 0.5em 0;
    padding: 0.4em 1em 0.4em 1em;
    border-radius: 0.6em;
  }
  @media screen and (max-width: 500px) {
    div {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  button {
    height: 5em;
    width: 5em;
    padding: 0.5em;
    border-radius: 50%;
    border: none;
    background-color: var(--ra-white);
    cursor: pointer;
  }
  button.button-input {
    min-width: 5em;
    width: fit-content;
  }
  img {
    width: 100%;
    height: 100%;
  }
  span {
    font-size: 1.4rem;
  }
  div.left,
  div.right {
    display: flex;
    justify-content: center;
  }
</style>
