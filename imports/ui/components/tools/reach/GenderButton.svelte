<script lang="ts">
  // imports
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {briefing} from '../../../stores/reach';
  import {Strategy} from '/imports/both/typings/types';
  import {onDestroy} from 'svelte';

  // variables
  let marketData: Strategy['marketData'];
  let useMarketData: Strategy['useMarketData'];
  let genders: Strategy['genders'];
  const unsubscribe = briefing.subscribe((value) => {
    marketData = value.marketData;
    useMarketData = value.useMarketData;
    genders = value.genders;
  });
  $: disabled = !marketData || !useMarketData;
  $: console.log('$: $genders in genderButton: ', genders);

  // functions
  function toggleGenders() {
    console.log('genders in/ before togglegenders: ', genders);
    if (marketData && genders) {
      if (genders.has('f') && genders.has('m') && genders.has('x')) {
        briefing.update((value) => {
          value.genders = new Set([]);
          return value;
        });
      } else if (!genders.has('f') && !genders.has('m') && !genders.has('x')) {
        briefing.update((value) => {
          value.genders?.add('f');
          return value;
        });
      } else if (genders.has('f') && !genders.has('m') && !genders.has('x')) {
        briefing.update((value) => {
          value.genders?.delete('f');
          value.genders?.add('m');
          return value;
        });
      } else if (!genders.has('f') && genders.has('m') && !genders.has('x')) {
        briefing.update((value) => {
          value.genders?.add('f');
          return value;
        });
      } else if (genders.has('f') && genders.has('m') && !genders.has('x')) {
        briefing.update((value) => {
          value.genders?.add('x');
          return value;
        });
      }
    }
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
    font-size: 1em;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
</style>
