<script lang="ts">
  // imports
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import {genders, marketData, useMarketData} from '../../../stores/reach';
  import getResults from '/imports/ui/methods/getResults';
  import prepareRespondents from '/imports/ui/methods/prepareRespondents';
  import adaptMaxValues from '/imports/ui/methods/maxValues';

  // variables
  $: gendersToWorkWith = new Set($genders) ?? new Set(['f', 'm', 'x']);
  $: disabled = !$marketData || !$useMarketData;

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
    on:click|preventDefault|stopPropagation={prepareRespondents}
    on:click|preventDefault|stopPropagation={adaptMaxValues}
    on:click|preventDefault|stopPropagation={getResults}
  >
    <Fa
      icon={faPersonDress}
      color={gendersToWorkWith.has('f') && !gendersToWorkWith.has('x') ? 'var(--ra-red)' : 'var(--ra-grey-light'}
    />
    <Fa
      icon={faPerson}
      color={gendersToWorkWith.has('m') && !gendersToWorkWith.has('x') ? 'var(--ra-red)' : 'var(--ra-grey-light'}
    />
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
