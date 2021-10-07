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
  export let touchPointDisplayName;
  export let touchPointDescription;
  export let inputPlaceholder;
  let manualInput = false;
  let displayModal;
  let hovered = false;

  // these two are extracted through {...touchPoint} in the parent component
  export let name;
  export let value;

  // this is the value of the slider
  $: sliderValue = value;

  const thisUi = new UiProvider(translations);

  //import {notify} from '../../notifications/NotificationsFunctions';

  // functions
  const showModal = () => {
    displayModal = 'flex';
  };
</script>

<div class="container" style="display:{displayTouchPoint};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault={showModal}
      on:mouseover={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reachapp/{name}.png);opacity:{hovered | (value > 0) ? 1 : 0.7};"
    />
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
    padding: 0.4em 1em 0.4em 1em;
    border-radius: 0.4em;
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
    border-radius: 7%;
    border: none;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: var(--ra-teal-off-white);
    cursor: pointer;
  }

  button.button-input {
    min-width: 5em;
    width: fit-content;
    border-radius: 50%;
    background-color: var(--ra-white);
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
