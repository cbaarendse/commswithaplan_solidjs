<script lang="ts">
  // imports
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {marketData, briefing} from '../../../stores/reach';
  import {Strategy} from '/imports/both/typings/types';
  import {onDestroy} from 'svelte';

  // variables
  let useMarketData: Strategy['useMarketData'];
  let genders: Set<'f' | 'm' | 'x'>;
  const unsubscribe = briefing.subscribe((data) => {
    useMarketData = data.useMarketData;
    genders = new Set(data.genders);
    console.log('genders in briefing subscribe: ', genders);
  });
  $: disabled = !$marketData || !useMarketData;

  // $: briefing.update((data) => {
  //   data.genders = genders;
  //   console.log('genders & data.genders in $: briefing.update: ', genders, data.genders);
  //   return data;
  // });

  onDestroy(() => unsubscribe());

  // functions
  function toggleGenders() {
    if (genders) {
      if (genders.has('f') && genders.has('m') && genders.has('x')) {
        genders.delete('m');
        genders.delete('x');
      } else if (genders.has('f') && !genders.has('m') && !genders.has('x')) {
        genders.delete('f');
        genders.add('m');
      } else if (!genders.has('f') && genders.has('m') && !genders.has('x')) {
        genders.add('f');
      } else if (genders.has('f') && genders.has('m') && !genders.has('x')) {
        genders = new Set(['f', 'm', 'x']);
      } else if (!genders.has('f') && !genders.has('m') && !genders.has('x')) {
        genders = new Set(['f', 'm', 'x']);
      }
      briefing.update((data) => {
        data.genders = Array.from(genders);
        console.log('genders ', genders, '& data.genders', data.genders, ' in toggleGenders ');
        return data;
      });
    }
  }

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
