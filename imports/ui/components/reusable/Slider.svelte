<script>
  //variables
  export let name;
  export let displayName;
  export let defaultValue;
  export let value;
  export let min = 0;
  export let max = 100;
</script>

<form>
  <label for={name}>{displayName}</label>
  <input
    type="range"
    step="1"
    id={name}
    {name}
    {min}
    {max}
    {defaultValue}
    bind:value
    on:change|preventDefault
    on:input|preventDefault
  />
</form>

<style>
  form {
    width: 100%;
  }
  /* Leave all in, and change them consistently */
  input[type='range'] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    background: var(--ra-grey-bright);
    border-radius: 0.6em;
    /* border: 0.2px solid #010101; */
  }
  input[type='range']::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -1em;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: var(--ra-red);
  }
  input[type='range']::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
    background: var(--ra-grey-bright);
    border-radius: 1.3px;
    /* border: 0.2px solid #010101; */
  }
  input[type='range']::-moz-range-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
  }
  input[type='range']::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type='range']::-ms-fill-lower {
    background: var(--ra-grey-light);
    /* border: 0.2px solid #010101; */
    border-radius: 2.6px;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
  }
  input[type='range']::-ms-fill-upper {
    background: var(--ra-grey-bright);
    /* border: 0.2px solid #010101; */
    border-radius: 2.6px;
    /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
  }
  input[type='range']::-ms-thumb {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--ra-red);
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    background: var(--ra-red);
    cursor: pointer;
  }
  input[type='range']:focus::-ms-fill-lower {
    background: var(--ra-red);
  }
  input[type='range']:focus::-ms-fill-upper {
    background: var(--ra-red-light);
  }
</style>
