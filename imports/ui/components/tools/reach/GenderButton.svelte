<script lang="ts">
  // imports
  import {strategy} from '../../../stores/tools';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {Genders} from '/imports/ui/typings/types';

  // variables
  export let value: Genders;

  let disabled = false;
  $: {
    console.log('value in genderbutton: ', value);
  }

  // exports

  // functions
  function toggleGenders() {
    console.log('value before togglegenders: ', value);
    const f = value.f;
    const m = value.m;
    if (f == false && m == false) {
      value = {f: true, m: false, x: false};
    }
    if (f == true && m == false) {
      value = {f: false, m: true, x: false};
    }
    if (f == false && m == true) {
      value = {f: true, m: true, x: false};
    }
    if (f == true && m == true) {
      value = {f: false, m: false, x: false};
    }
  }
</script>

<button
  class="genders__toggle"
  type="submit"
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
    width: 3.6em;
    height: 3.6em;
    font-size: 1em;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
</style>
