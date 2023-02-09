<script lang="ts">
  // imports
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {Genders} from '/imports/both/typings/types';
  import {marketData} from '../../../stores/tools';
  import createReachTool from '/imports/ui/functions/reach';

  // variables
  const reachTool = createReachTool();
  export let genders: Genders;

  let disabled = false; //$marketData && $useMarketData;
  $: {
    console.log('$: genders in genderButton: ', genders);
  }

  // exports

  // functions
  function toggleGenders() {
    console.log('$strategy.genders in/ before togglegenders: ', genders);
    if ($marketData && genders) {
      if (genders.has('f') && genders.has('m') && genders.has('x')) {
        genders.clear();
      } else if (!genders.has('f') && !genders.has('m') && !genders.has('x')) {
        genders.add('f');
      } else if (genders.has('f') && !genders.has('m') && !genders.has('x')) {
        genders.delete('f');
        genders.add('m');
      } else if (!genders.has('f') && genders.has('m') && !genders.has('x')) {
        genders.add('f');
      } else if (genders.has('f') && genders.has('m') && !genders.has('x')) {
        genders.add('x');
      }
    }
  }

  console.log('genders in genderButton: end', genders);
</script>

<button
  class="genders__toggle"
  type="submit"
  aria-roledescription="button"
  {disabled}
  on:click|preventDefault|stopPropagation={toggleGenders}
>
  <Fa icon={faPersonDress} color={genders?.has('f') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
  <Fa icon={faPerson} color={genders?.has('m') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
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
