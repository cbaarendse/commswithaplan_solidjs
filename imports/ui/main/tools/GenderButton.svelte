<script lang="ts">
  // imports
  import {cubicInOut} from 'svelte/easing';
  import {fade} from 'svelte/transition';
  import {Tweened, tweened} from 'svelte/motion';
  import type {Strategy} from '../../typings/types';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPersonHalfDress, faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  // variables
  let disabled = false;
  const coefficient: Tweened<number> = tweened(0, {easing: cubicInOut});

  // exports
  $: genders = {f: false, m: false, x: false};

  // functions
  const combineGenders = function () {
    console.log('genders in combineGenders()', genders);
    if (!genders.f && !genders.m && !genders.x) {
      return {f: true, m: false, x: false};
    }
    if (genders.f && !genders.m && !genders.x) {
      return {f: false, m: true, x: false};
    }
    if (!genders.f && genders.m && !genders.x) {
      return {f: true, m: true, x: false};
    }
    if (genders.f && genders.m && !genders.x) {
      return {f: false, m: false, x: false};
    }
  };
</script>

<button
  class="genders__toggle"
  type="button"
  aria-roledescription="button"
  {disabled}
  on:click|preventDefault|stopPropagation={combineGenders}
>
  <Fa icon={faPersonDress} size="4rem" color={genders.f ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
  <Fa icon={faPerson} size="4rem" color={genders.m ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
</button>

<style>
  button {
    width: 3.7rem;
    height: 3.7rem;
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
