<script>
  // packages

  // components
  import LogoReachApp from '../../components/reusable/LogoReachApp.svelte';

  // functions
  import {translate, toStringFormat} from '../../../../client/functions';

  // variables
  let calculating = false; // when false, calculation is being executed
  export let reach;
  export let locus;
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
  {translate('totalReach')}: <span>{reach}&nbsp;%</span>
  {translate('locus')}:<span>{locus}&nbsp;%</span>
</div>

<div class="controls">
  <button type="button">Reset</button>
  <button type="button">Sort</button>
  <button type="button">Hide</button>
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
