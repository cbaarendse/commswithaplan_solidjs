<script>
  // packages
  import {createEventDispatcher} from 'svelte';
  // components
  import LogoReachApp from '../reusable/LogoReachApp.svelte';

  // constants
  const dispatch = createEventDispatcher();

  // variables
  export let totalReach;
  export let locus;
  export let totalReachDisplayName;
  export let locusDisplayName;
</script>

<!-- header -->

<div class="logo">
  <LogoReachApp />
  <span class="brand">ReachApp</span>
</div>
<!-- outcome  -->
<div class="outcome">
  <div class="total-reach">{totalReachDisplayName}: <span>{totalReach}&nbsp;%</span></div>
  <div class="meter">
    <span style="width:50%;">Disk Usage - 55.93GB out of 120GB</span>
  </div>
</div>
<div class="outcome">
  <div class="locus">{locusDisplayName}:<span>{locus}&nbsp;%</span></div>
  <div class="meter">
    <span style="width:4%;">Disk Usage - 55.93GB out of 120GB</span>
  </div>
</div>

<div class="controls">
  <button class="red" type="button" on:click={() => dispatch('reset')}>Res</button>
  <button class="green" type="button" on:click={() => dispatch('sort')}>Sor</button>
  <button class="green" type="button" on:click={() => dispatch('hide')}>Hid</button>
  <button class="blue" type="button" on:click={() => dispatch('print')}>Pri</button>
  <button class="blue" type="button" on:click={() => dispatch('pdf')}>PDF</button>
</div>

<style>
  div {
    margin: 0.4em;
  }
  div.logo {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  span.brand {
    font-size: 1.6rem;
    font-family: 'Trebuchet MS';
  }
  div.outcome {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1.4rem;
  }
  div.total-reach,
  div.locus {
    margin: 0.2em;
  }
  div.meter {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
    width: 120px;
    height: 25px;
    display: block;
  }

  .meter > span {
    height: inherit;
    box-shadow: 0 5px 5px -5px #999 inset;
    background-color: blue;
    background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    display: block;
    text-indent: -9999px;
  }

  div.controls {
    display: flex;
    justify-content: space-around;
  }

  button {
    font-size: 1rem;
    width: 3em;
    height: 3em;
    margin: 0 0.2em;
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
