<script lang="ts">
  // imports
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {genders, marketData} from '../../../stores/reach';
  import {Strategy} from '/imports/both/typings/types';

  // variables
  let useMarketData: Strategy['useMarketData'];
  let gendersToWorkWith: Set<'f' | 'm' | 'x'> = new Set($genders) ?? new Set(['f', 'm', 'x']);
  //TODO: change
  $: disabled = !$marketData || !useMarketData;

  // $: briefing.update((data) => {
  //   data.genders = genders;
  //   console.log('genders & data.genders in $: briefing.update: ', genders, data.genders);
  //   return data;
  // });

  function toggleGenders() {
    if (gendersToWorkWith) {
      if (gendersToWorkWith.has('f') && gendersToWorkWith.has('m') && gendersToWorkWith.has('x')) {
        gendersToWorkWith.delete('m');
        gendersToWorkWith.delete('x');
      } else if (gendersToWorkWith.has('f') && !gendersToWorkWith.has('m') && !gendersToWorkWith.has('x')) {
        gendersToWorkWith.delete('f');
        gendersToWorkWith.add('m');
      } else if (!gendersToWorkWith.has('f') && gendersToWorkWith.has('m') && !gendersToWorkWith.has('x')) {
        gendersToWorkWith.add('f');
      } else if (gendersToWorkWith.has('f') && gendersToWorkWith.has('m') && !gendersToWorkWith.has('x')) {
        gendersToWorkWith = new Set(['f', 'm', 'x']);
      } else if (!gendersToWorkWith.has('f') && !gendersToWorkWith.has('m') && !gendersToWorkWith.has('x')) {
        gendersToWorkWith = new Set(['f', 'm', 'x']);
      }
      $genders = Array.from(gendersToWorkWith);
      console.log('gendersToWorkWith ', gendersToWorkWith, '& $genders', $genders, ' in toggleGenders ');
    }
  }
</script>

<fieldset>
  <button
    class="genders__toggle"
    type="button"
    aria-roledescription="button"
    {disabled}
    on:click|preventDefault|stopPropagation={toggleGenders}
  >
    <Fa icon={faPersonDress} color={gendersToWorkWith.has('f') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
    <Fa icon={faPerson} color={gendersToWorkWith.has('m') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
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
