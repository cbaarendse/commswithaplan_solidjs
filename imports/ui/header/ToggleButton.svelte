<script>
  // packages
  import {router, active} from 'tinro';
  import Button from '../../ui/reusable/Button.svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser, faHome} from '@fortawesome/free-solid-svg-icons';

  // variables
  import {language} from '../../../client/stores';
  let displayButton = 'none';

  // functions
  toggleNavigation = () => {};
</script>

<Button display={displayButton} on:click={() => toggleNavigation}>
  <div class="bars">
    <span class="bar-1" />
    <span class="bar-2" />
    <span class="bar-3" />
  </div>
</Button>

<!-- <input type="checkbox" id="bars-toggle" class="bars-toggle" />
<label for="bars-toggle">
  <div class="bars-background" />
  <span class="bar-1" />
  <span class="bar-2" />
  <span class="bar-3" />
</label> -->
<style>
  .bars {
    width: 100%;
    height: 100%;
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 150ms ease-in 300ms;
  }
  .bar-1,
  .bar-2,
  .bar-3 {
    display: block;
    position: absolute;
    height: 10%;
    width: 70%;
    border-radius: 3px;
  }

  .bar-1 {
    background-color: var(--ra-blue);
    top: 21%;
    transform: rotate(0deg);
    transition: all 450ms ease-in-out 0ms;
  }

  .bar-2 {
    background-color: var(--ra-green);
    top: 45%;
    transform: scale(1, 1);
    transform-origin: right 15%;
    transition: transform 350ms ease-in-out 300ms;
  }

  .bar-3 {
    background-color: var(--ra-red);
    bottom: 21%;
    transform: rotate(0deg);
    transition: all 450ms ease-in-out 0ms;
  }

  /* ===========================
       only for mobile: 
       when label is checked, 
       menu will appear with 
       transition 
       =========================== */

  .bars:checked ~ label .bars-background {
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }

  .bars:checked ~ label .bar-1 {
    top: 45%;
    transform: rotate(45deg);
    transition: all 450ms ease-in-out 300ms;
  }

  .bars:checked ~ label .bar-2 {
    transform: scale(0, 1);
    transform-origin: right 15%;
    transition: transform 350ms ease-in-out 0ms;
  }

  .bars:checked ~ label .bar-3 {
    bottom: 45%;
    transform: rotate(135deg);
    transition: all 450ms ease-in-out 300ms;
  }

  @media screen and (min-width: 760px) {
    .bars {
      transform: none;
    }

    .bar-1,
    .bar-2,
    .bar-3 {
      display: none;
    }
  }
</style>
