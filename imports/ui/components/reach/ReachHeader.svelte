<script>
  // packages

  // components
  import LogoReachApp from '../reusable/LogoReachApp.svelte';

  // functions
  import {translate, toStringFormat} from '../../../../client/functions';

  // variables
  let calculating = false; // when false, calculation is being executed
  export let reach;
  export let locus;
  export let totalReachDisplayName;
  export let locusDisplayName;
  const sort = () => {};

  const resetInput = () => {};
  const resetReach = () => {};

  const hide = () => {};
</script>

<!-- header -->

<div class="logo">
  <LogoReachApp />
  <span class="brand">ReachApp</span>
</div>
<!-- outcome  -->
<div class="outcome">
  <div>{totalReachDisplayName}: <span>100&nbsp;%</span></div>
  <div>{locusDisplayName}:<span>100&nbsp;%</span></div>
  <progress />
  <progress />
</div>

<div class="controls">
  <button class="red" type="button">Res</button>
  <button class="green" type="button">Sor</button>
  <button class="green" type="button">Hid</button>
  <!-- space? -->
  <button class="blue" type="button">Pri</button>
  <button class="blue" type="button">PDF</button>
</div>

<style>
  span.brand {
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }
  div.logo {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 0.4em;
  }
  div.outcome {
    font-size: 1.4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4em;
  }
  div.controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 0.4em;
  }

  button {
    font-size: 1rem;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }
  button.red {
    background-color: var(--ra-red);
  }
  button.green {
    background-color: var(--ra-green);
  }
  button.blue {
    background-color: var(--ra-blue);
  }
  button.red:hover {
    background-color: var(--ra-red-light);
  }
  button.green:hover {
    background-color: var(--ra-green-light);
  }
  button.blue:hover {
    background-color: var(--ra-blue-light);
  }
</style>
