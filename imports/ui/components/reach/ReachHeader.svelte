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
  <span>ReachApp</span>
</div>
<!-- outcome  -->
<div class="outcome">
  {totalReachDisplayName}: <span>{reach}&nbsp;%</span>
  {locusDisplayName}:<span>{locus}&nbsp;%</span>
</div>

<div class="controls">
  <button type="button">Reset</button>
  <button type="button">Sort</button>
  <button type="button">Hide</button>
  <!-- space? -->
  <button type="button">Print</button>
  <button type="button">PDF</button>
</div>

<style>
  button {
    font-size: 1.2rem;
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    color: var(--ra-white);
  }
</style>
