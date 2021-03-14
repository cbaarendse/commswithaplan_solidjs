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
  const defaultValue = 50;
  const dispatch = createEventDispatcher();

  // variables
  export let displayTouchPoint = 'grid';
  export let language;
  export let touchPoint;
  export let touchPointDisplayName;
  export let touchPointDescription;
  export let inputPlaceholder;

  let input;
  let manualInput = false;
  let displayModal;

  const thisUi = new UiProvider(translations, language);

  //import {notify} from '../../notifications/NotificationsFunctions';

  // functions
  const showModal = () => {
    displayModal = 'flex';
  };
</script>

<div style="display:{displayTouchPoint};">
  <div class="left">
    <button on:click|preventDefault={showModal}>
      <img
        alt="{touchPoint.name}-Icon"
        src="/{touchPoint.name}.png"
        style="background-color:{() => {
          touchPoint.value > 0 ? 'var(--ra-green)' : 'var(--ra-teal-light)';
        }};"
      />
    </button>
  </div>
  <div class="center">
    <Slider
      {defaultValue}
      bind:value={input}
      displayName={touchPointDisplayName}
      on:change={() => dispatch('handleChange', {name: touchPoint.name, value: input})}
      on:input={() => dispatch('handleInput', {name: touchPoint.name, value: input})}
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
      <button class="button-input"><span>{touchPoint.value}&nbsp;%</span></button>
    {/if}
  </div>
  <Modal title={touchPointDisplayName} {displayModal}>{touchPointDescription}</Modal>
</div>

<style>
  div {
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
</style>
