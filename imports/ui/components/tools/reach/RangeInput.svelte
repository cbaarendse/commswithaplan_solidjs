<script lang="ts">
  // imports
  import {deployment, briefing, inputTypes, maxValues} from '../../../stores/reach';
  import {language} from '../../../stores/utils';
  import createConverter from '/imports/ui/functions/convert';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import {InputType} from '/imports/both/typings/types';

  //variables
  const converter = createConverter();
  export let index: number;
  const {name, definitions} = $deployment[index];
  let inputTypeIndex = $deployment[index].inputTypeIndex;
  let inputTypeName = $inputTypes[$deployment[index].inputTypeIndex].name;
  let value = $deployment[index].value;
  const min = 0;
  const max = $maxValues[name] ?? 100;
  const step = (max - min) / 100 ?? 1;
  let definition = definitions.filter((definition) => definition.language == $language)[0];
  $: console.log('value in range input ', value);
  $: console.log('$: value in range input ', value);

  $: console.log('$maxValues: in RangeInput $: ', $maxValues);

  // functions
  $: if (!$briefing.useMarketData && name && typeof value == 'number') {
    deployment.update((data) => {
      data[index].value = value;
      return data;
    });
  }

  $: if ($briefing.useMarketData && inputTypeIndex) {
    deployment.update((data) => {
      data[index].inputTypeIndex = inputTypeIndex;
      return data;
    });
  }

  function onSelect(e) {
    if ($briefing.useMarketData) {
      deployment.update((data) => {
        let updatedTouchPoint = Object.assign(data[index], {inputTypeIndex: parseInt(e.target.value)});
        console.log('updated TouchPoint in onSelect', updatedTouchPoint, 'selected value: ', e.target.value);
        data.splice(index, 1, updatedTouchPoint);
        return data;
      });
    }
  }

  function onInput() {
    if ($briefing.useMarketData && name && typeof value == 'number') {
      deployment.update((data) => {
        let updatedTouchPoint = Object.assign(data[index], {value: value});
        console.log('updated TouchPoint, index, in onInput', updatedTouchPoint, index);
        data.splice(index, 1, updatedTouchPoint);
        return data;
      });
    }
  }
</script>

<form>
  <fieldset>
    <label for={name}>{definition.displayName}</label>
    {#if $briefing.useMarketData}
      <select id={`${name}_inputtype__select`} bind:value={inputTypeIndex} on:change={onSelect}>
        {#each $inputTypes as inputType, inputIndex}<option value={inputIndex}>
            {converter.translate(inputType.name, $inputTypes, $language)}
          </option>{/each}
      </select>
      <label for={`${name}_inputtype__select`}><Fa icon={faSort} color={'var(--ra-teal)'} /></label>
    {:else}
      <span>{converter.translate(inputTypeName, $inputTypes, $language)}</span>
    {/if}
    <input type="range" {min} {max} {step} id={name} {name} bind:value on:change={onInput} />
  </fieldset>
</form>

<style>
  /* General */
  form {
    width: 100%;
    --thumb-size-phone: 2rem;
    --thumb-size-tablet: 3rem;
    --thumb-size-desktop: 3.3rem;
    --track-height-phone: 0.2rem;
    --track-height-tablet: 0.84rem;
    --track-height-desktop: 0.84rem;
  }
  fieldset {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    row-gap: 0.7rem;
    border: none;
    padding: 0rem;
    margin: 0rem;
  }
  label {
    font-size: 1.4rem;
    display: inline-block;
  }
  select {
    appearance: none;
    font-size: 1.4rem;
    color: var(--ra-teal);
    border: none;
    background-color: transparent;
    padding: 0.4em 0.6em 0.4em 0.4em;
  }
  select:focus {
    outline: solid 1px var(--ra-green);
  }
  label {
    background-color: none;
    padding: 0.2em 0.4em;
  }
  span {
    grid-column: span 2;
    font-size: 1.4rem;
    color: var(--ra-teal);
  }
  input {
    grid-column: span 3;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range'] {
    -webkit-appearance: none;
    /* margin: 1rem 0; */
    height: var(--track-height-phone);
    width: 100%;
    background: var(--ra-grey-bright);
    border-radius: 0.6em;
  }

  /* track safari */
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

  /* track firefox */
  input[type='range']::-moz-range-track {
    height: 100%;
    background: var(--ra-grey-bright);
    border-radius: 0.6em;
  }

  input[type='range']::-moz-range-progress {
    background-color: var(--ra-red);
    height: 100%;
    border-radius: 0.6em;
  }

  /* track internet explorer */
  input[type='range']::-ms-track {
    width: 100%;
    height: var(--track-height-phone);
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    border-radius: 0.6em;
    color: transparent;
  }
  input[type='range']::-ms-fill-lower {
    background: var(--ra-grey-light);
    border-radius: 0.6em;
  }
  input[type='range']::-ms-fill-upper {
    background: var(--ra-grey-bright);
    border-radius: 0.6em;
  }

  input[type='range']:focus::-ms-fill-lower {
    background: var(--ra-red);
  }
  input[type='range']:focus::-ms-fill-upper {
    background: var(--ra-red-light);
  }

  /* thumb safari */
  input[type='range']::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: var(--thumb-size-phone);
    width: var(--thumb-size-phone);
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -0.6em;
  }

  /* thumb firefox */
  input[type='range']::-moz-range-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: var(--thumb-size-phone);
    width: var(--thumb-size-phone);
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
  }

  /* thumb internet explorer */
  input[type='range']::-ms-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: var(--thumb-size-phone);
    width: var(--thumb-size-phone);
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    label {
      font-size: 1.6rem;
    }
    input[type='range'] {
      -webkit-appearance: none;
      height: var(--track-height-tablet);
    }
    /* track safari */
    input[type='range']::-webkit-slider-runnable-track {
      height: var(--track-height-tablet);
    }
    /* track firefox */
    input[type='range']::-moz-range-track {
      height: var(--track-height-tablet);
    }
    /* track internet explorer */
    input[type='range']::-ms-track {
      height: var(--track-height-tablet);
    }
    /* thumb safari */
    input[type='range']::-webkit-slider-thumb {
      height: var(--thumb-size-tablet);
      width: var(--thumb-size-tablet);
    }
    /* thumb firefox */
    input[type='range']::-moz-range-thumb {
      height: var(--thumb-size-tablet);
      width: var(--thumb-size-tablet);
    }
    /* thumb internet explorer */
    input[type='range']::-ms-thumb {
      height: var(--thumb-size-tablet);
      width: var(--thumb-size-tablet);
    }
  }

  @media screen and (min-width: 1024px) {
    label {
      font-size: 1.8rem;
    }
    input[type='range'] {
      -webkit-appearance: none;
      height: var(--track-height-desktop);
    }
    /* track safari */
    input[type='range']::-webkit-slider-runnable-track {
      height: var(--track-height-desktop);
    }
    /* track firefox */
    input[type='range']::-moz-range-track {
      height: var(--track-height-desktop);
    }
    /* track internet explorer */
    input[type='range']::-ms-track {
      height: var(--track-height-desktop);
    }
    /* thumb safari */
    input[type='range']::-webkit-slider-thumb {
      height: var(--thumb-size-desktop);
      width: var(--thumb-size-desktop);
    }
    /* thumb firefox */
    input[type='range']::-moz-range-thumb {
      height: var(--thumb-size-desktop);
      width: var(--thumb-size-desktop);
    }
    /* thumb internet explorer */
    input[type='range']::-ms-thumb {
      height: var(--thumb-size-desktop);
      width: var(--thumb-size-desktop);
    }
  }
</style>
