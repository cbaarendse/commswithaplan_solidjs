<script lang="ts">
  // imports
  import {strategy} from '../../../stores/tools';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  // variables
  let disabled = false;

  // exports

  // functions
  const toggleGenders = function () {
    if (!$strategy.genders) {
      $strategy.genders = {f: false, m: false, x: false};
    }
    const f = $strategy.genders.f;
    const m = $strategy.genders.m;
    if (f == false && m == false) {
      $strategy.genders = {f: true, m: false, x: false};
    }
    if (f == true && m == false) {
      $strategy.genders = {f: false, m: true, x: false};
    }
    if (f == false && m == true) {
      $strategy.genders = {f: true, m: true, x: false};
    }
    if (f == true && m == true) {
      $strategy.genders = {f: false, m: false, x: false};
    }
  };
</script>

<button
  class="genders__toggle"
  type="button"
  aria-roledescription="button"
  {disabled}
  on:click|preventDefault|stopPropagation={toggleGenders}
>
  <Fa icon={faPersonDress} color={$strategy.genders?.f ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
  <Fa icon={faPerson} color={$strategy.genders?.m ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
</style>
