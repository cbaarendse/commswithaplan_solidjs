<script lang="ts">
  // packages
  import {createEventDispatcher} from 'svelte';
  // components
  import * as Slider from '@bulatdashiev/svelte-slider';
  import Modal from '../../reusable/Modal.svelte';

  // providers
  import {UiProvider} from '../../../../types/classes';

  // variables
  export let display: string;
  export let touchPointDisplayName: string;
  export let touchPointDescription: string;
  export let inputPlaceholder: string | null | undefined;
  let manualInput: boolean = false;
  let displayModal: string;
  let hovered: boolean = false;

  // these two are extracted through {...touchPoint} in the parent component
  export let name: string;
  export let value: number;

  // this is the value of the slider
  let sliderValue: number;
  $: sliderValue = value;

  //import {notify} from '../../notifications/NotificationsFunctions';

  // functions
  // functions
  const dispatch = createEventDispatcher();
  const showModal = () => {
    displayModal = 'flex';
  };
</script>

<div class="container" style="{display};">
  <div class="left">
    <button
      class="touchpoint"
      on:click|preventDefault={showModal}
      on:mouseenter={() => (hovered = true)}
      on:mouseleave={() => (hovered = false)}
      style="background-image:url(/reach/{name}.png);opacity:{hovered || value > 0 ? 1 : 0.7};"
    />
  </div>
  <div class="center">
    <fieldset>
      <legend>{touchPointDisplayName}</legend>
      <Slider values={[sliderValue]} />
    </fieldset>
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
      <button class="input"><span> {UiProvider.toStringFormat(value)}&nbsp;%</span></button>
    {/if}
  </div>
  <Modal title={touchPointDisplayName} {displayModal}>{touchPointDescription}</Modal>
</div>

<style>
  div {
    --track-bg: #ebebeb;
    --progress-bg: #8abdff;
    --thumb-bg: #5784fd;
  }

  div.container {
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
    div.container {
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
