<script>
  // packages
  import {router, active} from 'tinro';
  import Button from '../../ui/reusable/Button.svelte';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser, faHome} from '@fortawesome/free-solid-svg-icons';
  import {displayNavigation} from '../../../client/stores';

  // variables
  import {language} from '../../../client/stores';
  // functions
  const toggleNavigation = () => {
    $displayNavigation = $displayNavigation == 'none' ? 'block' : 'none';
  };
  const rotateBars = () => {
    $displayNavigation = $displayNavigation == 'none' ? 'block' : 'none';
  };
</script>

<Button size={'small'} backgroundColor={'transparantnoborder'} on:click={toggleNavigation} on:click={rotateBars}>
  <div class="bars">
    <div class="bar-1" />
    <div class="bar-2" />
    <div class="bar-3" />
  </div>
</Button>

<style>
  .bars {
    position: relative;
    width: 2rem;
    height: 2rem;
    background-color: var(--ra-grey-off-white);
  }
  .bar-1,
  .bar-2,
  .bar-3 {
    position: relative;
    height: 10%;
    width: 100%;
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

  /* .bars {
    background-color: var(--ra-grey-off-white);
    transform: scale(1, 1);
    transform-origin: top;
    transition: transform 150ms ease-out 0ms;
  }

  .bar-1 {
    top: 45%;
    transform: rotate(45deg);
    transition: all 450ms ease-in-out 300ms;
  }
  .bar-2 {
    transform: scale(0, 1);
    transform-origin: right 15%;
    transition: transform 350ms ease-in-out 0ms;
  }

  .bar-3 {
    bottom: 45%;
    transform: rotate(135deg);
    transition: all 450ms ease-in-out 300ms;
  } */

  @media screen and (min-width: 760px) {
    .bars {
      transform: none;
    }
  }
</style>
