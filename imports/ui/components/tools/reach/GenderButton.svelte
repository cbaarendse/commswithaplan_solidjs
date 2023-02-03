<script lang="ts">
  // imports
  import {strategy} from '../../../stores/tools';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {Genders} from '/imports/both/typings/types';

  // variables
  // export let value: Genders;

  let disabled = false; //$strategy.marketData && $strategy.useMarketData;
  $: {
    console.log('$: $strategy.genders in genderButton: ', $strategy.genders);
  }

  // exports

  // functions
  function toggleGenders() {
    console.log('$strategy.genders in/ before togglegenders: ', $strategy.genders);
    if ($strategy.marketData && $strategy.genders) {
      if ($strategy.genders.has('f') && $strategy.genders.has('m') && $strategy.genders.has('x')) {
        $strategy.genders.clear();
      } else if (!$strategy.genders.has('f') && !$strategy.genders.has('m') && !$strategy.genders.has('x')) {
        $strategy.genders.add('f');
      } else if ($strategy.genders.has('f') && !$strategy.genders.has('m') && !$strategy.genders.has('x')) {
        $strategy.genders.delete('f');
        $strategy.genders.add('m');
      } else if (!$strategy.genders.has('f') && $strategy.genders.has('m') && !$strategy.genders.has('x')) {
        $strategy.genders.add('f');
      } else if ($strategy.genders.has('f') && $strategy.genders.has('m') && !$strategy.genders.has('x')) {
        $strategy.genders.add('x');
      }
    }
  }

  console.log('$strategy.genders in genderButton: ', $strategy.genders);
  // function toggleGenders() {
  //   console.log('value in/ before togglegenders: ', value);

  //   if (value.has('f') && value.has('m') && value.has('x')) {
  //     value.clear();
  //   } else if (!value.has('f') && !value.has('m') && !value.has('x')) {
  //     value.add('f');
  //   } else if (value.has('f') && !value.has('m') && !value.has('x')) {
  //     value.delete('f');
  //     value.add('m');
  //   } else if (!value.has('f') && value.has('m') && !value.has('x')) {
  //     value.add('f');
  //   } else if (value.has('f') && value.has('m') && !value.has('x')) {
  //     value.add('x');
  //   }
  // }
</script>

<button
  class="genders__toggle"
  type="submit"
  aria-roledescription="button"
  {disabled}
  on:click|preventDefault|stopPropagation={toggleGenders}
>
  <Fa icon={faPersonDress} color={$strategy.genders?.has('f') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
  <Fa icon={faPerson} color={$strategy.genders?.has('m') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.6rem;
    height: 3.6rem;
    font-size: 1em;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
</style>
