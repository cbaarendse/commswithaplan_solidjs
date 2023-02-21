<script lang="ts">
  // imports
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {marketData, briefing} from '../../../stores/reach';
  import {Strategy} from '/imports/both/typings/types';
  import {onDestroy} from 'svelte';

  // variables
  let useMarketData: Strategy['useMarketData'];
  let genders: Strategy['genders'] = $briefing.genders;
  const unsubscribe = briefing.subscribe((data) => {
    useMarketData = data.useMarketData;
    genders = data.genders;
  });
  $: disabled = !$marketData || !useMarketData;

  $: briefing.update((data) => {
    data.genders = genders;
    return data;
  });

  onDestroy(() => unsubscribe());

  // functions
  function toggleGenders() {
    console.log('genders in toggleGenders start: ', genders);
    if (genders) {
      if (genders.has('f') && genders.has('m') && !genders.has('x')) {
        genders = new Set([]);
      } else if (!genders.has('f') && !genders.has('m') && !genders.has('x')) {
        genders.add('f');
      } else if (genders.has('f') && !genders.has('m') && !genders.has('x')) {
        genders.delete('f');
        genders.add('m');
      } else if (!genders.has('f') && genders.has('m') && !genders.has('x')) {
        genders.add('f');
      } else if (genders.has('f') && genders.has('m') && genders.has('x')) {
        genders.add('f');
      }
    }
    console.log('genders in toggleGenders end: ', genders);
  }

  console.log('$genders in genderButton: end', genders);
  onDestroy(() => unsubscribe());
</script>

<fieldset>
  <button
    class="genders__toggle"
    type="button"
    aria-roledescription="button"
    {disabled}
    on:click|preventDefault|stopPropagation={toggleGenders}
  >
    <Fa icon={faPersonDress} color={genders?.has('f') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
    <Fa icon={faPerson} color={genders?.has('m') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
  </button>
</fieldset>

<style>
  fieldset {
    display: grid;
    grid-template-columns: auto;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0.4rem 0.6rem;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.6rem;
    height: 3.6rem;
    font-size: 3.5rem;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
</style>
