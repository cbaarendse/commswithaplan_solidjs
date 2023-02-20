<script lang="ts">
  // imports
  import {getContext} from 'svelte';
  import type {DeployedTouchPoint} from '../../../../both/typings/types';
  import {deployment, briefing} from '../../../stores/reach';
  import {language} from '../../../stores/utils';

  //variables
  export let index: number;
  let touchPoints: DeployedTouchPoint[] = getContext('deployedTouchPoints');
  const {name, value, definitions} = touchPoints[index];
  $: definition = definitions.filter((definition) => definition.language == $language)[0];

  // functions
  // $: if (!$briefing.useMarketData && name && typeof value == 'number') {
  //   deployment.update((data) => {
  //     let updatedTouchPoint = Object.assign(data[index], {value: value});
  //     console.log('updated TouchPoint, index', updatedTouchPoint, index);
  //     data.splice(index, 1, updatedTouchPoint);
  //     return data;
  //   });
  // }

  function onChange() {
    if ($briefing.useMarketData && name && typeof value == 'number') {
      deployment.update((data) => {
        let updatedTouchPoint = Object.assign(data[index], {value: value});
        console.log('updated TouchPoint, index, in change', updatedTouchPoint, index);
        data.splice(index, 1, updatedTouchPoint);
        return data;
      });
    }
  }
</script>

<!-- TODO: select field for inputtype between label and input -->
<form>
  <fieldset>
    <label for={name}>{definition.displayName}</label>
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      id={name}
      {name}
      on:change={onChange}
      bind:value={$deployment[index].value}
    />
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
    display: block;
    border: none;
    padding: 0rem;
    margin: 0rem;
  }
  label {
    font-size: 1.4rem;
    display: inline-block;
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
