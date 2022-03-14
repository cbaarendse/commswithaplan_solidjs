<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import type {Slider} from '../types/types';

  //variables
  let dispatch = createEventDispatcher();
  export let slider: Slider;

  console.log('name,  slider.value in input type range:', slider.name, slider.value);
  function changeValue() {
    dispatch('changeValueForName', {name: slider.name, value: slider.value});
  }
  function inputValue() {
    dispatch('inputValueForName', {name: slider.name, value: slider.value});
  }
</script>

<form>
  <label for={slider.name}>{slider.displayName}</label>
  <input
    id={slider.id}
    name={slider.name}
    type="range"
    min={slider.min}
    max={slider.max}
    step={slider.step}
    bind:value={slider.value}
    on:change={changeValue}
    on:input={inputValue}
  />
</form>

<style>
  /* General */
  form {
    font-size: 1em;
    width: 100%;
    --thumb-size-phone: 1.25rem;
    --thumb-size-tablet-desktop: 2.5rem;
    --track-height-phone: 4.2px;
    --track-height-tablet-desktop: 8.4px;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range'] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }

  /* Track */
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: var(--ra-red);
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height-phone);
    cursor: pointer;
    background: var(--ra-grey-bright);
    border-radius: 0.6em;
  }
  input[type='range']::-moz-range-track {
    width: 100%;
    height: 50%;
    cursor: pointer;
    background-color: var(--ra-white);
    border-radius: 7%;
  }

  input[type='range']::-moz-range-progress {
    background-color: var(--ra-red);
    height: 100%;
  }

  input[type='range']::-ms-track {
    width: 100%;
    height: var(--track-height-phone);
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type='range']::-ms-fill-lower {
    background: var(--ra-grey-light);
    border-radius: 2.6px;
  }
  input[type='range']::-ms-fill-upper {
    background: var(--ra-grey-bright);
    border-radius: 2.6px;
  }

  input[type='range']:focus::-ms-fill-lower {
    background: var(--ra-red);
  }
  input[type='range']:focus::-ms-fill-upper {
    background: var(--ra-red-light);
  }

  /* Thumb */
  input[type='range']::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: var(--thumb-size-phone);
    width: var(--thumb-size-phone);
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -1em;
  }

  input[type='range']::-moz-range-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: var(--thumb-size-phone);
    width: var(--thumb-size-phone);
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
  }

  input[type='range']::-ms-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: var(--thumb-size-phone);
    width: var(--thumb-size-phone);
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
  }

  @media screen and (min-width: 760px) {
    input[type='range']::-webkit-slider-runnable-track,
    input[type='range']::-ms-track {
      height: var(--track-height-tablet-desktop);
    }
    input[type='range']::-moz-range-track {
      height: 100%;
    }
    input[type='range']::-webkit-slider-thumb,
    input[type='range']::-moz-range-thumb,
    input[type='range']::-ms-thumb {
      height: var(--thumb-size-tablet-desktop);
      width: var(--thumb-size-tablet-desktop);
    }
  }
</style>
